const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// session redis
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./config/db')

const { isProd } = require('./untils/env')

const { SESSION_SECRECT_KEY } = require('./config/secrectkeys')

const path = require('path')


const atApiRouter = require('./routes/api/blog-at')
const squareApiRouter = require('./routes/api/blog-square')
const profileApiRouter = require('./routes/api/blog-profile')
const blogHomeApiRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsApiRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

let onerrorConf = {}
if (isProd) {
    
    onerrorConf = {
        redirect: '/error'  
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(path.join(__dirname, '..', 'uploadfiles'))) // 标准路径拼接

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session
app.keys = [SESSION_SECRECT_KEY] 

app.use(session({
    key: 'weibo.sid',  
    prefix: 'weibo:sess:', 
    cookie: {
        path: '/',
        httpOnly: true,     
        maxAge: 24 * 60 * 60 * 1000,  
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))



// routes
app.use(atApiRouter.routes(), atApiRouter.allowedMethods())
app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 注册的时候包含404的路由一定要写到最下面，声明的时候可以写到前面

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
