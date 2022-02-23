const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 2,
    required: true,
    validate: [/^([a-zA-Z0-9]|[-_\.])*$/, 'Usernames may only contain letters (A-Z), numbers (0-9) and symbols (- . _)']
  },
  name: String,
  age: Number,
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  resetLink: {
    data: String,
    default: ''
  },
  passwordHash: {
    type: String,
    required: true
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread'
    }
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User