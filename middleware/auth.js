const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const config = process.env;

const verifyToken = async (req, res, next) => {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  console.log("token beare is :", token);
  // bearer token
  if (token.split(" ").length > 1) token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "myKey");
    req.user_id = decoded.user_id;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
