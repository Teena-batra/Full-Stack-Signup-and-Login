import mysql from "mysql2";

CREATE DATABASE IF NOT EXISTS Razorpay;
USE RazorPay;
show tables;
USE RazorPay;


CREATE TABLE payment(
    razorpay_order_id VARCHAR(255) NOT NULL,
    razorpay_payment_id VARCHAR(255) NOT NULL,
    razorpay_signature VARCHAR(255) NOT NULL
);