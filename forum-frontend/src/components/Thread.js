import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import NewPost from './NewPost'
import Avatar from './Avatar'
import GoBack from './GoBack'
import { useDispatch } from 'react-redux'
import { createPost } from '../reducers/postReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const Thread = ({
  thread,
  user,
  toggle,
  setToggle,
  removeThread,
  newPost,
  setNewPost
}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const replyToThread = (event) => {
    event.preventDefault()
    if (newPost.length >= 2){
      try {
        const postObject = {
          content: newPost,
          date: new Date().toISOString(),
          threadId: thread.id
        }
        dispatch(createPost(postObject))
        dispatch(setNotification('Replied to thread', 10))
        setNewPost('')
        setToggle(!toggle)
        navigate(`/thread/${thread.id}`)
      } catch (error) {
        dispatch(setNotification('Error', 10))
      }
    } else {
      dispatch(setNotification('Error', 10))
    }
  }

  const handleReplyChange = (event) => {
    setNewPost(event.target.value)
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
      {user && toggle && <NewPost
        thread={thread}
        user={user}
        replyToThread={replyToThread}
        handleReplyChange={handleReplyChange}
        newPost={newPost}
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