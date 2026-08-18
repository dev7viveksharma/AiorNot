import multer from "multer";
import AppError from "../Utility/AppError.util.js";

const Image = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

const Video = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 50 * 1024 * 1024
    }
});

const report = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 50 * 1024 * 1024
    }
});

const Music = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 10 * 1024 * 1024
    }
})

export const uploadImage = (req, res) => {
    return new Promise((resolve, reject) => {
        Image.single("file")(req, res, (err) => {
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

export const uploadVideo = (req ,res) =>{
    return new Promise((resolve, reject) => {
        Video.single("file")(req, res, (err) => {
            if (err) {
                console.log("MULTER ERROR:", err.message); 
                return reject(err);
            }
            console.log("in middle of memoryStorage");
            if (!req.file) {
                return reject(new AppError("No file uploaded", 400));
            }
            resolve(req.file); // return full file object
        });
    });
}

export const uploadbugreport = (req , res) => {
    return new Promise((resolve , reject)=>{
        report.single("bugfile")(req , res ,(err)=>{
            if (err) {
                console.log("MULTER ERROR:", err.message); 
                return reject(err);
            }
            console.log("in middle of memoryStorage");
            
            if (!req.file) {
                return resolve(null); ;
            }

            resolve(req.file); // return full file object
        })
    })
}

export const uploadMusic = (req , res) => {
    return new Promise((resolve , reject)=>{
        Music.single("music")(req , res ,(err)=>{
            if (err) {
                console.log("MULTER ERROR:", err.message); 
                return reject(err);
            }
            console.log("in middle of memoryStorage");
            
            if (!req.file) {
                return reject(new AppError("No music file uploaded", 400)); ;
            }

            resolve(req.file); // return full file object
        })
    })
}