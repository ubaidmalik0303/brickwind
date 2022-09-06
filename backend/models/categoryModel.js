const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Category Name"],
    trim: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  subCategory: [{ type: String }],
});

module.exports = mongoose.model("Category", categorySchema);
