import Post from '../models/postModel'
import User from '../models/userModel'
import { sendEvent } from '../controllers/hookController'

const post = (req, res, next) => {
  const image = req.body.image
  const title = req.body.title
  const body = req.body.body
  const author = req.user

  if (!title)
    return res.status(422).send({
      error: 'You must provide a title.'
    })

  if (!body)
    return res.status(422).send({
      error: 'You must provide a body text.'
    })

  let post = new Post({
    image: image,
    title: title,
    body: body,
    author: author
  })

  post.save(function(err) {
    if (err)
      return next(err)
    res.status(201).send('Post have been successfully created!')
    sendEvent('newPost', post)
  })
}

const getAllPosts = (req, res, next) => {
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

const getUserPosts = (req, res, next) => {
  const username = req.params.username
  const allPosts = []
  let userId = ''

  User.findOne({ 'username': username })
  .select('_id')
  .exec((err, result) => {
    if (!result)
      return res.status(422).send({
        error: 'No user with that name exist'
      })
    userId = result._id
    Post.find({ author: userId })
    .exec((err, posts) => {
      if (posts.length <= 0)
        return res.status(422).send({
          error: 'No posts with that username exist'
        })
      posts.forEach((post) => {
        allPosts.push(post)
        if (allPosts.length === posts.length) {
          return res.status(200).json({
            posts: allPosts
          })
        }
      })
    })
  })
}

const getUserIdPosts = (req, res, next) => {
  const user = req.params.userId
  const allPosts = []
  Post.find({ author: user })
  .exec((err, posts) => {
    if (posts.length <= 0)
      return res.status(422).send({
        error: 'No posts found by that user'
      })
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

const getPosts = (req, res, next) => {
  const user = req.user._id
  const allPosts = []
  Post.find({ author: user })
  .exec((err, posts) => {
    if (posts.length <= 0)
      return res.status(404).send({
        error: 'You have not created any posts yet!'
      })
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

const deletePost = (req, res, next) => {
  const postId = req.params.postId
  Post.findOne({ _id: postId })
  .exec((err, post) => {
    if (!post)
      return res.status(422).send({
        error: 'No posts with that id exist'
      })
    if (post.author.equals(req.user._id)) {
      Post.findByIdAndRemove(postId, function(err, offer) {
        if (err) {
          res.send({
            error: err
          })
          return next(err)
        }
        return res.status(201).send('Post have been successfully deleted!')
      })
    } else {
      return res.status(422).send({
        error: 'You can only delete your own posts'
      })
    }
  })
}

export const editPost = (req, res, next) => {
  const postId = req.params.postId
  Post.findOne({ _id: postId })
  .exec((err, post) => {
    if (!post)
      return res.status(422).send({
        error: 'No posts with that id exist'
      })
    if (post.author.equals(req.user._id)) {
      const image = req.body.image || post.image
      const title = req.body.title || post.title
      const body = req.body.body || post.body
      post.update({'image': image, 'title': title, 'body': body}, function(err, payload) {
        if (err)
          return next(err)
        res.status(201).send('Post have been successfully saved!')
      })
    } else {
      return res.status(422).send({
        error: 'You can only edit your own posts'
      })
    }
  })
}

export {
  post,
  getPosts,
  deletePost,
  getAllPosts,
  getUserPosts,
  getUserIdPosts
}
