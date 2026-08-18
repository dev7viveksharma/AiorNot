import redis from "../Config/Redis.config.js";
import dotenv from "dotenv";
import AppError from "../Utility/AppError.util.js";
dotenv.config();
export const News = async(req ,res) =>{
    try {
        const data = await redis.get(`${process.env.REDIS_NEWS}`);
         if(data === null){
            throw new AppError("Not Found" , 400);
        }
        const news = JSON.parse(data);
        res.status(200).json({
            success : true,
            news : news
        })
    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        });
    }
}