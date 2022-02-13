import React from 'react'
import { Button } from 'react-bootstrap'

const LoginForm = ({
  username,
  password,
  setPassword,
  setUsername,
  handleLogin
}) => {
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
        <Button type='submit'>Log In</Button>
      </form>
    </div>
  )
}
export default LoginForm