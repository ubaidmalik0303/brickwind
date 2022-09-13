const express = require("express");
const router = express.Router();
const {
  createCategory,
  createSubCategory,
  allCategories,
  editcategory,
  categoryDetails,
  deleteCategory,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createCategory);
router
  .route("/admin/category/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), categoryDetails)
  .put(isAuthenticatedUser, authorizeRole("admin"), editcategory)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteCategory);
router
  .route("/admin/subcategory/new/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), createSubCategory);
router.route("/categories").get(allCategories);

module.exports = router;
