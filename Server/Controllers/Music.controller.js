import { handleuser , handlecredits } from "../Services/Auth.user.services.js";
import { uploadMusic } from "../Middleware/Multer.middleware.js";
import AppError from "../Utility/AppError.util.js";
import { parseBuffer } from "music-metadata";
import fs from 'fs';

const fetchMusicResponse = async (file) => {
    //yet to be create
    return file
};

export const Music = async(req , res) =>{
    try {
        const {userdata , usertype , tabledetails} = req;
        console.log("hit the controller");

        const file = await uploadMusic(req , res);

        // const [userverification , creditsverification] = await Promise.all([
        //             handleuser( userdata , tabledetails ),
        //             handlecredits( userdata , tabledetails)
        // ]);
        
        // if(userverification !== creditsverification[tabledetails.idname]){
        //     throw new AppError("User mismatch or invalid credits" , 403);
        // }
        
        // const metadata = await parseBuffer(file.buffer,{mimeType: file.mimetype});
        
        // const duration = metadata.format.duration;
        
        // if(Math.floor(duration % 60) > 60){
        //     throw new AppError("music duration Exceed the Limit" , 400);
        // }

        // const foldername = usertype === "user" ? "AiorNot_Images" : "Guest_media";

        // const musicResult = await fetchMusicResponse(file);

        //under development
        return res.status(200).json({
                success : true,
                message : "Tool Under Development"
            });
        //under development 

    } catch (error) {
        const status = error.statusCode || 500;
        console.log(error);
        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
}