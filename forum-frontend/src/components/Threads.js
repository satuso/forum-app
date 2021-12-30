import React from 'react'
import NewThread from './NewThread'
import ThreadList from './ThreadList'

const Threads = ({ user, toggle, threads, addThread, newTitle, newThread, setNewTitle, setNewThread, setToggle }) => {
  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleThreadChange = (event) => {
    console.log(event.target.value)
    setNewThread(event.target.value)
  }
  return (
    <>
      {user &&
      <div className='center'>
        <span className='link' onClick={() => setToggle(!toggle)}>New Thread <i className="fas fa-comment"></i></span>
      </div>
      }
      {toggle &&
      <NewThread
        addThread={addThread}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newThread={newThread}
        handleThreadChange={handleThreadChange}
      />}
      {threads.map(thread => <ThreadList
        key={thread.id}
        thread={thread}
        user={user}
      />)
      }
    </>
  )
}
export default Threads