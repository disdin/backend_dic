import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./database/db.js";

import router from "./routes.js"

import {Server} from "socket.io";
import http from "http";
dotenv.config();

const app = express();

let server=http.createServer(app);
let io=new Server(server);

app.use("/",router);

app.use(bodyParser.json());
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory

const port=process.env.PORT||3000;

const username=process.env.DB_USERNAME;
const password= process.env.DB_PASSWORD;
const url=`mongodb+srv://${username}:${password}@smartforestappcluster.hx2d5.mongodb.net/forestApp_DB?retryWrites=true&w=majority`;
Connection(process.env.MONGODB_URI||url);


io.on("connection", socket => {
  socket.on("message", (data) => {
    console.log(data);
  });
});


server.listen(port,  ()=> {
  console.log(`>> Server started successfully at port ${port}`);
});
