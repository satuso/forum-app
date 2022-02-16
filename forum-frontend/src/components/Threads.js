import React from 'react'
import NewThread from './NewThread'
import ThreadList from './ThreadList'
import { useSelector } from 'react-redux'

const Threads = ({
  user,
  toggle,

  addThread,
  newTitle,
  newThread,
  setNewTitle,
  setNewThread,
  setToggle,
  handleRemoveThread
}) => {

  const threads = useSelector(state => state.threads)
  const threadsCopy = [ ...threads ].reverse()

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
      {threadsCopy.map(thread => <ThreadList
        key={thread.id}
        thread={thread}
        user={user}
        handleRemoveThread={handleRemoveThread}
      />)
      }
    </>
  )
}
export default Threads