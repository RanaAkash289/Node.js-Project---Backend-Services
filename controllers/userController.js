const asyncHandeler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
//@desc post register user
//@route post api/userRoute/register
//@access public

const registerUser = asyncHandeler(async(req,res)=>{
    const {username, email, password}= req.body;
    if(!username || !email || !password){
        res.status(400).json({
            Message: "Please Enter All detailes"
        })
        return;
    };

    //findOne method find a object with given value from data
    const userAvailabe = await user.findOne({email});
    if(userAvailabe){
        res.status(400).json({
            message: "User Already Exist"
        });
        throw new Error("User Already Exist");
    }
    else{
        //hashing is way to secure the password. here we encrypt the password using bcrypt.hash, and then we send it to the data.
        const hashedpassword = await bcrypt.hash(password, 10);
        console.log(hashedpassword , "hashed password");
        const userCreated = await user.create({
            username, email, password: hashedpassword
        });
        if(await userCreated){
            res.status(201).json({_id: userCreated.id, email: userCreated.email})
        }else{
            res.status(400);
            throw new Error("User Data not valid");
        }
    }
    res.json({message:"Register Successfully"})
});

//@desc post login user
//@route GET api/userRoute/login
//@access public

const loginUser = asyncHandeler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email|| !password){
        res.status(400).json({
            msg: "All field are mandatory"
        });
        throw new Error("All field are mandatory");
    };

    //First we find the user and if we find it then we compare their password using bcrypt.compare.
    //Later on we add access token secret key, so basically it used when we have to allow user to certain activities at given time,\
    //Here we provide token and it will be expired in 1 min
    const userCreated = await user.findOne({email});
    if(userCreated && (await bcrypt.compare(password, userCreated.password))){
        const accessToken =jwt.sign({
            userCreated: {
                username: userCreated.username,
                email:  userCreated.email,
                id:  userCreated.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401).json({msg:"Email or Password not valid"});
        throw new Error("Email or Password not valid")
    }
});

//@desc post current user info
//@route GET /api/userRoute/current
//@access private

const currentUser = asyncHandeler(async(req,res)=>{
    res.json(req.user)
});



module.exports = {registerUser, loginUser, currentUser};