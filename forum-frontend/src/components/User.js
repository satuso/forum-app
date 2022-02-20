import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDetails from './UserDetails'
import GoBack from './GoBack'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteUser } from '../reducers/userReducer'
import { deleteThread } from '../reducers/threadReducer'
import { deletePost } from '../reducers/postReducer'
import { useNavigate } from 'react-router-dom'

const User = ({ user, loggedInUser, posts, threads }) => {
  const [toggleThreads, setToggleThreads] = useState(false)
  const [togglePosts, setTogglePosts] = useState(false)

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
      {loggedInUser && (loggedInUser.username === 'admin' && <button className='btn btn-danger' onClick={() => removeUser(user.id)}>delete user</button>)}
      <p>
        <span className='page-link' onClick={() => {
          setTogglePosts(false)
          setToggleThreads(!toggleThreads)}}
        >
          {user.threads.length} {user.threads.length === 1 ? 'thread' : 'threads'}
        </span> • <span className='page-link' onClick={() => {
          setTogglePosts(!togglePosts)
          setToggleThreads(false)}}
        >
          {user.posts.length} {user.posts.length === 1 ? 'post' : 'posts'}
        </span>
      </p>
      {(user.threads.length > 0 && toggleThreads) &&
        <>
          {user.threads.map(thread =>
            <Link to={`/thread/${thread.id}`} key={thread.id}>
              <p>{thread.title}</p>
            </Link>)}
        </>
      }
      {(user.posts.length > 0 && togglePosts) &&
        <>
          {user.posts.map(post =>
            <Link to={`/thread/${post.thread}`} key={post.id}>
              <p>{post.content.length > 10 ? post.content.slice(0, 10) + '...' : post.content}</p>
            </Link>)}
        </>
      }
      <GoBack/>
    </div>
  )
}
export default User