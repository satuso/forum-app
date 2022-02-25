import React from 'react'
import { NavLink } from 'react-router-dom'
import NavigationLink from './NavigationLink'

const Nav = ({ setToggle, setFilter }) => {
  const categories = ['general', 'music', 'movies', 'news']

  return (
    <div className='nav'>
      <div>{categories.map(category => <NavigationLink key={category} category={category} setToggle={setToggle} setFilter={setFilter} />).sort()}</div>
      <div><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/users'>Users</NavLink></div>
    </div>
  )
}
export default Nav