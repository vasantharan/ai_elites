const {otp} = require('../models/otp')
const { mailer } = require('./mailer')

module.exports.sendOTP = async (email, name) => {
    try { 
        const otpval = Math.floor(1000 + Math.random() * 9000)
        const newotp = new otp({
            email,
            otp: otpval,
            expireAt: new Date(Date.now() + 5 * 60 * 1000)
        })  
        await newotp.save() 
        sub = 'OTP Code for Account Verification'
        htm = `
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Welcome to Our Service</h1>
            </div>
            <div style="padding: 20px; line-height: 1.6; color: #333;">
                <h2 style="font-size: 20px; margin-bottom: 10px;">Hello, ${name}</h2>
                <p>Your One-Time Password (OTP) is:</p>
                <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: #ffffff; text-align: center; border-radius: 5px; font-size: 20px;">
                ${otpval}
            </div>
                <p>Please use this OTP to complete your verification. If you did not request this, please disregard this email.</p>
                <p>Thank you, <br>The AI Elites Team</p>
            </div>
            <div style="background-color: #eeeeee; padding: 10px; text-align: center; font-size: 12px; color: #777;">
                <p>&copy; 2024 AI Elites. All rights reserved.</p>
                <p>If you have any questions, feel free to <a href="mailto:ai.elites.chat@gmail.com" style="color: #4CAF50; text-decoration: none;">contact our support team</a>.</p>
            </div>
        </div>
        `
        await mailer (email, sub, htm)
        console.log(`OTP sent to ${email}: ${otpval}`);
    }
    catch(error) {
        console.error('Error Sending OTP: ', error)
    }
}

