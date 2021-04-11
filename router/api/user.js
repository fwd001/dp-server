const Router = require('koa-router')
const { addschema } = require('../../utools/validate')
const rooms = require('../../funcClass/room')

const router = new Router()

// test
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = { msg: 'test...' }
})

/**
 * @description 用户加入房间接口
 * @access 公开的
 * @param roomId number
 * @param username  string
 * 
 */
router.post('/add', async ctx => {
    const { body = {} } = ctx.request
    ctx.status = 200
    // 校验参数
    const { error, value } = addschema.validate(body)
    if (error) {
        ctx.status = 422
        const message = error.details[0].message
        ctx.body = { message }
    } else { // 校验通过
        const { roomId, username } = body
        console.log(roomId, username);
        const room = rooms.push(roomId)
        room.add(username)
        ctx.body = {
            id: room.id,
            playerList: room.playerList
        }
    }
})



module.exports = router.routes()