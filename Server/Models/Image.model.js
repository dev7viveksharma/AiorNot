import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userimage = new Schema({
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
        certainty_level : String, 
        type : Object,
        reasoning_summary : String,        
        createdAt: Date
      },
    }
  ]
});

export default mongoose.model("imagemodel" , userimage);