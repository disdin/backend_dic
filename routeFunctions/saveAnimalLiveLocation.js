import mongoose from "mongoose"; //importing mongoose
import schema from "../schema.js";

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function saveAnimalLiveLocation(id,toSaveLocationArray) {
  Animal.find({ _id: id }, function (err, foundAnimal) {
    if (!err) {
      var locationArray=foundAnimal[0].Location;
      locationArray.push(toSaveLocationArray);

      Animal.updateOne(
        { _id: id},
        {
          $set: {
            Location:locationArray
          },
        },
        function (err, result) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send();
            console.log("Successfully Updated");
          }
        }
      );

      // const AnimalData = {
      //   Icon: foundAnimal[0].Icon,
      //   FenceDetail: foundAnimal[0].FenceDetail,
      //   Location: foundAnimal[0].Location,
      // };
      // const jsonAnimalData = JSON.stringify(AnimalData);
      // res.status(200).send(jsonAnimalData);
    } else {
      // res.status(400).send(err);
      console.log(err);
    }
  });
}
