var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    Name: String,
    Contact: Number,
    Username: String,
    Password: String,
    AccessToken: String
});

var animalSchema = new Schema({
    animalID: String,
    accessToken: String,
    Icon: String,
    Name: String,
    HealthCondition: String,
    Status: String,
    Location: {
        Latitude: Number,
        Longitude: Number
    },
    OtherInformation: String,
    FenceDetail: {
        Center: Number,
        Radius: Number
    }
});


var AllAnimals = new Schema({  
    TotalAnimals: Number,     
    HealthyAnimalsCount: Number,
    NormalHealthAnimalsCount: Number,
    CriticalHealthAnimalsCount: Number,
});



module.exports = {
    animalSchema,
    userSchema,
    AllAnimals
};
