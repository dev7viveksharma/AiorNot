import cloudinary from "../Config/Cloudinary.config.js";
import streamifier from "streamifier";

export const uploadToCloudinary = (buffer, foldername) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: foldername,
        resource_type : "auto"
       },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};


export const destroy = async (publicId) => {
  try {
    const { result } = await cloudinary.uploader.destroy(publicId);
    return result === "ok";
  }catch (error) {
    console.error(error);
    return false;
  }
};