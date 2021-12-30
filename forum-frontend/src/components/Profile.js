import React from 'react'
const Profile = ({ user }) => {
  if (!user){
    return null
  }
  return (
    <div>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id} {user.avatar}</p>
      <button>Edit</button>
    </div>
  )
}
export default Profile