import mongoose from "mongoose"; //importing mongoose
import schema from "../schema.js";

const Animal = mongoose.model("Animal", schema.animalSchema);

const generateNextLocation=(obj)=>{
  return {
    Longitude:obj.Longitude+ 0.000001,
    Latitude:obj.Latitude+ 0.000001
  }
}


export default function animalLiveLocation(req, res) {
  Animal.find({ _id: req.headers.animalid }, function (err, foundAnimal) {
    if (!err) {
      var locationArray=foundAnimal[0].Location;

      //here we will call setInterval that will call generateNextLocation as long as this api is in active stage
      var nextLocation=generateNextLocation(locationArray[locationArray.length-1])
      locationArray.push(nextLocation);

      Animal.updateOne(
        { _id: req.headers.animalid},
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

      const AnimalData = {
        Icon: foundAnimal[0].Icon,
        FenceDetail: foundAnimal[0].FenceDetail,
        Location: foundAnimal[0].Location,
      };
      const jsonAnimalData = JSON.stringify(AnimalData);
      res.status(200).send(jsonAnimalData);
    } else {
      res.status(400).send(err);
    }
  });
}
