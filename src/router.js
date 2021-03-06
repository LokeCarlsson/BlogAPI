import { login, register, roleAuthorization } from './controllers/authController'
import { post, getAllPosts, getUserPosts, getUserIdPosts, deletePost, getPosts, editPost, getIdPost } from './controllers/postController'
import { registerHook, viewHook, editHook, deleteHook } from './controllers/hookController'
import passportService from './config/passport'
import contentType  from './middlewares/contentType'
import loginCheck  from './middlewares/loginCheck'
import express from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

const REQUIRE_ADMIN = "Admin"
// const REQUIRE_MEMBER = "Member"

function router (app) {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to my API',
      register: 'http://' + req.headers.host + '/register',
      login: 'http://' + req.headers.host + '/login'
    })
  })

  // Register
  router.post('/register', contentType, loginCheck, register)
  router.get('/register', (req, res) => {
    res.status(405).send('Post on this URL to register!')
  })

  // Login
  router.post('/login', contentType, loginCheck, requireLogin, login)
  router.get('/login', (req, res) => {
    res.status(405).send('Post on this URL to login!')
  })

  // Individual posts
  router.post('/post', requireAuth, contentType, post)
  router.get('/post/:postId', getIdPost)
  router.delete('/post/:postId', requireAuth, deletePost)
  router.put('/post/:postId', requireAuth, contentType, editPost)

  // User posts
  router.get('/posts', requireAuth, getPosts)
  router.get('/posts/all', getAllPosts)
  router.get('/posts/:username', getUserPosts)
  router.get('/posts/id/:userId', getUserIdPosts)

  // Hooks
  router.post('/hook', requireAuth, contentType, registerHook)
  router.delete('/hook/:hookId', requireAuth, deleteHook)
  router.put('/hook/:hookId', requireAuth, contentType, editHook)
  router.get('/hook', requireAuth, viewHook)

  // Incoming hook events
  router.post('/test', (req, res) => {
    console.log('New post from hook:')
    console.log(req.body)
  })

  router.get('*', (req, res) => {
    res.status(404).send('Not found')
  })

  app.use('/', router)
}

export default router
