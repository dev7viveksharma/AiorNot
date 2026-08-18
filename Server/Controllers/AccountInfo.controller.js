import { db } from "../database/sql.db.js"; 
import AppError from "../Utility/AppError.util.js";
export const AccountInfo = async(req , res) =>{
    const {userdata , usertype} = req;
    try {
        const url = `select * from AiorNotuser where id = ?`;
        if(userdata.id && usertype === "user"){
            const [result] = await db.query(url , [userdata.id]);

            if(result.length === 0){
                throw new Error("Data Not Found");
            }

            return res.status(200).json({
                    success : true,
                    name : result[0].name,
                    email : result[0].email,
                    createat : result[0].create_at
                });
        }

        throw new AppError("id or user not found during verification", 401);
        
    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
}