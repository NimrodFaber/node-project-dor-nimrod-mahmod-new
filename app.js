//Middleware
const auth = require("./middleware/auth");
//express mongose
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 2423;
//js import
var fs = require("fs");
var path = require("path");
//cors
const cors = require("cors");
let corsOptions = {
  origin: "http://example1.com",
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
//logger
let accessLogStream = fs.createWriteStream(path.join(__dirname, "logger.log"), {
  flags: "a",
});
//chalk
const chalk = require("chalk");
const log = chalk.bold.white.bgGreen;
const error = chalk.bold.white.bgRed;
//bcrypt
const bcrypt = require("bcrypt");
// siteRouter = require("./routers/siterouter"),
// scrapedRouter = require("./routers/scrapedrouter");
//joi
const Joi = require("joi");
//middelware
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use("/site", siteRouter);
// app.use("/scraped", scrapedRouter)
//joi
const joi = require("joi");
//morgan
const morgan = require("morgan");
app.use(morgan("tiny", { stream: accessLogStream }));

//import that we build
const User = require("./models/user");
const { addUser, getAllUsers, generateToken } = require("./controllers/users");
const { getAllVisitCard , getById} = require("./controllers/visitCard");

//all get req
app.get("/getALLUsers", cors(corsOptions), (req, res) => {
  getAllUsers()
    .then((user) => {
      console.log(log("get all user"));
      res.status(201).json(user);
    })
    .catch((err) => res.json(error(err)));
});
app.get("/user", auth, (req, res, next) => {
  if (auth) {
    res.send("hhhhh");
  }
});

app.get("/", (req, res) => {
  getAllVisitCard()
    .then((visitCard) => res.status(200).json(visitCard))
    .catch((err) => res.status(404).json(err));
});

app.get("/:id", (req, res) => {
  let id = req.params.id
  getById(id)
    .then((visitCard) => res.status(200).json(visitCard))
    .catch((err) => res.status(404).json(err));
});



//all post req
app.post("/user/register", (req, res) => {
  let { name, password, isVip, email } = req.body;
  const user = { name, password, isVip, email };
  addUser(user)
    .then((user) => {
      res.status(201).json({
        status: "Sucssces",
        data: user,
      });
    })
    .catch((err) => {
      console.log(chalk.magenta.bgRed.bold(err));
      res.status(401).json({
        status: "error!! check your inputs please",
        messege: err.keyValue,
      });
    });
});

app.post("/logIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateToken(user);
      res.status(200).json(token);
    } else
      res
        .status(400)
        .send("Invalid Credentials  !! Check your email and password please!!");
  } catch (err) {
    console.log(err);
  }
});

//connection
mongoose
  .connect("mongodb://0.0.0.0:27017/project-node")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
