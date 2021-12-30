import React from 'react'

const Register = () => {
  return (
    <div className='center'>
      <h2>Register</h2>
      <form>
        <input
          type='text'
          placeholder='username'
          onFocus={(e) => e.target.placeholder = ''}
        />
        <br/>
        <input
          type='text'
          placeholder='name'
          onFocus={(e) => e.target.placeholder = ''}
        />
        <br/>
        <input
          type='password'
          placeholder='password'
          onFocus={(e) => e.target.placeholder = ''}
        />
        <br/>
        <button>Register</button>
      </form>
    </div>
  )
}
export default Register