const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const register = async(req,res) =>{
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All Fields are Required"});
        }

        //checking the user data is present or not
        const existing_user = await User.findOne({email});

        //if its present then we are going to give an error message
        if(existing_user){
            return res.status(400).json({message :"User Already Present in the DB"});
        }
        //lets do the encrption
        const encrypt_pass = await bcrypt.hash(password, 10);

        //creating new user if not present 
        const user = new User({name,email,password:encrypt_pass});

        //saving data to the db
        await user.save();

        res.status(200).json({message:"Registartion Sucessfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}


//login
const login = async(req,res)=>{
    try{
        //spread 
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Email and Password are Required"});
        }

        //data preste or not 
        const existing_user = await User.findOne({email});

        //if not present show error
         if(!existing_user){
            return res.status(400).json({message :"User Not Found"});
        }

        //comparing password
        const is_match = await bcrypt.compare(password, existing_user.password);

        //if not match giver error
        if(!is_match){
            return res.status(400).json({message :"Wrong Password"});
        }
        //token
        const token = jwt.sign({id:existing_user._id}, process.env.JWT_KEY, {expiresIn:"1h"});
        res.status(200).json({message:"login Sucessfully", token, user: {id:existing_user._id, name:existing_user.name, email:existing_user.email}});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {register, login};