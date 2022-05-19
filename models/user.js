const mongoose = require("mongoose");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "The field name is a required field!",
  },
  password: {
    type: String,
    required: "The tz text is a required field!",
  },

  isVip: {
    type: Boolean,
    required: "tell me if u are a vip",
  },
  email: {
    type: String,
    // required: "tell me if u are a vip",
    unique: true,
  },
});

userSchema.methods.validateUserSchema = function (user) {
  const blogschema = Joi.object({
    name: Joi.string().required(),
    isVip: Joi.boolean().required(),

    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return blogschema;
};
module.exports = mongoose.model("User", userSchema, "users");
