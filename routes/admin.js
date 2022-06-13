const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const User = require("../models/user");

const { setUserIsAdmin } = require("../controllers/users");
const express = require("express");
const router = express.Router();
//chalk
const chalk = require("chalk");
const log = chalk.bold.green.bgGreen;
const error = chalk.bold.red.bgRed;

router.put("/setAdmin/:id", auth, isAdmin, (req, res) => {
  let _id = req.params.id;
  setUserIsAdmin(_id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
