import AppError from "../Utility/AppError.util.js";
import imagemodel from "../Models/Image.model.js";
import videomodel from "../Models/Video.model.js";
import {Plans} from "../Models/UserAccount.model.js";
import { Usage } from "../Services/UserStorageUsage.services.js"
import { storageused } from "../Services/Storagelimit.services.js";
import {User} from "../Models/UserAccount.model.js";
import { json } from "node:stream/consumers";

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
    console.log("entry image fetch");
    try {
        if(usertype === "guest"){
            throw new AppError(" UnAuthorized User" , 401);
        }
        const userusage = await storageused(userdata.id ,imagemodel);
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

        /*console.log("storageusage final", storageusage.userused , storageusage.planlimit);*/

        res.status(200).json({
            success : true,
            images : fetchimagedata.media,
            planlimit : storageusage.planlimit,
            userused : storageusage.userused,
        });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }
}

export const videofetch = async(req , res)=>{
    const {usertype , userdata} = req;
    console.log("entry video fetch");
    try {
        if(usertype === "guest"){
            throw new AppError(" UnAuthorized User" , 401);
        }
        const userusage = await storageused(userdata.id ,imagemodel);
        const fetchimagedata = await fetchUserFiles(videomodel ,userusage.AccountId);
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

        /*console.log("storageusage final", storageusage.userused , storageusage.planlimit);*/

        res.status(200).json({
            success : true,
            images : fetchimagedata.media,
            planlimit : storageusage.planlimit,
            userused : storageusage.userused,
        });
    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }
}

export const fetchmedia = async(req , res) =>{
    try {
        const {mediatype , id , mediaid} = req.query;
        const {usertype , userdata} = req;
        console.log(mediatype);
        if(usertype === "guest"){
            throw new AppError(" UnAuthorized User" , 401);
        }
        const model = mediatype ==="image" ? imagemodel : videomodel;
        const userid = await User.findOne({userId : id},{AccountId : 1});
        const result = await fetchUserFiles(model , userid.AccountId);

        const media = result?.media?.find(data=>{return data._id.equals(mediaid) });

        res.status(200).json({
            success : true,
            media : media
        });

    } catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }
}