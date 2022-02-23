import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import GoBack from './GoBack'

const RegisterForm = ({ users }) => {
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addUser = (e) => {
    e.preventDefault()
    try {
      const usernames = users.map(user => user.username.toLowerCase())
      if (usernames.includes(newUsername.toLowerCase())){
        return dispatch(setNotification('Username already exists', 10))
      }
      const emails = users.map(user => user.email.toLowerCase())
      if (emails.includes(newEmail.toLowerCase())){
        return dispatch(setNotification('Email already exists', 10))
      }
      if (newPassword === confirmPassword){
        const regex = /[^a-zA-Z0-9-._]/g
        if (newUsername.match(regex)){
          dispatch(setNotification('Usernames may only contain letters (A-Z), numbers (0-9) and symbols (- . _)', 10))
        } else {
          const userObject = {
            username: newUsername,
            email: newEmail,
            password: newPassword
          }
          dispatch(createUser(userObject))
          navigate('/login')
          dispatch(setNotification('Created new user! You can now log in', 10))
        }
      } else {
        dispatch(setNotification('Passwords must match', 10))
      }
    } catch (error) {
      console.log(error)
      dispatch(setNotification('Error', 10))
    }
  }
  return (
    <div className='center'>
      <h2>Register</h2>
      <form onSubmit={addUser} className='form'>
        <label htmlFor='username'>Username *</label><br/>
        <input
          type='text'
          id='username'
          placeholder='Username'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Username'}
          onChange={({ target }) => setNewUsername(target.value)}
          minLength={2}
          maxLength={50}
          required
        />
        <br/>
        <label htmlFor='email'>Email *</label><br/>
        <input
          type='email'
          placeholder='Email'
          id='email'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Email'}
          onChange={({ target }) => setNewEmail(target.value)}
          minLength={2}
          maxLength={50}
          required
        />
        <label htmlFor='password'>Password *</label><br/>
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
        <label htmlFor='passwordConfirm'>Confirm Password *</label><br/>
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
        <button type='submit' className='btn btn-primary'>Register</button>
      </form>
      <p>* required field</p>
      <p></p>
      <GoBack />
    </div>
  )
}
export default RegisterForm