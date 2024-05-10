const {Schema, model} = require('mongoose');

const userSchema = new Schema (
    {
        name:String,
        email:String,
        password:String,
        projects:[{ type: Schema.Types.ObjectId, ref: 'Project' }]
    },{ versionKey: false}
)

const UserModel = model('user',userSchema);

module.exports = UserModel