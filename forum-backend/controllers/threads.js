const jwt = require('jsonwebtoken')
const threadsRouter = require('express').Router()
const Thread = require('../models/thread')
const User = require('../models/user')

const getTokenFrom = request => {
  try {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  } catch(e){
    console.log(e)
  }
}

threadsRouter.get('/', async (request, response) => {
  try {
    const threads = await Thread
      .find({}).populate('user', { username: 1, name: 1, id: 1, avatar: 1 })
      .find({}).populate('posts')
    response.json(threads.map(thread => thread.toJSON()))
  } catch(e){
    console.log(e)
  }
})

threadsRouter.get('/:id', async (request, response) => {
  try {
    const thread = await Thread.findById(request.params.id)
      .find({}).populate('user', { username: 1, name: 1, id: 1, avatar: 1 })
      .find({}).populate('posts')
    response.json(thread.map(thread => thread.toJSON()))
  } catch(e){
    console.log(e)
  }
})

threadsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const thread = new Thread({
      title: body.title,
      content: body.content,
      date: new Date(),
      user: user._id,
    })
    const savedThread = await thread.save()
    user.threads = user.threads.concat(savedThread._id)
    await user.save()

    const populatedThread = await savedThread
      .populate('user', { username: 1, name: 1, id: 1, avatar: 1 })
      
    response.status(201).json(populatedThread.toJSON())
  } catch(e){
    console.log(e)
  }
})

threadsRouter.delete('/:id', async (request, response) => {
  try {
    await Thread.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(e){
    console.log(e)
  }
})

threadsRouter.put('/:id', async (request, response) => {
  try {
    const thread = request.body
    const updatedThread = await Thread.findByIdAndUpdate(request.params.id, thread, { new: true })
    response.json(updatedThread.toJSON())
  } catch(e){
    console.log(e)
  }
})

module.exports = threadsRouter