const express = require("express");
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/my").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);

module.exports = router;
