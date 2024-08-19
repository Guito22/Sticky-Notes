const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlenght: [40,"Name cannot be longer than 40 characters"]
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    noteLists:[{type:Schema.Types.ObjectId,ref:"list"}],
    theme:{
        type:String,
        enum:["light","dark"]
    }
})

const User = mongoose.model("user",userSchema)

module.exports = User