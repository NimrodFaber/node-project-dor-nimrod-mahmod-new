const auth = require("../middleware/auth");
const User = require("../models/user");
//cors
const cors = require("cors");
let corsOptions = {
  origin: "http://example1.com",
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const {
  addUser,
  getAllUsers,
  generateToken,
  getUserById,
} = require("../controllers/users");
const express = require("express");
const router = express.Router();
//chalk
const chalk = require("chalk");
const log = chalk.bold.white.bgGreen;
const error = chalk.bold.white.bgRed;

//bcrypt
const bcrypt = require("bcrypt");

router.get("/getAllUsers", cors(corsOptions), (req, res) => {
  getAllUsers()
    .then((user) => {
      console.log(log("get all user"));
      res.status(201).json(user);
    })
    .catch((err) => res.json(error(err)));
});

router.get("/getUserById", auth, (req, res) => {
  let id = req.user_id;
  getUserById(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(404).json(err));
});

router.post("/register", (req, res) => {
  let { name, password, isVip, email, cards } = req.body;
  const user = { name, password, isVip, email, cards };
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

router.post("/login", async (req, res) => {
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
module.exports = router;
