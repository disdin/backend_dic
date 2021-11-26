import mongoose from "mongoose"; //importing mongoose
import schema from "../schema.js";

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function particularAnimalDetail(req, res) {
  var foundAnimal
    Animal.find({ _id: req.body.animalId }, function (err, foundAnimal) {
    if (!err) {
      const AnimalData = {
        AnimalID: foundAnimal[0]._id,
        Icon: foundAnimal[0].Icon,
        Name: foundAnimal[0].Name,
        HealthCondition: foundAnimal[0].HealthCondition,
        Status: foundAnimal[0].Status,
        Location: foundAnimal[0].Location,
        OtherInformation: foundAnimal[0].OtherInformation,
      };
      //converting array element
      console.log(AnimalData);
      const jsonAnimalData = JSON.stringify(AnimalData);
      res.status(200).send(jsonAnimalData);
    } else {
      res.status(400).send(err);
    }
  });
}
