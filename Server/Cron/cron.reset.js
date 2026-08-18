import cron from "node-cron";
import {db} from "../database/sql.db.js"; 

// Runs every day at 00:00 (midnight)
cron.schedule("0 0 * * *", async () => {
  try {
    const guestsql = `
      UPDATE guests
      SET 
        text_count = 3,
        image_count = 1,
        video_count = 0,
        last_reset = CURDATE()
    `;

    const usersql = `
    UPDATE usercredits SET
    text_count = 10,
    image_count = 3,
    video_count = 1,
    last_reset = CURDATE()
    `;

  await db.query(guestsql);
  await db.query(usersql);
    console.log("✅ Guest & user usage reset successfully");
  } catch (error) {
    console.error("❌ Cron reset failed:", error);
  }
},{
    timezone : "Asia/Kolkata"
});
