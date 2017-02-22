import { login, register, roleAuthorization } from './controllers/authController'
import { post, getAllPosts, getUserPosts, getUserIdPosts, deletePost, getPosts, editPost } from './controllers/postController'
import { registerHook, viewHook, editHook, deleteHook } from './controllers/hookController'
import passportService from './config/passport'
import contentType  from './middlewares/contentType'
import express from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const REQUIRE_ADMIN = "Admin"
// const REQUIRE_MEMBER = "Member"

function router (app) {
  const router = express.Router()

  router.post('/register', contentType, register)
  router.get('/register', (req, res) => {
    res.status(405).send('Post on this URL to register!')
  })

  router.post('/login', requireLogin, contentType, login)
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

  router.post('/post', requireAuth, contentType, post)
  router.delete('/posts/:postId', requireAuth, deletePost)
  router.put('/posts/:postId', requireAuth, contentType, editPost)
  router.get('/posts', requireAuth, getPosts)
  router.get('/posts/all', getAllPosts)
  router.get('/posts/:username', getUserPosts)
  router.get('/posts/id/:userId', getUserIdPosts)

  router.post('/hook', requireAuth, contentType, registerHook)
  router.delete('/hook/:hookId', requireAuth, deleteHook)
  router.put('/hook/:hookId', requireAuth, contentType, editHook)
  router.get('/hook', requireAuth, viewHook)

  router.get('/test', requireAuth, (req, res) => {
    res.status(200).json(req.user)
  })

  app.use('/', router)
}


export default router
