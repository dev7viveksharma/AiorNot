import axios from "axios";
import {db} from "../database/sql.db.js";
import { handlecredits , handleuser } from "../Services/Auth.user.services.js";
import AppError from "../Utility/AppError.util.js";
import dotenv from "dotenv";

dotenv.config();

const options = {
  method: 'POST',
  url: 'https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/',
  headers: {
    'x-rapidapi-key': `${process.env.API_KEY}`,
    'x-rapidapi-host': 'ai-content-detector-ai-gpt.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    text: ''
  }
};

async function fetchData(text) {
	try {
        options.data.text = text;
		const response = await axios.request(options);
		console.log(response.data);
        return response.data;
	} catch (error) {
		console.error(error);
        throw error;
	}
}

export const textcontroller = async(req , res) =>{
    const {usertype , userdata , tabledetails}  = req;
    const {text} = req.body;
    console.log("enter in text controller");
    try {
        if(text.length > 3000 || text.length < 400){
            throw new AppError("Given Content length is not According to our limits", 400)
        }

        console.log("after length check");
        const [userverification , creditsverification] = await Promise.all([
            handleuser( userdata , tabledetails ),
            handlecredits( userdata , tabledetails)
        ]);
        

        console.log("after user and credits verification");

        if(userverification === creditsverification[tabledetails.idname]){
            console.log("verification success");
            const textresult = await fetchData(text);
            console.log("after data fetch" ,"data", textresult,"status" , textresult.status );
            if(textresult.status && textresult){
                console.log("data fetched and success");
                const query = `update ${tabledetails.tablename} set ${tabledetails.type} = ? where ${tabledetails.idname} = ? `; 
                const newcredits = creditsverification[tabledetails.type] - 1;
                const [result] = await db.query(query , [ newcredits , userdata.id]);

                    if (result.affectedRows === 0) {
                        return res.status(403).json({ success : false , message: "No credits left or user not found" });
                    }

                    return res.status(200).json({
                        success : true,
                        text : textresult
                    });
            }
        }
    } catch (error) {
        const status = error.statusCode || 500;
        
        return res.status(status).json({
            success : false,
            message : error.message
        }); 
    }

}