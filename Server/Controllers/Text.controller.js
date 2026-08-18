import axios from "axios";
import {db} from "../database/sql.db.js";
import { handlecredits , handleuser } from "../Services/Auth.user.services.js";
import AppError from "../Utility/AppError.util.js";
import { fetchTextData } from "../Utility/TextResponse.util.js";
import { AitoolCounter } from "../Services/ApiCounter.services.js";




export const textcontroller = async(req , res) =>{
    const {usertype , userdata , tabledetails}  = req;
    const {text} = req.body;

    try {
        if(text.length > 3000 || text.length < 400){
            throw new AppError("Given Content length is not According to our limits", 400)
        }

        
        const [userverification , creditsverification] = await Promise.all([
            handleuser( userdata , tabledetails ),
            handlecredits( userdata , tabledetails)
        ]);

        if(userverification !== creditsverification[tabledetails.idname]){
            throw new AppError("User mismatch or invalid credits" , 403);
        }
        
        const textresult = await fetchTextData(text);

        if(textresult.status && textresult){

            const query = `update ${tabledetails.tablename} set ${tabledetails.type} = ? where ${tabledetails.idname} = ? `; 
            const newcredits = creditsverification[tabledetails.type] - 1;
            const [result] = await db.query(query , [ newcredits , userdata.id]);

            //add count if detects Ai
            if(textresult.fakePercentage > 50){
                await AitoolCounter("Text");
            }

            if (result.affectedRows === 0) {
                return res.status(403).json({ success : false , message: "No credits left or user not found" });
            }

            return res.status(200).json({
                success : true,
                text : textresult,
                newcredits : newcredits
            });
        }
    } catch (error) {
        const status = error.statusCode || 500;
        
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }

}