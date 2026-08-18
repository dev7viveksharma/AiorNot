import { db } from "../database/sql.db.js";
import videomodel from "../Models/Video.model.js";
import { Plans } from "../Models/UserAccount.model.js";
import VideoresponseReshaping from "../Services/VideoResponseReshaping.services.js";
import { storageused } from "../Services/Storagelimit.services.js";
import { uploadVideo } from "../Middleware/Multer.middleware.js";
import { handleuser , handlecredits } from "../Services/Auth.user.services.js";
import { uploadToCloudinary , destroy } from "../Services/Cloudinary.services.js";
import {fetchmetadata} from "../Services/VideoMetadata.controller.js";
import { apiresponse } from "../Utility/VideoResponse.util.js";
import AppError from "../Utility/AppError.util.js";
export const videocontroller = async( req , res) =>{
    const {usertype , userdata , tabledetails } = req;
    console.log("video controller entry");
    try {

        if(usertype === "guest"){
            throw new AppError("This Feature Is Not Accessible For Guest" , 401);
        }
        const file = await uploadVideo(req, res);

        const [userverification , creditsverification] = await Promise.all([
            handleuser( userdata , tabledetails ),
            handlecredits( userdata , tabledetails)
        ]);

        if(userverification !== creditsverification[tabledetails.idname]){
            throw new AppError("User mismatch or invalid credits" , 403);
        }

        const videometadata = await fetchmetadata(file);

        if(videometadata.streams[1].width > 1920 && videometadata.streams[1].height > 1080){
            throw new AppError(" video is too large", 400);
        }

        const foldername = usertype === "user" ? "AiorNot_Videos" : "Guest_media";
        
        //Video Api Call for Result
        const fetchresult = await apiresponse(videometadata.format.duration ,usertype , file);

        let limitreached = true;

        // get more info about image result
        const airesult = VideoresponseReshaping(fetchresult);
        //check user type

        const usage = await storageused(userdata.id  , videomodel);
        
        const plansdata = await Plans.findOne();
        
        if (!plansdata) {
            throw new AppError("Plans data missing in database",404);
        }

        //check user storage limit exceed or not 
        const limit = plansdata.plans.find(p => p.plan === usage.AccountType);

        //upload video if limit not exceed
        if((usage.usage +  file.size ) <= limit.limit){
            const uservideoupload = await uploadToCloudinary(file.buffer , foldername);
            const newMedia = {
                urlId: uservideoupload.imageId,
                url: uservideoupload.secure_url,
                mediaType: "video",
                size: file.size,
                aiResult: airesult
            }

            //update user storage usage including new file size
            const newsize = usage.usage + file.size;
            const Uploadresult = await videomodel.updateOne(
                                { userId: usage.userid },
                                {
                                    $push: { media: { $each: [newMedia] } },
                                    $set: { storageUsed: newsize }
                                },
                                { upsert: true, runValidators: true }
                                );
            
            if (!Uploadresult.acknowledged) {
                throw new AppError("Database operation failed", 500);
            }

            // ❌ No match + no insert
            if (Uploadresult.matchedCount === 0 && !Uploadresult.upsertedId) {
                throw new AppError("Insertion failed - user not found", 404);
            }

            limitreached = false;
        }

        const isSuccess = fetchresult && Array.isArray(fetchresult.output) && fetchresult.output.length > 0;

        if (fetchresult?.return_code && fetchresult.return_code !== 200) {
            // Hive returned an error
            throw new Error(fetchresult.message || "Hive API error");
        }

        if(!isSuccess){
            throw new AppError("something went wrong with image result" , 500);
        }

        // deplete credits
        const query = `update ${tabledetails.tablename} set ${tabledetails.type} = ? where ${tabledetails.idname} = ? `; 
        const newcredits = creditsverification[tabledetails.type] - 1;
        const [result] = await db.query(query , [ newcredits , userdata.id]);

        //add count if detects Ai
        if(airesult.is_ai){
        await AitoolCounter("Video");
        }
        if (result.affectedRows === 0) {
            return res.status(403).json({ success : false , message: "No credits left or user not found" });
        }

        // send final result with success status 200
        return res.status(200).json({
            success : true,
            limitreached : limitreached,
            newcredits : newcredits,
            video : airesult
        });

    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
}