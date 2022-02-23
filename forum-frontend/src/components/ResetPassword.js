import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import resetPasswordService from '../services/resetpassword'
import { useNavigate } from 'react-router-dom'

const ResetPassword = ({ users }) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { token } = useParams()
  const tokenMatch = users.find(user => user.resetLink === token)

  if (!tokenMatch){
    return (
      <div className='center'>
        <p>Invalid or expired token</p>
      </div>
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (tokenMatch && tokenMatch.resetLink === token){
        if (newPassword === confirmPassword){
          resetPasswordService.update(newPassword, token)
          setNewPassword('')
          navigate('/')
          dispatch(setNotification('Password changed', 10))
        } else {
          dispatch(setNotification('Passwords do not match', 10))
        }
      } else {
        dispatch(setNotification('Invalid or expired token', 10))
      }
    } catch(error){
      dispatch(setNotification('Error', 10))
    }
  }

  return (
    <div className='center'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor='password'>New Password *</label><br/>
        <input
          type='password'
          placeholder='Password'
          id='password'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Password'}
          onChange={({ target }) => setNewPassword(target.value)}
          minLength={8}
          maxLength={50}
          required
        />
        <label htmlFor='passwordConfirm'>Confirm New Password *</label><br/>
        <input
          type='password'
          placeholder='Confirm Password'
          id='passwordConfirm'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Confirm Password'}
          onChange={({ target }) => setConfirmPassword(target.value)}
          minLength={8}
          maxLength={50}
          required
        />
        <br/>
        <button type='submit' className='btn btn-primary'>Change Password</button>
      </form>
    </div>
  )
}
export default ResetPassword