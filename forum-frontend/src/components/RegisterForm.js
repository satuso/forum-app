import React from 'react'

const RegisterForm = ({ addUser, setNewUsername, setNewName, setNewPassword, message }) => {
  return (
    <div className='center'>
      <h2>Register</h2>
      {message}
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