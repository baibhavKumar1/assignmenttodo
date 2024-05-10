const {Schema, model} = require('mongoose');

const projectSchema = new Schema (
    {
        title:String,
        createdAt:{
            type:Date,
            default:Date.now
        },
        todos:[{ type: Schema.Types.ObjectId, ref: 'Todo' }]
    },{ versionKey: false}
)

const ProjectModel = model('project', projectSchema);

module.exports = ProjectModel