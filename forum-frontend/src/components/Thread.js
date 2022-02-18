/* eslint-disable no-undef */
import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import NewPostForm from './NewPostForm'
import Avatar from './Avatar'
import GoBack from './GoBack'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteThread } from '../reducers/threadReducer'
import { useNavigate } from 'react-router-dom'

const Thread = ({
  thread,
  user,
  toggle,
  setToggle
}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeThread = (id) => {
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        dispatch(deleteThread(id))
        dispatch(setNotification('Deleted thread', 10))
        navigate('/threads')
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  const date = thread.date.split('T')
  const userAvatar = thread.user
  return (
    <>
      {user &&
      <div className='center'>
        <button className='btn btn-primary'  onClick={() => setToggle(!toggle)}>Reply <i className="fas fa-comment"></i></button>
      </div>
      }
      {user && toggle && <NewPostForm
        thread={thread}
        user={user}
        toggle={toggle}
        setToggle={setToggle}
      />}
      <div className='thread'>
        <Avatar user={userAvatar}/>
        <div>
          <p className='username'>
            <Link to={`/user/${thread.user.username}`}>{thread.user.username}</Link> {date[0]} {user && (user.id === thread.user.id || user.username === 'admin') && <button className='btn btn-danger' onClick={() => removeThread(thread.id, thread, user)}>delete</button>}
          </p>
          <h3>{thread.title}</h3>
          <p>{thread.content}</p>
        </div>
      </div>
      {thread.posts.map(post =>
        <Post
          user={user}
          post={post}
          key={post.id}
        />)}
      <GoBack />
    </>
  )
}
export default Thread