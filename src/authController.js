const User = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");

const signup = async (req, res) => {
  try {
    const { username, password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, ...rest });
    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { signup, login };
