import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import Reply from './Reply'

const Thread = ({
  thread,
  user,
  toggle,
  setToggle,
  handleRemove,
  setMessage,
  posts,
  setPosts,
  postService,
  newPost,
  setNewPost
}) => {

  const replyToThread = (event) => {
    event.preventDefault()
    try {
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
          setMessage('replied to thread')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setToggle(!toggle)
        })
    } catch (exception) {
      setMessage('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleReplyChange = (event) => {
    setNewPost(event.target.value)
  }

  const date = thread.date.split('T')
  return (
    <>
      {user &&
      <div className='center'>
        <span className='link' onClick={() => setToggle(!toggle)}>Reply <i className="fas fa-comment"></i></span>
      </div>
      }
      {user && toggle && <Reply
        thread={thread}
        user={user}
        replyToThread={replyToThread}
        handleReplyChange={handleReplyChange}
        newPost={newPost}
        toggle={toggle}
        setToggle={setToggle}
      />}
      <div className='thread'>
        <p className='username'>
          <Link to={`/user/${thread.user.id}`}>{thread.user.username}</Link> {date[0]} {user && (user.id === thread.user.id || user.username === 'admin') && <button className='delete' onClick={() => handleRemove(thread.id, thread, user)}>delete</button>}
        </p>
        <h3>{thread.title}</h3>
        <p>{thread.content}</p>
      </div>
      {thread.posts.map(post =>
        <Post
          user={user}
          post={post}
          key={post.id}
          posts={posts}
          setPosts={setPosts}
          setMessage={setMessage}
          postService={postService}
          thread={post.thread}
        />)}
    </>
  )
}
export default Thread