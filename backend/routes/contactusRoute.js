const express = require("express");
const { contactus } = require("../controllers/contactusController");
const router = express.Router();

router.route("/contactus").post(contactus);

module.exports = router;
