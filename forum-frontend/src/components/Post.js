import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePost } from '../reducers/postReducer'
import { setNotification } from '../reducers/notificationReducer'
import Avatar from './Avatar'
import Date from './Date'

const Post = ({ user, users, post, quoteMessage, setToggle }) => {
  const dispatch = useDispatch()

  const handleRemovePost = (id) => {
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        dispatch(deletePost(id))
        dispatch(setNotification('Deleted post', 10))
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  const userMatch = users.find(user => user.id === post.user.id)
  if (!userMatch) return null

  return (
    <div className='post'>
      <Avatar user={userMatch}/>
      <div>
        <span className='username'>
          <Link to={`/user/${post.username}`}>{post.username}</Link>
        </span>
        <Date date={post.date}/>
        {user && <button className='btn btn-primary' onClick={() => {
          quoteMessage(post.id)
          setToggle(true)
        }}>Quote</button>}
        <span>{user && (user.id === (post.user.id || post.user) || user.username === 'admin') &&
          <button className='btn btn-danger' onClick={() => handleRemovePost(post.id, post, user)}>Delete</button>}
        </span>
        <p className='content'>{post.content}</p>
      </div>
    </div>
  )
}
export default Post