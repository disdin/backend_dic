import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import rateLimit from "express-rate-limit";

import {router} from "./routes.js";
import saveAnimalLiveLocation from "./routeFunctions/saveAnimalLiveLocation.js"

import { Server } from "socket.io";
import http from "http";
dotenv.config();

const app = express();

const server = http.createServer(app);
let io = new Server(server);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(bodyParser.json({limit: '25mb'}));
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory
app.use(limiter);
app.use('/',router);

const port = process.env.PORT || 3000;

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
