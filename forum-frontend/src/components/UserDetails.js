import React from 'react'
const UserDetails = ({ user }) => {
  return (
    <>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id}</p>
      {user.avatar ? <img src={user.avatar} alt='avatar' className='avatar'/> : <img src='http://localhost:3003/public/uploads/default-avatar.png' alt='avatar' className='avatar'/>}
    </>
  )
}
export default UserDetails