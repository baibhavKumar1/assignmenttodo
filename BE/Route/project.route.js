const express = require('express');
const ProjectModel = require('../Model/project.model');
const TodoModel = require('../Model/todo.model');
const UserModel = require('../Model/user.model');
const auth = require('../Middleware/auth');
const ProjectRouter = express.Router();

ProjectRouter.use(auth)

ProjectRouter.get('/',async(req,res)=>{
    try{
        const project = await ProjectModel.find({user:req.body.userID});
        res.status(200).json({project})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
ProjectRouter.get('/:id',async(req,res)=>{
    try{
        const project = await ProjectModel.findById(req.params.id);
        res.status(200).json({project})
    }catch(err){
        res.status(400).json({message:err.message})
    } 
})
ProjectRouter.post('/',async(req,res)=>{
    const {title} = req.body;
    try{
        const project = await ProjectModel.findOne({title});
        if(project){ 
            res.status(400).json({message:'Project with same title exists already'})
        }
        else{
            const new_project = new ProjectModel({title,user:req.body.userID})
            await new_project.save()
            await UserModel.findByIdAndUpdate(req.body.userID,{ $push: { projects: new_project._id } }, { new: true });
            res.status(200).json({message:"New Project Created", new_project})
        }
    }catch(err){
        res.status(400).json({message:err.message}) 
    }
})
ProjectRouter.patch('/:id',async(req,res)=>{
    const {title} = req.body;
    try{
        const project = await ProjectModel.findById(req.params.id);
        if(!project){ 
            res.status(400).json({message:'Project not found'})
        }
        else{
            const updated_project = await ProjectModel.findByIdAndUpdate(req.params.id,{title},{new:true});
            res.status(200).json({message:"Project Updated", updated_project})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

ProjectRouter.delete('/:id',async(req,res)=>{
    try{
        const project = await ProjectModel.findById(req.params.id);
        await TodoModel.deleteMany({ _id: { $in: project.todos } });
        await ProjectModel.findByIdAndDelete(req.params.id);
        await UserModel.findByIdAndUpdate(req.body.userID,{ $pull: { projects: req.params.id } })
        res.status(200).json({message:"Project Deleted"})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = ProjectRouter