import React from 'react'

const NewThreadForm = ({ addThread, newTitle, handleTitleChange, newThread, handleThreadChange }) => (
  <div className='center'>
    <form onSubmit={addThread} className='form'>
      <input
        value={newTitle}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Topic'}
        placeholder='Topic'
        onChange={handleTitleChange}
      /><br/>
      <textarea
        value={newThread}
        onFocus={(e) => e.target.placeholder = ''}
        onBlur={(e) => e.target.placeholder = 'Message'}
        placeholder='Message'
        onChange={handleThreadChange}
      /><br/>
      <button className='btn btn-primary' type='submit'>Send</button>
    </form>
  </div>
)
export default NewThreadForm