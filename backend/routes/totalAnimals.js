
require('dotenv').config()
const mongoose = require("mongoose");  //importing mongoose
const schema = require('../schema');

//connecting to database
mongoose.connect("mongodb://localhost:27017/forestDB", { useNewUrlParser: true });
const Animal = mongoose.model("Animal", schema.animalSchema);

//function to count total number of animals
exports.totalAnimals = function(req, res){
    var totalAnimals;
    Animal.count(function(err, totalAnimals){
        if(!err){
            const totalAnimalsData = {
                TotalAnimalsCount:totalAnimals
            };
            const jsonContent = JSON.stringify(totalAnimalsData);
            res.end(jsonContent);
        }
        else{
            res.status(400).send();
        }
    });
}