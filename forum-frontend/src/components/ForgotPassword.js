import React, { useState } from 'react'
import GoBack from './GoBack'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import forgotPasswordService from '../services/forgotpassword'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = ({ users }) => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (users){
        const emails = users.map(user => user.email)
        if (emails.includes(email)){
          forgotPasswordService.update(email)
          setEmail('')
          navigate('/')
          dispatch(setNotification(`Password reset link sent to ${email}`, 10))
        } else dispatch(setNotification('Email not found', 10))
      }
    } catch(error){
      dispatch(setNotification('Error', 10))
    }
  }

  return (
    <div className='center'>
      <h2>Forgot Password?</h2>
      <p>Send password reset link to your email address</p>
      <form onSubmit={handleSubmit} className='form resetlink-form'>
        <input
          type='email'
          value={email}
          id='email'
          placeholder='Email'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Email'}
          onChange={({ target }) => setEmail(target.value)}
          required
        />
        <button type='submit' className='btn btn-primary'>Send</button>
      </form>
      <GoBack />
    </div>
  )
}
export default ForgotPassword