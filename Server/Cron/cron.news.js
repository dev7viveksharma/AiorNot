import cron from "node-cron";
import axios from "axios";
import news from "../Models/news.model.js";
import dotenv from "dotenv";
import AppError from "../Utility/AppError.util.js";
import redis from "../Config/Redis.config.js";
dotenv.config();


cron.schedule("0 * * * * ",async ()=>{
   try {
     const response = await axios.get(`https://newsapi.org/v2/everything?q=Artificial+intelligence&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWSAPI}`);
 
     if(response.data.status !== "ok"){
         throw new AppError("The server is temporarily down" , 503)
     }
     const articles = response.data.articles;
     let result = [];
     for(const article of articles){
        const data = await news.findOneAndUpdate({url : article.url},
            {$setOnInsert : {
            source: {
                id: article.source.id || `Random${Math.floor(Math.random()*9)}`,
                name: article.source.name,
            },
            author: article.author,
            title: article.title,
            url: article.url,
            thumbnail: article.urlToImage,
            publishedAt: article.publishedAt,
            }},
            {   upsert : true,
                returnDocument : "after"
            },

        );

        result.push(data);
     };
    
     const redisReponse = await redis.set(`${process.env.REDIS_NEWS}`, JSON.stringify(result) , 'EX' , 3960);

    if(redisReponse !== "OK"){
        throw new AppError("Server Failed to Send OTP" , 500);
    }
    console.log("news inserted");
   } catch (error) {
     const status = error.statusCode || 500;

        console.log({
            success: false,
            message: error.message
        });
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
   }
});


cron.schedule("0 0 * * 0" , async()=>{
    try {
        const oldDate = new Date();
    
        oldDate.setMonth(oldDate.getMonth() - 1);

        const result = await news.deleteMany({
            publishedAt : {
                $lt : oldDate
            }
        });

        console.log(`Deleted ${result.deletedCount} Old news from database`);
    } catch (error) {
        const status = error.statusCode || 500;

        console.log({
            success: false,
            message: error.message
        });
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
    }
});