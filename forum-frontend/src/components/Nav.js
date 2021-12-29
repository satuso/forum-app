import { Link } from 'react-router-dom'
const Nav = ({ user, setPage}) => {
  return (
    <div className='nav'>
      <Link to='/' onClick={() => setPage('threads')}>Threads</Link>
      {user && <Link to='/users'>Users</Link>}
    </div>
  )
}
export default Nav