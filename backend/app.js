import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./database/db.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory

const port=3000;

import totalAnimals from "./routeFunctions/totalAnimals.js"
import  verify  from './middleware.js';
import allAnimalDetails from "./routeFunctions/allAnimalsDetails.js";

import  signup   from "./routeFunctions/signup.js";
import  signin  from "./routeFunctions/signin.js";
import modifyAnimal from "./routeFunctions/modifyAnimal.js";
import onlineAnimals from "./routeFunctions/onlineAnimals.js";

app.post("/signup", signup);
app.post("/signin", signin);
app.get("/totalAnimals", totalAnimals);
app.get("/allAnimalDetails",verify, allAnimalDetails);
app.patch("/modifyAnimal",verify, modifyAnimal);
app.get("/onlineAnimals", onlineAnimals);

const username=process.env.DB_USERNAME;
const password= process.env.DB_PASSWORD;
Connection(username,password);

app.listen(port,  ()=> {
  console.log(`>> Server started successfully at port ${port}`);
});
