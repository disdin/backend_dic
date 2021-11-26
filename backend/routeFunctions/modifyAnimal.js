import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";  //importing mongoose
import schema from '../schema.js';

//connecting to database

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function modifyAnimals(req, res){
    var animalID = req.body.Animalid;
    Animal.updateOne({_id:animalID},{
        $set: {
            Name: req.body.Name,
            HealthCondition: req.body.Healthcondition,
            Status: req.body.Status,
            otherInformation: req.body.Otherinformation
        }
    },
    function(err, result){
        if(err){
            res.status(400).send();
        }
        else{
            res.status(200).send();
            console.log("Successfully Updated");
        }
    });
}