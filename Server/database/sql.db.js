import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = mysql.createPool({
    host : process.env.DB_HOST,
    database:process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,

    ssl : {
            ca: fs.readFileSync(path.join(__dirname, "../ca.pem"))
    },
    enableKeepAlive : true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

