const express = require("express"),
 cors = require('cors'),
  app = express(),

  mongoose = require("mongoose"),
  chalk = require("chalk"),
  // siteRouter = require("./routers/siterouter"),
  // scrapedRouter = require("./routers/scrapedrouter");
  port = 2423;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// app.use("/site", siteRouter);
// app.use("/scraped", scrapedRouter);
const morgan = require("morgan");
const User = require("./models/user");
const { addUser, getAllUsers } = require("./controllers/users");
var fs = require("fs");
var path = require("path");

var corsOptions = {
  origin: 'http://example1.com',
  optionsSuccessStatus: 200 ,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

const log = chalk.bold.white.bgGreen,
error = chalk.bold.white.bgRed;

var accessLogStream = fs.createWriteStream(path.join(__dirname, "logger.log"), {
  flags: "a",
});

app.use(morgan("tiny", { stream: accessLogStream }));

app.get("/getALLUsers",cors(corsOptions) ,(req, res) => {
  getAllUsers()
    .then((user) => {
    console.log(log("get all user"));
    res.status(201).json("sucsses")
    })
    .catch((err) => res.json(error(err)))
});

app.post("/addUser", (req, res) => {
  let { name, password, phone, isVip } = req.body;
  const user = { name, password, phone, isVip };
  addUser(user)
    .then((user) => {res.json((user))
    console.log(log("user is addit"))
    })
    .catch((err) => {res.json((err))
    console.log(error(err))
    })
});

mongoose
  .connect("mongodb://0.0.0.0:27017/project-node")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
