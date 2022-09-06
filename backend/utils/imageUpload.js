const multer = require("multer");
var keygen = require("keygenerator");
const ErrorHandler = require("../utils/errorHandler");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `${keygen._()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new ErrorHandler("Only PNG|JPG|JPEG File Type Allowed"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: fileFilter,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

module.exports = upload;
