const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./authRoutes");
const config = require("./config");
const authMiddleware = require("./authMiddleware");
const User = require("./userModel");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
module.exports.authMiddleware = authMiddleware;
module.exports.User = User;
