
const jwt = require('jsonwebtoken'); //jsonwebtoken module


//function to authenticate incoming request from client
exports.verify = function (req, res, next) {
    
    //retrieving access token from header
     let accessToken = req.headers.accesstoken;

     if (!accessToken) {
         return res.status(403).send("<h1>Unauthorized Access!</h1><h2>Access token not found</h2>");
     }

     let payload;
     //verifying access token 
     try {
         payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
         next(); //middleware function
     }
     catch (e) {
         //catching error
         if(e.name == "TokenExpiredError"){
             res.status(401).send("Access Token Expired");
         } else {
             res.status(403).send("Error. Unauthorized access")
         }
        
     }
}
