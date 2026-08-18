import express from "express";
import { VerifyToken } from "../Middleware/VerifyToken.js";
import { SendMessage , SendReport } from "../Controllers/Report.controller.js";
const router = express();

router.post("/ContactMessage" , VerifyToken , SendMessage);

router.post("/ReportBug", VerifyToken , SendReport);

export default router;