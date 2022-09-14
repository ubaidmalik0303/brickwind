const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
//Config
dotenv.config({ path: "backend/config/config.env" });

app.use(cors());
app.use("/images", express.static("uploads"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(fileUpload());

//Routes Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoutes");
const categoryRoute = require("./routes/categoryRoute");
const paymentRoute = require("./routes/paymentRoute");
const websiteRoute = require("./routes/websiteRoute");
const contactRoute = require("./routes/contactusRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", websiteRoute);
app.use("/api/v1", contactRoute);

//Middleware For Error
app.use(errorMiddleware);

module.exports = app;
