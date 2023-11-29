const express=require("express");
const app=express();
const port=8080;
const mongoose = require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const Listing=require("./models/listing.js");
const Seller=require("./models/sellerInfo.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);   //boilerpalte use
app.use(express.static(path.join(__dirname,"/public")))   //static files use (Ex- style.css)

app.use((req, res, next) => {
    res.locals.loggedIn = false;
    next();
});



mongoose.connect('mongodb://127.0.0.1:27017/ishop');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});




// **************************************************************************
//index route
app.get("/",(req,res)=>{
    res.send("Root is working");
});
app.get("/home",async (req,res)=>{
    res.render("listings/index.ejs");
});
// User register
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
        // req.session.user = user; // Set the session here
        res.locals.loggedIn = true;
        res.render("listings/index.ejs",{user});
    } else {
        res.send('Access denied');
    }
});
// User Details
app.get("/home/:id",async(req,res)=>{
    const user=await Listing.findById(req.params.id);
    if(!user){
        return res.status(404).send("User not found");
    }
    res.render("listings/user-details.ejs",{user});
});
//Edit route
app.get("/home/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const user=await Listing.findById(id);
    res.render("listings/edit.ejs",{user});
});
//update route
app.put("/home/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing},{ new: true }); //pass updated values
    res.redirect(`/home/${id}`);  //show route
    console.log(listing);
});


// ***************************************
// seller route
app.get("/seller",async (req,res)=>{
    
    res.render("listings/seller.ejs");
});
// Seller register route
app.get("/seller-register",(req,res)=>{
    res.render("listings/seller-signup.ejs");
    // res.send("working");
});
app.post("/seller-register",async(req,res)=>{
    const { first, last, email, mob, product, password } = req.body;
    const seller = new Seller({ first, last, email, mob, product, password });
    await seller.save();
    res.redirect('/seller-login');
});
// Seller login route
app.get("/seller-login",(req,res)=>{
    res.render("listings/seller-login.ejs");
});
app.post("/seller-login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Seller.findOne({ email });
    if (!user) {
        return res.status(400).send('Cannot find user');
    }
    if (password === user.password) {
        // res.send('Success');
        // Mark as login true
        res.locals.loggedIn = true;
        res.render("listings/seller.ejs",{user});
    } else {
        res.send('Access denied');
    }
});
// Seller details
app.get("/seller/:id",async(req,res)=>{
    const user=await Seller.findById(req.params.id);
    if(!user){
        return res.status(404).send("Seller not found");
    }
    res.render("listings/seller-details.ejs",{user});
    console.log(user);
});
//Seller Edit route
app.get("/seller/:id/edit-seller",async (req,res)=>{
    let {id}=req.params;
    const user=await Seller.findById(id);
    if(!user){
        return res.status(404).send("Seller not found");
    }
    res.render("listings/edit-seller.ejs",{user});
    console.log(user);
});
//Seller update route
app.put("/seller/:id",async(req,res)=>{
    let {id}=req.params;
    const seller=await Seller.findByIdAndUpdate(id,{...req.body.seller},{ new: true }); //pass updated values
    res.redirect(`/seller/${id}`);  //show route
    console.log(seller);
});
// ****************************


app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
});