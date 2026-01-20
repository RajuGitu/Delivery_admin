// utils/mail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
    console.log("ENV IN MAIL FILE:", process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    });
};

module.exports = sendMail;
