const express = require('express')
const {signup} = require('../controllers/signup')
const { chat, newChat } = require('../controllers/chatprompt')
const { login } = require('../controllers/login')
const { resendOtp, verifyOTP } = require('../controllers/otpauth')
const {isUserAuth} = require('../middleware/authenciation')
const { userDetails } = require('../controllers/userdetail')
const { chatHistory } = require('../controllers/chathistory')
const { chatRetrive } = require('../controllers/chatretrive')

const user_router = express.Router()

user_router.post('/signup', signup)
user_router.post('/signin', login)
user_router.post('/verifyotp', verifyOTP)
user_router.get('/resendotp', resendOtp)
user_router.post('/chat', isUserAuth, chat)  //completed
user_router.get('/newchat', isUserAuth, newChat) //completed
user_router.get('/userdet', isUserAuth, userDetails) 
user_router.get('/chathis', isUserAuth, chatHistory)
user_router.post('/message', isUserAuth, chatRetrive)

module.exports = user_router