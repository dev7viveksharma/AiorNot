import AppError from "../Utility/AppError.util.js";
import mongoose from "mongoose";
import {User} from "../Models/UserAccount.model.js";
import userMessage from "../Models/UserMessage.model.js";
import reportmessage from "../Models/UserMessage.model.js";
import {v4 as uuidv4} from "uuid";
import {uploadbugreport} from "../Middleware/Multer.middleware.js";
import { uploadToCloudinary } from "../Services/Cloudinary.services.js";

export const SendMessage = async(req , res) =>{
    try {
        const {userdata} = req;
        const {message} = req.body;
        
        if(message.contactmessage.length === 0){
            throw new AppError("message is Empty" , 400);
        }

        const user = await User.findOne({userId : userdata.id});
        if(!user){
            throw new AppError("User Not Found" , 404);
        }

        const response = await userMessage.message.create({
            AccountId : user.AccountId,
            messageId: uuidv4(),
            message : message.contactmessage,
            AgreedTermAndCondition : message.AgreeTC,
        });

        res.status(200).json({
            success : true,
            message : "message sent successfully"
        });

    } catch (error) {
        const status = error.statusCode || 500;
        
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }
}

export const SendReport = async(req , res) =>{
    try {
        const file = await uploadbugreport(req , res);
        
        const {userdata} = req;
        
        const {bugType , buglvl , bugdescription ,AgreeTC} = req.body;

        if(!bugdescription?.trim()){
            throw new AppError("message is Empty" , 400);
        }

        if(bugType === "" || buglvl === ""){
            throw new AppError("Options are not Selected " , 422)
        }

        const user = await User.findOne({userId : userdata.id});

        if(!user){
            throw new AppError("User Not Found" , 404);
        }
        let uplaodreportAsset = null;
        if(file){
            uplaodreportAsset = await uploadToCloudinary(file.buffer , "ReportAssets");
        }
        const response = await reportmessage.report.create({
            AccountId : user.AccountId,
            reportId : uuidv4(),
            bugType : bugType,
            buglevel : buglvl,
            BugFile : uplaodreportAsset?.secure_url ||'no url',
            bugdescription : bugdescription,
            AgreedTermAndCondition : AgreeTC,
        });

        res.status(200).json({
            success : true,
            message : "message sent successfully"
        });

    } catch (error) {
        const status = error.statusCode || 500;
        
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }
}