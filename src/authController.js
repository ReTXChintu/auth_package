const User = require("./userModel");
const ApiResponse = require("api_response_formatter");
const bcrypt = require("bcrypt");
const configs = require("./configs.json");
const config = require("./config");

const signup = async (req, res) => {
  try {
    const { username, password, ...rest } = req.body;
    const newUser = new User({ username, password, ...rest });
    await newUser.save();
    ApiResponse.success(res, newUser, "User created successfully", 201);
  } catch (error) {
    ApiResponse.error(res, error.message || "Internal server Error", 500, [
      error,
    ]);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      ApiResponse.error(res, "User not found", 404, []);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      ApiResponse.error(res, "Invalid Credentials", 400, []);
    }
    const accessToken = await User.generateAccessToken();
    const refreshToken = await User.generateRefreshToken();
    res.cookie("accessToken", accessToken, { ...configs.cookieConfig });
    res.cookie("refreshToken", refreshToken, { ...configs.cookieConfig });
    ApiResponse.success(res, user, "Logged in successfully", 200);
  } catch (error) {
    ApiResponse.error(res, error.message || "Internal Server Error", 500, [
      error,
    ]);
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } =
    req.cookies || req.headers["x-auth-token"]?.split(" ")[1];

  if (!refreshToken) {
    return ApiResponse.error(res, "No token provided", 404, []);
  }

  try {
    const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
    const user = await User.findById(decoded._id);

    if (!user) {
      return ApiResponse.error(res, "User not found", 404, []);
    }

    if (user.refreshToken !== refreshToken) {
      return ApiResponse.error(res, "Invalid token", 401, []);
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();

    res.cookie("accessToken", newAccessToken, { ...configs.cookieOption });
    res.cookie("refreshToken", newRefreshToken, { ...configs.cookieOption });
    ApiResponse.success(
      res,
      { accessToken: newAccessToken, refreshToken: newRefreshToken },
      "New Tokens Granted",
      200
    );
  } catch (error) {
    ApiResponse.error(res, error.message || "Internal Server Error", 500, [
      error,
    ]);
  }
};

module.exports = { signup, login, refreshToken };
