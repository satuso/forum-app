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
    if (newMessage.length >= 2 && newTitle.length >= 2){
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
      dispatch(setNotification('Title and message must contain least 2 characters', 10))
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
        <input
          value={newTitle}
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Topic'}
          placeholder='Topic'
          onChange={handleTitleChange}
        /><br/>
        <textarea
          value={newMessage}
          wrap='hard'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Message'}
          placeholder='Message'
          onChange={handleMessageChange}
        /><br/>
        <button className='btn btn-primary' type='submit'>Send</button>
      </form>
    </div>
  )
}
export default NewThreadForm