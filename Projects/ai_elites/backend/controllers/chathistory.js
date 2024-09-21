const {Prompt} = require('../models/chatschema')
const {user} = require('../models/user')

module.exports.chatHistory = async (req, res) => {
    try {
        const u = await user.findOne({email: req.user.email})
        const chathis = await Prompt.find({user: u._id}, {_id: 1, title: 1})
        const response = chathis.map(chat => ({
            id: chat._id.toString(),
            title: chat.title
        }))
        res.send({history: response})
    } catch (error) {
        console.error('Error getting history: ', error)
        return res.send('Internal server error')
    }
}