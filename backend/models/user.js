const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createCanvas } = require('canvas');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const stream = require('stream');
const { type } = require('os');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    if (!this.profilePhoto) {
        const initials = this.name.split(' ').map(n => n.slice(0, 2).toUpperCase()).join('')
        const canvas = createCanvas(200, 200)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#171717'
        ctx.fillRect(0, 0, 200, 200)
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 50px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(initials, 100, 100)
        const buffer = canvas.toBuffer('image/png')
        const imageDir = path.resolve(__dirname, '../images')
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true })
        }
        const tempImagePath = path.join(imageDir, 'temp_profile.png')
        fs.writeFileSync(tempImagePath, buffer)
        const uploadImageToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
                const readableStream = new stream.PassThrough()
                readableStream.end(buffer)
                readableStream.pipe(uploadStream)
            })
        }
        try {
            const result = await uploadImageToCloudinary()
            this.profilePhoto = result.secure_url
            next()
        } catch (error) {
            console.error('Upload Error:', error);
            next(error)
        }
    }
})

module.exports.user = mongoose.model('user', userSchema);