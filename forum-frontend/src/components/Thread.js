import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'
import NewPostForm from './NewPostForm'
import Avatar from './Avatar'
import Date from './Date'
import GoBack from './GoBack'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteThread } from '../reducers/threadReducer'
import { deletePost } from '../reducers/postReducer'
import { useNavigate } from 'react-router-dom'

const Thread = ({ thread, user, users, toggle, setToggle, posts }) => {
  const [quote, setQuote] = useState('')
  const [quoteToggle, setQuoteToggle] = useState('')

  if (!thread) {
    return null
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const postsOfThread = posts.filter(post => post.thread === thread.id)

  const removeThread = (id) => {
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        if (thread.posts.length > 0){
          postsOfThread.map(post => dispatch(deletePost(post.id)))
        }
        dispatch(deleteThread(id))
        dispatch(setNotification('Deleted thread', 10))
        navigate('/threads')
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
    }
  }

  const quoteThread = () => {
    setQuote(`Quote from ${thread.user.username}:\n >> ${thread.content} >>\n\n`)
    setQuoteToggle(!quoteToggle)
  }

  const quoteMessage = (id) => {
    const replyPost = postsOfThread.find(post => post.id === id)
    setQuote(`Quote from ${replyPost.username}:\n >> ${replyPost.content} >>\n\n`)
    setQuoteToggle(!quoteToggle)
  }

  return (
    <>
      {user &&
      <div className='center'>
        <h3 className='page-link' onClick={() => setToggle(!toggle)}>Reply <i className='fas fa-comment'></i></h3>
      </div>
      }
      {user ? toggle &&
        <NewPostForm
          thread={thread}
          user={user}
          toggle={toggle}
          setToggle={setToggle}
          quote={quote}
          quoteToggle={quoteToggle}
        /> : <div className='center'><p>Please <Link to='/login'>login</Link> or <Link to='/register'>register</Link> to join discussion</p></div>}
      <div className='thread'>
        <Avatar user={thread.user}/>
        <div>
          <span className='username'>
            <Link to={`/user/${thread.user.username}`}>{thread.user.username}</Link>
          </span>
          <Date date={thread.date}/>
          {user && <button className='btn btn-primary' onClick={() => {
            quoteThread()
            setToggle(true)
          }}>Quote</button>}
          <span>{user && (user.id === thread.user.id || user.username === 'admin') &&
            <button className='btn btn-danger' onClick={() => removeThread(thread.id)}>delete</button>}
          </span>
          <h3>{thread.title}</h3>
          <p className='content'>{thread.content}</p>
        </div>
      </div>
      {postsOfThread.map(post =>
        <Post
          user={user}
          users={users}
          post={post}
          key={post.id}
          quoteMessage={quoteMessage}
          setToggle={setToggle}
        />)}
      <GoBack />
    </>
  )
}
export default Thread