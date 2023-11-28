const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
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

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;