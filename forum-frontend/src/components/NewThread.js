import React from 'react'
const NewThreadForm = ({ addThread, newTitle, handleTitleChange, newThread, handleThreadChange }) => (
  <div className='center'>
    <form onSubmit={addThread}>
      <input
        value={newTitle}
        placeholder='title'
        onFocus={(e) => e.target.placeholder = ''}
        onChange={handleTitleChange}
      /><br/>
      <textarea
        value={newThread}
        placeholder='content'
        onFocus={(e) => e.target.placeholder = ''}
        onChange={handleThreadChange}
      /><br/>
      <button type="submit">Send</button>
    </form>
  </div>
)
export default NewThreadForm