import React from 'react'
import { Link } from 'react-router-dom'

const Profile = ({ user, users }) => {
  if (!user){
    return null
  }

  const id = user.id
  const userMatch = users.find(user => user.id === id)

  return (
    <div>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id} {user.avatar}</p>
      {userMatch && userMatch.threads.length > 0 && <h3>Threads by {user.username}:</h3>}
      {userMatch && userMatch.threads.map(thread =>
        <Link to={`/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p></Link>
      )}
      <button>Edit Profile</button>
    </div>
  )
}
export default Profile