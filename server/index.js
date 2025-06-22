import express from "express";
import { ConnDb } from "./db.js";

ConnDb();

const app = express();
app.listen(8000, () => {
    console.log(`Node server running on port 8000`);
})