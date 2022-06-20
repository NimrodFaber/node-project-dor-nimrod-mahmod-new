const { object } = require("joi");
const mongoose = require("mongoose");
const Joi = require("joi");
const visitCardSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: "The field name is a required field!",
    },
    businessDiscribe: {
      type: String,
      required: "The field name is a required field!",
    },
    businessAdress: {
      type: String,
      required: "The field name is a required field!",
    },
    businessPhone: {
      type: String,
      required: "The field name is a required field!",
    },
    businessPicture: {
      type: String,
      required: "The field name is a required field!",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [Object],
  },
  { timestamps: true }
);

visitCardSchema.methods.validateCardSchema = function (card) {
  const blogschema = Joi.object({
    businessName: Joi.string().required(),
    businessDiscribe: Joi.string().required(),
    businessAdress: Joi.string().required(),
    businessPhone: Joi.string().required(),
    businessPicture: Joi.required(),
    likes: Joi.required(),
  });
  return blogschema;
};

module.exports = mongoose.model("VisitCard", visitCardSchema, "visitCard");
