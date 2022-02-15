const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 2,
    validate: [/^([a-zA-Z0-9]|[-_\.])*$/, 'Usernames may only have letters (A-Z) and numbers (0-9) and symbols (- _ .)']
  },
  name: String,
  age: Number,
  avatar: {
    type: String
  },
  passwordHash: String,
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