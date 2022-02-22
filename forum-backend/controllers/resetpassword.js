const jwt = require('jsonwebtoken')
const resetpasswordRouter = require('express').Router()
const User = require('../models/user')

const domain = process.env.MAILGUN_DOMAIN
const formData = require('form-data');
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

resetpasswordRouter.put('/', async (req, res) => {
  try {
    const body = req.body
    const email = body.email
    const user = await User.find({ email })
    if (!user){
      return res.status(400).json({ error: 'User with this email does not exist' })
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '20m' })
      await User.updateOne({ resetLink : token })
      const data = {
        from: 'noreply@noreply.com',
        to: email,
        subject: 'Password Reset Link',
        html: `Please click this link to reset your password: <a href="${process.env.CLIENT_URL}/reset/${token}">Click here to reset your password</a>`
      }
      try {
        await mailgunClient.messages.create(domain, data);
        return res.json({ message: 'Email sent' })
      } catch (error) {
        console.log('Error: ', error);
        return res.json({ error: err })
      }
    }
  } catch(error){
    console.log(error)
  }
})

module.exports = resetpasswordRouter