/* eslint-disable no-undef */
import React from 'react'
import { Link } from 'react-router-dom'
import Upload from './Upload'

const Profile = ({ user, users, deleteUser }) => {
  if (!user){
    return null
  }

  const id = user.id
  const userMatch = users.find(user => user.id === id)

  return (
    <div>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id} {user.avatar}</p>
      <p>
        {userMatch && userMatch.threads.length} {userMatch && userMatch.threads.length === 1 ? 'thread' : 'threads'} • {userMatch && userMatch.posts.length} {userMatch && userMatch.posts.length === 1 ? 'post' : 'posts'}
      </p>
      {userMatch && userMatch.threads.length > 0 && <h3>Threads by {user.username}:</h3>}
      {userMatch && userMatch.threads.map(thread =>
        <Link to={`/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p></Link>
      )}
      {userMatch && userMatch.posts.length > 0 && <h3>Posts by {user.username}:</h3>}
      {userMatch && userMatch.posts.map(post =>
        <p key={post.id}>{post.content}</p>
      )}
      <Upload />
      {user && <button onClick={() => deleteUser(user.id, user, user)}>Delete profile</button>}
    </div>
  )
}
export default Profile