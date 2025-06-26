import mongoose from "mongoose";

mongoose.connect("mongodb+srv://bhuvanchatti579:999999999@resolvenow.cp5zsxv.mongodb.net/")
.then(()=>{
   console.log("connected to mongodb")
})