import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    AccountId: String,
    userId: Number,
    accountType: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    }
});

const plans = new schema({
    plans : [
        {plan : {
            type : String,
            enum : ["free","pro","premium"],
        },
        limit : {
            type : Number
        }
    }
    ]
});

const User = mongoose.model("User" , userSchema);
const Plans = mongoose.model("plans", plans);

export {User , Plans};