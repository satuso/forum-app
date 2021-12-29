const Login = () => {
  return (
    <div className='center'>
      <h2>Login</h2>
      <form>
        <input
          type='text'
          placeholder='username'
          onFocus={(e) => e.target.placeholder = ''}
        />
        <br/>
        <input
          type='password'
          placeholder='password'
          onFocus={(e) => e.target.placeholder = ''}
        />
        <br/>
        <button>Log In</button>
      </form>
    </div>
  )
}
export default Login