const mongoose = require("mongoose");

const visitCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "The field name is a required field!",
  }
});


module.exports = mongoose.model("VisitCard", visitCardSchema, "visitCard");
