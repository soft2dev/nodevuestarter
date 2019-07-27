const Router = require('koa-router')

const signup = new Router()

signup.post('/', (ctx) => {
  const { body } = ctx.request
  const { email } = body 
  console.log('body', body)
  ctx.body = `${email}! routing setting is OK`
})
  
module.exports = signup