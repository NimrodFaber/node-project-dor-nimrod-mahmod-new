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
  console.log("token beare is :" , token);
  // bearer token
  if (token.split(" ").length > 1) token = token.split(" ")[1];
  // const isTokenExpired = (token) =>
  //   Date.now() >=
  //   JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
  //     1000;
  // if (isTokenExpired) return res.status(401).send("Your token is expired !! log in to get new token please!!");
  try {
    const decoded = jwt.verify(token, "myKey");
    // const user = await User.findById(decoded.user_id);
    // req.user = user;
    req.user_id = decoded.user_id;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
