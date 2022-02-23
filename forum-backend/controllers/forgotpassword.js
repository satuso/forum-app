const jwt = require('jsonwebtoken')
const forgotpasswordRouter = require('express').Router()
const User = require('../models/user')

const domain = process.env.MAILGUN_DOMAIN
const formData = require('form-data');
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

forgotpasswordRouter.put('/', async (req, res) => {
  try {
    const body = req.body
    const email = body.email
    const user = await User.findOne({ email })
    console.log(user)
    if (!user){
      return res.status(400).json({ error: 'User with this email does not exist' })
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '60m' })
      const obj = {
        resetLink: token
      }
      const updatedUser = await User.findByIdAndUpdate(user.id, obj, { new: true })
      console.log(updatedUser)
      const data = {
        from: 'noreply@noreply.com',
        to: email,
        subject: 'Password Reset Request',
        html: `<h2>Password Reset Request</h2>
          <p>Please click this link to reset your password:</p>
          <p><a href="${process.env.CLIENT_URL}/resetpassword/${token}">Click here to reset your password</a></p>
          <p>The link expires in 1 hour.</p>`
      }
      try {
        await mailgunClient.messages.create(domain, data);
        return res.json({ message: `Email sent to ${email}, username: ${updatedUser.username}, resetLink token: ${updatedUser.resetLink}` })
      } catch (error) {
        console.log('Error: ', error);
        return res.json({ error: error.message })
      }
    }
  } catch(error){
    console.log(error)
  }
})

module.exports = forgotpasswordRouter