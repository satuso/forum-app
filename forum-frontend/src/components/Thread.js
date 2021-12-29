import { Link } from 'react-router-dom'
import Post from './Post'
import Reply from './Reply'

const Thread = ({ thread, user, toggleReply, setToggleReply }) => {
  const date = thread.date.split('T')
  return (
    <>
    <div className='thread'>
      <p className='username'><Link to={`/user/${thread.user.id}`}>{thread.user.username}</Link> {date[0]}</p>
      <h3>{thread.title}</h3>
      <p>{thread.content}</p>
      <button onClick={() => setToggleReply(!toggleReply)}>Reply</button>
      {toggleReply && <Reply thread={thread} user={user} />}
      </div>
      {thread.posts.map(post => <Post post={post} key={post.id} />)}
    </>
  )
}
export default Thread