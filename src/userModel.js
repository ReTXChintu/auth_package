const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schemaConfig = require("./configs.json");
const config = require("./config");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = schemaConfig.saltRounds;

const createUserSchema = (config) => {
  const schemaDefinition = {};
  Object.keys(config.userSchema).forEach((field) => {
    const fieldConfig = config.userSchema[field];
    const type = mongoose.Schema.Types[fieldConfig.type];
    if (!type) {
      throw new Error(`Invalid type specified for field ${field}`);
    }
    schemaDefinition[field] = { type };
    if (fieldConfig.required) {
      schemaDefinition[field].required = fieldConfig.required;
    }
    if (fieldConfig.default) {
      schemaDefinition[field].default = eval(fieldConfig.default);
    }
  });
  schemaDefinition.refreshToken = {
    type: String,
    required: false,
  };
  return new mongoose.Schema(schemaDefinition, { timestamps: true });
};

const userSchema = createUserSchema(schemaConfig);

// Add pre-save hook to hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  }

  if (
    user.isModified("firstName") ||
    user.isModified("lastName") ||
    user.isModified("middleName")
  ) {
    user.name = `${user.firstName}${
      user.middleName ? " " + user.middleName + " " : " "
    }${user.lastName}`;
  }

  next();
});

// Method to generate JWT access token
userSchema.methods.generateAccessToken = function () {
  const user = this;
  const payload = { id: user._id, username: user.username };
  return jwt.sign(payload, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiry,
  });
};
userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const payload = { id: user._id };
  const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiry,
  });
  user.refreshToken = refreshToken;
  await user.save();
  return refreshToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
