import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search.js'
import GoBack from './GoBack.js'

const Users = ({ users, search, setSearch }) => {
  let filteredUsers = !search ? users : users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
      />
      {filteredUsers.sort((a, b) => a.username.localeCompare(b.username)).map(user =>
        <p key={user.id}>
          <Link to={`/user/${user.username}`}>{user.username}</Link> {user.name}</p>)}
      <GoBack />
    </div>
  )
}
export default Users