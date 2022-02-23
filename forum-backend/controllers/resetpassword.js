const jwt = require('jsonwebtoken')
const resetpasswordRouter = require('express').Router()
const User = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')

resetpasswordRouter.put('/', async (req, res) => {
  try {
    const { resetLink, newPassword } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)

    if (resetLink){
      jwt.verify(resetLink, process.env.SECRET, function(error, decodedData){
        if (error){
          return res.status(401).json({ error: 'Incorrect or expired token'})
        }
        User.findOne({ resetLink }, function (error, user){
        if (error || !user){
          return res.status(400).json({ error: 'User with this token does not exist'})
        }
        const obj = {
          resetLink: "",
          passwordHash
        }
        user = _.extend(user, obj)
        user.save((error, result) => {
          if (error){
            return res.status(400).json({ error: 'Reset password error'})
          } else {
            console.log(user)
            return res.status(200).json({ message: `Password has been changed for user ${user}`})
          }
        })
      })
    })
  } else {
    return res.status(401).json({ error: 'Authentication error'})
  }
  } catch(error){
    console.log(error)
  }

})

module.exports = resetpasswordRouter