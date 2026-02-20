import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import  './Cron/cron.reset.js';
import Text from "./routes/Text.routes.js";
import user from "./routes/User.routes.js"
const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "aiornot",
    resave: false,
    saveUninitialized: false
}))

app.use("/api", Text);
app.use('/auth',user);
app.listen(port , (req , res)=>{
    console.log("backend is running on " + port);
});
