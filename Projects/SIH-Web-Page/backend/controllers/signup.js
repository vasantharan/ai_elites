const {user} = require('../models/user')
const {sendOTP} = require('./otpservice')

module.exports.signup = async (req, res) => {
    try {
        const existingAccount = await user.findOne({email: req.body.email})
        if (existingAccount) {
            return res.send('Account already exists')
        }
        const u = new user(req.body)
        res.cookie('email', req.body.email, {maxAge: 20 * 60 * 1000, httpOnly: false})
        await sendOTP(req.body.email, req.body.name)
        await u.save()
        res.status(201).send('Sign up and OTP generation Successful')
    } catch (error) {
        console.error('Error during signup: ', error)
        res.send('Internal Server Error')
    }
}