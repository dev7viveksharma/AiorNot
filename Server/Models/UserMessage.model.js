import mongoose from "mongoose";
const schema = mongoose.Schema;

const userMessage = new schema({
    AccountId: String,
    messageId: String,
    message : String,
    AgreedTermAndCondition : {
        type : Boolean,
    },
    CreatedAt : {
        type : Date,
        default : Date.now
    },
});

const reportmessage = new schema({
    AccountId : String,
    reportId : String,
    bugType : String,
    buglevel : String,
    BugFile : String,
    bugdescription : String,
    AgreedTermAndCondition : Boolean,
    CreatedAt : {
        type : Date,
        default : Date.now
    }
});

const userNewsSeen = new schema({
    AccountId : String,
    LastSeen : Date,
});

const message = mongoose.model("userMessage",userMessage);
const report = mongoose.model("reportmessage",reportmessage)

export default { message , report};
