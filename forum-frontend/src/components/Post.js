import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  const date = post.date.split('T')
  console.log(post)
  return (
    <div className='post'>
      <p className='username'><Link to={`/user/${post.username}`}>{post.username}</Link> {date[0]}</p>
      <p>{post.content}</p> 
    </div>
  )
}
export default Post