import express from "express";



import totalAnimals from "./routeFunctions/totalAnimals.js"
import  verify  from './middleware.js';
import allAnimalDetails from "./routeFunctions/allAnimalsDetails.js";

import  signup   from "./routeFunctions/signup.js";
import  signin  from "./routeFunctions/signin.js";
import modifyAnimal from "./routeFunctions/modifyAnimal.js";
import onlineAnimals from "./routeFunctions/onlineAnimals.js";
import animalHealthDetails from "./routeFunctions/animalHealthDetails.js";
import particularAnimalDetail from "./routeFunctions/particularAnimalDetail.js";
import allAnimalsAvailable from "./routeFunctions/allAnimalsAvailable.js";
import modifyGeoFence from "./routeFunctions/modifyGeoFence.js";
import animalLiveLocation from "./routeFunctions/animalLiveLocation.js"

const router=express.Router();


router.post("/signup",signup); 
router.post("/signin",signin);
router.get("/totalAnimals",verify, totalAnimals);
router.get("/allAnimalDetails",verify, allAnimalDetails);
router.patch("/modifyAnimal",verify, modifyAnimal); 
router.get("/onlineAnimals",verify, onlineAnimals);
router.get("/animalHealthDetails",verify, animalHealthDetails);
router.get("/particularAnimalDetail",verify, particularAnimalDetail); 
router.get("/allAnimalsAvailable",verify, allAnimalsAvailable);
router.patch("/modifyGeoFence",verify, modifyGeoFence);

router.get("/animalLiveLocation",animalLiveLocation);
export default router;