import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDetails from './UserDetails'
import GoBack from './GoBack'

const User = ({ user }) => {
  const [toggleThreads, setToggleThreads] = useState(false)
  const [togglePosts, setTogglePosts] = useState(false)

  return (
    <div className='center'>
      <UserDetails user={user}/>
      <p>
        <span className='page-link' onClick={() => {
          setTogglePosts(false)
          setToggleThreads(!toggleThreads)}}
        >
          {user.threads.length} {user.threads.length === 1 ? 'thread' : 'threads'}
        </span> • <span className='page-link' onClick={() => {
          setTogglePosts(!togglePosts)
          setToggleThreads(false)}}
        >
          {user.posts.length} {user.posts.length === 1 ? 'post' : 'posts'}
        </span>
      </p>
      {(user.threads.length > 0 && toggleThreads) &&
        <>
          {user.threads.map(thread =>
            <Link to={`/thread/${thread.id}`} key={thread.id}>
              <p>{thread.title}</p>
            </Link>)}
        </>
      }
      {(user.posts.length > 0 && togglePosts) &&
        <>
          {user.posts.map(post =>
            <Link to={`/thread/${post.thread}`} key={post.id}>
              <p>{post.content.length > 10 ? post.content.slice(0, 10) + '...' : post.content}</p>
            </Link>)}
        </>
      }
      <GoBack/>
    </div>
  )
}
export default User