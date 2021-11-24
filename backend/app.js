
require('dotenv').config(); //loads environment variables from .env file

//modules
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs'); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory

const {signup} = require("./signup");


app.post("/signup", signup);




app.listen(3000, function () {
    console.log(">> Server started successfully at port 3000");
});
