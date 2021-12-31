import React from 'react'
const Login = ({
  username,
  password,
  setPassword,
  setUsername,
  handleLogin
}) => {
  return (
    <div className='center'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}
export default Login