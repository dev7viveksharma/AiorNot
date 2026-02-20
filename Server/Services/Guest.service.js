import {db} from "../database/sql.db.js";
import { v4 as uuidv4 } from 'uuid';

export const getGuestFromDB = async(guest_id) =>{
    try {
        const query = "SELECT guest_id , ip_address ,user_agent ,text_count , image_count , video_count , last_reset FROM guests where guest_id = ? ORDER BY created_at DESC LIMIT 1";
        const [data] = await db.query(query , [guest_id]);
        return data[0]
    } catch (error) {
        console.log("error finding guest by id" , error);
        throw error;
    }    
}

export const getGuestFromIP = async(guest_ip) =>{
    try {
        const query = "SELECT guest_id , ip_address ,user_agent ,text_count , image_count , video_count , last_reset FROM guests where ip_address = ? ORDER BY created_at DESC LIMIT 1";
        const [data] = await db.query(query , [guest_ip]);
        return data[0]

    } catch (error) {
        console.log("error finding guest by ip" , error);
        throw error;
    }    
}

export const createGuest = async (guest_ip , Agent) =>{
    try {
        const id = uuidv4();
        const query = "insert into guests (guest_id , ip_address ,user_agent ,text_count , image_count , video_count , last_reset )VALUES(?,?,?,0,0,0,CURDATE())";
        await db.query(query , [id , guest_ip , Agent]);
        return{
            guest_id : id
        }
    } catch (error) {
        console.error("Error creating guest:", error);
        throw error;
    }    
}