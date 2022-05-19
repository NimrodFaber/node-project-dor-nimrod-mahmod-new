const User = require("../models/user");

function addUser(user) {
  return new Promise((resolve, reject) => {
    const newUser = new User(user);
    const { error, value } = newUser.validateUserSchema().validate(newUser);

    if (error) {
      reject(error);
    } else {
      newUser.save().then((user) => resolve(user));
    }
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.find()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

// function validateUser(user) {
//   const isValid = newUser.validateUserSchema(user);
//   if (isValid.error) {
//   }
// }
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
