import dotenv from "dotenv";
import AppError from "./AppError.util.js";

dotenv.config();

const AIContentDetector = async(video) =>{
    console.log("video : " , video)
    const base64content = `data:${video.mimetype};base64,${video.buffer.toString("base64")}`
    const API_KEY = process.env.VIDEO_API_KEY;

    const res = await fetch(
    "https://api.thehive.ai/api/v3/hive/ai-generated-and-deepfake-content-detection",
    {
        method: "POST",
        headers: {
        "authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        media_metadata: true,
        input: [
            {media_base64: base64content}
        ],
        }),
    });
    const data =  res.json();

    if(!res.ok){
        console.log("Hive Error:", data);
        throw new AppError(data?.message || "Hive API Error", res.status);
    }

    return data;
}
export const apiresponse = async (duration, usertype, video) => {

    console.log("ENTRY IN VideoResponse");

    if (duration > 1 && duration <= 60 && usertype === "user") {

        return await AIContentDetector(video);
    }
    else if (duration > 60) {

        throw new AppError("Video Length is too large", 400);
    }

    throw new AppError("Invalid video request", 400);
};