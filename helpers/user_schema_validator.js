const Joi = require("joi");
const userValidation = Joi.object({
name:Joi.string().min(4).required(),
password:Joi.string().required(),
email: Joi.string().required().email()
})
module.exports = {
    userValidation
}