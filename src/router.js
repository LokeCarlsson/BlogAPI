import { login, register} from './controllers/authentication'
import express from 'express'
import passportService from './config/passport'
import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const REQUIRE_ADMIN = "Admin"
const REQUIRE_OWNER = "Owner"
const REQUIRE_CLIENT = "Client"
const REQUIRE_MEMBER = "Member"

function router (app) {
  const router = express.Router()

  router.post('/register', register)
  router.get('/register', (req, res, next) => {
    res.status(200).send('Registration!')
  })

  router.post('/login', requireLogin, login)
  router.get('/login', (req, res, next) => {
    res.status(200).send('Login!')
  })

  app.use('/', router)
}


export default router
