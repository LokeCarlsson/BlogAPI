import Hook from '../models/hookModel'
import request from 'request'

const registerHook = (req, res, next) => {
  const url = req.body.url
  const events = req.body.events
  const secret = req.body.secret
  const owner = req.user

  if (!url)
    return res.status(422).send({
      error: 'You must provide a url.'
    })

  if (!events)
    return res.status(422).send({
      error: 'You must provide atleast one event.'
    })

  if (!secret)
    return res.status(422).send({
      error: 'You must provide a secret string.'
    })

  Hook.findOne({
    url: url
  }, (err, existingUrl) => {
    if (err)
      return next(err)

    if (existingUrl)
      return res.status(422).send({
        error: 'The url is already registered!'
      })

    let hook = new Hook({
      url: url,
      events: events,
      secret: secret,
      owner: owner
    })

    hook.save((err, user) => {
      if (err)
        return next(err)
      res.status(201).send('Hook have been successfully registered!')
    })
  })
}

const deleteHook = (req, res, next) => {
  const hookId = req.params.hookId
  Hook.findOne({ _id: hookId })
  .exec((err, hook) => {
    if (!hook)
      return res.status(422).send({
        error: 'No hooks with that id exist'
      })
    if (hook.owner.equals(req.user._id)) {
      Hook.findByIdAndRemove(hookId, (err, offer) => {
        if (err) {
          res.send({
            error: err
          })
          return next(err)
        }
        return res.status(201).send('Hook have been successfully deleted!')
      })
    } else {
      return res.status(422).send({
        error: 'You can only delete your own hooks'
      })
    }
  })
}

const viewHook = (req, res, next) => {
  const user = req.user._id
  const allHooks = []
  Hook.find({ owner: user })
  .exec((err, hooks) => {
    if (hooks.length <= 0)
      return res.status(404).send({
        error: 'You have not created any hooks yet!'
      })
    if (err) {
      res.send({
        error: err
      })
      return next(err)
    }
    hooks.forEach((hook) => {
      allHooks.push(hook)
      if (allHooks.length === hooks.length) {
        return res.status(200).json({
          hooks: allHooks
        })
      }
    })
  })
}

const editHook = (req, res, next) => {
  const hookId = req.params.hookId
  Hook.findOne({ _id: hookId })
  .exec((err, hook) => {
    if (!hook)
      return res.status(422).send({
        error: 'No hooks with that id exist'
      })
    if (hook.owner.equals(req.user._id)) {
      const url = req.body.url || hook.url
      const events = req.body.events || hook.events
      const secret = req.body.secret || hook.secret
      hook.update({'url': url, 'events': events, 'secret': secret}, (err, payload) => {
        if (err)
          return next(err)
        res.status(201).send('Hook have been successfully saved!')
      })
    } else {
      return res.status(422).send({
        error: 'You can only edit your own hooks'
      })
    }
  })
}

const sendEvent = (event, post) => {
  const allHooks = []
  const body = {
    'eventType': event,
    'id': post._id,
    'title': post.title,
    'body': post.body,
    'author': {
      'username': post.author.username,
      'id': post.author._id
    }
  }
  const eventType = event
  Hook.find({ events: event })
  .exec((err, hooks) => {
    hooks.forEach((hook) => {
      body['secret'] = hook.secret
      request.post({
        json: true,
        url: hook.url,
        body
      },
      (err, httpResponse, body) => {
        if (err)
        console.log(err)
      })
    })
  })
}

export {
  registerHook,
  deleteHook,
  viewHook,
  editHook,
  sendEvent
}
