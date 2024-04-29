// // const db = require("../db");
// // const mysql = require("mysql2/promise");
// // const bcrypt = require('bcrypt');
// // const jwt = require("jsonwebtoken");
// // const dotenv = require("dotenv");

import createPool from "../db.js";
//import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



// generate token
const generateToken = async (userObj) => {
    try{
        const payload = {
            id: userObj.u_id,
            username: userObj.Username,
        };
        return jwt.sign(payload,process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES_IN});
    }catch(error) {
        console.log("Error at generate token method", error);
        throw error;
    }
};

const insertion = async(req,res) => {
    try {
        //console.log("req",req.body)
        const {username, email, password} = req.body;
        //console.log("in Insertion")
        const connection = await createPool();
         // Check if the email already exists in the database
         const emailExistsQuery = `SELECT * FROM signup WHERE Email = ?`;
         const emailExistsValues = [email];
         const [existingRows] = await connection.query(emailExistsQuery, emailExistsValues);
 
         if (existingRows.length > 0) {
             return res.status(400).json({ error: "Email already exists" });
           // alert("Email already exists");
         }

        //encrypting password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO signup(Username, Email, Password ) VALUES(?,?,?)`
        const values = [username,email,hashedPassword];
        //const connection = await db.createPool(); // Assuming connectDB returns the pool
        const [row] = await connection.query(query, values)
    
        if(row.affectedRows === 0){
            throw new Error(400,"Failed to insert data");
        }else{
            return res.status(200).json(row);
        }
    } catch (error) {
        console.error("Error in insertion:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }
}


const login = async(req,res)=> {
    try {
       // console.log("req",req.body)
        const {email, password} = req.body;
        console.log("in login")
        const query = `SELECT * FROM signup WHERE email=? AND password=?`
        const values = [email,password];
        const connection = await createPool(); // Assuming connectDB returns the pool
        console.log("dbCon")
        const [row] = await connection.query(query, values)
    
        if(row.length === 0){
            throw new Error(400,"Invalid email or password");
        }

        const user = row[0];
        console.log(user);
        // Generate token and sending it to user in cookie
        const token = await generateToken(user);
        user.token = token;
        user.Password = undefined;
        console.log("Final user obj", user);

        const cookieOptions = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
            httpOnly: true,
            secure: true,
        }
        return res.status(200).cookie("token",token, cookieOptions).json("Success");
        //return res.status(200).json("Success")
        
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }

}

// module.exports = {
//     insertion,
//     login
// }
export default {
    insertion,
    login
}







// import createPool from "../db.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// // Generate token
// const generateToken = async (userObj) => {
//     try {
//         const payload = {
//             id: userObj.u_id,
//             username: userObj.Username,
//         };
//         return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
//     } catch (error) {
//         console.log("Error at generate token method", error);
//         throw error;
//     }
// };

// const insertion = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const connection = await createPool();

//         // Check if the email already exists in the database
//         const emailExistsQuery = `SELECT * FROM signup WHERE Email = ?`;
//         const emailExistsValues = [email];
//         const [existingRows] = await connection.execute(emailExistsQuery, emailExistsValues);

//         if (existingRows.length > 0) {
//             return res.status(400).json({ error: "Email already exists" });
//         }

//         // Encrypting password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const query = `INSERT INTO signup(Username, Email, Password ) VALUES(?,?,?)`;
//         const values = [username, email, hashedPassword];
//         const [row] = await connection.execute(query, values);

//         if (row.affectedRows === 0) {
//             throw new Error(400, "Failed to insert data");
//         } else {
//             return res.status(200).json(row);
//         }
//     } catch (error) {
//         console.error("Error in insertion:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log("in login");
//         const query = `SELECT * FROM signup WHERE email=? AND password=?`;
//         const values = [email, password];
//         const connection = await createPool();
//         console.log("dbCon");
//         const [row] = await connection.execute(query, values);

//         if (row.length === 0) {
//             throw new Error(400, "Invalid email or password");
//         }

//         const user = row[0];
//         console.log(user);
//         // Generate token and sending it to user in cookie
//         const token = await generateToken(user);
//         user.token = token;
//         user.Password = undefined;
//         console.log("Final user obj", user);

//         const cookieOptions = {
//             expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//             httpOnly: true,
//             secure: true,
//         };
//         return res.status(200).cookie("token", token, cookieOptions).json("Success");
//     } catch (error) {
//         console.error("Error in login:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

// export  {
//      insertion,
//       login 
//     }
