const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name : {type:String, required:true},

    email : {type:String, required:true},

    password : {type:String, required:true},

    active : {type:Boolean, default:false},

    otp  : {type:String },

    verifyotp : {type:Boolean, default:false}

})
const user = mongoose.model("user" , userSchema)
module.exports = user;