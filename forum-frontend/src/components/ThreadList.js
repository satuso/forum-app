import React from 'react'
import { Link } from 'react-router-dom'
import Date from './Date'

const ThreadList = ({ thread }) => {

  return (
    <div className='thread-list'>
      <Link to={`/${thread.category}/thread/${thread.id}`}><span>{thread.title}</span></Link>
      <Link to={`/user/${thread.user.username}`}>
        <span className='thread-list-username'>{thread.user.username}</span>
      </Link>
      <Date date={thread.date}/>
    </div>
  )
}
export default ThreadList