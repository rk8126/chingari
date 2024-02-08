const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

module.exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.render("login", { errorMessage: "Unauthanticated" });
    const decoded = await verifyToken(token);
    const user = await userModel.findById(decoded?._id).lean()
    if(!user || user.isDeleted ){
      return res.render("login", { errorMessage: "User not found" });
    }
    req.user = decoded
    next();
  } catch (error) {
    console.log("Invalid token", error.message);
    return res.render("login", { errorMessage: "Invalid token" });
  }
};
