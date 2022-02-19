import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import postService from '../services/posts'
import { createPost } from '../reducers/postReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewPostForm = ({
  user,
  thread,
  setToggle,
  toggle
}) => {
  const [newPost, setNewPost] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    postService.setToken(user.token)
  }, [])

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

  return (
    user &&
    <div className='center'>
      <form onSubmit={replyToThread} className='form'>
        <textarea
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Message'}
          placeholder='Message'
          value={newPost}
          onChange={handleReplyChange}
        /><br/>
        <button type='submit' className='btn btn-primary'>Send</button>
      </form>
    </div>
  )
}

export default NewPostForm