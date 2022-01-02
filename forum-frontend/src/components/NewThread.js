import React from 'react'
const NewThreadForm = ({ addThread, newTitle, handleTitleChange, newThread, handleThreadChange }) => (
  <div className='center'>
    <form onSubmit={addThread}>
      <input
        value={newTitle}
        onFocus={(e) => e.target.placeholder = ''}
        placeholder='Topic'
        onChange={handleTitleChange}
      /><br/>
      <textarea
        value={newThread}
        onFocus={(e) => e.target.placeholder = ''}
        placeholder='Content'
        onChange={handleThreadChange}
      /><br/>
      <button type="submit">Send</button>
    </form>
  </div>
)
export default NewThreadForm