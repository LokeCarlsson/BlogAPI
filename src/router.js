import { login, register, roleAuthorization } from './controllers/authController'
import { post, getPosts, getUserPosts, getUserIdPosts } from './controllers/postController'
import passportService from './config/passport'
import express from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const REQUIRE_ADMIN = "Admin"
// const REQUIRE_MEMBER = "Member"

function router (app) {
  const router = express.Router()

  router.post('/register', register)
  router.get('/register', (req, res) => {
    res.status(405).send('Post on this URL to register!')
  })

  router.post('/login', requireLogin, login)
  router.get('/login', (req, res) => {
    res.status(405).send('Post on this URL to login!')
  })

  router.get('/protected', requireAuth, (req, res) => {
    res.status(200).send('This URL is protected!')
  })

  router.get('/secret', requireAuth, (req, res) => {
    res.status(200).send('This URL is secret!')
  })

  router.get('/admin', requireAuth, roleAuthorization(REQUIRE_ADMIN), (req, res) => {
    res.status(200).send('This URL is only for admins!')
  })

  router.post('/post', requireAuth, post)

  router.get('/posts', getPosts)
  router.get('/posts/:username', getUserPosts)
  router.get('/posts/id/:userId', getUserIdPosts)


  app.use('/', router)
}


export default router
