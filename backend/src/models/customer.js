const mongoose = require("../configuration/dbConfig");

const customerSchema= new mongoose.Schema({
    nama_customer:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
},)

module.exports = mongoose.model("Customer", customerSchema);