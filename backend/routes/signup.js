
require('dotenv').config()
const mongoose = require("mongoose");  //importing mongoose
const jwt = require("jsonwebtoken");
const schema = require('../schema');

//connecting to database
mongoose.connect("mongodb://localhost:27017/forestDB", { useNewUrlParser: true });
const User = mongoose.model("User", schema.userSchema);

exports.signup = function (req, res) {
    User.findOne({ Username: req.body.Username }, function (err, foundUser) {
        if (!foundUser) {  //ensuring no duplicate entry or signup    

            var name = req.body.Name;
            var contact = req.body.Contact;
            var userName = req.body.Username;
            if (contact.length != 10) {
                return res.status(401).send("<h1>Invaild Contact Number</h1><br>Contact number should be of 10 digits.");
            }
            var accessToken = issueToken(req, res);

            //creating new user document
            const newUser = new User({
                Name: name,
                Contact: contact,
                Username: userName,
                Password: req.body.Password,
                AccessToken: accessToken
            });

            var assignedID;

            newUser.save(function (errors) {   //saving user data to database
                if (!errors) {
                    //code to send data on successful registration
                    User.findOne({ Username: req.body.Username }, function (err, foundUser) {
                        if (foundUser) {
                            assignedID = foundUser._id.toString();
                            const responseData = {
                                Userid: assignedID,
                                Name: name,
                                Contact: contact,
                                Username: userName,
                                Accesstoken: accessToken
                            };

                            const jsonContent = JSON.stringify(responseData);
                            res.end(jsonContent);

                        } else {
                            res.status(404).send("User not found. Please sign in again.");
                        }
                    })


                } else {
                    res.status(401).send("<h2>Registration failed</h2>");
                }
            });
        }
        else {
            res.status(200).send("<h2>Already registered. Please login.</h2>");
        }
    })

}

function issueToken(req, res) {

    var assignedID;

    let payload = {
        Userid: assignedID,
        Name: req.body.Username,
        Contact: req.body.ContactNumber,
        Username: req.body.Username
    };

    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });

    return accessToken;


}