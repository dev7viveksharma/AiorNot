import {db} from "../database/sql.db.js";
export const getSessionFromDB = async (session_id) =>{
    try {
        // const query = "SELECT guest_id , ip_address ,user_agent ,text_count , image_count , video_count , last_reset FROM guests where session_id = ? ORDER BY created_at DESC LIMIT 1";
        // const [data] = await db.query(query , [session_id]);
        // return data[0]
    } catch (error) {
        console.log("error finding guest by id" , error);
        throw error;
    }    
}