const Joi = require('joi')
const User = require('db/models/User')
const token = require('lib/token')

exports.localRegister = async (ctx) => {

    const { body } = ctx.request

    const schema = Joi.object({
        displayName: Joi.string().regex(/^[a-zA-Z0-9]{3,12}$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    })

    const result = Joi.validate(body, schema)

    if (result.error) {
        ctx.status = 400
        return
    }

    const { displayName, email, password } = body

    try {
        const exists = await User.findExistancy({
            displayName,
            email
        })

        if (exists) {
            ctx.status = 409
            const key = exists.email === email ? 'email' : 'displayName'
            ctx.body = {
                key
            }
            return
        }

        const user = await User.localRegister({
            displayName,
            email,
            password
        })
        ctx.body = user
        const accessToken = await token.generateToken({
            _id: user._id,
            displayName
        }, 'user')

        // configure accessToken to httpOnly cookie
        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 24 * 7
        })
    } catch (e) {
        ctx.throw(500)
    }
}

exports.localLogin = async (ctx) => {
    const { body } = ctx.request

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    })

    const result = Joi.validate(body, schema)

    if (!result.error) {
        ctx.status = 400
        return
    }

    const { email, password } = body

    try {
        // find user
        const user = await User.findByEmail(email)
        if (!user) {
            // User does not exist
            ctx.status = 403
            return
        }

        const validated = user.validatePassword(password)
        if (!validated) {
            // wrong password
            ctx.status = 403

        }

        const accessToken = await user.generateToken()

        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 24 * 7
        })

    } catch (e) {
        ctx.throw(e)
    }
}