import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoBack from './GoBack'
import UploadForm from './UploadForm'
import UpdateForm from './UpdateForm'
import UserDetails from './UserDetails'
import { deleteUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Profile = ({ user, users, handleLogout }) => {
  const [toggleThreads, setToggleThreads] = useState(false)
  const [togglePosts, setTogglePosts] = useState(false)
  const dispatch = useDispatch()

  if (!user){
    return null
  }

  const removeUser = async (id) => {
    if (window.confirm('Are you sure you want to delete your profile?')){
      try {
        dispatch(deleteUser(id))
        handleLogout()
        dispatch(setNotification('User deleted', 10))
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  const id = user.id
  const userMatch = users.find(user => user.id === id)

  return (
    <>
      <div className='profile'>
        <div>
          <UserDetails user={user} />
          <UploadForm user={user}/>
          <p>
            <span className='page-link' onClick={() => {
              setTogglePosts(false)
              setToggleThreads(!toggleThreads)}}
            >
              {userMatch && userMatch.threads.length} {userMatch && userMatch.threads.length === 1 ? 'thread' : 'threads'}
            </span> • <span className='page-link' onClick={() => {
              setTogglePosts(!togglePosts)
              setToggleThreads(false)}}
            >
              {userMatch && userMatch.posts.length} {userMatch && userMatch.posts.length === 1 ? 'post' : 'posts'}
            </span>
          </p>
          {userMatch && userMatch.threads.map(thread =>
            <Link to={`/thread/${thread.id}`} key={thread.id}><p>{thread.title}</p></Link>
          )}
          {userMatch && togglePosts && userMatch.posts.map(post =>
            <Link to={`/thread/${post.thread}`} key={post.id}><p>{post.content.length > 10 ? post.content.slice(0, 10) + '...' : post.content}</p></Link>
          )}
        </div>
        <div>
          <h3>Edit profile</h3>
          <UpdateForm user={user}/>
          {user && <button className='btn btn-danger' onClick={() => removeUser(user.id, user, user)}>Delete profile</button>}
        </div>
      </div>
      <GoBack />
    </>
  )
}
export default Profile