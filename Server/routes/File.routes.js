import express from "express";
import { VerifyToken } from "../Middleware/VerifyToken.js";
import { imagefetch , fetchmedia , videofetch } from "../Controllers/File.controller.js";
import { News } from "../Controllers/News.controller.js";
import { fetchUsecount } from "../Controllers/UsageCount.controller.js"; 
const router = express.Router();

router.get("/getimage", VerifyToken , imagefetch);

router.get("/getvideo" , VerifyToken , videofetch );

router.get("/fetchmedia" , VerifyToken , fetchmedia);

router.get("/UsageCount" , fetchUsecount);

router.get("/news" , News);

export default router;