const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./authRoutes");
const config = require("./config");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
