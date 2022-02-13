import React from 'react'
import Avatar from './Avatar'

const UserDetails = ({ user }) => {
  return (
    <>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id}</p>
      <Avatar user={user}/>
    </>
  )
}
export default UserDetails