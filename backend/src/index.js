require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')

// load environment variables
const {
    PORT: port,
    MONGO_URI: mongoURI
} = process.env

console.log('mongodbURI', mongoURI)
// create app for koa
const app = new Koa()
const cors = require('@koa/cors')
const router = new Router()

// Router handler
const api = require('./api')

// MongoDB Configuration
mongoose.promise = global.Promise
mongoose.connect(mongoURI, {
    useNewUrlParser: true
}).then(
    () => {
        console.log('Successfully connected to mongodb')
    }
).catch(e => {
    console.log(e)
})

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
