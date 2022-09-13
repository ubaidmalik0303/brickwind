const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const fs = require("fs");
const { storage } = require("../utils/firebase");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
var keygen = require("keygenerator");

//Create A Product  --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const product = await Product.create(req.body);

  const uploadImagesPromise = req.files.images.map(async (img) => {
    const imageKey = keygen._();
    const imageName = imageKey + "." + img.mimetype.split("/")[1];

    const imageRef = ref(storage, `products/${imageName}`);
    const uploadTask = await uploadBytes(imageRef, img.data, {
      contentType: img.mimetype,
    });
    const downloadUrl = await getDownloadURL(imageRef).then((url) => {
      return url;
    });
    return {
      public_id: imageName,
      url: downloadUrl,
    };
  });

  const imagesLinks = await Promise.all(uploadImagesPromise);
  product.images = imagesLinks;

  await product.save();

  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 24;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .filter()
    .search();

  let products = await apiFeature.query.clone();

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(201).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Get Admin Products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(201).json({
    success: true,
    products,
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.header("Access-Control-Allow-Origin", "*").status(200).json({
    success: true,
    product,
  });
});

//Update Product --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      msg: "Product Not Found",
    });
  }

  if (req.files?.images) {
    product.images.forEach(async (element) => {
      //Delete Image
      const deleteRef = ref(storage, `products/${element.public_id}`);
      await deleteObject(deleteRef);
    });

    //upload New Images
    const uploadImagesPromise = req.files.images.map(async (img) => {
      const imageKey = keygen._();
      const imageName = imageKey + "." + img.mimetype.split("/")[1];

      const imageRef = ref(storage, `products/${imageName}`);
      const uploadTask = await uploadBytes(imageRef, img.data, {
        contentType: img.mimetype,
      });
      const downloadUrl = await getDownloadURL(imageRef).then((url) => {
        return url;
      });
      return {
        public_id: imageName,
        url: downloadUrl,
      };
    });

    const imagesLinks = await Promise.all(uploadImagesPromise);

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product --Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      msg: "Product Not Found",
    });
  }

  product.images.forEach(async (element) => {
    //Delete Image
    const deleteRef = await ref(storage, `products/${element.public_id}`);
    await deleteObject(deleteRef);
  });

  await product.remove();

  res.status(200).json({
    success: true,
    msg: "Product Deleted SuccessFully",
  });
});

//New Review And Update Review
exports.reviewForProduct = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productid } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productid);

  const isReviewed = product.reviews.find((rev) => {
    return rev.user.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //Calculate Rating
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  const user = await User.findById(req.user._id);
  user?.purchasedItems?.forEach((val, i) => {
    if (val.product.toString() === productid) {
      val.isReviewed = true;
    }
  });
  await user.save();

  res.status(200).json({
    success: true,
  });
});

//Get All Reviews Of A Product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Product Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  //Calculate Rating
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
    console.log(avg, rev.rating);
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
  });
});
