import React, { useState, useEffect } from "react"
import postService from "../services/posts"

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
    console.log(event.target.value)
    setNewPost(event.target.value)
  }

  return (
    user &&
    <div className="new-thread">
      <form onSubmit={replyToThread}>
        <textarea
          value={newPost}
          onChange={handleReplyChange}
        /><br/>
        <button type="submit">Reply</button>
      </form>
    </div>
  )
}

export default Reply