const jwt = require('jsonwebtoken')
const resetpasswordRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

resetpasswordRouter.put('/', async (req, res) => {
  try {
    const { resetLink, newPassword } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)

    if (resetLink){
    jwt.verify(resetLink, process.env.SECRET)
    const user = await User.findOne({ resetLink })

    const obj = {
      resetLink: "",
      passwordHash
    }

    const updatedUser = await User.findByIdAndUpdate(user, obj, { new: true })
    res.send(updatedUser)
  } 
  } catch(error){
    console.log(error)
  }

})

module.exports = resetpasswordRouter