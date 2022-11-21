const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    comment: {
        type : String,
        required : true
    },
},{
    timestamp :true
})
const taskSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required: true
    },
    notes: [ noteSchema ]
    },
{
    timestamps: true
}
);


var Tasks = mongoose.model('Task',taskSchema);

module.exports = Tasks;

