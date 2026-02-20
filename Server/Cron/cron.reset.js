import cron from "node-cron";
import {db} from "../database/sql.db.js"; 

// Runs every day at 00:00 (midnight)
cron.schedule("0 0 * * *", async () => {
  try {
    const sql = `
      UPDATE guests
      SET 
        text_count = 3,
        image_count = 2,
        video_count = 1,
        last_reset = CURDATE()
    `;

    await db.query(sql);
    console.log("✅ Guest usage reset successfully");
  } catch (error) {
    console.error("❌ Cron reset failed:", error);
  }
},{
    timezone : "Asia/Kolkata"
});
