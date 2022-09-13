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
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

//Routes For Product
router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRole("admin"),
    createProduct
  );
router
  .route("/admin/product/update/:id")
  .put(
    isAuthenticatedUser,
    authorizeRole("admin"),
    updateProduct
  );
router
  .route("/admin/product/delete/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router
  .route("/reviews")
  .put(isAuthenticatedUser, reviewForProduct)
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
