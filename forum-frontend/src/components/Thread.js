import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import NewPost from './NewPost'
import Avatar from './Avatar'

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
    if (newPost.length >= 2){
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
    } else {
      setMessage('message must contain least 2 characters')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleReplyChange = (event) => {
    setNewPost(event.target.value)
  }

  const date = thread.date.split('T')
  const userAvatar = thread.user
  return (
    <>
      {user &&
      <div className='center'>
        <button className='btn btn-primary'  onClick={() => setToggle(!toggle)}>Reply <i className="fas fa-comment"></i></button>
      </div>
      }
      {user && toggle && <NewPost
        thread={thread}
        user={user}
        replyToThread={replyToThread}
        handleReplyChange={handleReplyChange}
        newPost={newPost}
        toggle={toggle}
        setToggle={setToggle}
      />}
      <div className='thread'>
        <Avatar user={userAvatar}/>
        <div>
          <p className='username'>
            <Link to={`/user/${thread.user.id}`}>{thread.user.username}</Link> {date[0]} {user && (user.id === thread.user.id || user.username === 'admin') && <button className='btn btn-danger' onClick={() => handleRemove(thread.id, thread, user)}>delete</button>}
          </p>
          <h3>{thread.title}</h3>
          <p>{thread.content}</p>
        </div>
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