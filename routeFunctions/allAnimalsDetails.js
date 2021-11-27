import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";  //importing mongoose
import schema from '../schema.js';

//connecting to database

const Animal = mongoose.model("Animal", schema.animalSchema);

//API: To get brief details of all animals in database
export default  function allAnimalDetails(req, res) {
    var i, count;
    //counting no of animals as per database record
    Animal.count(function (err, totalAnimals) {
        count = totalAnimals;
    });

    var animalResponseData;
    //retrieving all data
    Animal.find({}, function (err, foundData) {

        if (!err) {

            //looping through all data as we get data in form of array
            for (i = 0; i < count; i++) {
                const animalData = {
                    AnimalID: foundData[i]._id,
                    Icon: foundData[i].Icon,
                    Name: foundData[i].Name,
                    HealthCondition: foundData[i].HealthCondition,
                    status: foundData[i].Status
                }
                //converting array element
                const jsonAnimalData = JSON.stringify(animalData);
                animalResponseData = animalResponseData + jsonAnimalData;

            }

            
            res.status(200).end(animalResponseData);

        } else {
            res.status(400).send();
        }
    });


}