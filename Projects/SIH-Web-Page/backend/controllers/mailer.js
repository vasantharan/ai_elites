const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config({
    path: '../.env'
})

module.exports.mailer = async(email, sub, htm) => {
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com", 
        port: 465, 
        auth: { 
            user: process.env.system_mail,
            pass: process.env.system_pass
        }
    });
    const mailops = {
        from: "AI Elites <process.env.system_mail>",
        to: email,
        subject: sub,
        html: htm, 
    }
    await transport.sendMail(mailops) 
}
