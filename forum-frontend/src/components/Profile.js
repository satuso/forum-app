import React from 'react'
import { Link } from 'react-router-dom'
import UploadForm from './UploadForm'
import UserDetails from './UserDetails'

const Profile = ({ user, users, deleteUser, setMessage }) => {

  if (!user){
    return null
  }

  const id = user.id
  const userMatch = users.find(user => user.id === id)

  return (
    <div className='center'>
      <UserDetails user={user} />
      <UploadForm user={user} setMessage={setMessage}/>
      <p>{userMatch && userMatch.threads.length} {userMatch && userMatch.threads.length === 1 ? 'thread' : 'threads'} • {userMatch && userMatch.posts.length} {userMatch && userMatch.posts.length === 1 ? 'post' : 'posts'}</p>
      {userMatch && userMatch.threads.map(thread =>
        <Link to={`/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p></Link>
      )}
      {user && <button className='btn btn-danger' onClick={() => deleteUser(user.id, user, user)}>Delete profile</button>}
    </div>
  )
}
export default Profile