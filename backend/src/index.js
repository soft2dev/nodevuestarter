require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

// load environment variables
const {
  PORT: port
} = process.env

// create app for koa
const app = new Koa()
const cors = require('@koa/cors')
const router = new Router()

// Router handler
const signup = require('./signup')
const api = require('./api')

app.use(cors())
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

// set router
router.use('/signup', signup.routes())
router.use('/api', api.routes())

// listen
app.listen(port, async () => {
  console.log(`Server is listening to port ${port}`)
})
