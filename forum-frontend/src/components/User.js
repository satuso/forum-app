import React from 'react'
import UserDetails from './UserDetails'
import Count from './Count'
import GoBack from './GoBack'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteUser } from '../reducers/userReducer'
import { deleteThread } from '../reducers/threadReducer'
import { deletePost } from '../reducers/postReducer'
import { useNavigate } from 'react-router-dom'

const User = ({ user, loggedInUser, posts, threads }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const threadsOfUser = threads.filter(thread => thread.user.id === user.id)
  const postsOfUser = posts.filter(post => post.user.id === user.id)

  const removeUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')){
      try {
        if (user.threads.length > 0){
          threadsOfUser.map(thread => dispatch(deleteThread(thread.id)))
        }
        if (user.posts.length > 0){
          postsOfUser.map(post => dispatch(deletePost(post.id)))
        }
        dispatch(deleteUser(id))
        dispatch(setNotification('User deleted', 10))
        navigate('/threads')
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  return (
    <div className='center'>
      <UserDetails user={user}/>
      {loggedInUser && loggedInUser.username === 'admin' && <button className='btn btn-danger' onClick={() => removeUser(user.id)}>delete user</button>}
      <Count threadsOfUser={threadsOfUser} postsOfUser={postsOfUser}/>
      <GoBack/>
    </div>
  )
}
export default User