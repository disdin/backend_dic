import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./database/db.js";

import {router} from "./routes.js";
import saveAnimalLiveLocation from "./routeFunctions/saveAnimalLiveLocation.js"

import { Server } from "socket.io";
import http from "http";
dotenv.config();

const app = express();

const server = http.createServer(app);
let io = new Server(server);

app.use(bodyParser.json());
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory
app.use('/',router);


const port = process.env.PORT || 3000;





// import totalAnimals from "./routeFunctions/totalAnimals.js"
// import  verify  from './middleware.js';
// import allAnimalDetails from "./routeFunctions/allAnimalsDetails.js";

// import  signup   from "./routeFunctions/signup.js";
// import  signin  from "./routeFunctions/signin.js";
// import modifyAnimal from "./routeFunctions/modifyAnimal.js";
// import onlineAnimals from "./routeFunctions/onlineAnimals.js";
// import animalHealthDetails from "./routeFunctions/animalHealthDetails.js";
// import particularAnimalDetail from "./routeFunctions/particularAnimalDetail.js";
// import allAnimalsAvailable from "./routeFunctions/allAnimalsAvailable.js";
// import modifyGeoFence from "./routeFunctions/modifyGeoFence.js";

// app.post("/signup",signup); 
// app.post("/signin",signin);
// app.post("/totalAnimals",verify, totalAnimals);
// app.post("/allAnimalDetails",verify, allAnimalDetails);
// app.patch("/modifyAnimal",verify, modifyAnimal); 
// app.post("/onlineAnimals",verify, onlineAnimals);
// app.post("/animalHealthDetails",verify, animalHealthDetails);
// app.post("/particularAnimalDetail",verify, particularAnimalDetail); 
// app.post("/allAnimalsAvailable",verify, allAnimalsAvailable);
// app.patch("/modifyGeoFence",verify, modifyGeoFence);







const username=process.env.DB_USERNAME;
const password= process.env.DB_PASSWORD;
const url=`mongodb+srv://${username}:${password}@smartforestappcluster.hx2d5.mongodb.net/forestApp_DB?retryWrites=true&w=majority`;

Connection(process.env.MONGODB_URI||url);

const generateNextLocation=(obj)=>{
  return {
    Longitude:obj.Longitude+ 0.000001,
    Latitude:obj.Latitude+ 0.000001
  }
}

io.on("connection", (socket) => {
  var locationArray=[];
  socket.on("sendLiveLocation", (startData) => {
    // console.log(startData);
    const location=generateNextLocation({longitude:25.4,Latitude:78.22})
    let interval = setInterval(() => {
      location=generateNextLocation(location)
      locationArray.push(location);
      socket.emit("location",location)
    }, 1000);
    socket.on("stopLiveLocation",()=>{
      clearInterval(interval);
      saveAnimalLiveLocation(startData,locationArray);
    })
  });
});


server.listen(port, () => {
  console.log(`>> Server started successfully at port ${port}`);
});
