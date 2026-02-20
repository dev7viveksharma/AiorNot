import express from "express";
import {identifyUser} from '../Middleware/identifyuser.js'
import {textcontroller} from '../Controllers/Text.controller.js';
const router = express.Router();

router.get('/text', identifyUser ,  textcontroller);

export default router;