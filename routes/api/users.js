const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('koa-passport')
const UserModel = require('../../models/User')
const { secretOrKey } = require('../../config/keys')

const router = new Router({
  prefix: '/api/users'
})

/**
 * POST /api/users/register
 */
router.post('/register', async (ctx) => {
  const {
    name, email, password, identity
  } = ctx.request.body
  const result = await UserModel.findOne({ email })
  if (result) {
    ctx.throw(400, '邮箱已被注册')
    // ctx.body = {
    //   code: 1,
    //   message: '邮箱已被注册!'
    // }
    return
  }

  // 密码加盐
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

  const newUser = new UserModel({
    name,
    email,
    avatar,
    identity,
    password: hash
  })
  const user = await newUser.save()
  ctx.body = {
    code: 0,
    data: {
      name: user.name,
      email: user.email,
      identity: user.identity
    }
  }
})

/**
 * POST /api/users/login
 * return token
 */
router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    return ctx.throw(400, '用户不存在')
  }

  const isMatch = bcrypt.compareSync(password, user.password)
  if (isMatch) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        identity: user.identity
      },
      secretOrKey,
      {
        expiresIn: '6h'
      }
    )
    ctx.body = {
      code: 0,
      token: `Bearer ${token}`,
      msg: 'success'
    }
  } else {
    ctx.throw(400, '密码错误')
  }
})

/**
* @route POST api/profiles/current
* @desc token效验
* @access Private
*/
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (ctx) => {
    console.log(ctx.isAuthenticated())
    const {
      id,
      name,
      email,
      avatar,
      identity
    } = ctx.state.user
    ctx.body = {
      id,
      name,
      email,
      avatar,
      identity
    }
  }
)

module.exports = router
