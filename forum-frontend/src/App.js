import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeThreads } from './reducers/threadReducer'
import { initializePosts } from './reducers/postReducer'
import { initializeUsers } from './reducers/userReducer'
import threadService from './services/threads'
import postService from './services/posts'
import Home from './components/Home'
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
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'

const App = () => {
  const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const threads = useSelector(state => state.threads)
  let threadsCopy = [...threads].reverse()

  const posts = useSelector(state => state.posts)
  let postsCopy = [...posts]

  const users = useSelector(state => state.users)
  let usersCopy = [...users]

  useEffect(() => {
    dispatch(initializeThreads())
    dispatch(initializeUsers())
    dispatch(initializePosts())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      threadService.setToken(user.token)
      postService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    navigate('/')
    dispatch(setNotification('You are now logged out', 10))
  }

  const filteredThreads = filter ? threadsCopy.filter(thread => thread.category === filter) : threadsCopy
  const loggedInUser = user

  return (
    <>
      <Header
        user={user}
        handleLogout={handleLogout}
        users={usersCopy}
        setFilter={setFilter}
      />
      <Nav
        setToggle={setToggle}
        setFilter={setFilter}
      />
      <Notification />
      <div className='container'>
        <Routes>
          <Route path='*' element={
            <Home
              user={user}
            />
          }/>
          <Route path={'/:category'} element={
            <Threads
              user={user}
              toggle={toggle}
              setToggle={setToggle}
              threads={filteredThreads}
              filter={filter}
              setFilter={setFilter}
            />
          }/>
          <Route path='/login' element={
            <LoginForm
              setUser={setUser}
              setToggle={setToggle}
            />
          }/>
          <Route path='/register' element={
            <RegisterForm users={users}/>
          }/>
          <Route path='/profile' element={
            <Profile
              user={user}
              users={usersCopy}
              handleLogout={handleLogout}
              threads={threadsCopy}
              posts={postsCopy}
            />
          }/>
          {threadsCopy.map(thread =>
            <Route path={`/${thread.category}/thread/${thread.id}`} key={thread.id} element={
              <Thread
                thread={thread}
                user={user}
                users={users}
                setUser={setUser}
                toggle={toggle}
                setToggle={setToggle}
                posts={postsCopy}
              />
            }/>
          )}
          <Route path='/users' element={
            <Users
              users={usersCopy}
              search={search}
              setSearch={setSearch}
            />
          }/>
          {usersCopy.map(user =>
            <Route path={`/user/${user.username}`} key={user.username} element={
              <User
                user={user}
                loggedInUser={loggedInUser}
                threads={threadsCopy}
                posts={postsCopy}
              />
            }/>
          )}
          <Route path='/forgotpassword' element={<ForgotPassword users={usersCopy} />}></Route>
          <Route path='/resetpassword/:token' element={<ResetPassword users={usersCopy}/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App