import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  image: {
    type: String
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})

export default mongoose.model('Post', postSchema)
