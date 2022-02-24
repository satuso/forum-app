import React from 'react'
import { Link } from 'react-router-dom'
import ThreadList from './ThreadList'

const Home = ({ user, threads }) => {
  return (
    <>
      {user && threads ?
        <>
          <h2 className='message'>Most recent posts</h2>
          {threads.map(thread =>
            <ThreadList
              key={thread.id}
              thread={thread}
              user={user}
            />)
          }
        </>
        : <p className='message'>Please <Link to='/login'>login</Link> or <Link to='/register'>register</Link> to join discussion</p>}
    </>
  )
}

export default Home