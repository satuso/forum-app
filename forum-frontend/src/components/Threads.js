import React from 'react'
import NewThread from './NewThread'
import ThreadList from './ThreadList'

const Threads = ({
  user,
  toggle,
  threads,
  addThread,
  newTitle,
  newThread,
  setNewTitle,
  setNewThread,
  setToggle,
  removeThread
}) => {
  if (threads === []){
    return null
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleThreadChange = (event) => {
    setNewThread(event.target.value)
  }

  return (
    <>
      {user &&
        <div className='center'>
          <button className='btn btn-primary' onClick={() => setToggle(!toggle)}>New Thread <i className="fas fa-comment"></i></button>
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
        removeThread={removeThread}
      />)
      }
    </>
  )
}
export default Threads