import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const sender  = nodemailer.createTransport({
    service : "gmail",
    auth : ({
        user : process.env.USER_EMAIL,
        pass : process.env.USER_EMAIL_PASSWORD
    }),
}); 



export const otpmail = async(otp , email)=>{
       try {
         await sender.sendMail({
         from: process.env.USER_EMAIL,
         to: email,
         subject: "One Time-OTP Code For Password Change",
         html: `
             <h2>Your OTP is: ${otp}</h2>
             <p>This OTP expires in 5 minutes.</p>
             <h3>regards by</h3>
             <p>AiorNot Team </p>
         `
         });
       } catch (error) {
        throw error;
       }
}