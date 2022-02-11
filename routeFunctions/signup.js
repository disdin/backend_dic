import mongoose from "mongoose";  //importing mongoose
import jwt from "jsonwebtoken";
import schema from '../schema.js';

import bcrypt from "bcrypt";
const saltRounds = 10;

const User = mongoose.model("User", schema.userSchema);

export default  function signup(req, res) {
    // console.log(req.body);
    var email = req.body.Username;
    
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(regex.test(email) == false){
        return res.status(401).send("Invalid email/username");
    }
    User.findOne({Username:req.body.Username}, function (err, foundUser) {
        if (!foundUser) {  //ensuring no duplicate entry or signup    
 
            var name = req.body.Name;
            var contact = req.body.Contact;
            var userName = req.body.Username;
            var password=req.body.Password;
            var hashedPass="";
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err)console.log(err);
                    else{
                        hashedPass=hash;
                    // console.log(hashedPass);
                    if (contact.length != 10) {
                        return res.status(401).send("<h1>Invaild Contact Number</h1><br>Contact number should be of 10 digits.");
                    }
                    var accessToken = issueToken(req, res);      
        
                    //creating new user document
                    const newUser = new User({
                        Name: name,
                        Contact: contact,
                        Username: userName,
                        Password: hashedPass,
                        AccessToken: accessToken
                    });
                   
                    var assignedID;
        
                    newUser.save(function (errors) {   //saving user data to database
                        if (!errors) {
                            //code to send data on successful registration
                            User.findOne({ Username: req.body.Username },async function (err, foundUser) {
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
                });
            });
           
        }
        else {
            res.status(401).send("<h2>Already registered. Please login.</h2>");
        }
        if(err)console.log(err);
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