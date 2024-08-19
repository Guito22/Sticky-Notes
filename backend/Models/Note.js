const mongoose = require('mongoose')
const {Schema} = mongoose

const noteSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxlenght: [40,"Title cannot be longer than 40 characters"]
    },
    content:{
        type:String,
        required:true,   
    },
    color:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const Note = mongoose.model("note",userSchema)

module.exports = Note