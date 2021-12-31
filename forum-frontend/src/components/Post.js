import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ user, post }) => {
  const date = post.date.split('T')

  return (
    <div className='post'>
      <p className='username'><Link to={`/user/${post.user}`}>{post.username}</Link> {date[0]} {user && user.id === post.user.id && <button className='delete'>delete</button>}</p>
      <p>{post.content}</p>
    </div>
  )
}
export default Post