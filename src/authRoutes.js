const express = require("express");
const { signup, login, refreshToken } = require("./authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refreshToken", refreshToken);

module.exports = router;
