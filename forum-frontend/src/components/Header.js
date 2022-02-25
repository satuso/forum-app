import React from 'react'
import { Link } from 'react-router-dom'
import LoggedInUser from './LoggedInUser'

const Header = ({ users, user, handleLogout, setFilter }) => {

  return (
    <div className={user && user.username === 'admin' ? 'header admin' : 'header'}>
      <h1><Link to='/' onClick={() => setFilter(null)}>Discussion Forum <i className='far fa-comment'></i></Link></h1>
      {user ?
        <LoggedInUser users={users} user={user} handleLogout={handleLogout} />
        :
        <div>
          <Link to='/login'>Log In</Link> / <Link to='/register'>Register</Link>
        </div>
      }
    </div>
  )
}
export default Header