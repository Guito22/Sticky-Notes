const mongoose = require('mongoose')
const {Schema} = mongoose

const noteSchema = new Schema({

    content:{
        type:String,
        required:true,   
    },
    color:{
        type: String,
        required:true,
    },
    important:{
        type:Boolean,
        required:true
    },
    creationDate:{
        type:Date,
        required:true
    },
    editionDate:{
        type:Date,
        
    }
})

const Note = mongoose.model("note",userSchema)

module.exports = Note