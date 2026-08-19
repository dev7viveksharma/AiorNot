import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import  './Cron/cron.reset.js';
import './Cron/cron.news.js';
import { db } from "./database/sql.db.js";
import Api from "./routes/Api.routes.js";
import user from "./routes/User.routes.js";
import File from "./routes/File.routes.js";
import report from "./routes/report.routes.js";
import { MongoClient , ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());



(async () => {
  try {
    const connection = await db.getConnection();
    console.log("DB Connected");
    connection.release();
  } catch (err) {
    console.log("DB Connection Failed:", err);
  }
})();

//change to srv version before production
const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
async function connectMongo() {
  try {
    await mongoose.connect(uri, {
      autoIndex: false, // production optimization
    });

    console.log("MongoDB connected");
    console.log("STATE:", mongoose.connection.readyState); // should be 1
    console.log("DB NAME:", mongoose.connection.name);

  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

await connectMongo();

app.use("/api", Api);
app.use('/auth',user);
app.use("/File",File);
app.use("/report",report);


app.listen(port , (req , res)=>{
    console.log("backend is running on " + port);
});
