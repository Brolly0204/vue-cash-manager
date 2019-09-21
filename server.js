const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const cors = require('koa2-cors')
const { mongoURI } = require('./config/keys')
const userRouter = require('./routes/api/users')
const profileRouter = require('./routes/api/profiles')

const app = new Koa()
const router = new Router()
const PORT = process.env.PORT || 7000

// app.use(cors())
// app.use(cors({
//   origin(ctx) {
//     if (ctx.url === '/test') {
//       return false;
//     }
//     return '*';
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   preflightContinue: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));
app.use(bodyParser())

mongoose
  .connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch((err) => console.log(err))

// passport initialize
app.use(passport.initialize())
require('./config/passport')(passport)

app.use(router.routes()).use(router.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(profileRouter.routes()).use(profileRouter.allowedMethods())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
