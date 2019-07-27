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
app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

// set router
router.use('/api', api.routes())

// listen
app.listen(port, async () => {
    console.log(`Server is listening to port ${port}`)
})
