import React from 'react'
import { Link } from 'react-router-dom'

const ThreadList = ({ thread }) => {
  const date = thread.date.split('T')
  return (
    <div className='thread-list'>
      <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
      <Link to={`/user/${thread.user.id}`}>
        <span className='thread-list-username'>{thread.user.username}</span>
      </Link>
      <span>{date[0]} • {thread.posts.length} replies</span>
    </div>
  )
}
export default ThreadList