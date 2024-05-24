const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schemaConfig = require("./schemaConfig.json");

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
  return new mongoose.Schema(schemaDefinition);
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
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
