import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  role: {
    type: String,
    enum: ['Member', 'Admin'],
    default: 'Member'
  },
  posts : [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
},
{
  timestamps: true
})

userSchema.pre('save', function(next) {
  const user = this
  const SALT_FACTOR = 5

  if (!user.isModified('password'))
  return next()

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err)
    return next(err)

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err)
      return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err)
    return cb(err)

    cb(null, isMatch)
  })
}

export default mongoose.model('User', userSchema)
