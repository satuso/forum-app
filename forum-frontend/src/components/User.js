import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const User = ({ user }) => {
  const [toggleThreads, setToggleThreads] = useState(false)
  const [togglePosts, setTogglePosts] = useState(false)
  console.log(user)
  return (
    <>
      <h2>{user.username} • {user.name}</h2>
      <p>{user.id} {user.avatar}</p>
      <p>
        <span className='page-link' onClick={() => setToggleThreads(!toggleThreads)}>
          {user.threads.length} {user.threads.length === 1 ? 'thread' : 'threads'}
        </span> • <span className='page-link' onClick={() => setTogglePosts(!togglePosts)}>
          {user.posts.length} {user.posts.length === 1 ? 'post' : 'posts'}
        </span>
      </p>
      {(user.threads.length > 0 && toggleThreads) &&
        <><h3>Threads by {user.username}:</h3>
          {user.threads.map(thread =>
            <Link to={`/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p>
            </Link>)}
        </>
      }
      {(user.posts.length > 0 && togglePosts) &&
        <><h3>Posts by {user.username}:</h3>
          {user.posts.map(post => <p key={post.id}>{post.content}</p>)}
        </>
      }
    </>
  )
}
export default User