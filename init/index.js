const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const initSellerData=require("./sellerData.js");
const Seller=require("../models/sellerInfo.js");


main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ishop');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB=async()=>{
    //clear prev data
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    await Seller.deleteMany({});
    await Seller.insertMany(initSellerData.data);
    console.log("Data was initialized");
};
initDB();