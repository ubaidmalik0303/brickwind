const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  logo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  banner: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  contactno: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  workinghours: {
    type: String,
  },
  websitename: {
    type: String,
  },
  footertext: {
    type: String,
  },
  footerbottomtext: {
    type: String,
  },
  facebooklink: {
    type: String,
  },
  pinterestlink: {
    type: String,
  },
  instagramlink: {
    type: String,
  },
  twitterlink: {
    type: String,
  },
});

module.exports = mongoose.model("Website", categorySchema);
