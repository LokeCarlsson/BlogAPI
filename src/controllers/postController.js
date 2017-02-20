import Post from '../models/postModel'
import User from '../models/userModel'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

function post(req, res, next) {
  const image = req.body.image
  const title = req.body.title
  const body = req.body.body
  const author = req.user

  let post = new Post({
    image: image,
    title: title,
    body: body,
    author: author
  })

  post.save(function(err) {
    if (err)
      return next(err)
    else
      res.status(201).send('Post have been successfully created!')
  })
}

function getPosts(req, res, next) {
  const jwtToken = req.headers.authorization
  console.log(req)

  const allPosts = []
  Post.find({})
  .exec((err, posts) => {
    if (err) {
      res.send({
        error: err
      })
      return next(err)
    }
    posts.forEach((post) => {
      allPosts.push(post)
      if (allPosts.length === posts.length) {
        return res.status(200).json({
          posts: allPosts
        })
      }
    })
  })
}

function getUserPosts(req, res, next) {
  console.log(req.params.userId)
  const user = req.params.userId
  const allPosts = []
  Post.find({ author: user })
  .exec((err, posts) => {
    if (err) {
      res.send({
        error: err
      })
      return next(err)
    }
    posts.forEach((post) => {
      allPosts.push(post)
      if (allPosts.length === posts.length) {
        return res.status(200).json({
          posts: allPosts
        })
      }
    })
  })
}

export {
  post,
  getPosts,
  getUserPosts
}
