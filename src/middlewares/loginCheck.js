export default (req, res, next) => {
  if (!req.body.username)
  return res.status(422).send({
    error: 'You must provide an username.'
  })

  if (!req.body.password)
  return res.status(422).send({
    error: 'You must provide a password.'
  })
  next()
}
