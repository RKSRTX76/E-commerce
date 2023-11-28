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
    },   
    mob:{
        type:Number,
    },  
    password:{
        type:String,
        required:true,
    },
    
});

const Seller=mongoose.model("Seller",sellerSchema);
module.exports=Seller;