const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { secretOrKey } = require('../config/keys')
const UserModel = require('../models/User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secretOrKey

module.exports = function(passport) {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await UserModel.findById(jwt_payload.id)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  )
}
