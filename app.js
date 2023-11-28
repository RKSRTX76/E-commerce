const express=require("express");
const app=express();
const port=8080;
const mongoose = require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const Listing=require("./models/listing.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);   //boilerpalte use
app.use(express.static(path.join(__dirname,"/public")))   //static files use (Ex- style.css)


mongoose.connect('mongodb://127.0.0.1:27017/ishop');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});




// **************************************************************************
//index route
app.get("/",async (req,res)=>{
    res.render("listings/index.ejs");
});
// Register
app.get("/register",(req,res)=>{
    res.render("listings/signup.ejs");
});

app.post("/register",async(req,res)=>{
    const { first, last, email, mob, password } = req.body;
    const listing = new Listing({ first, last, email, mob, password });
    await listing.save();
    res.redirect('/login');
});

// Login
app.get("/login",(req,res)=>{
    res.render("listings/login.ejs");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Listing.findOne({ email });
    if (!user) {
        return res.status(400).send('Cannot find user');
    }
    if (password === user.password) {
        // res.send('Success');
        res.redirect("/");
    } else {
        res.send('Access denied');
    }
});



// ***************************************
// seller route
app.get("/seller",async (req,res)=>{
    res.render("listings/seller.ejs");
});
// Seller register route
app.get("/seller-register",(req,res)=>{
    res.render("listings/seller-signup.ejs",{ isAuthenticated: req.isAuthenticated() });
    // res.send("working");
});
app.post("/seller-register",async(req,res)=>{
    const { first, last, email, mob, password } = req.body;
    const listing = new Listing({ first, last, email, mob, password });
    await listing.save();
    res.redirect('/seller-login');
});
// Seller login route
app.get("/seller-login",(req,res)=>{
    res.render("listings/seller-login.ejs");
});
app.post("/seller-login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Listing.findOne({ email });
    if (!user) {
        return res.status(400).send('Cannot find user');
    }
    if (password === user.password) {
        // res.send('Success');
        res.redirect("/seller");
    } else {
        res.send('Access denied');
    }
});

// ****************************


app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
});