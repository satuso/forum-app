import React from 'react'
import { Link } from 'react-router-dom'
import Date from './Date'

const ThreadList = ({ thread }) => {
  const icon = (category) => {
    if (category === 'general') return <i className="fa-solid fa-face-smile"></i>
    if (category === 'music') return <i className="fa-solid fa-guitar"></i>
    if (category === 'movies') return <i className="fa-solid fa-clapperboard"></i>
  }

  return (
    <div className='thread-list'>
      <Link to={`/${thread.category}`}><span className='thread-list-category'>{icon(thread.category)}</span></Link>
      <Link to={`/${thread.category}/thread/${thread.id}`}><span>{thread.title}</span></Link>
      <Link to={`/user/${thread.user.username}`}>
        <span className='thread-list-username'>{thread.user.username}</span>
      </Link>
      <Date date={thread.date}/>
    </div>
  )
}
export default ThreadList