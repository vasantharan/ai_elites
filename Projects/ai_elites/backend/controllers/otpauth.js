const {otp} = require('../models/otp')
const {user} = require('../models/user')
const send = require('./otpservice')
const {mailer} = require('./mailer')

module.exports.verifyOTP = async (req, res) => {
    try {
        const { otp: inputOtp } = req.body;
        const { email } = req.cookies;
        const otpRecord = await otp.findOne({ email, otp: inputOtp });
        if (!otpRecord) {
            return res.status(400).send('Invalid or expired OTP');
        }
        if (otpRecord.expireAt < new Date()) {
            await otp.deleteOne({ email, otp: inputOtp });
            return res.status(400).send('OTP has expired');
        }
        const userRecord = await user.findOne({ email });
        if (userRecord) {
            userRecord.verified = true;
            await userRecord.save();
            await otp.deleteOne({ email, otp: inputOtp });
            const sub = 'Chatbot'
            const htm = `<p>Congratulations!<br/>Your Account have been verified. </p>`
            await mailer(email, sub, htm)
            return res.status(201).send('User verification successfull');
        }    
        await otp.deleteOne({ email, otp: inputOtp })
        res.status(404).send('User not found');
    } catch (error) {
        console.error('Error during OTP verification: ', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.resendOtp = async(req,res) => {
    try {
        const {email} = req.cookies
        await send.sendOTP(email)
        res.send('Resend OTP successfull') 
    }
    catch(error) {
        console.error('Error sending otp: ', error)
        res.send('Internal Server Error')
    }
}