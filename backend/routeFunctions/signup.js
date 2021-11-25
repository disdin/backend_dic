import dotenv from 'dotenv'; 
dotenv.config();
import mongoose from "mongoose";  //importing mongoose
import jwt from "jsonwebtoken";
import schema from '../schema.js';
import bcrypt from "bcryptjs"

const User = mongoose.model("User", schema.userSchema);

// schema.userSchema.pre("save",async function(next){
//     // if(!this.isModified("Password")){
//     //     next();
//     // }
//     console.log(this);
//     const salt= await bcrypt.genSalt(10);
//     this.Password=await bcrypt.hash(this.Password,salt);
// })



export default  function signup(req, res) {
    User.findOne({Username:req.body.Username}, async function (err, foundUser) {
        if (!foundUser) {  //ensuring no duplicate entry or signup    
 
            var name = req.body.Name;
            var contact = req.body.Contact;
            var userName = req.body.Username;
            var password=req.body.Password;
            if (contact.length != 10) {
                return res.status(401).send("<h1>Invaild Contact Number</h1><br>Contact number should be of 10 digits.");
            }
            var accessToken = issueToken(req, res);
            // var newPassword;
            // await bcrypt.genSalt(10, async function (err, salt) {
            //     await bcrypt.hash(password, salt, function (err, hash) {
            //     //   console.log(hash);
            //         newPassword=hash;  
            //     });
            //   });
            

            //creating new user document
            const newUser = new User({
                Name: name,
                Contact: contact,
                Username: userName,
                Password: password,
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