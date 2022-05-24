//express mongose
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const cardRouter = require("./routes/cards");
const userdRouter = require("./routes/user");
///js import
var fs = require("fs");
var path = require("path");

const cors = require("cors");

// //logger
let accessLogStream = fs.createWriteStream(path.join(__dirname, "logger.log"), {
  flags: "a",
});
//morgan
const morgan = require("morgan");
app.use(morgan("tiny", { stream: accessLogStream }));

//middelware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/card", cardRouter);
app.use("/user", userdRouter);

//connection
mongoose
  .connect("mongodb://0.0.0.0:27017/project-node")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
