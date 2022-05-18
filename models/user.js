const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "The field name is a required field!",
  },
  password: {
    type: String,
    required: "The tz text is a required field!",
  },
  phone: {
    type: String,
    required: "You need a phone!!!!!",
  },
  isVip: {
    type: String,
    required: "tell me if u are a vip",
  },
});
module.exports = mongoose.model("User", userSchema,'users');
