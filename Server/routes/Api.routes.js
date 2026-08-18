import express from "express";
import { VerifyToken } from "../Middleware/VerifyToken.js";
import {textcontroller} from '../Controllers/Text.controller.js';
import { productinfo } from "../Services/Productinfo.service.js";
import {imagecontroller} from "../Controllers/Image.controller.js";
import {videocontroller} from "../Controllers/Video.controller.js";
import { Music } from "../Controllers/Music.controller.js";
const router = express.Router();

router.post('/text', VerifyToken , productinfo ,  textcontroller);

router.post('/image' , VerifyToken , productinfo , imagecontroller);

router.post('/video' , VerifyToken , productinfo , videocontroller );

router.post('/music' , VerifyToken , productinfo , Music);

export default router;