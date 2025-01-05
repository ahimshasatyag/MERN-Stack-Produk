const mongoose = require("../configuration/dbConfig");

const produkSchema= new mongoose.Schema({
    nama_produk:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    harga:{
        type:Number,
        required:true
    }
},)

module.exports = mongoose.model("Produk", produkSchema);