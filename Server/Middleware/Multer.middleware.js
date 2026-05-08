import multer from "multer";
import AppError from "../Utility/AppError.util.js";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

export const uploadImage = (req, res) => {
    console.log("entered in multer");
    return new Promise((resolve, reject) => {
        upload.single("file")(req, res, (err) => {
            if (err) {
                console.log("MULTER ERROR:", err.message); 
                return reject(err);
            }


            if (!req.file) {
                return reject(new AppError("No file uploaded", 400));
            }
            resolve(req.file); // return full file object
        });
    });
};