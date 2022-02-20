import React from 'react'
import { Link } from 'react-router-dom'

const ThreadList = ({ thread }) => {
  const date = thread.date.split('T')
  return (
    <div className='thread-list'>
      <Link to={`/thread/${thread.id}`}><span>{thread.title}</span></Link>
      <Link to={`/user/${thread.user.username}`}>
        <span className='thread-list-username'>{thread.user.username}</span>
      </Link>
      <span>{date[0]}</span>
    </div>
  )
}
export default ThreadList