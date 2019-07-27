const jwt = require('jsonwebtoken')
const { JWT_SECRET: secret } = process.env

function generateToken(payload, subject) {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(payload, secret, {
                issuer: 'soft2dev',
                expiresIn: '7d',
                subject
            }, (error, token) => {
                if (error) reject(error)
                resolve(token)
            })
        }
    )
}

exports.generateToken = generateToken