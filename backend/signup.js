
require('dotenv').config()
const mongoose = require("mongoose");  //importing mongoose
const jwt = require("jsonwebtoken");
const schema = require('./schema');

//connecting to database
mongoose.connect("mongodb://localhost:27017/forestDB", { useNewUrlParser: true });
const User = mongoose.model("User", schema.userSchema);

exports.signup = function (req, res) {
    User.findOne({ Username: req.body.Username }, function (err, foundUser) {
        if (!foundUser) {  //ensuring no duplicate entry or signup    

            //creating userid
            //userid= first 4 char of name + last 4 digits of contact number
             var name = req.body.Name;
             var contact = req.body.Contact;
             var assignedID = name.slice(0, 4) + contact.slice(6, 10);   

             var accessToken = issueToken(req, res);     
   
            //creating new user document
            const newUser = new User({
                Userid: assignedID,
                Name: req.body.Name,
                Contact: req.body.ContactNumber,
                Username: req.body.Username,
                Password: req.body.Password,
                AccessToken: accessToken
            });

            const responseData = {
                Userid: assignedID,
                Name: name,
                Contact: contact,
                Username: req.body.Username,
                Accesstoken: accessToken 
            };


            newUser.save(function (errors) {   //saving user data to database
                if (!errors) {

                    //code to send data on successful registration
                    const jsonContent = JSON.stringify(responseData);
                    res.end(jsonContent);
                    
                } else {
                    res.send("<h2>Registration failed</h2>");
                }
            });
        }
        else {
            res.send("<h2>Already registered. Please login.</h2>");
        }
    })

}

function issueToken(req, res){
     
     var assignedID;

    let payload = {
        Userid : assignedID,
        Name : req.body.Username,
        Contact : req.body.ContactNumber,
        Username : req.body.Username
    };

    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });

    return accessToken;


}