const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./authRoutes");
const config = require("./config");

const app = express();

app.use(express.json());
app.use("/", authRoutes);

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
