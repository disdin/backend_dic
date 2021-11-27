import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import schema from "../schema.js";

// schema.userschema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model("User", schema.userSchema);

function signin (req, res) {
  const { Username, Password } = req.body;
  User.findOne({ Username: Username }, async (err, user) => {
    if (user) {
      if (Password===user.Password) {
        res.send({ 
          message: "Login Successfull",
          Userid:user.Userid,
          Name:user.Name,
          Contact:user.Contact,
          Username:user.Username,
          AccessToken:user.AccessToken
        });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
};
export default signin;
