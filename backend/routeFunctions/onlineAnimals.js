import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";  //importing mongoose
import schema from '../schema.js';

//connecting to database

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function onlineAnimals(req, res){
    var i, count;
    Animal.count({Status: "online"},function (err, totalOnlineAnimals) {
        count = totalOnlineAnimals;
    });

    var onlineAnimalResponseData;
    Animal.find({Status: "online"}, function(err, foundOnlineAnimals){
        if(!err){
            for(i=0;i<count;i++){
                const onlineAnimalData = {
                    AnimalID: foundOnlineAnimals[i]._id,
                    Icon: foundOnlineAnimals[i].Icon,
                    Name: foundOnlineAnimals[i].Name
                }
                //converting array element
                const jsonOnlineAnimalData = JSON.stringify(onlineAnimalData);
                onlineAnimalResponseData = onlineAnimalResponseData + jsonOnlineAnimalData;
            }
            console.log(onlineAnimalResponseData);
            res.status(200).end(onlineAnimalResponseData);
        }
        else{
            res.status(400).send();
        }
    });
}