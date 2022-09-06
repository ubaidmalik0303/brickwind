const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
    image: {
      public_id: req.file.filename,
      url: "images/" + req.file.filename,
    },
  });

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

exports.allCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();

  categories.forEach((val) => {
    val.image.url = process.env.HOST_NAME + val.image.url;
  });

  res.status(201).json({
    success: true,
    categories,
  });
});
