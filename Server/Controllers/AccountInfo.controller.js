import { db } from "../database/sql.db.js"; 
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

        throw(new Error ("id or user not found during verification"));
        
    } catch (error) {
        console.log(error.message);
    }
}