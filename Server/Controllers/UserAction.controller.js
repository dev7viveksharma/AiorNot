import { db } from "../database/sql.db.js";
export const UserAction = async (req, res) => {
    const data = req.user;
    console.log(data);

    try {
        if (data.type === "user") {
            const [result] = await db.query(
                "SELECT email, name FROM AiorNotuser WHERE id = ?",
                [data.id]
            );

            if (result.length === 0) {
                return res.status(401).json({ success: false });
            }

            return res.status(200).json({
                success: true,
                exist: true,
            });
        }

        const [result] = await db.query(
            "SELECT * FROM guests WHERE guest_id = ?",
            [data.id]
        );

        if (result.length === 0) {
            return res.status(401).json({ success: false });
        }

        return res.status(200).json({
            success: true,
            exist: false,
        });

    } catch (error) {
        console.error("DB ERROR:", error);
        return res.status(500).json({ success: false });
    }
};
