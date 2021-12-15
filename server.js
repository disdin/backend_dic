import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./database/db.js";

import router from "./routes.js";
import saveAnimalLiveLocation from "./routeFunctions/saveAnimalLiveLocation"

import { Server } from "socket.io";
import http from "http";
dotenv.config();

const app = express();

let server = http.createServer(app);
let io = new Server(server);

app.use("/", router);

app.use(bodyParser.json());
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory

const port = process.env.PORT || 3000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://${username}:${password}@smartforestappcluster.hx2d5.mongodb.net/forestApp_DB?retryWrites=true&w=majority`;
Connection(process.env.MONGODB_URI || url);

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
