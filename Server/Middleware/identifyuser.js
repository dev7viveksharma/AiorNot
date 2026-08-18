import {getGuestFromDB , getGuestFromIP , createGuest} from "../Services/Guest.service.js";
import { generateToken } from "../Utility/TokenGeneration.util.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createGuestCookie = (req , res , idvalue)=>{
    res.cookie("guest_id", generateToken({id : idvalue}, "3h"),{
        httpOnly: true,
        sameSite: "lax"
    });
}

export const identifyUser = async (req, res, next) => {
try {
    // 1️⃣ Logged-in user
    if (req.cookies.AiorNotToken) {
      const token = req.cookies.AiorNotToken;
      
      const decoded = jwt.verify(token , process.env.JWT_SECRET);
      req.user ={
        type : "user",
        id : decoded.id
      };
      return next();
    }
  
  const user_agent = req.get("user_agent");
  
  // 2️⃣ Guest via cookie (main)
  if (req.cookies?.guest_id) {
   try {
      const decoded = jwt.verify(req.cookies.guest_id , process.env.JWT_SECRET);
      
      const guest = await getGuestFromDB(decoded.id);
      
      if (guest) {
        req.user = { type: "guest", id: guest.guest_id };
        return next();
      }
      const error = new Error("cookies are forged");
      error.code = "401";
      error.name = "forging";
      throw error;
   } catch (error) {
    if(error.name === "TokenExpiredError"){
      res.clearCookie("guest_id");
    }
    else if(error.name === "forging"){
        throw error;
    }else{
      const newError = new Error("something went wrong in checking guest cookie");
      newError.code = "400";
      throw newError;
    }
   }
  }

  //  Optional: Guest via IP (fallback / analytics only)
  const guestByIP = await getGuestFromIP(req.ip); // return first match or log
  if (guestByIP) {
    req.user = { type: "guest", id: guestByIP.guest_id };
    createGuestCookie(req , res , guestByIP.guest_id);
    return next();
  }
  
  // 3️⃣ First-time visitor → create guest
  const newGuest = await createGuest(req.ip , user_agent);
  createGuestCookie(res , req , newGuest.guest_id);
  req.user = {
    type: "guest",
    id: newGuest.guest_id
  };
  
  next();
} catch (error){
  console.error("Error in identifyUser middleware:", error);
  next(error);
}
};
