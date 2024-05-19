module.exports = {
  mongoURI: process.env.MONGO_URI || "your_default_mongo_uri",
  jwtSecret: process.env.JWT_SECRET || "your_default_jwt_secret",
};
