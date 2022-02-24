import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ setToggle, setFilter }) => {
  return (
    <div className='nav'>
      <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='*' onClick={() => {
        setToggle(false)
        setFilter(null)
      }}>Home</NavLink>

      <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/general' onClick={() => {
        setToggle(false)
        setFilter('general')
      }}>General</NavLink>

      <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/music' onClick={() => {
        setToggle(false)
        setFilter('music')
      }}>Music</NavLink>

      <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/movies' onClick={() => {
        setToggle(false)
        setFilter('movies')
      }}>Movies</NavLink>

      <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/users'>Users</NavLink>
    </div>
  )
}
export default Nav