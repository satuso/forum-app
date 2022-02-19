import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePost } from '../reducers/postReducer'
import { setNotification } from '../reducers/notificationReducer'
import Avatar from './Avatar'

const Post = ({ user, post }) => {
  const date = post.date.split('T')
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

  const userAvatar = post

  return (
    <div className='post'>
      <Avatar user={userAvatar}/>
      <div>
        <p className='username'>
          <Link to={`/user/${post.username}`}>{post.username}</Link> {date[0]} {user && (user.id === post.user.id || post.user || user.username === 'admin') && <button className='btn btn-danger' onClick={() => handleRemovePost(post.id, post, user)}>delete</button>}</p>
        <p>{post.content}</p>
      </div>
    </div>
  )
}
export default Post