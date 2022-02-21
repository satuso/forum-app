import React from 'react'
import Avatar from './Avatar'

const UserDetails = ({ user }) => {
  return (
    <div className='user-details'>
      <h2>{user.username}</h2>
      {user.name && <p>Name: {user.name}</p>}
      {user.age > 0 && <p>Age: {user.age}</p>}
      <Avatar user={user}/>
    </div>
  )
}
export default UserDetails