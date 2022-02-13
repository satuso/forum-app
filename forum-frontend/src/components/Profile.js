/* eslint-disable no-undef */
import React from 'react'
import { Link } from 'react-router-dom'
import Upload from './Upload'
import UserDetails from './UserDetails'

const Profile = ({ user, users, deleteUser }) => {
  if (!user){
    return null
  }

  const id = user.id
  const userMatch = users.find(user => user.id === id)
  console.log(user)
  return (
    <div>
      <UserDetails user={user} />
      <p>
        {userMatch && userMatch.threads.length} {userMatch && userMatch.threads.length === 1 ? 'thread' : 'threads'} • {userMatch && userMatch.posts.length} {userMatch && userMatch.posts.length === 1 ? 'post' : 'posts'}
      </p>
      {userMatch && userMatch.threads.map(thread =>
        <Link to={`/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p></Link>
      )}
      <Upload user={user}/>
      {user && <button className='delete-profile' onClick={() => deleteUser(user.id, user, user)}>Delete profile</button>}
    </div>
  )
}
export default Profile