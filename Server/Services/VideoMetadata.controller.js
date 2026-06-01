import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

const storefile = (file) =>{
   try {
     const extension = path.extname(file.originalname);

    if(!fs.existsSync("temp")){
        fs.mkdirSync("temp");
    }
    const tempPath = path.join("temp" , `${Date.now()}${extension}`);
 
    fs.writeFileSync(tempPath , file.buffer);
 
    return tempPath;

   } catch (error) {
      throw error; 
   }
}


export const fetchmetadata = async(file) =>{
  try {
      const tempPath = storefile(file);
      return new Promise((resolve , reject)=>{
        ffmpeg.ffprobe(tempPath , (err , metadata)=>{
  
        // delete temp file after processing
        if(fs.existsSync(tempPath)){
                fs.unlinkSync(tempPath);
        }
        if(err){
            console.log(err);
            return reject(err);
        }
        resolve(metadata);
        })
      })
    } catch (error) {
        throw error;
    }
}