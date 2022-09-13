const express = require("express");
const {
  websiteDetails,
  updateWebsiteDetails,
} = require("../controllers/websiteController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router
  .route("/admin/website")
  .post(isAuthenticatedUser, authorizeRole("admin"), updateWebsiteDetails)
  .get(websiteDetails);

module.exports = router;
