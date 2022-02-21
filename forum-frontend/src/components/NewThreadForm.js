import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createThread } from '../reducers/threadReducer'

const NewThreadForm = ({ toggle, setToggle }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const dispatch = useDispatch()

  const addThread = (event) => {
    event.preventDefault()
    if (newMessage.length >= 1 && newTitle.length >= 1){
      try {
        const threadObject = {
          title: newTitle,
          content: newMessage,
          date: new Date().toISOString()
        }
        dispatch(createThread(threadObject))
        dispatch(setNotification('Created a new thread', 10))
        setNewTitle('')
        setNewMessage('')
        setToggle(!toggle)
      } catch (error){
        console.log(error)
        dispatch(setNotification('Error', 10))
      }
    } else {
      dispatch(setNotification('Title and message cannot be empty', 10))
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  return (
    <div className='center'>
      <form onSubmit={addThread} className='form form-toggle'>
        <label htmlFor='topic'>Topic</label><br/>
        <input
          value={newTitle}
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Topic'}
          placeholder='Topic'
          id='topic'
          type='text'
          onChange={handleTitleChange}
          minLength={1}
          maxLength={40}
          required
        /><br/>
        <label htmlFor='message'>Message</label><br/>
        <textarea
          value={newMessage}
          wrap='hard'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Message'}
          placeholder='Message'
          id='message'
          type='text'
          onChange={handleMessageChange}
          minLength={1}
          maxLength={5000}
          required
        /><br/>
        <button className='btn btn-primary' type='submit'>Send</button>
      </form>
    </div>
  )
}
export default NewThreadForm