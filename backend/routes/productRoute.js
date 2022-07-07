const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  reviewForProduct,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

//Routes For Product
router.route("/products").get(getAllProducts);
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router
  .route("/admin/products/update/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct);
router
  .route("/admin/products/delete/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, reviewForProduct);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
