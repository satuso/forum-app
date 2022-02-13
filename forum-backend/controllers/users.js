const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const { v4: uuidv4 } = require('uuid');
const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './public/uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , uuidv4() + path.extname(file.originalname));   
  }
});

const upload = multer({ 
  storage: storage,
  limits : {
    fileSize : 1000000
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})


usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    avatar: body.avatar,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('threads', { title: 1, content: 1, date: 1, id: 1 })
    .find({}).populate('posts', { title: 1, content: 1, date: 1, id: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .find({}).populate('threads', { title: 1, content: 1, date: 1, id: 1})
    .find({}).populate('posts', { title: 1, content: 1, date: 1, id: 1 })
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()  
})

usersRouter.put('/:id', upload.single('avatar'), async (request, response) => {
  const body = request.body
  const url = request.protocol + '://' + request.get('host')
  const user = {
    name: body.name,
    avatar: url + '/public/uploads/' + request.file.filename
  }
  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
  response.send(updatedUser)
})

module.exports = usersRouter