import React from 'react'
import avatar from '../images/default-avatar.png'

const Avatar = ({ user }) => {
  return (
    <div>
      {user.avatar ? <img src={user.avatar} alt='avatar' className='avatar'/> : <img src={avatar} alt={user.username} className='avatar'/>}
    </div>
  )
}

export default Avatar