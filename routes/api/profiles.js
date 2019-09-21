const Router = require('koa-router')
const passport = require('koa-passport')
const ProfileModel = require('../../models/Profile')

const router = new Router({
  prefix: '/api/profiles'
})

/**
* @route POST api/profiles/add
* @desc 创建信息接口
* @access Private
*/
router.post('/add', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const profileFields = {}
  const fields = Object.keys(ctx.request.body)
  fields.forEach((key) => {
    if (ctx.request.body[key]) {
      profileFields[key] = ctx.request.body[key]
    }
  })

  const profile = await new ProfileModel(profileFields).save()
  ctx.body = {
    ...profile,
    msg: '数据添加成功'
  }
})


/**
* @route POST api/profiles
* @desc 获取所有信息
* @access Private
*/

router.get('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const profiles = await ProfileModel.find()
  if (profiles) {
    ctx.body = profiles
  } else {
    ctx.throw(400, '没有任何内容')
  }
})


/**
* @route POST api/profiles/:id
* @desc 获取单个信息
* @access Private
*/
router.get('/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const profile = await ProfileModel.findById(ctx.params.id)
  if (profile) {
    ctx.body = profile
  } else {
    ctx.throw(400, '没有任何内容')
  }
})

/**
* @route POST api/profiles/edit/:id
* @desc 编辑信息
* @access Private
*/

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const profileFields = {}
  const fields = Object.keys(ctx.request.body)

  fields.forEach((key) => {
    if (ctx.request.body[key]) {
      profileFields[key] = ctx.request.body[key]
    }
  })

  const profile = await ProfileModel.findByIdAndUpdate(ctx.params.id, profileFields, {
    new: true
  })

  if (profile) {
    ctx.body = {
      ...profile,
      msg: '数据编辑成功'
    }
  } else {
    ctx.throw(400, '编辑失败')
  }
})

/**
* @route POST api/profiles/delete/:id
* @desc 删除信息接口
* @access Private
*/

router.delete('/delete/:id', async (ctx) => {
  const profile = await ProfileModel.findByIdAndRemove(ctx.params.id)
  console.log(profile)
  if (profile) {
    ctx.body = {
      ...profile,
      msg: '删除成功！'
    }
  } else {
    ctx.throw(400, '删除失败')
  }
})

module.exports = router
