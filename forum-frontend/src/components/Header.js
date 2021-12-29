import { Link } from 'react-router-dom'

const Header = ({ user, setUser }) => {
  return (
    <div className='header'>
      <h1><Link to='/'>Discussion Forum <i className="far fa-comment"></i></Link></h1>
      <div>{user ? 'User is logged in / Log Out' : <><Link to='/login'>Log In</Link> / <Link to='/register'>Register</Link></>}</div>
    </div>
  )
}
export default Header