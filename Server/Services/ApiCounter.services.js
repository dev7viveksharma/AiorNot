import { db } from "../database/sql.db.js"
export const AitoolCounter = async(tool)=>{
    try {
       await db.query(`UPDATE UsageStats SET useCount = useCount + 1 WHERE toolname = ?`,[tool]);
    } catch (error) {
        console.error("Failed to update usage counter:", error.message);

    }
}