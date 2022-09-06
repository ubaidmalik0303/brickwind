const express = require("express");
const router = express.Router();
const {
  createCategory,
  createSubCategory,
  allCategories,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const upload = require("../utils/imageUpload");

router
  .route("/admin/category/new")
  .post(
    isAuthenticatedUser,
    authorizeRole("admin"),
    upload.single("image"),
    createCategory
  );
router
  .route("/admin/subcategory/new/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), createSubCategory);
router.route("/categories").get(allCategories);

module.exports = router;
