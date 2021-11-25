require("dotenv").config(); //loads environment variables from .env file

//modules
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory
const uri = process.env.uri;

//connecting to database
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected");
  }
);

const { signup } = require("./routeFunctions/signup");
const { signin } = require("./routeFunctions/signin");

app.post("/signup", signup);
app.post("/signin", signin);

app.listen(3000, function () {
  console.log(">> Server started successfully at port 3000");
});
