import React, { useState } from 'react'
import loginService from '../services/login'
import threadService from '../services/threads'
import postService from '../services/posts'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Link, useNavigate } from 'react-router-dom'
import GoBack from './GoBack'

const LoginForm = ({ setUser, setToggle }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedForumUser', JSON.stringify(user)
      )
      threadService.setToken(user.token)
      postService.setToken(user.token)
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
        <label htmlFor='username'>Username</label><br/>
        <input
          type='text'
          placeholder='username'
          id='username'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Username'}
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
          minLength={2}
          maxLength={50}
          required
        />
        <br/>
        <label htmlFor='username'>Password</label><br/>
        <input
          type='password'
          placeholder='password'
          id='password'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Password'}
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          minLength={8}
          maxLength={50}
          required
        />
        <br/>
        <button type='submit' className='btn btn-primary'>Log In</button>
      </form>
      <Link to='/forgotpassword'>Forgot Password?</Link>
      <GoBack />
    </div>
  )
}
export default LoginForm