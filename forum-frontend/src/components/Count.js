import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Count = ({ threadsOfUser, postsOfUser }) => {
  const [toggleThreads, setToggleThreads] = useState(false)
  const [togglePosts, setTogglePosts] = useState(false)
  return (
    <>
      <p>
        <span className='page-link' onClick={() => {
          setTogglePosts(false)
          setToggleThreads(!toggleThreads)}}
        >
          {threadsOfUser.length} {threadsOfUser.length === 1 ? 'thread' : 'threads'}
        </span> • <span className='page-link' onClick={() => {
          setTogglePosts(!togglePosts)
          setToggleThreads(false)}}
        >
          {postsOfUser.length} {postsOfUser.length === 1 ? 'post' : 'posts'}
        </span>
      </p>
      {toggleThreads && threadsOfUser.map(thread =>
        <Link to={`/${thread.category}/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p></Link>
      )}
      {togglePosts && postsOfUser.map(post =>
        <Link to={`/${post.category}/thread/${post.thread}`} key={post.id}><p>{post.content.length > 10 ? post.content.slice(0, 10) + '...' : post.content}</p></Link>
      )}
    </>
  )
}
export default Count