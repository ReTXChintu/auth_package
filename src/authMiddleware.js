const jwt = require("jsonwebtoken");
const config = require("./config");
const configs = require("./configs.json");
const User = require("./userModel");

const authMiddleware = async (req, res, next) => {
  let token;

  // Check for accessToken in cookies
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  // If no accessToken, check x-auth-token in headers
  else if (req.headers["x-auth-token"]) {
    token = req.headers["x-auth-token"].split(" ")[1];
  }

  if (!token) {
    // Check for refreshToken if no accessToken is found
    if (req.cookies && req.cookies.refreshToken) {
      const refreshToken = req.cookies.refreshToken;
      try {
        const decoded = jwt.verify(refreshToken, config.accessTokenSecret);
        // Assume the refresh token contains the user's ID
        req.user = decoded;

        const user = await User.findById(decoded._id);

        // Optionally, you could issue a new access token here
        const newAccessToken = user.generateAccessToken();

        res.cookie("accessToken", newAccessToken, { ...configs.cookieOption });

        next();
      } catch (error) {
        return res.status(401).send({ error: "Invalid refresh token" });
      }
    } else {
      return res.status(401).send({ error: "No token provided" });
    }
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
    }
  }
};

module.exports = authMiddleware;
