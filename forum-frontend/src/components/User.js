import React from 'react'
import { Link } from 'react-router-dom'
const User = ({ user }) => {
  return (
    <>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id} {user.avatar}</p>
      {user.threads.length > 0 && <h3>Threads by {user.username}:</h3>}
      {user.threads.map(thread => <Link to={`/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p></Link>)}
    </>
  )
}
export default User