const Koa = require('koa')
const Router = require('koa-router')
// 实例化
const app = new Koa()
const router = new Router()
// 创建实例 引入socket.io模块并绑定到服务器
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server, { cors: true })

// 引入test路由
const test = require('./router/api/test')

const socketCallback = require('./socket/index')

// socket连接
io.of('/client').on('connection', socketCallback);

// 解决跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});


// 路由监听
router.use('/api', test)
router.get('/', async ctx => {
    ctx.status = 200
    ctx.body = { msg: 'home' }
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods())


// 端口
const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`[demo] start-quick is starting at port ${port}`)
})