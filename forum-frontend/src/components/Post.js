import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ user, post, postService, posts, setPosts, setMessage }) => {
  const date = post.date.split('T')

  const handleRemovePost = async (id) => {
    // eslint-disable-next-line no-undef
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        await postService.remove(id)
        const updatedPosts = posts.filter(post => post.id !== id)
        setPosts(updatedPosts)
        setMessage('deleted post')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      catch (exception){
        setMessage('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }
  return (
    <div className='post'>
      <p className='username'>
        <Link to={`/user/${post.user}`}>{post.username}</Link> {date[0]} {user && (user.id === post.user || user.username === 'admin') && <button className='delete' onClick={() => handleRemovePost(post.id, post, user)}>delete</button>}</p>
      <p>{post.content}</p>
    </div>
  )
}
export default Post