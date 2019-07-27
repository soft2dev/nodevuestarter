const mongoose = require('mongoose')
require('mongoose-double')(mongoose)

const {
    MONGO_URI: mongoURI
} = process.env

module.exports = (function () {
    mongoose.Promise = global.Promise

    return {
        connect () {
            return mongoose.connect(mongoURI, { useNewUrlParser: true }).then(
                () => {
                    console.log('Successfully connected to mongodb')
                }
            ).catch(e => {
                console.error(e)
            })
        },
        disconnect () {
            return mongoose.disconnect()
        }
    }
})()