import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'

const UploadForm = ({ user }) => {
  const [avatar, setAvatar] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setAvatar(file)
  }

  const submitAvatar = (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      if (avatar){
        formData.append('avatar', avatar)
        userService.update(user.id, formData)
        dispatch(setNotification('Uploaded new profile picture', 10))
        navigate(`/user/${user.username}`)
      } else {
        dispatch(setNotification('No file chosen', 10))
      }
    } catch (error) {
      dispatch(setNotification('Error', 10))
    }
  }

  return (
    <div>
      <form onSubmit={submitAvatar}>
        <label><h3>Change profile picture</h3></label>
        <input
          type='file' multiple accept='image/*'
          onChange={handleImageChange}
        ></input>
        <br />
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default UploadForm