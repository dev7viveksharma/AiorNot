import { db } from "../database/sql.db.js";
import videomodel from "../Models/Video.model.js";
import VideoresponseReshaping from "../Services/VideoResponseReshaping.services.js";
import { uploadVideo } from "../Middleware/Multer.middleware.js";
import { handleuser , handlecredits } from "../Services/Auth.user.services.js";
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

        console.log('after multer');

        const [userverification , creditsverification] = await Promise.all([
            handleuser( userdata , tabledetails ),
            handlecredits( userdata , tabledetails)
        ]);

        console.log("after credentials check");

        if(userverification !== creditsverification[tabledetails.idname]){
            throw new AppError("User mismatch or invalid credits" , 403);
        }

        if(userverification === creditsverification[tabledetails.idname]){
            console.log("credentials matched");
            const videometadata = await fetchmetadata(file);

            console.log("video metadata : ",videometadata);
            if(videometadata.streams[1].width > 1920 && videometadata.streams[1].height > 1080){
                throw new AppError(" video is too large", 400);
            }

            const foldername = usertype === "user" ? "AiorNot_Videos" : "Guest_media";

            const fetchresult = true ; // await apiresponse(videometadata.format.duration ,usertype , file);

            let limitreached = true;
                      
            console.log("video result after fetchdata ");

            //get more info about image result
            const airesult = VideoresponseReshaping(fetchresult);
            //check user type

            console.log("before check usertype");

            const usage = await storageused(userdata.id  , videomodel);
            console.log("usage : " ,usage);
            const plansdata = await Plans.findOne();
            console.log("plansdata : " , plansdata);
            if (!plansdata) {
                throw new AppError("Plans data missing in database",404);
            }
            //check user storage limit exceed or not 
            const limit = plansdata.plans.find(p => p.plan === usage.AccountType);
            console.log("limit : ",limit);
            //upload image if limit not exceed
            console.log("before check user limit");
            if((usage.usage +  file.size ) <= limit.limit){
                console.log("before cloudinary upload");
                const uservideoupload = await uploadToCloudinary(file.buffer , foldername);
                const newMedia = {
                    urlId: uservideoupload.imageId,
                    url: uservideoupload.secure_url,
                    mediaType: "video",
                    size: file.size,
                    aiResult: airesult
                };

                //update user storage usage including new file size
                console.log("before insertion a new image data in mongo");
                const newsize = usage.usage + file.size;
                console.log("AI RESULT:", JSON.stringify(airesult, null, 2));
                const Uploadresult = await videomodel.updateOne(
                                    { userId: usage.userid },
                                    {
                                        $push: { media: { $each: [newMedia] } },
                                        $set: { storageUsed: newsize }
                                    },
                                    { upsert: true, runValidators: true }
                                    );
                console.log("after insertion a new image data in mongo");
                if (!Uploadresult.acknowledged) {
                throw new AppError("Database operation failed", 500);
                }

                // ❌ No match + no insert
                if (Uploadresult.matchedCount === 0 && !Uploadresult.upsertedId) {
                throw new AppError("Insertion failed - user not found", 404);
                }

                limitreached = false;
            }

            if(imageresult.status === 'success' && imageresult){
                // deplete credits
                console.log("data fetched and success");
                const query = `update ${tabledetails.tablename} set ${tabledetails.type} = ? where ${tabledetails.idname} = ? `; 
                const newcredits = creditsverification[tabledetails.type] - 1;
                const [result] = await db.query(query , [ newcredits , userdata.id]);

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
            }
            console.log("not entered in if condition");
            throw new AppError("something went wrong with image result" , 500);
        }

    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
}