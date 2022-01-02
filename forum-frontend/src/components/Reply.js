import React from 'react'

const Reply = ({ user, replyToThread, newPost, handleReplyChange }) => {
  return (
    user &&
    <div className="center">
      <form onSubmit={replyToThread}>
        <textarea
          onFocus={(e) => e.target.placeholder = ''}
          placeholder='Content'
          value={newPost}
          onChange={handleReplyChange}
        /><br/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Reply