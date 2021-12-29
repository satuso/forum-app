import { Link } from 'react-router-dom'

const ThreadList = ({ thread, setPage, page }) => {
  const date = thread.date.split('T')
  console.log(page)
  return (
      <div className='thread-list'>
        <Link to={`/thread/${thread.id}`} onClick={() => setPage('thread')}>{thread.title}</Link>
        <Link to={`/user/${thread.user.id}`}>
          <span className='thread-list-username'>{thread.user.username}</span>
        </Link>
        {date[0]}
      </div>
  )
}
export default ThreadList