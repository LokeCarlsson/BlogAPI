import passport from 'passport'
import user from '../models/userModel'
import config from './main'
import LocalStrategy from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const localOptions = {
  usernameField: 'username',
  passwordField: 'password'
}

const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  if (!username)
    return res.status(422).send({
      error: 'You must provide an username.'
    })

  if (!password)
    return res.status(422).send({
      error: 'You must provide a password.'
    })

  user.findOne({ username }, (err, user) => {
    if (err)
    return done(err)

    if (!user)
    return done(null, false, { error: 'Your login details could not be verified. Please try again.' })

    user.comparePassword(password, (err, isMatch) => {
      if (err)
      return done(err)

      if (!isMatch)
      return done(null, false, { error: 'Your login details could not be verified. Please try again.' })

      return done(null, user)
    })
  })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  user.findById(payload._id, (err, user) => {
    if (err)
    return done(err, false)

    if (user)
    done(null, user)
    else
    done(null, false)
  })
})

passport.use(jwtLogin)
passport.use(localLogin)
