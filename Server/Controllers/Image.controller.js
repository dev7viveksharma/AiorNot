import { db } from "../database/sql.db.js";
import imagemodel from "../Models/Image.model.js";
import { handleuser , handlecredits } from "../Services/Auth.user.services.js";
import {uploadImage} from "../Middleware/Multer.middleware.js";
import {storageused} from "../Services/Storagelimit.services.js";
import { uploadToCloudinary , destroy } from "../Services/Cloudinary.services.js";
import fetchimagedata from "../Utility/ImageResponse.util.js"
import fetchimagemetadata from "../Services/ImageResponseReshaping.services.js";
import {Plans} from "../Models/UserAccount.model.js";
import AppError from "../Utility/AppError.util.js";
import { AitoolCounter } from "../Services/ApiCounter.services.js";
import axios from "axios";
import dotenv from "dotenv";
import sharp from "sharp";
import { ReturnDocument } from "mongodb";

dotenv.config();

export const imagecontroller = async(req , res) =>{
    const {usertype , userdata , tabledetails } = req;
    console.log(usertype , userdata);
    try {
      const file = await uploadImage(req , res);

      const [userverification , creditsverification] = await Promise.all([
            handleuser( userdata , tabledetails ),
            handlecredits( userdata , tabledetails)
        ]);

        if(userverification !== creditsverification[tabledetails.idname]){
          throw new AppError("User mismatch or invalid credits" , 403);
        }
          
        const metadata = await sharp(file.buffer).metadata();
        if(metadata.width > 4000 || metadata.height > 4000){
          throw new AppError("image is too large" , 400);
        }

        const foldername = usertype === "user" ? "AiorNot_Images" : "Guest_media";

        // send and fetch data for api to perform process
        const imageresult = await fetchimagedata(file);
        let limitreached = true;
        
        //get more info about image result
        const airesult = fetchimagemetadata(imageresult);
        
        //check user type

        if(usertype === "user"){
          const usage = await storageused(userdata.id , imagemodel);

          const plansdata = await Plans.findOne();

          if (!plansdata) {
            throw new AppError("Plans data missing in database",404);
          }
          //check user storage limit exceed or not 
          const limit = plansdata.plans.find(p => p.plan === usage.AccountType);
          
          //upload image if limit not exceed
          
          if((usage.usage +  file.size ) <= limit.limit){
            console.log("before cloudinary upload");
            const userimageupload = await uploadToCloudinary(file.buffer , foldername);
            const newMedia = {
                  urlId: userimageupload.imageId,
                  url: userimageupload.secure_url,
                  mediaType: "image",
                  size: file.size,
                  aiResult: airesult
            };

            //update user storage usage including new file size
            const newsize = usage.usage + file.size;
            
            const imgUploadresult = await imagemodel.updateOne(
                                  { userId: usage.userid },
                                  {
                                    $push: { media: { $each: [newMedia] } },
                                    $set: { storageUsed: newsize }
                                  },
                                  { upsert: true, runValidators: true }
                                );
                                
            if (!imgUploadresult.acknowledged) {
              throw new AppError("Database operation failed", 500);
            }

            // ❌ No match + no insert
            if (imgUploadresult.matchedCount === 0 && !imgUploadresult.upsertedId) {
              throw new AppError("Insertion failed - user not found", 404);
            }

            limitreached = false;
            }
          }

          if(imageresult.status !== 'success' && !imageresult){
            throw new AppError("something went wrong with image result" , 500);
          }

          // deplete credits
          const query = `update ${tabledetails.tablename} set ${tabledetails.type} = ? where ${tabledetails.idname} = ? `; 
          const newcredits = creditsverification[tabledetails.type] - 1;
          const [result] = await db.query(query , [ newcredits , userdata.id]);

          //add count if detects Ai
          if(airesult.is_ai){
            await AitoolCounter("Image");
          }
          
          if (result.affectedRows === 0) {
              return res.status(403).json({ success : false , message: "No credits left or user not found" });
          }

          // send final result with success status 200
          return res.status(200).json({
              success : true,
              limitreached : limitreached,
              newcredits : newcredits,
              image : airesult
          });
        
    } catch (error) {
      const status = error.statusCode || 500;

      return res.status(status).json({
        success: false,
        message: error.message
      });
   
    }
}