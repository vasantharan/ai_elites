const {Prompt} = require('../models/chatschema')
const {user} = require('../models/user')

module.exports.chatRetrive = async (req, res) => {
    try {
        const u = await user.findOne({email: req.user.email})
        const message = await Prompt.findOne({_id: req.body.chatid, user: u._id}, {title: 1, messages: 1})
        const rpm = message.messages.map(c => ({
            role: c.role,
            content: c.content
        }))
        const ret = {
            title: message.title,
            messages: rpm
        }
        res.cookie('chatid', message._id.toString(), {maxAge: 24 * 60 * 60 * 1000})
        return res.send(ret)
    } catch (error) {
        console.error('Error retriving the message: ', error)
        return res.send("Internal Server Error")
    }
}