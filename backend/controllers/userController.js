const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendResetPasswordMail");
const crypto = require("crypto");
var fs = require("fs");

//Register A User
exports.userRegister = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: req.file.filename,
      url: "images/" + req.file.filename,
    },
  });

  user.avatar.url = process.env.HOST_NAME + user.avatar.url;
  sendToken(res, 201, user);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check is email and password provided from user
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email And Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  user.avatar.url = process.env.HOST_NAME + user.avatar.url;
  sendToken(res, 200, user);
});

//Logout USer
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Successfully Logout",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  //Get Reset Password Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token Is: \n\n ${resetPasswordUrl} \n\n If You Have Not Requested This Email Then Please Ignore It.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "BrickWind Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Send To ${user.email} Successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset User Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token Is Invalid Or Has Been Expire",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Does Not Match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(res, 200, user);
});

//Get User Profile Deatils
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.avatar.url = process.env.HOST_NAME + user.avatar.url;

  res.status(200).json({
    success: true,
    user,
  });

  next();
});

//Update User Password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password Is Incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return next(new ErrorHandler("Password Does Not Match", 400));
  }

  user.password = req.body.confirmNewPassword;

  user.save();

  sendToken(res, 200, user);
});

//Update User Profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const userNewDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    userNewDetails.avatar = {
      public_id: req.file.filename,
      url: "images/" + req.file.filename,
    };

    fs.unlink(`uploads/${req.user.avatar.public_id}`, function (err) {
      if (err) throw err;
    });
  }

  const user = await User.findByIdAndUpdate(req.user.id, userNewDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get All Users (Admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get Single User Detail For Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist With Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role --Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  user.role = req.body.role;

  await user.save();

  res.status(200).json({
    success: true,
  });
});

//Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist With Id: ${req.params.id}`)
    );
  }

  fs.unlink(`uploads/${user.avatar.public_id}`, function (err) {
    if (err) throw err;
  });

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted SuccessFully",
  });
});

//Add To Wishlist
exports.addtowishlist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  await user.wishlist.push(req.body.productid);
  await user.save();

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});

//Add To Wishlist
exports.removefromwishlist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.wishlist = await user.wishlist.filter(
    (val) => val !== req.params.productid
  );
  await user.save();

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});

//get Wishlist
exports.getwishlist = catchAsyncError(async (req, res, next) => {
  const wishlist = await Product.find({ _id: { $in: req.user.wishlist } });

  wishlist?.forEach((product) => {
    product?.images?.forEach((val) => {
      val.url = process.env.HOST_NAME + val.url;
    });
  });

  res.status(200).json({
    success: true,
    wishlist,
  });
});
