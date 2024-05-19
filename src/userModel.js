const mongoose = require("mongoose");
const schemaConfig = require("./schemaConfig.json");

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
module.exports = mongoose.model("User", userSchema);
