import React from 'react'

const Avatar = ({ user }) => {
  return (
    <div>
      {user.avatar ? <img src={user.avatar} alt='avatar' className='avatar'/> : <img src='http://localhost:3003/public/uploads/default-avatar.png' alt='avatar' className='avatar'/>}
    </div>
  )
}

export default Avatar