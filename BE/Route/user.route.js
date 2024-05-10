const express = require('express');
const UserModel = require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRouter = express.Router();

UserRouter.get('/',async(req,res)=>{
    try{
        const users = await UserModel.find();
        res.status(200).json({users})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})
UserRouter.post('/register', async(req,res)=>{
    const {name,email,password}= req.body;
    try{
        const user_exist = await UserModel.findOne({email});
        console.log(name,email,password);
        if(user_exist){
            return res.status(400).send("User already exist");
        }
        bcrypt.hash(password,3,async(err,hash)=>{
            if(err){
                return res.status(400).send(err.message);
            }
            const user= new UserModel({
                name,email,password:hash
            });
            await user.save();
            const token = jwt.sign({userID:user._id,userEmail:email,userPass:password},"token");
            res.status(200).json({message:"User Registered",token,name:user.name});
        })
    }catch(err){
        return res.status(400).send(err.message)
    }
})
UserRouter.post("/login",async(req,res)=>{ 
    const {email,password} =req.body;
    try{
        const user =await UserModel.findOne({email});
        if (user){
            bcrypt.compare(password,user.password,(err, decoded) => {
                if(decoded){
                    const token = jwt.sign({userID:user._id,userEmail:email,userPass:password},"token");
                    res.status(200).json({message:"User Logged In",token,name:user.name});
                }else{
                    res.status(400).send("Wrong credentials");
                }
            });
        }else{
            res.status(400).send("User does not exist");
        }
    }catch(err){
        res.status(400).send("User is not found");
    }
});

module.exports = UserRouter