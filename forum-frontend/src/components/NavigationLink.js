import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationLink = ({ setToggle, setFilter, category }) => {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to={`/${category}`} onClick={() => {
      setToggle(false)
      setFilter(category)
    }}>{capitalize(category)}</NavLink>
  )
}
export default NavigationLink