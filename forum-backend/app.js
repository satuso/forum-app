const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const postsRouter = require('./controllers/posts')
const usersRouter = require('./controllers/users')
const threadsRouter = require('./controllers/threads')
const loginRouter = require('./controllers/login')
const resetpasswordRouter = require('./controllers/resetpassword')
const middleware = require('./utils/middleware')

const logger = require('./utils/logger')
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use('/public', express.static('public'));
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/threads', threadsRouter)
app.use('/api/login', loginRouter)
app.use('/api/resetpassword', resetpasswordRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app