import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/user'
import config from '../config/main'

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800
  })
}

function setUserInfo(request) {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role,
  }
}

function login (req, res, next) {
  const userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  })
}



export { login }
