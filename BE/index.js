const express = require('express');
const { connect } = require('./db');
const UserRouter = require('./Route/user.route');
const app = express();
const cors = require('cors');
const TodoRouter = require('./Route/todo.route');
const ProjectRouter = require('./Route/project.route');

app.use(cors());
app.use(express.json());

app.use('/user',UserRouter)
app.use('/todo',TodoRouter)
app.use('/project',ProjectRouter)

app.get('/',async(req,res)=>{
    res.status(200).send('hi')
})

app.listen(3000, async () => {
    try {
        await connect;
        console.log("connected");
    } catch (err) {
        console.log(err.message);
    }
    console.log("running");
})