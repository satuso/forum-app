const jwt = require('jsonwebtoken')
const postsRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')
const Thread = require('../models/thread')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

postsRouter.get('/', async (request, response) => { 
  const posts = await Post
    .find({}).populate('user', { username: 1, name: 1, id: 1, avatar: 1})
    .find({}).populate('thread', { title: 1, content: 1, date: 1, id: 1, user: 1 })
  response.json(posts.map(post => post.toJSON()))
})

postsRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  .find({}).populate('user', { username: 1, name: 1, id: 1, avatar: 1})
  .find({}).populate('thread', { title: 1, content: 1, date: 1, id: 1, user: 1 })
  response.json(post.map(post => post.toJSON()))
})

postsRouter.post('/', async (request, response) => {
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

  response.json(savedPost.toJSON())
})

postsRouter.delete('/:id', async (request, response) => {
  await Post.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

postsRouter.put('/:id', async (request, response) => {
  const post = request.body
  const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, { new: true })
  response.json(updatedPost.toJSON())
})

module.exports = postsRouter