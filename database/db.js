import mongoose from "mongoose";

const Connection= async(url)=>{
    try{
        await mongoose.connect(url);
        console.log("DB connected");
    }
    catch(err){
        console.log("Error: ", err.message);
    }
}
export default Connection;