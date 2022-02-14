import React, { useEffect } from 'react'
import postService from '../services/posts'

const NewPost = ({ user, replyToThread, newPost, handleReplyChange }) => {

  useEffect(() => {
    postService.setToken(user.token)
  }, [])

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

export default NewPost