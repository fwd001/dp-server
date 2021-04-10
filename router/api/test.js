const Router = require('koa-router')

const router = new Router()

// test
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = { msg: 'test...' }
})


module.exports = router.routes()