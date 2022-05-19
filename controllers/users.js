const User = require("../models/user");

function addUser(user) {
  return new Promise((resolve, reject) => {
    const newUser = new User(user);
    newUser
      .save()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
