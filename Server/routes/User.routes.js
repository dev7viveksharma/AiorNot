import express from "express";
import { signup , login} from "../Controllers/User.controller.js";
import {identifyUser} from '../Middleware/identifyuser.js';
import { UserAction } from "../Controllers/UserAction.controller.js";
const router = express.Router();

router.post('/signup', signup);

router.post('/login' , login);

router.get('/verify' , identifyUser , UserAction);


export default router;