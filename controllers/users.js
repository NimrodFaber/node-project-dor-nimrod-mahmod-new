const User = require("../models/user");
jwt = require("jsonwebtoken");
function addUser(user) {
  return new Promise(async (resolve, reject) => {
    const newUser = new User(user);
    const { error, value } = newUser.validateUserSchema().validate(user);
    if (error) reject(error);
    else {
      await newUser.hashPassword();
      newUser
        .save()
        .then((user) => resolve(user))
        .catch((err) => reject(err));
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
const generateToken = (user) => {
  return jwt.sign({ user_id: user._id, isVip: user.isVip }, "myKey", {
    expiresIn: "3m",
  });
};

// function validateUser(user) {
//   const isValid = newUser.validateUserSchema(user);
//   if (isValid.error) {
//   }
// }
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.generateToken = generateToken;
