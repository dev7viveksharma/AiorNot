import express from "express";
import { VerifyToken } from "../Middleware/VerifyToken.js";
import { imagefetch } from "../Controllers/File.controller.js";


const router = express.Router();

router.get("/getimage", VerifyToken , imagefetch);

export default router;