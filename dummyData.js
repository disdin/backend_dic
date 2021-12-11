// import mongoose from "mongoose";  //importing mongoose
// import schema from './schema.js';

// const Location = mongoose.model("Location", schema.locationSchema);

// var latitude = 0;
// var longitude = 0;

// export default function location(req, res){

//     const newLocation = new Location({
//         animalID: "61a02a6bc718389cee0731cd",
//         Latitude: latitude + 0.000001,
//         Longitude: longitude + 0.000001,
//         dateTime: new Date()
//     });

//     newLocation.save(function(errors){
//         if(!errors){
//             console.log("Dummy Data Adding");
//         }
//         else{
//             console.log("Error occurred while adding dummy data: "+errors);
//         }
//     });
// };