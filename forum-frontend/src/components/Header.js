const Header = ({ user, setUser }) => {
  return (
    <div className='header'>
      <h1>Discussion Forum <i className="far fa-comment"></i></h1>
      <div>{user ? 'User is logged in / Log Out' : 'Log In / Register'}</div>
    </div>
  )
}
export default Header