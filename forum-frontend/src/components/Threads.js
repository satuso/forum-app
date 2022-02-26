import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import NewThreadForm from './NewThreadForm'
import ThreadList from './ThreadList'

const Threads = ({ user, toggle, setToggle, threads, filter, setFilter }) => {
  if (threads === []){
    return null
  }

  const { category } = useParams()

  useEffect(() => {
    setFilter(category)
  }, [])

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <>
      {user &&
        <div className='center'>
          <h2>{filter ? capitalize(filter) : ''}</h2>
          <h3 className='page-link' onClick={() => setToggle(!toggle)}>Create a new thread <i className='fas fa-comment'></i></h3>
        </div>}
      {user ? toggle &&
        <NewThreadForm
          toggle={toggle}
          setToggle={setToggle}
          filter={filter}
        /> : <div className='center'><p>Please <Link to='/login'>login</Link> or <Link to='/register'>register</Link> to join discussion</p></div>}
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