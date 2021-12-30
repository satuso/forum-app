import React from 'react'
import { Link } from 'react-router-dom'
const Nav = ({ setToggle }) => {
  return (
    <div className='nav'>
      <Link to='*' onClick={() => setToggle(false)}>Threads</Link>
      <Link to='/users'>Users</Link>
    </div>
  )
}
export default Nav