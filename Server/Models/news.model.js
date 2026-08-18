import mongoose from "mongoose";

const schema = mongoose.Schema;

const AiNews = new schema({
    source: {
        id: String,
        name: String,
    },
    author: String,
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnail: String,
    publishedAt: Date,
});

export default mongoose.model("news" , AiNews);