import React from 'react'
import { Link } from 'react-router-dom'

const ThreadList = ({ user, handleRemove, thread }) => {
  const date = thread.date.split('T')
  return (
    <div className='thread-list'>
      <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
      <Link to={`/user/${thread.user.username}`}>
        <span className='thread-list-username'>{thread.user.username}</span>
      </Link>
      <span>{date[0]} • {thread.posts.length} {thread.posts.length === 1 ? 'reply' : 'replies'} {user && (user.id === thread.user.id || user.username === 'admin') && <button className='btn btn-danger' onClick={() => handleRemove(thread.id, thread, user)}>delete</button>}</span>
    </div>
  )
}
export default ThreadList