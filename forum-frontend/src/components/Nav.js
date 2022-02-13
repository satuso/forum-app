import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ setToggle }) => {
  return (
    <div className='nav'>
      <Link to='*' onClick={() => setToggle(false)} className="nav-link">Threads</Link>
      <Link to='/users' className="nav-link">Users</Link>
    </div>
  )
}
export default Nav