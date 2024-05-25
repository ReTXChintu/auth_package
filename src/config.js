module.exports = {
  mongoURI: process.env.MONGO_URI || "your_default_mongo_uri",
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET || "your_default_jwt_secret",
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "1h",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || "your_default_jwt_secret",
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
};
