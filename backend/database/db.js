import mongoose from "mongoose";

const Connection= async(username,password)=>{
    const uri=`mongodb+srv://${username}:${password}@cluster0.in5fm.mongodb.net/forestApp_DB?retryWrites=true&w=majority`
    try{
        await mongoose.connect(uri);
        console.log("DB connected");
    }
    catch(err){
        console.log("Error: ", err.message);
    }
}
export default Connection;