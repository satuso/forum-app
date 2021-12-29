import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ThreadList from './components/ThreadList'
import Thread from './components/Thread'
import NewThreadForm from './components/NewThreadForm'
import Profile from './components/Profile'
import User from './components/User'
import Users from './components/Users'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import threadService from './services/threads'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [threads, setThreads] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newThread, setNewThread] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [toggleThread, setToggleThread] = useState(false)
  const [toggleReply, setToggleReply] = useState(false)
  const [page, setPage] = useState('threads')

  useEffect(() => {
    threadService
      .getAll()
      .then(initialThreads => {
        setThreads(initialThreads.reverse())
    })
  }, [threads])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      threadService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedForumUser', JSON.stringify(user)
      ) 
      threadService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addThread = (event) => {
    event.preventDefault()
    const threadObject = {
      title: newTitle,
      content: newThread,
      date: new Date().toISOString(),
    }

    threadService
      .create(threadObject)
        .then(returnedThread => {
        setThreads(threads.concat(returnedThread))
        setNewThread('')
      })
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleThreadChange = (event) => {
    console.log(event.target.value)
    setNewThread(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div className='container'>        
      <Header 
        user={user}
        handleLogout={handleLogout}
      />
      <Nav 
        user={user}
        setPage={setPage}
      />
      <div className='main'>

      {page === 'threads' && 
      <>
      {user && <div className='center'><button onClick={() => setToggleThread(!toggleThread)}>New thread</button></div>}
      {toggleThread &&
        <NewThreadForm 
          addThread={addThread}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          newThread={newThread} 
          handleThreadChange={handleThreadChange}
        />}
      </>}
        <Routes>
          <Route exact path='/' element={threads.map(thread => <ThreadList 
              key={thread.id}
              thread={thread}
              user={user}
              setPage={setPage}
              page={page}
            />)
          }/>
          <Route path='/login' element={
            <Login 
              username={username}
              password={password}
              setPassword={setPassword}
              setUsername={setUsername}
              handleLogin={handleLogin}
              message={message}
            />
          }/>
          <Route path='/register' element={<Register />}/>
          <Route path='/profile' element={<Profile user={user} />}/>
          {threads.map(thread => <Route path={`/thread/${thread.id}`} key={thread.id} element={
            <Thread 
              thread={thread}
              user={user}
              toggleReply={toggleReply}
              setToggleReply={setToggleReply}
              />
          }/>)}
          {threads.map(thread => <Route path={`/user/${thread.user.id}`} key={thread.user.id} element={<User user={thread.user}/>}/>)}
          <Route path='/users' element={<Users />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App