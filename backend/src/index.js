require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

// load environment variables
const {
    PORT: port
} = process.env

const cors = require('@koa/cors')
const router = new Router()

// Router handler
const api = require('./api')
const db = require('./db')
const jwtMiddleware = require('lib/middlewares/jwt')

db.connect()

// create app for koa
const app = new Koa()

app.use(jwtMiddleware)
app.use(bodyParser())
app.use(cors())
app.use((ctx, next) => {
    const allowedHosts = [
        'http://localhost:8080'
    ]
    const origin = ctx.header['origin']
    allowedHosts.every(el => {
        if (!origin) return false
        if (origin.indexOf(el) !== -1) {
            ctx.response.set('Access-Control-Allow-Origin', origin)
            return false
        }
        return true
    })
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-timebase, Link')
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS')
    ctx.set('Access-Control-Expose-Headers', 'Link')
    return next()
})
app.use(router.routes())
app.use(router.allowedMethods())

// set router
router.use('/api', api.routes())

// listen
app.listen(port, async () => {
    console.log(`Server is listening to port ${port}`)
})
