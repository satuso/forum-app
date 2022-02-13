import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDetails from './UserDetails'

const User = ({ user }) => {
  const [toggleThreads, setToggleThreads] = useState(false)

  return (
    <div className='center'>
      <UserDetails user={user} />
      <p>
        <span className={user.threads.length > 0 && 'page-link'} onClick={() => setToggleThreads(!toggleThreads)}>
          {user.threads.length} {user.threads.length === 1 ? 'thread' : 'threads'}
        </span> • <span>{user.posts.length} {user.posts.length === 1 ? 'post' : 'posts'}</span>
      </p>
      {(user.threads.length > 0 && toggleThreads) &&
        <>
          {user.threads.map(thread =>
            <Link to={`/thread/${thread.id}`} key={thread.id}>
              <p>{thread.title}</p>
            </Link>)}
        </>
      }
    </div>
  )
}
export default User