const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

//Routes Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoutes");
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//Middleware For Error
app.use(errorMiddleware);

module.exports = app;
