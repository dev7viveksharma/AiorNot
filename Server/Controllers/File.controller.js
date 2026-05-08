import AppError from "../Utility/AppError.util.js";
import imagemodel from "../Models/Image.model.js";
import {Plans} from "../Models/UserAccount.model.js";
import { Usage } from "../Services/UserStorageUsage.services.js"
import { storageused } from "../Services/Storagelimit.services.js";

const fetchUserFiles = async(model, id) =>{
    try {
       const data = await model.findOne({userId : id},{_id : 0 , userId : 1 , media : 1 , storageUsed : 1});
       return data;
    } catch (error) {
       throw error 
    }
    
}


export const imagefetch = async(req, res)=>{
    const {usertype , userdata} = req;
    console.log("entry");
    try {
        if(usertype === "guest"){
            throw new AppError(" UnAuthorized User" , 401);
        }
        const userusage = await storageused(userdata.id);
        const fetchimagedata = await fetchUserFiles(imagemodel ,userusage.AccountId);
        console.log("after fetchimages data", fetchimagedata)
        const usagemetadata = await Plans.findOne(
            { "plans.plan": userusage.AccountType },
            { plans: { $elemMatch: { plan: userusage.AccountType } } }
            );
        if (!usagemetadata) {
                    throw new AppError("Plans data missing in database",404);
                }
        const storageusage = {
            planlimit : await Usage(usagemetadata.plans[0].limit),
            userused : await Usage(fetchimagedata.storageUsed)
        }

        console.log("storageusage final", storageusage.userused , storageusage.planlimit);
        res.status(200).json({
            success : true,
            images : fetchimagedata.media,
            planlimit : storageusage.planlimit,
            userused : storageusage.userused
        });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }

}