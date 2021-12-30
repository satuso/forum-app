import React from 'react'
const User = ({ user }) => {
  return (
    <>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id} {user.avatar}</p>
    </>
  )
}
export default User