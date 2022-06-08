const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
        session: false
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email })
          if (!user) {
            return done(null, false, req.flash('warning_msg', 'Email或密碼輸入錯誤'))
          }
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
            return done(null, false, req.flash('warning_msg', 'Email或密碼輸入錯誤'))
          }
          return done(null, user)
        } catch (error) {
          done(error, false)
        }
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json
          const user = await User.findOne({ email })
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(randomPassword, salt)
          const newUser = await User.create({
            fullName: name,
            userName: name,
            email,
            password: hash,
            phone: 'default',
            emergencyContactName: 'default',
            emergencyContactPhone: 'default'
          })
          return done(null, newUser)
        } catch (error) {
          done(error, false)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}
