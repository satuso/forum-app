import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search.js'

const Users = ({ users, search, setSearch }) => {
  let filteredUsers = !search ? users : users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
      />
      {filteredUsers.sort((a, b) => a.username.localeCompare(b.username)).map(user => <p key={user.id}><Link to={`/user/${user.id}`}>{user.username}</Link> {user.name}</p>)}
    </>
  )
}
export default Users