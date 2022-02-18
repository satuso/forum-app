import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const RegisterForm = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addUser = (e) => {
    e.preventDefault()
    try {
      const userObject = {
        username: newUsername,
        name: newName,
        password: newPassword
      }
      dispatch(createUser(userObject))
      navigate('/login')
      dispatch(setNotification('Created new user! You can now log in', 10))
    } catch (error) {
      dispatch(setNotification('Error', 10))
    }
  }
  return (
    <div className='center'>
      <h2>Register</h2>
      <form onSubmit={addUser} className='form'>
        <input
          type='text'
          placeholder='username'
          onFocus={(e) => e.target.placeholder = ''}
          onChange={({ target }) => setNewUsername(target.value)}
        />
        <br/>
        <input
          type='text'
          placeholder='name'
          onFocus={(e) => e.target.placeholder = ''}
          onChange={({ target }) => setNewName(target.value)}
        />
        <br/>
        <input
          type='password'
          placeholder='password'
          onFocus={(e) => e.target.placeholder = ''}
          onChange={({ target }) => setNewPassword(target.value)}
        />
        <br/>
        <button type='submit' className='btn btn-primary'>Register</button>
      </form>
    </div>
  )
}
export default RegisterForm