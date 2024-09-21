const axios = require('axios');
const { Prompt } = require('../models/chatschema');
const { user } = require('../models/user');

const generateTitle = (prompt) => {
    const title = prompt.trim()
                        .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .replace(/[^a-zA-Z0-9 ]/g, '')
    return title
}

module.exports.chat = async (req, res) => {
    try {
        console.log('Request received');
        const newMessage = await Prompt.findOne({_id: req.cookies.chatid})
        if ( newMessage.title === "New chat" && newMessage.isEmpty) {
            const title = generateTitle(req.body.prompt)
            newMessage.title = title
            newMessage.isEmpty = false
        }
        newMessage.messages.push({
            role: "user",
            content: req.body.prompt
        })
        await newMessage.save()
        const prompt = newMessage.messages.map(chat => ({
            role: chat.role,
            content: chat.content
        }))
        const apiResponse = await axios.post('http://127.0.0.1:8000/chat', {
            message: prompt
        })
        console.log('External API called successfully');
        newMessage.messages.push({
            role: "assistant",
            content: apiResponse.data
        })
        await newMessage.save()
        res.send(JSON.stringify(apiResponse.data))
    } catch (error) {
        console.error('Error calling the API:', error);
        res.status(500).send('Error occurred while processing your request.');
    }
}

module.exports.newChat = async (req, res) => {
    try {
        const account = await user.findOne({email: req.user.email})
        const newChat = new Prompt({
            user: account._id
        })
        await newChat.save()
        res.cookie('chatid', newChat._id.toString(), {maxAge: 24 * 60 * 60 * 1000})
        res.send('New chat creation successfull')
    } catch (error) {
        console.error('Error creating new chat:', error)
        res.send('Error occured while creating new caht')
    }
}