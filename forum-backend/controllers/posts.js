const jwt = require('jsonwebtoken')
const postsRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')
const Thread = require('../models/thread')

const getTokenFrom = request => {
  try {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  } catch(error){
    console.log(error)
  }
}

postsRouter.get('/', async (request, response) => {
  try {
  const posts = await Post
    .find({}).populate('user', { user: 1, username: 1, name: 1, id: 1, age: 1, avatar: 1, email: 1 })

  response.json(posts.map(post => post.toJSON()))
  } catch(error){
    console.log(error)
  }
})

postsRouter.get('/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
    .find({}).populate('user', { user: 1, username: 1, name: 1, id: 1, age: 1, avatar: 1, email: 1 })

    response.json(post.map(post => post.toJSON()))
  } catch(error){
    console.log(error)
  }
})

postsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const thread = await Thread.findById(body.threadId)

    const post = new Post({
      content: body.content,
      date: new Date(),
      user: user._id,
      username: user.username,
      avatar: user.avatar,
      thread: thread._id
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    thread.posts = thread.posts.concat(savedPost._id)
    await user.save()
    await thread.save()

    const populatedPost = await savedPost
    .populate('user', { username: 1, name: 1, id: 1, avatar: 1 })
    
    response.status(201).json(populatedPost.toJSON())

  } catch(error){
    console.log(error)
  }
})

postsRouter.delete('/:id', async (request, response) => {
  try {
    await Post.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(error){
    console.log(error)
  }
})

postsRouter.put('/:id', async (request, response) => {
  try {
    const post = request.body
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, { new: true })
    response.json(updatedPost.toJSON())
  } catch(error){
    console.log(error)
  }
})

module.exports = postsRouter