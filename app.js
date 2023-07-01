const express = require("express");
require("dotenv").config();
const app = express();
require("express-async-errors")
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");
const errorHandler = require("./middlewares/error-handler");
const authMiddleware=require("./middlewares/auth")


app.use(express.json());
app.use("/api/v1/jobs", [authMiddleware,jobsRoute]);
app.use("/api/v1/auth", authRoute);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("Listening..."));
  } catch (error) {
    console.log(error);
  }
};

start();
