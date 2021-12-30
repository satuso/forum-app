import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import Reply from './Reply'

const Thread = ({ thread, user, toggle, setToggle }) => {
  const date = thread.date.split('T')
  return (
    <>
      {user &&
      <div className='center'>
        <span className='link' onClick={() => setToggle(!toggle)}>Reply <i className="fas fa-comment"></i></span>
      </div>
      }
      {toggle && <Reply thread={thread} user={user} />}
      <div className='thread'>
        <p className='username'><Link to={`/user/${thread.user.id}`}>{thread.user.username}</Link> {date[0]}</p>
        <h3>{thread.title}</h3>
        <p>{thread.content}</p>
      </div>
      {thread.posts.map(post =>
        <Post
          post={post}
          key={post.id}
          thread={thread}
        />)}
    </>
  )
}
export default Thread