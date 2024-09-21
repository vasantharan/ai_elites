const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const user_router = require('./routes/user_route')
const cookie = require('cookie-parser')
const app = express()

dotenv.config({
    path: './.env'
})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json()) 
app.use(cookie())
app.use('/', user_router)

mongoose.connect(process.env.db_url) 
.then(()=>{console.log('DB successfully connected')})

app.listen(5000, () => {
    console.log('Listening in the port 5000')
})

require('./trigger/otpdel')
require('./trigger/userdel')
require('./trigger/chatdel')