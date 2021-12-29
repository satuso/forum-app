import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ThreadList from './components/ThreadList'
import Thread from './components/Thread'
import Post from './components/Post'
import Header from './components/Header'
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'

const App = () => {
  const [user, setUser] = useState(false)

  return (
    <div className='container'>        
      <Header 
        user={user}
        setUser={setUser}
      />
      <Nav />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/threads' element={<ThreadList />}/>
          <Route path='/thread/:id' element={<Thread />}/>
          <Route path='/post/:id' element={<Post />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App