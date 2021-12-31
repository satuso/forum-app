import React from 'react'
import { Link } from 'react-router-dom'
const Users = ({ user }) => {
  return (
    <div>
      <Link to={`/user/${user.id}`}>{user.username}</Link> {user.name}</div>
  )
}
export default Users