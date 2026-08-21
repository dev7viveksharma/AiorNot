import {db} from "../database/sql.db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getGuestFromDB } from "../Services/Guest.service.js";
import { generateToken } from "../Utility/TokenGeneration.util.js";
import { User } from "../Models/UserAccount.model.js";
import { createGuestCookie } from "../Middleware/identifyuser.js";
import { getGuestFromIP } from "../Services/Guest.service.js";
import {v4 as uuidv4} from "uuid";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const connection = await db.getConnection(); // important for transaction

    try {
        await connection.beginTransaction(); // start transaction

        const hashedpassword = await bcrypt.hash(password, 10);

        // 1️⃣ Insert user
        const [result] = await connection.query(
            "INSERT INTO AiorNotuser (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedpassword]
        );

        const userId = result.insertId; //get inserted id

        // 2️⃣ Insert into usercredits
        await connection.query(
            "INSERT INTO usercredits (user_id) VALUES (?)",
            [userId]
        );

        // insert into Mongodb 
        await User.create({
            AccountId : uuidv4(),
            userId : userId
        });

        await connection.commit(); // save both

        res.status(201).json({
            success: true,
            email: email,
        });

    } catch (err) {
        await connection.rollback(); // ❗ undo if error

        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        console.error(err);
        res.status(500).json({ message: "Database error" });

    } finally {
        connection.release(); // 🔥 very important
    }
};

export const login = async(req , res)=>{
    const {email  , password , rememberMe} = req.body;
    try {
        const query = "Select * from AiorNotuser where email = ?";
        const [result] = await db.query(query , [email]);
                    console.log("login query running");
                    if(result.length === 0){
                        return res.status(401).json({ success : false , message : "User not found"})
                    }

                    const user = result[0];
                    const payload = {
                        id : user.id,
                        name : user.name,
                        email : user.email,
                    };
                    
                    const ismatched = await bcrypt.compare(password , user.password);
                    const expiryTime = rememberMe===true ? "7d"  : "1h"; 
                    if(ismatched){
                        console.log("before user token creation");
                        res.cookie("AiorNotToken" , generateToken(payload , expiryTime )
                            , rememberMe === true ? {
                                httpOnly : true,
                                secure : true, //should be true before production
                                sameSite : "none",
                                maxAge : 7 * 24 * 60 * 60 *1000
                            } :{
                                httpOnly : true,
                                secure : true, //should be true before production
                                sameSite : "none", 
                            }
                        );

                        console.log("before success of login");
                        return res.status(200).json({
                            success : true,
                            islogin : true,  
                            name : payload.name,
                            email : payload.email, 
                        });
                    }else{
                        return res.status(401).json({
                            success: false,
                            islogin : false,
                            message: "Invalid credentials"
                        });
                    }
            
    } catch (error) {
        console.error('❌ Login Error', error);
        res.status(500).json({ success: false, message: "Internal error" });
    }
}

export const logout = async(req , res) =>{
try {
        const islogin = req.cookies.AiorNotToken;
        if(islogin){
            res.clearCookie("AiorNotToken",{
                httpOnly : true,
                secure : true, //should be true before production
                sameSite : "none",
            });

            const user_agent = req.get("user_agent");
              
            if (req.cookies?.guest_id) {
               try {
                  const decoded = jwt.verify(req.cookies.guest_id , process.env.JWT_SECRET);
                  const guest = await getGuestFromDB(decoded.id);
                  if (!guest) {
                    const error = new Error("cookies are forged");
                    error.code = "401";
                    error.name = "forging";
                    throw error;
                  }
                  req.user = { type: "guest", id: guest.guest_id };
                  return res.status(200).json({
                        success : true,
                        logout : false
                    });
               } catch (error) {
                if(error.name === "TokenExpiredError"){
                  res.clearCookie("guest_id",  {      
                        httpOnly: true,
                        secure : true,
                        sameSite : "none"
                    });
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
                return res.status(200).json({
                        success : true,
                        logout : false
                });
              }
              
              // 3️⃣ First-time visitor → create guest
              const newGuest = await createGuest(req.ip , user_agent);
              createGuestCookie(res , req , newGuest.guest_id);
              req.user = {
                type: "guest",
                id: newGuest.guest_id
              };
            return res.status(200).json({
                        success : true,
                        logout : false
                    });
        }
    
        throw new Error("unauthorized user");
    }catch (error) {
        console.log(error);
        console.log(error.name);
        console.log(error.message);

        res.status(error.code || 500).json({
            success: false,
            message: error.message,
            name: error.name
        });
    }
}