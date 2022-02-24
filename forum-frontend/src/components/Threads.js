import React from 'react'
import NewThreadForm from './NewThreadForm'
import ThreadList from './ThreadList'

const Threads = ({ user, toggle, setToggle, threads, filter }) => {
  if (threads === []){
    return null
  }

  return (
    <>
      {user &&
        <div className='center'>
          <button className={toggle ? 'btn btn-toggle' : 'btn btn-toggle off'} onClick={() => setToggle(!toggle)}>New Thread <i className="fas fa-comment"></i></button>
        </div>}
      {toggle &&
      <NewThreadForm
        toggle={toggle}
        setToggle={setToggle}
        filter={filter}
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