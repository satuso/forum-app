import React from 'react'
import { useNavigate } from 'react-router-dom'

const GoBack = () => {
  const navigate = useNavigate()
  return (
    <div className='center'>
      <button className='btn' onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}
export default GoBack