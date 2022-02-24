const jwt = require('jsonwebtoken')
const forgotpasswordRouter = require('express').Router()
const User = require('../models/user')

const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  host: process.env.NODEMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAIL_EMAIL,
    pass: process.env.NODEMAIL_PASS
  }
})

forgotpasswordRouter.put('/', async (req, res) => {
  try {
    const body = req.body
    const email = body.email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'User with this email does not exist' })
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '60m' })
      const obj = {
        resetLink: token
      }
      const updatedUser = await User.findByIdAndUpdate(user.id, obj, { new: true })
      const data = await transporter.sendMail({
        from: process.env.NODEMAIL_EMAIL,
        to: email,
        subject: 'Password Reset Request',
        html: `<h2>Password Reset Request</h2>
          <p>Please click this link to reset your password (expires in 1 hour):</p>
          <p><a href="${process.env.CLIENT_URL}/resetpassword/${token}">Click here to reset your password</a></p>`
      })
      try {
        transporter.sendMail(data, function(error, info){
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
        return res.json({ message: `Email sent to ${email}, username: ${updatedUser.username}, resetLink token: ${updatedUser.resetLink}` })
      } catch (error) {
        console.log('Error: ', error)
        return res.json({ error: error.message })
      }
    }
  } catch(error){
    console.log(error)
  }
})

module.exports = forgotpasswordRouter