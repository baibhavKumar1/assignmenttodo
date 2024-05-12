const {Schema, model} = require('mongoose');

const projectSchema = new Schema (
    {
        user:{ type: Schema.Types.ObjectId, ref: 'User' },
        title:String,
        createdAt:{
            type:Date,
            default:Date.now
        },
        todos:[{ type: Schema.Types.ObjectId, ref: 'Todo' }]
    },{ versionKey: false}
)

const ProjectModel = model('Project', projectSchema);

module.exports = ProjectModel