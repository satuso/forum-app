const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  content: {
    type: String,
    required: true,
    minlength: 3
  },
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

threadSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread