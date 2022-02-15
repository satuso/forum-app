import React from 'react'
import Avatar from './Avatar'

const UserDetails = ({ user }) => {
  return (
    <>
      <h2>{user.username}</h2>
      <p>Name: {user.name}</p>
      {user.age && <p>Age: {user.age}</p>}
      <Avatar user={user}/>
    </>
  )
}
export default UserDetails