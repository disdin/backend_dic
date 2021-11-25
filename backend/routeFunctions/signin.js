const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = require("../schema").userSchema;

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

exports.signin = function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      if (await user.matchPassword(password)) {
        res.send({ message: "Login Successfull", user: {} });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
};
