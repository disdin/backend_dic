var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var userSchema = new Schema({
    Userid : String,
    Name : String,
    Contact : Number,
    Username : String,
    Password : String,
    AccessToken : String
});

var animalSchema= new Schema({
    accessToken:String,
    Icon:String,
    Name:String,
    HealthCondition:String,
    Status:String,
    Location:{
        Latitude: Number,
        Longitude: Number
    }, 
    OtherInformation:String,
    FenceDetail:{
        Center: Number,
        Radius: Number
    }
});
var AllAnimals= new Schema({  // I guess We don't need this.
    TotalAnimals: Number,     //We can directly count using query
    HealthyAnimalsCount:Number,
    NormalHealthAnimalsCount:Number,
    CriticalHealthAnimalsCount:Number,
});



module.exports = {
    animalSchema,
    userSchema,
    AllAnimals
};
