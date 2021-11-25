import mongoose from "mongoose";
var Schema = mongoose.Schema;

var userSchema = new Schema({
    Name: String,
    Contact: Number,
    Username: String,
    Password: String,
    AccessToken: String
});

var animalSchema = new Schema({
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

export default {
    animalSchema,
    userSchema
};
