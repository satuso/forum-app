import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

const App = () => {
  const [user, setUser] = useState(false)

  return (
    <div className='container'>
      <Header 
        user={user}
        setUser={setUser}/>
      <Main />
      <Footer />
    </div>
  )
}

export default App