import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({
  user,
  handleLogout
}) => {
  return (
    <div className='header'>
      <h1><Link to='/'>Discussion Forum <i className='far fa-comment'></i></Link></h1>
      {user ?
        <div><Link to='/profile'>{user.username}</Link> is logged in <button className='btn btn-primary' onClick={handleLogout}>Log Out</button></div>
        :
        <div>
          <Link to='/login'>Log In</Link> <Link to='/register'>Register</Link>
        </div>
      }
    </div>
  )
}
export default Header