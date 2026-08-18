import { db } from "../database/sql.db.js";
import { generateotp } from "../Utility/OtpGenerator.util.js";
import { otpmail } from "../Config/Mail.config.js";
import redis from "../Config/Redis.config.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import AppError from "../Utility/AppError.util.js";
import { bytes } from "node:stream/consumers";

dotenv.config();

export const verifyemail = async(req , res) =>{
    const {email} = req.body;

    try {
        const url = `select exists( select 1 from AiorNotuser where email = ?) AS value_exists`;

       const [result] =  await db.query(url ,[email]);
        if(result[0].value_exists === 0){
            throw new AppError("Email Does Not Exists" , 404)
        }
        const otp = generateotp();
        const response = await redis.set(`${process.env.REDIS_OTPKEY}${email}` , otp , "EX" , 300);
        if(response !== "OK"){
            throw new AppError("Server Failed to Send OTP" , 500);
        }
        await otpmail(otp , email);

        res.status(200).json({
            success : true , 
            message : "Otp Send on successfully",
        });
    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
        }
}


export const resend = async(req , res) =>{
    try {
        const {email} = req.body;
        const otp = generateotp();
        const response = await redis.set(`${process.env.REDIS_OTPKEY}${email}` , otp , "EX" , 300);
        if(response !== "OK"){
            throw new AppError("Server Failed to Send OTP" , 500);
        }
        await otpmail(otp , email);

        res.status(200).json({
            success : true , 
            message : "Otp Send on successfully"
        });
    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
}

export const verifyOTP = async(req ,res)=>{
    try {
        const {otp , email} = req.body;

        if (!email || !otp) {
            throw new AppError("Email and OTP are required", 400);
        }
        
        const response = await redis.get(`${process.env.REDIS_OTPKEY}${email}`);

        if(response === null){
            throw new AppError("OTP Expired or Not Found" , 400);
        }

        if(response === otp){
            await redis.del(`${process.env.REDIS_OTPKEY}${email}`);
            await redis.set(`${process.env.REDIS_VERIFIED}${email}`,"Verified","EX", 600);
            return res.status(200).json({
                    success : true,
                    message : "OTP matched successfully"
            });
        }

        throw new AppError("Invalid OTP" ,400)
    } catch (error){
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
}


export const ChangePassword = async(req , res) =>{
    try {
        const {password , email} = req.body;

        const getverification = await redis.get(`${process.env.REDIS_VERIFIED}${email}`);

        if(getverification !== "Verified"){
            throw new AppError("Verification expired or invalid", 401);
        }

        const encryptedpassword = await bcrypt.hash(password , 10);
        const url =  `UPDATE AiorNotuser SET password = ? where email = ?`;
        const [result] = await db.query(url , [encryptedpassword , email]);

        if(result.affectedRows === 0){
            throw new AppError("Failed to update password", 500);
        }
    
        await redis.del(`${process.env.REDIS_VERIFIED}${email}`);
        res.status(200).json({
            success : true,
            message : "Password changed successfully"
        });
    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        }); 
    }
}