const express = require("express");
const router = express.Router();
const {
  userRegister,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
  addtowishlist,
  removefromwishlist,
  getwishlist,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/my-account").get(isAuthenticatedUser, getUserDetails);
router
  .route("/my-account/password/update")
  .put(isAuthenticatedUser, updateUserPassword);
router.route("/my-account/update").put(isAuthenticatedUser, updateUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);
router
  .route("/my-account/wishlist/new")
  .put(isAuthenticatedUser, addtowishlist);
router
  .route("/my-account/wishlist/:productid")
  .delete(isAuthenticatedUser, removefromwishlist);
router.route("/my-account/wishlist").get(isAuthenticatedUser, getwishlist);

module.exports = router;
