import mongoose from 'mongoose'

const Schema = mongoose.Schema

const hookSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  events: {
    type: Array
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})

export default mongoose.model('Hook', hookSchema)
