import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const VerifyToken = (req , res , next)=>{
try {
    const token = req.cookies.AiorNotToken;
    if(!token){
        const guest = req.cookies.guest_id;
        const guestdecode = jwt.verify(guest ,process.env.JWT_SECRET);
        req.usertype = "guest";
        req.userdata = guestdecode;
        return next();
    }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.usertype = "user";
        req.userdata = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({ message : "Invalid or Expired Token"});
    }
}