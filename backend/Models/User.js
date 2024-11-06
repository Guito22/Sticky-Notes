const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlenght: [20,"Name cannot be longer than 20 characters"]
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    theme:{
        type:String,
        enum:["light","dark"]
    },
    color:{
        type:String,
        enum:["turquoise","goldenrod","salmon","pink","green","purple"]
    },
    boards:[{type:Schema.Types.ObjectId,ref:"Board",required:true}]
})

const User = mongoose.model("User",userSchema)

module.exports = User