const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const keygen = require("keygenerator");
const { storage } = require("../utils/firebase");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

exports.createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
  });

  const imageKey = keygen._();
  const imageName =
    category.name + imageKey + "." + req.files.image.mimetype.split("/")[1];

  const imageRef = await ref(storage, `category/${imageName}`);
  await uploadBytes(imageRef, req.files.image.data, {
    contentType: req.files.image.mimetype,
  });
  await getDownloadURL(imageRef).then((url) => {
    category.image = {
      public_id: imageName,
      url,
    };
  });

  await category.save();

  res.status(201).json({
    success: true,
    category,
  });
});

exports.createSubCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  let category = await Category.findByIdAndUpdate(req.params.id);
  category.subCategory.push(name);
  await category.save();

  res.status(201).json({
    success: true,
    category,
  });
});

exports.editcategory = catchAsyncError(async (req, res, next) => {
  let { name, subCategory } = req.body;

  if (subCategory[0]) {
    subCategory = subCategory.split(",");
  }

  const newCategoryDetails = {
    name,
    subCategory,
  };

  if (req.files?.image) {
    const category = await Category.findById(req.params.id);

    //Delete Old Image
    const deleteRef = await ref(
      storage,
      `category/${category.image.public_id}`
    );
    await deleteObject(deleteRef);

    //Upload New Image
    const imageKey = keygen._();
    const imageName =
      category.name + imageKey + "." + req.files.image.mimetype.split("/")[1];

    const imageRef = await ref(storage, `category/${imageName}`);
    await uploadBytes(imageRef, req.files.image.data, {
      contentType: req.files.image.mimetype,
    });
    await getDownloadURL(imageRef).then((url) => {
      newCategoryDetails.image = {
        public_id: imageName,
        url,
      };
    });
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    newCategoryDetails
  );

  res.status(201).json({
    success: true,
    category,
  });
});

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(500).json({
      success: false,
      msg: "Category Not Found",
    });
  }

  //Delete Images
  const deleteRef = await ref(storage, `category/${category.image.public_id}`);
  await deleteObject(deleteRef);

  await category.remove();

  res.status(200).json({
    success: true,
    msg: "category Deleted SuccessFully",
  });
});

exports.allCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();

  res.status(201).json({
    success: true,
    categories,
  });
});

exports.categoryDetails = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.status(201).json({
    success: true,
    category,
  });
});
