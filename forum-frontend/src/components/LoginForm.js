/* eslint-disable no-undef */
import React, { useState } from 'react'
import threadService from '../services/threads'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({
  setUser,
  setToggle
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedForumUser', JSON.stringify(user)
      )
      threadService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setToggle(false)
      navigate('/')
      dispatch(setNotification('You are now logged in', 10))
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 10))
    }
  }
  return (
    <div className='center'>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='form'>
        <input
          type='text'
          placeholder='username'
          onFocus={(e) => e.target.placeholder = ''}
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
        <input
          type='password'
          placeholder='password'
          onFocus={(e) => e.target.placeholder = ''}
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button type='submit' className='btn btn-primary'>Log In</button>
      </form>
    </div>
  )
}
export default LoginForm