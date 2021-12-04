import mongoose from "mongoose";  //importing mongoose
// import jwt from "jsonwebtoken";
import schema from '../schema.js';

const User = mongoose.model("User", schema.userSchema);

export const userSignup= async(req,res)=>{
    try{
        const exists=await User.findOne({Username:req.body.username});
        if(exists){
            return res.status(401).json('Username already exists');
        }
        const user =req.body;
        const newUser=new User(user);
        await newUser.save();

        const DBuser=await User.findOne({Username:req.body.username});
        console.log(DBuser);
        res.status(200).json(DBuser);
    }catch(err){
        console.log("Error: ",err.message);
    }
}