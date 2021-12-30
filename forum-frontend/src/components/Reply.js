import React, { useState, useEffect } from 'react'
import postService from '../services/posts'

const Reply = ({ thread, user }) => {
  const [posts , setPosts] = useState([])
  const [newPost, setNewPost] = useState('')

  useEffect(() => {
    postService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
  }, [])

  useEffect(() => {
    postService.setToken(user.token)
  }, [user.token])

  const replyToThread = (event) => {
    event.preventDefault()
    const postObject = {
      content: newPost,
      date: new Date().toISOString(),
      threadId: thread.id
    }
    postService
      .create(postObject)
      .then(returnedPost => {
        setPosts(posts.concat(returnedPost))
        setNewPost('')
      })
  }

  const handleReplyChange = (event) => {
    setNewPost(event.target.value)
  }

  return (
    user &&
    <div className="center">
      <form onSubmit={replyToThread}>
        <textarea
          value={newPost}
          onChange={handleReplyChange}
        /><br/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Reply