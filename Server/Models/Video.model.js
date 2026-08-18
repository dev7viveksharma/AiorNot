import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uservideo = new Schema({
  userId: {
    type:String,
    unique:true,
    required : true
  }
  ,
  storageUsed: Number,

  media: [
    {
      urlId : String, 
      url: String,
      mediaType: String,
      size: Number,

      aiResult: {
        is_ai: Boolean,
        prediction: String,
        ai_probability: Number,
        real_probability: Number,
        certainty_level: String,      
        createdAt: Date
      },
    }
  ]
});

export default mongoose.model("videomodel" , uservideo);