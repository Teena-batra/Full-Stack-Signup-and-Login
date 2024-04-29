//const express = require("express")
import express from "express";
//const cors = require("cors");
import cors from "cors";
//const db = require("./db");
import createPool from "./db.js";
//const insertion = require("./controllers/userController");
import insertion from "./controllers/userController.js";
//const login = require("./controllers/userController");
import login from "./controllers/userController.js";
import Razorpay from "razorpay";
import paymentRoute from "./server/routes/paymentRoutes.js"
import { checkout, paymentverification } from "./server/controllers/paymentController.js";


createPool();

export const instance = new Razorpay({
    key_id: "rzp_test_Kdyk1w4BAGSu8x",
    key_secret: "TFtlGXHAAIIsqSRVk2eaLNFA",
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//const router = express.Router();

app.use(cors());

app.post("/signup", insertion.insertion)

app.post("/login",login.login)

app.use("/api",paymentRoute);
app.post("/checkout",checkout);
app.post("/paymentverification", paymentverification);

app.get("/api/getkey", (req,res)=>res.status(200).json({key: "rzp_test_Kdyk1w4BAGSu8x"}))



app.listen(process.env.PORT, ()=> {
    console.log(` Login Server is listening on port: ${process.env.PORT}`);
})