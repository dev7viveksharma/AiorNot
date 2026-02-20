import {db} from "../database/sql.db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../Utility/TokenGeneration.util.js";

export  const signup = async(req , res )=>{
    const {name , email , password} = req.body;
    try {
        console.log(req.body , name , email , password);//debugging testing

        const hashedpassword = await bcrypt.hash(password ,10);
        const query = "insert into AiorNotuser(name , email , password)values(?,?,?)";
        db.query(query , [name , email , hashedpassword],(err,result)=>{
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ success : false ,  message: "Email already exists" });
                }

                console.log(err);
               return res.status(500).json({ message: "Database error" });
            }

            res.status(201).json({
                success : true,
                email : email,
            });
        });
    } catch (error) {
        console.error('❌ Error hashing password:', error);
        res.status(500).json({ success: false, message: "Internal error" });
    }
}

export const login = ( req , res)=>{
    const {email  , password , rememberMe} = req.body;
    console.log("1");
    try {
        const query = "Select * from AiorNotuser where email = ?";
        db.query(query , [email]  , async(error , result)=>{
            console.log("2");
            if(error){
                if(error.code === "ER_NO_SUCH_TABLE"){
                    return res.status(401).json({ success : false , message: "User not found" });
                }
                 return res.status(500).json({ message: "Database error" });
            }

            if(result.length === 0){
                return res.status(401).json({ success : false , message : "User not found"})
            }

            const user = result[0];
            const payload = {
                id : user.id,
                name : user.name,
                email : user.email,
            };
            console.log("2.5");
            const ismatched = await bcrypt.compare(password , user.password);
            const expiryTime = rememberMe===true ? "7d"  : "1h"; 
            if(ismatched){
                console.log("3");
                res.cookie("AiorNotToken" , generateToken(payload , expiryTime )
                    , rememberMe === true ? {
                        httpOnly : true,
                        secure : false, //should be true before production
                        sameSite : "strict",
                        maxAge : 7 * 24 * 60 * 60 *1000
                    } :{
                        httpOnly : true,
                        secure : false, //should be true before production
                        sameSite : "strict", 
                    }
                );

                console.log("4");
                res.status(200).json({
                    success : true    
                });
            }else{
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        });
    } catch (error) {
        console.error('❌ Login Error', error);
        res.status(500).json({ success: false, message: "Internal error" });
    }
}