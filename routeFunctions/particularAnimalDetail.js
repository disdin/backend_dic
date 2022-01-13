import mongoose from "mongoose"; //importing mongoose
import schema from "../schema.js";


const Animal = mongoose.model("Animal", schema.animalSchema);

export default function particularAnimalDetail(req, res) {
  //var foundAnimal;
    Animal.findById({ _id: req.body.animalid}, function (err, foundAnimal) {
    if (!err) {
      // console.log(foundAnimal);
      const AnimalData = {
        AnimalID: foundAnimal._id,
        Icon: foundAnimal.Icon,
        Name: foundAnimal.Name,
        HealthCondition: foundAnimal.HealthCondition,
        Status: foundAnimal.Status,
        Location: foundAnimal.Location,
        OtherInformation: foundAnimal.OtherInformation,
      };
      //converting array element
      //console.log(AnimalData);
      const jsonAnimalData = JSON.stringify(AnimalData);
      res.status(200).send(jsonAnimalData);
    } else {
      res.status(400).send(err);
    }
  });
}
