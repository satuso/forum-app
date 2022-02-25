import React from 'react'
import Avatar from './Avatar'

const UserDetails = ({ user }) => {

  const getAge = (dateString) => {
    const age = new Date() - new Date(dateString)
    return Math.floor(age/1000/60/60/24/365)
  }

  return (
    <div className='user-details'>
      <h2>{user.username}</h2>
      {user.name && <p>Name: {user.name}</p>}
      {user.dateOfBirth && <p>Date of Birth: {user.dateOfBirth}</p>}
      {user.dateOfBirth && <p>Age: {getAge(user.dateOfBirth)} years old</p>}
      <Avatar user={user}/>
    </div>
  )
}
export default UserDetails