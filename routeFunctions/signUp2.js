import mongoose from "mongoose";  //importing mongoose
import jwt from "jsonwebtoken";
import schema from '../schema.js';

const User = mongoose.model("User", schema.userSchema);

export const userSignup= async(req,res)=>{
    try{
        const exists=await User.findOne({Username:req.body.Username});
        if(exists){
            return res.status(401).json('Username already exists');
        }
        var accessToken = issueToken(req, res); 

        const user =req.body;
        const newUser=new User(user);
        newUser+={AccessToken: accessToken}

        await newUser.save();

        const DBuser=await User.findOne({Username:req.body.Username});
        console.log(DBuser);
        res.status(200).json(DBuser);
    }catch(err){
        console.log("Error: ",err.message);
    }
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