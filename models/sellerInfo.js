const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const sellerSchema=new Schema({
    first:{
        type:String,
        required:true,
    },  
    last:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },   
    mob:{
        type:Number,
        required:true,
        unique: true,
    },
    product:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
});

const Seller=mongoose.model("Seller",sellerSchema);
module.exports=Seller;