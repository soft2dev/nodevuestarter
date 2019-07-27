const mongoose = require('mongoose')
const { Schema } = mongoose
const crypto = require('crypto')
const token = require('lib/token')

const { PASSWORD_HASH_KEY: secret } = process.env

function hash(passowrd) {
    return crypto.createHmac('sha256', secret).update(passowrd).digest('hex')
}

console.log(hash('1234'))

const User = new Schema({
    displayName: String,
    email: String,
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        },
        github: {
            id: String,
            accessToken: String
        },
        password: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        metaInfo: {
            activated: {
                type: Boolean,
                default: false
            }
        }
    }
})

User.statics.findByEmail = function(email) {
    return this.findOne({ email }).exec()
}

User.statics.findByEmail = function(displayName) {
    return this.findOne({ displayName }).exec()
}

User.statics.findExistancy = function({ email, displayName }) {
    return this.findOne({
        $or: [
            { email },
            { displayName }
        ]
    })
}

User.statics.localRegister = function({ displayName, email, password }) {
    const user = new this({
        displayName,
        email,
        password: hash(password)
    })
    return user.save()
}

User.methods.validatePassword = function(password) {
    const hashed = hash(password)
    return this.password === hashed
}

User.methods.generateToken = function() {
    const { _id, displayName } = this
    return token.generateToken({
        user: {
            _id,
            displayName
        }
    }, 'user')
}

module.exports = mongoose.model('User', User)