const asyncHandeler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//Here we perform validation for JWT. As it is valid for one min than it will perform operation.
//Firstly it will extract token from header,Authorization has this field 
//Secondaly we split the token as we add the word Bearer to indetify the token, 
//THirdly we are comparing the token with token generated using env file access token reference
//Also add callbackFun to check and handle the error. Provide error if it is not authorized 
const validateToekn = asyncHandeler(async(req,res,next)=>{
    let token 
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(404).json({msg: "USer is not authorized"});
                throw new Error("USer is not authorized")
            }
            req.user = decoded.userCreated;
            next();
        });
        if(!token){
            res.status(401).json({msg:"User is not Authorized"});
            throw new Error("User is not Authorized");
        }
    }
});

module.exports = validateToekn