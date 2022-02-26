import React from 'react'
import Count from './Count'
import GoBack from './GoBack'
import UpdateForm from './UpdateForm'
import UserDetails from './UserDetails'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteUser } from '../reducers/userReducer'
import { deleteThread } from '../reducers/threadReducer'
import { deletePost } from '../reducers/postReducer'
import { useNavigate } from 'react-router-dom'
import forgotPasswordService from '../services/forgotpassword'

const Profile = ({ user, users, handleLogout, threads, posts }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  const threadsOfUser = threads.filter(thread => thread.user.id === user.id)
  const postsOfUser = posts.filter(post => post.user.id === user.id)
  const id = user.id
  const userMatch = users.find(user => user.id === id)

  const removeUser = (id) => {
    if (window.confirm('Are you sure you want to delete your profile?')){
      try {
        if (userMatch && userMatch.threads.length > 0){
          threadsOfUser.map(thread => dispatch(deleteThread(thread.id)))
        }
        if (userMatch && userMatch.posts.length > 0){
          postsOfUser.map(post => dispatch(deletePost(post.id)))
        }
        handleLogout()
        dispatch(deleteUser(id))
        dispatch(setNotification('User deleted', 10))
        navigate('/threads')
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  const changePassword = (e) => {
    e.preventDefault(e)
    if (window.confirm('Are you sure you want to change your password?')){
      try {
        if (userMatch){
          forgotPasswordService.update(userMatch.email)
          dispatch(setNotification(`Password reset link sent to ${userMatch.email}`, 10))
        } else {
          dispatch(setNotification('Error', 10))
        }
      } catch(error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  const removeAvatar = () => {
    if (userMatch){
      const fileToDelete = userMatch.avatar
      return fileToDelete
    }
  }

  return (
    <>
      <div className='profile'>
        <div>
          {userMatch && <UserDetails user={userMatch}/>}
          {userMatch && <p>Email: {userMatch.email}</p>}
          <Count threadsOfUser={threadsOfUser} postsOfUser={postsOfUser}/>
        </div>
        <div>
          <UpdateForm userMatch={userMatch} user={user} users={users} removeUser={removeUser} removeAvatar={removeAvatar} changePassword={changePassword}/>
        </div>
      </div>
      <GoBack />
    </>
  )
}
export default Profile