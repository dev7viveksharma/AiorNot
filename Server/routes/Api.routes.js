import express from "express";
import { VerifyToken } from "../Middleware/VerifyToken.js";
import {textcontroller} from '../Controllers/Text.controller.js';
import { productinfo } from "../Services/Productinfo.service.js";
import {imagecontroller} from "../Controllers/Image.controller.js";
const router = express.Router();

router.post('/text', VerifyToken , productinfo ,  textcontroller);

router.post('/image' , VerifyToken , productinfo , imagecontroller);


export default router;