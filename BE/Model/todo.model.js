const {Schema, model} = require('mongoose');

const todoSchema = new Schema (
    {
        description:String,
        project:{ type: Schema.Types.ObjectId, ref: 'Project' },
        status:{
            type:String,
            enum:["completed","pending"],
            default:"pending"
        },
        createdAt:{
            type:Date
        },
        updatedAt:{
            type:Date,
            default:Date.now
        }
    },{ versionKey: false}
)

const TodoModel = model('Todo', todoSchema);

module.exports = TodoModel