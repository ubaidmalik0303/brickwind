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
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/my-account").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/my-account/update").put(isAuthenticatedUser, updateUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

module.exports = router;
