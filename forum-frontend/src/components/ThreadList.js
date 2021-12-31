import React from 'react'
import { Link } from 'react-router-dom'

const ThreadList = ({ user, thread, handleRemove  }) => {
  const date = thread.date.split('T')
  return (
    <div className='thread-list'>
      <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
      <Link to={`/user/${thread.user.id}`}>
        <span className='thread-list-username'>{thread.user.username}</span>
      </Link>
      <span>{date[0]} • {thread.posts.length} replies</span>
      {user && user.id === thread.user.id && <button className='delete' onClick={() => handleRemove(thread.id, thread, user)}>delete</button>}
    </div>
  )
}
export default ThreadList