import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

export default async function fetchimagedata(file) {
    console.log("entered");

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

        console.log("after axios");
       return response.data;

    // return  {
    //         status: 'success',
    //         request: {
    //             id: 'req_kwFeFLxSgDjw63ytenb06',
    //             timestamp: 1776756274.877533,
    //             operations: 5
    //         },
    //         type: { ai_generated: 0.99 },
    //         media: { id: 'med_kwFekfZdgWA8SqHMWl9SD', uri: 'image_3e5a327f (1).png' }
    //         }

    } catch (error) {
        console.log(error.response?.data || error.message);
        throw error;
    }
}