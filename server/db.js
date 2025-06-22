import mongoose from "mongoose";
export const ConnDb = async () => {
    try {
        const db = await mongoose.connect("mongodb+srv://bhuvanchatti579:999999999@resolvenow.cp5zsxv.mongodb.net/");
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`);
    }
    catch (error) {
        console.log(`Error connecting db: ${error}`);
    }
};