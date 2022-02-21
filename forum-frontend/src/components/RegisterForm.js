import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import GoBack from './GoBack'

const RegisterForm = ({ users }) => {
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)
  const [newPassword, setNewPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const usernames = users.map(user => user.username)

  const addUser = (e) => {
    e.preventDefault()
    try {
      if (usernames.includes(newUsername)){
        dispatch(setNotification('Username already exists', 10))
      }
      const regex = /[^a-zA-Z0-9]/g
      if (newUsername.match(regex)){
        dispatch(setNotification('Usernames may only contain letters (A-Z) and numbers (0-9)', 10))
      } else {
        const userObject = {
          username: newUsername,
          name: newName,
          age: newAge,
          password: newPassword
        }
        dispatch(createUser(userObject))
        navigate('/login')
        dispatch(setNotification('Created new user! You can now log in', 10))
      }
    } catch (error) {
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
          maxLength={20}
          required
        />
        <br/>
        <label htmlFor='name'>Name *</label><br/>
        <input
          type='text'
          placeholder='Name'
          id='name'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Name'}
          onChange={({ target }) => setNewName(target.value)}
          minLength={2}
          maxLength={20}
          required
        />
        <br/>
        <label htmlFor='name'>Age</label><br/>
        <input
          type='number'
          placeholder='Age'
          id='age'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Age'}
          onChange={({ target }) => setNewAge(target.value)}
        />
        <br/>
        <label htmlFor='password'>Password *</label><br/>
        <input
          type='password'
          placeholder='Password'
          id='password'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Password'}
          onChange={({ target }) => setNewPassword(target.value)}
          minLength={8}
          maxLength={20}
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