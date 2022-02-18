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
        <div className='logged-in'><Link to={`/user/${user.username}`}><div className='logged-in'>{user.avatar ? <img src={user.avatar} alt='profile' className='avatar avatar-small'/> : <img src='http://localhost:3003/public/uploads/default-avatar.png' alt='profile' className='avatar avatar-small'/>}<span className='page-link'>{user.username}</span></div></Link> is logged in <Link to='/profile'><span className='settings'><i className="fa-solid fa-gear"></i></span></Link> <button className='btn btn-primary' onClick={handleLogout}>Log Out</button></div>
        :
        <div>
          <Link to='/login'>Log In</Link> / <Link to='/register'>Register</Link>
        </div>
      }
    </div>
  )
}
export default Header