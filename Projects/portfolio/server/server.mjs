import express from 'express'
import { connect } from './controllers/connect.mjs'
import { config } from 'dotenv'
import { addUser } from './controllers/user.mjs'
import cors from 'cors'
import { getLogin } from './controllers/getLogin.mjs'
config()
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000

//connect to mongo db
connect()

// routing
app.post('/user', addUser)
app.post('/login',getLogin)



//server listening
app.listen(port, () => {
    console.log(`The server is listening in the port of ${port}`)
})