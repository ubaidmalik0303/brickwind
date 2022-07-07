const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down The Server Due To Uncaught Exception");
  process.exit(1);
});

//Config
dotenv.config({ path: "backend/config/config.env" });

//Database Connection
connectDatabase();

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

const server = app.listen((port = process.env.PORT), () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down The Server Due To Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
