const app = require("./app");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down The Server Due To Uncaught Exception");
  process.exit(1);
});


//Database Connection
connectDatabase();

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
