import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

export default async function fetchimagedata(file) {
    const data = new FormData();

    data.append("media", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype
    });

    data.append("models", "genai");
    data.append("api_user", process.env.MEDIA_API_USER);
    data.append("api_secret", process.env.MEDIA_API_KEY);

    const headers = {
        ...data.getHeaders(),
        'Content-Length': data.getLengthSync()
    };

    console.log("before axios");

    try {
        const response = await axios.post(
            "https://api.sightengine.com/1.0/check.json",
            data,
            {
                headers,
                maxBodyLength: Infinity
            }
        );

    return response.data;

    } catch (error) {
        console.log(error.response?.data || error.message);
        throw error;
    }
}