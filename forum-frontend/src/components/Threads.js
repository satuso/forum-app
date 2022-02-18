import React from 'react'
import NewThreadForm from './NewThreadForm'
import ThreadList from './ThreadList'

const Threads = ({
  user,
  toggle,
  setToggle,
  threads
}) => {

  if (threads === []){
    return null
  }

  return (
    <>
      {user &&
        <div className='center'>
          <button className='btn btn-primary' onClick={() => setToggle(!toggle)}>New Thread <i className="fas fa-comment"></i></button>
        </div>
      }
      {toggle &&
      <NewThreadForm
        toggle={toggle}
        setToggle={setToggle}
      />}
      {threads.map(thread =>
        <ThreadList
          key={thread.id}
          thread={thread}
          user={user}
        />)
      }
    </>
  )
}
export default Threads