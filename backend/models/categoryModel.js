const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Category Name"],
    trim: true,
    unique: [true, "Please Enter Different Category Name"],
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  subCategory: [{ type: String, trim: true }],
});

module.exports = mongoose.model("Category", categorySchema);
