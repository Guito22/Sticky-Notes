const mongoose = require('mongoose')
const {Schema} = mongoose

const listSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlenght: [40,"Name cannot be longer than 40 characters"]
    },
    notes:[{type:Schema.Types.ObjectId,ref:"note"}],

})

const List = mongoose.model("list",listSchema)

module.exports = List