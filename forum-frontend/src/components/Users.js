import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search.js'
import GoBack from './GoBack.js'
import avatar from '../images/default-avatar.png'

const Users = ({ users, search, setSearch }) => {
  let filteredUsers = !search ? users : users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
      />
      {filteredUsers.sort((a, b) => a.username.localeCompare(b.username)).map(user =>
        <div className='small-avatar-username' key={user.id}>
          <Link to={`/user/${user.username}`}>
            <div className='small-avatar-username'>
              {user.avatar ? <img src={user.avatar} alt={user.username} className='avatar avatar-small'/> : <img src={avatar} alt='profile' className='avatar avatar-small'/> } <span>{user.username}</span>
            </div>
          </Link>
        </div>
      )}
      <GoBack />
    </div>
  )
}
export default Users