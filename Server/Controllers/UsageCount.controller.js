import { db } from "../database/sql.db.js"
export const fetchUsecount = async(req, res)=>{
    try {
        const query = `Select * from UsageStats`
        const [result] = await db.query(query);

        return res.status(200).json({
            success : true,
            result : result
        });
    } catch (error) {
        console.log(error.message || error);
    }
}