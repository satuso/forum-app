import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

const Post = ({ user, post, postService, posts, setPosts }) => {
  const date = post.date.split('T')

  const handleRemovePost = async (id) => {
    // eslint-disable-next-line no-undef
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        await postService.remove(id)
        const updatedPosts = posts.filter(post => post.id !== id)
        setPosts(updatedPosts)
      }
      catch (error){
        console.log(error)
      }
    }
  }
  const userAvatar = post
  return (
    <div className='post'>
      <Avatar user={userAvatar}/>
      <div>
        <p className='username'>
          <Link to={`/user/${post.username}`}>{post.username}</Link> {date[0]} {user && (user.id === post.user || user.username === 'admin') && <button className='btn btn-danger' onClick={() => handleRemovePost(post.id, post, user)}>delete</button>}</p>
        <p>{post.content}</p>
      </div>
    </div>
  )
}
export default Post