import mysql from "mysql2/promise";
//import {config} from "dotenv";

//config({path: "./config/config.env"});
//dotenv.config();

export const connectDB = async(req,res) => {
    console.log("HOST1",process.env.HOST)

        try{
            const pool = mysql.createPool({
                host: "localhost",
                user: "root",
                password: "",
                database: "razorpay"
            });
            console.log("Razorpay connection established");
            return pool;
        }catch(err){
            console.log("Razorpay connection error",err);
            process.exit(1);
        }
}
// const db = await connectDB();
export default connectDB;