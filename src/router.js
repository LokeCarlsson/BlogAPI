import { login, register} from './controllers/authentication'
import express from 'express'
import passportService from './config/passport'
import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const REQUIRE_ADMIN = "Admin"
const REQUIRE_MEMBER = "Member"

function router (app) {
  const router = express.Router()

  router.post('/register', register)
  router.get('/register', (req, res, next) => {
    res.status(405).send('Post on this URL to register!')
  })

  router.post('/login', requireLogin, login)
  router.get('/login', (req, res, next) => {
    res.status(405).send('Post on this URL to login!')
  })

  router.get('/protected', requireAuth, (req, res, next) => {
    res.status(200).send('This URL is protected!')
  })

  router.get('/secret', requireAuth, (req, res, next) => {
    res.status(200).send('This URL is secret!')
  })

  app.use('/', router)
}


export default router
