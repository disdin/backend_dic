var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var animalSchema= new Schema({
    accessToken:String,
    Icon:String,
    Name:String,
    HealthCondition:String,
    Status:String,
    Location:{Number,Number}, 
    OtherInformation:String,
    FenceDetail:{Number,Number}
})
var AllAnimals= new Schema({
    TotalAnimals: Number,
    HealthyAnimalsCount:Number,
    NormalHealthAnimalsCount:Number,
    CriticalHealthAnimalsCount:Number,
})
module.exports = {
    animalSchema,
    AllAnimals
};
