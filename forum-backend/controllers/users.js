const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const fs = require('fs')

const { v4: uuidv4 } = require('uuid')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './public/uploads')    
  }, 
  filename: function (req, file, cb) { 
     cb(null , uuidv4() + path.extname(file.originalname))   
  }
})

const upload = multer({ 
  storage: storage,
  limits : {
    fileSize : 1000000
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      avatar: body.avatar,
      dateOfBirth: body.dateOfBirth,
      email: body.email,
      resetLink: body.resetLink,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    console.log(error)
  } 
})

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({}).populate('threads', { title: 1, content: 1, date: 1, id: 1, category: 1})
      .find({}).populate('posts', { title: 1, content: 1, date: 1, id: 1,  thread: 1, category: 1 })
    response.json(users.map(u => u.toJSON()))
  } catch (error){
    console.log(error)
  }
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
      .find({}).populate('threads', { title: 1, content: 1, date: 1, id: 1, category: 1 })
      .find({}).populate('posts', { title: 1, content: 1, date: 1, id: 1, thread: 1, category: 1 })
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  } catch (error){
    console.log(error)
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end() 
  } catch (error) {
    console.log(error)
  }
})

usersRouter.put('/:id', upload.single('avatar'), async (request, response) => {
  try {
    const body = request.body
    console.log('avatar', body.avatar)
    if (body.avatar !== undefined){
      fs.unlinkSync(body.avatar)
    }
    const url = request.protocol + '://' + request.get('host')
    const user = {
      name: body.name,
      dateOfBirth: body.dateOfBirth,
      email: body.email,
      avatar: request.file ? url + '/public/uploads/' + request.file.filename : null,
      resetLink: body.resetLink
    }
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.send(updatedUser)
  } catch (error){
    console.log(error)
  }
})

module.exports = usersRouter