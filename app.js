const express = require("express");
require("dotenv").config()
const app = express();
const connectDB=require("./db/connect")
const port = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");
app.use(express.json())
app.use("/api/v1/jobs", jobsRoute);
app.use("/api/v1/auth", authRoute);

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log("Listening..."));
  } catch (error) {
    console.log(error);
  }
};

start();
