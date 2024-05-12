const express = require('express');
const TodoModel = require('../Model/todo.model');
const ProjectModel = require('../Model/project.model');
const auth = require('../Middleware/auth');
const TodoRouter = express.Router();

// TodoRouter.use(auth)

TodoRouter.get('/:project_id',async(req,res)=>{
    const {project_id} = req.params;
    try{
        const project = await ProjectModel.findById(project_id).populate('todos');
        res.status(200).json({project})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

TodoRouter.post('/:project_id',async(req,res)=>{
    const {description} = req.body;
   const {project_id} = req.params
    try{
        const todo = new TodoModel(
            {description,project:project_id,createdAt:Date.now()}
        )
        await todo.save()
        const project = await ProjectModel.findByIdAndUpdate(project_id,{ $push: { todos: todo._id } }, { new: true });
        res.status(200).json({message:"Todo Created",project})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

TodoRouter.patch('/:id',async(req,res)=>{
    console.log(req.body);
    try{
        const updated_todo = await TodoModel.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        res.status(200).json({message:"Todo Updated",todo:updated_todo})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}) 

TodoRouter.delete('/:project_id/:id',async(req,res)=>{
    try{
        await TodoModel.findByIdAndDelete(req.params.id);
        await ProjectModel.findByIdAndUpdate(req.params.project_id,{ $pull: { todos: req.params.id } })
        res.status(200).json({message:"Todo deleted"})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = TodoRouter