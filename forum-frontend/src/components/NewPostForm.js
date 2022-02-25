import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../reducers/postReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewPostForm = ({
  user,
  thread,
  setToggle,
  toggle,
  quote,
  quoteToggle
}) => {
  const [newPost, setNewPost] = useState('')
  const dispatch = useDispatch()

  const replyToThread = (event) => {
    event.preventDefault()
    try {
      if (newPost.length >= 1){
        const postObject = {
          content: quoteToggle ? quote.concat(newPost) : newPost,
          date: new Date().toISOString(),
          threadId: thread.id
        }
        dispatch(createPost(postObject))
        dispatch(setNotification('Replied to thread', 10))
        setNewPost('')
        setToggle(!toggle)
      } else {
        dispatch(setNotification('Message cannot be empty', 10))
      }
    } catch (error) {
      dispatch(setNotification('Error', 10))
    }
  }

  const handleReplyChange = (event) => {
    setNewPost(event.target.value)
  }

  return (
    user &&
    <div className='center'>
      {quoteToggle && <p><i>{quote}</i></p>}
      <form onSubmit={replyToThread} className='form form-toggle'>
        <label htmlFor='message'>Message</label><br/>
        <textarea
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Message'}
          placeholder='Message'
          id='message'
          type='text'
          wrap='hard'
          value={newPost}
          onChange={handleReplyChange}
          minLength={2}
          maxLength={5000}
          required
        /><br/>
        <button type='submit' className='btn btn-primary'>Send</button>
      </form>
    </div>
  )
}

export default NewPostForm