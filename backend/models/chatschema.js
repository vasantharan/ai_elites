const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const PromptSchema = new Schema({
    title: {
        type: String,
        default: "New chat"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    isEmpty: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports.Prompt = mongoose.model('Prompt', PromptSchema)