/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Threads from './components/Threads'
import Thread from './components/Thread'
import Profile from './components/Profile'
import User from './components/User'
import Users from './components/Users'
import Header from './components/Header'
import Nav from './components/Nav'
import threadService from './services/threads'
import loginService from './services/login'
import userService from './services/users'
import postService from './services/posts'

const App = () => {
  const [user, setUser] = useState(null)
  const [threads, setThreads] = useState([])
  const [users, setUsers] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newThread, setNewThread] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [toggle, setToggle] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [posts , setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [search, setSearch] = useState('')

  let navigate = useNavigate()

  useEffect(() => {
    threadService
      .getAll()
      .then(initialThreads => {
        setThreads(initialThreads.reverse())
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      threadService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
      })
  }, [])

  useEffect(() => {
    postService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
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
      navigate('/')
      setMessage('logged in')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addThread = (event) => {
    event.preventDefault()
    try {
      const threadObject = {
        title: newTitle,
        content: newThread,
        date: new Date().toISOString()
      }
      threadService
        .create(threadObject)
        .then(returnedThread => {
          setThreads(threads.concat(returnedThread))
          setNewTitle('')
          setNewThread('')
          setMessage('created new thread')
          setToggle(!toggle)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } catch (exception){
      setMessage('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addUser = (e) => {
    e.preventDefault()
    try {
      const userObject = {
        username: newUsername,
        name: newName,
        password: newPassword
      }
      userService
        .create(userObject)
        .then(returnedUser => {
          setUsers(users.concat(returnedUser))
          navigate('/login')
          setMessage('Created new user! You can now log in.')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } catch (exception) {
      setMessage('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    navigate('/')
    setMessage('logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        await threadService.remove(id)
        const updatedThreads = threads.filter(thread => thread.id !== id)
        setThreads(updatedThreads)
        setMessage('deleted thread')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      catch (exception){
        setMessage('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        await userService.remove(id)
        const updatedUsers = users.filter(user => user.id !== id)
        setUsers(updatedUsers)
        handleLogout()
        setMessage('user deleted')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      catch (exception){
        setMessage('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div className='container'>
      <Header
        user={user}
        handleLogout={handleLogout}
      />
      <Nav
        setToggle={setToggle}
      />
      {message && <div className='alert'>{message}</div>}
      <div className='main'>
        <Routes>
          <Route path='*' element={
            <Threads
              user={user}
              toggle={toggle}
              setToggle={setToggle}
              threads={threads}
              addThread={addThread}
              newTitle={newTitle}
              newThread={newThread}
              setNewTitle={setNewTitle}
              setNewThread={setNewThread}
              handleRemove={handleRemove}
            />
          }/>
          <Route path='/login' element={
            <LoginForm
              username={username}
              password={password}
              setPassword={setPassword}
              setUsername={setUsername}
              handleLogin={handleLogin}
            />
          }/>
          <Route path='/register' element={
            <RegisterForm
              addUser={addUser}
              setNewUsername={setNewUsername}
              setNewName={setNewName}
              setNewPassword={setNewPassword}
            />
          }/>
          <Route path='/profile' element={
            <Profile
              user={user}
              users={users}
              deleteUser={deleteUser}
              setMessage={setMessage}
            />}/>
          {threads.map(thread =>
            <Route path={`/thread/${thread.id}`} key={thread.id} element={
              <Thread
                thread={thread}
                user={user}
                setUser={setUser}
                toggle={toggle}
                setToggle={setToggle}
                handleRemove={handleRemove}
                setMessage={setMessage}
                posts={posts}
                setPosts={setPosts}
                postService={postService}
                newPost={newPost}
                setNewPost={setNewPost}
              />
            }/>
          )}
          <Route path='/users' element={<Users users={users} search={search} setSearch={setSearch}/>}/>
          {users.map(user =>
            <Route path={`/user/${user.id}`} key={user.id} element={<User user={user}/>}/>)}
        </Routes>
      </div>
    </div>
  )
}

export default App