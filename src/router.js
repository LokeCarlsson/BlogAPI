import { login, register, roleAuthorization } from './controllers/authController'
import { post, getAllPosts, getUserPosts, getUserIdPosts, deletePost, getPosts, editPost, getIdPost } from './controllers/postController'
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

  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to my API',
      register: 'http://' + req.headers.host + '/register',
      login: 'http://' + req.headers.host + '/login'
    })
  })

  router.post('/register', contentType, register)
  router.get('/register', (req, res) => {
    res.status(405).send('Post on this URL to register!')
  })

  router.post('/login', requireLogin, contentType, login)
  router.get('/login', (req, res) => {
    res.status(405).send('Post on this URL to login!')
  })

  router.post('/post', requireAuth, contentType, post)
  router.delete('/posts/:postId', requireAuth, deletePost)
  router.put('/posts/:postId', requireAuth, contentType, editPost)
  router.get('/posts', requireAuth, getPosts)
  router.get('/posts/all', getAllPosts)
  router.get('/posts/:username', getUserPosts)
  router.get('/posts/id/:userId', getUserIdPosts)
  router.get('/post/:postId', getIdPost)


  router.post('/hook', requireAuth, contentType, registerHook)
  router.delete('/hook/:hookId', requireAuth, deleteHook)
  router.put('/hook/:hookId', requireAuth, contentType, editHook)
  router.get('/hook', requireAuth, viewHook)

  router.post('/test', (req, res) => {
    console.log('New post from hook:')
    console.log(req.body)
  })

  app.use('/', router)
}

export default router
