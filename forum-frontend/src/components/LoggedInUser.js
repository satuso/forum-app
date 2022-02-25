import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../images/default-avatar.png'

const LoggedInUser = ({ users, user, handleLogout }) => {
  if (!user){
    return null
  }
  const userMatch = users.find(u => u.id === user.id)
  return (
    <div className='small-avatar-username'><Link to={`/user/${user.username}`}><div className='small-avatar-username'>{userMatch && userMatch.avatar ? <img src={userMatch.avatar} alt='profile' className='avatar avatar-small'/> : <img src={avatar} alt='profile' className='avatar avatar-small'/>}<span className='page-link'>{user.username}</span></div></Link> is logged in <Link to='/profile'><span className='settings'><i className='fa-solid fa-gear'></i></span></Link> <button className='btn btn-primary' onClick={handleLogout}>Log Out</button></div>
  )
}
export default LoggedInUser