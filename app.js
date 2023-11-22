const express=require("express");
const app=express();
const port=8080;
const mongoose = require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);   //boilerpalte use
app.use(express.static(path.join(__dirname,"/public")))   //static files use (Ex- style.css)

// app.get("/",(req,res)=>{
//     res.send("Root page");
// });


//index route
app.get("/",async (req,res)=>{
    res.render("listings/index.ejs");
});


app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
});