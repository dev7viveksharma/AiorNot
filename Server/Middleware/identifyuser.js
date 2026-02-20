import {getGuestFromDB , getGuestFromIP , createGuest} from "../Services/Guest.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const identifyUser = async (req, res, next) => {
try {
    // 1️⃣ Logged-in user
    if (req.cookies.AiorNotToken) {
    const token = req.cookies.AiorNotToken;
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user ={
          type : "user",
          id : decoded.id
        };
        return next();
    } catch (error) {
    }
    }
  
    const user_agent = req.get("user_agent");
  
  // 2️⃣ Guest via cookie (main)
  if (req.cookies.guest_id) {
    const guest = await getGuestFromDB(req.cookies.guest_id );
    if (guest) {
      req.user = { type: "guest", id: guest.guest_id };
      return next();
    }
  }
  
  //  Optional: Guest via IP (fallback / analytics only)
  const guestByIP = await getGuestFromIP(req.ip ); // return first match or log
  if (guestByIP) {
    req.user = { type: "guest", guestId: guestByIP.guest_id };
    return next();
  }
  
    // 3️⃣ First-time visitor → create guest
    const newGuest = await createGuest(req.ip , user_agent);
  
    res.cookie("guest_id", newGuest.guest_id, {
      httpOnly: true,
      sameSite: "lax"
    });
  
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
