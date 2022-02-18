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
import Notification from './components/Notification'

import threadService from './services/threads'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { createUser, removeUser } from './reducers/userReducer'
import { createThread, deleteThread } from './reducers/threadReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newThread, setNewThread] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [toggle, setToggle] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPost, setNewPost] = useState('')
  const [search, setSearch] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const threads = useSelector(state => state.threads)
  let threadsCopy = [...threads].reverse()

  const users = useSelector(state => state.users)
  let usersCopy = [...users]

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      threadService.setToken(user.token)
    }
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
      dispatch(setNotification('You are now logged in', 10))
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 10))
    }
  }

  const addThread = (event) => {
    event.preventDefault()
    if (newThread.length >= 2 && newTitle.length >= 2){
      try {
        const threadObject = {
          title: newTitle,
          content: newThread,
          date: new Date().toISOString()
        }
        dispatch(createThread(threadObject))
        dispatch(setNotification('Created a new thread', 10))
        setNewTitle('')
        setNewThread('')
        setToggle(!toggle)
      } catch (error){
        dispatch(setNotification('Error', 10))
      }
    } else {
      dispatch(setNotification('Title and message must contain least 2 characters', 10))
    }
  }

  const removeThread = (id) => {
    if (window.confirm('Are you sure you want to delete this?')){
      try {
        dispatch(deleteThread(id))
        dispatch(setNotification('Deleted thread', 10))
        navigate('/threads')
      }
      catch (error){
        dispatch(setNotification('Error', 10))
      }
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
      dispatch(createUser(userObject))
      navigate('/login')
      dispatch(setNotification('Created new user! You can now log in', 10))
    } catch (error) {
      dispatch(setNotification('Error', 10))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    navigate('/')
    dispatch(setNotification('You are now logged out', 10))
  }

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete your profile?')){
      try {
        dispatch(removeUser(id))
        handleLogout()
        dispatch(setNotification('User deleted', 10))
      }
      catch (error){
        dispatch(setNotification('Error', 10))
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
      <Notification />
      <div className='main'>
        <Routes>
          <Route path='*' element={
            <Threads
              user={user}
              toggle={toggle}
              setToggle={setToggle}
              threads={threadsCopy}
              addThread={addThread}
              newTitle={newTitle}
              newThread={newThread}
              setNewTitle={setNewTitle}
              setNewThread={setNewThread}
              removeThread={removeThread}
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
              users={usersCopy}
              deleteUser={deleteUser}
            />}/>
          {threadsCopy.map(thread =>
            <Route path={`/thread/${thread.id}`} key={thread.id} element={
              <Thread
                thread={thread}
                user={user}
                setUser={setUser}
                toggle={toggle}
                setToggle={setToggle}
                removeThread={removeThread}
                newPost={newPost}
                setNewPost={setNewPost}
              />
            }/>
          )}
          <Route path='/users' element={
            <Users
              users={users}
              search={search}
              setSearch={setSearch}
            />}/>
          {usersCopy.map(user =>
            <Route path={`/user/${user.username}`} key={user.username} element={<User user={user}/>}/>)}
        </Routes>
      </div>
    </div>
  )
}

export default App