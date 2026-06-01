import express from "express";
import { signup , login , logout} from "../Controllers/User.controller.js";
import {identifyUser} from '../Middleware/identifyuser.js';
import { UserAction } from "../Controllers/UserAction.controller.js";
import { RouteProtection } from "../Controllers/RouteProtection.controller.js";
import { VerifyToken } from "../Middleware/VerifyToken.js";
import {AccountInfo} from "../Controllers/AccountInfo.controller.js";
import { verifyemail  , resend , verifyOTP , ChangePassword} from "../Controllers/UserRecovery.controller.js";
const router = express.Router();

router.post('/signup', signup);

router.get('/verify' , identifyUser , UserAction);

router.get('/routeprotection', RouteProtection );

router.post('/login' , login);

router.post('/logout' , logout);

router.get('/Accountinfo', VerifyToken , AccountInfo);

router.post('/VerifyEmail' , verifyemail);

router.post('/ResendOTP' , resend);

router.post('/checkOTP' , verifyOTP);

router.post('/ChangePassword', ChangePassword);


export default router;