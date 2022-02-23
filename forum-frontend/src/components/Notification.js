import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div className='notification-container'>
      {notification &&
        <div className='notification'>
          {notification}
        </div>
      }
    </div>
  )
}

export default Notification