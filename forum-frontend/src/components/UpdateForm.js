import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateUser } from '../reducers/userReducer'

const UpdateForm = ({ userMatch, user, users, removeUser, changePassword, removeAvatar }) => {
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState(null)

  const dispatch = useDispatch()

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setAvatar(file)
  }

  const submitDetails = (e) => {
    e.preventDefault()
    const formData = new FormData()
    try {
      if (name) formData.append('name', name)
      if (dateOfBirth) formData.append('dateOfBirth', dateOfBirth)
      const emails = users.map(user => user.email.toLowerCase())
      if (emails.includes(email.toLowerCase())){
        return dispatch(setNotification('Email already exists', 10))
      } else if (email) formData.append('email', email)
      if (avatar) formData.append('avatar', avatar)
      if (window.confirm('Are you sure you want to update your profile?')){
        dispatch(updateUser(user.id, formData))
        dispatch(setNotification('Updated profile', 10))
      }
      setName('')
      setDateOfBirth('')
      setEmail('')
      setAvatar(null)
    } catch(error){
      dispatch(setNotification('Error', 10))
    }
  }

  const deleteAvatar = () => {
    try {
      if (window.confirm('Are you sure you want to delete avatar?')){
        if (userMatch && userMatch.avatar){
          removeAvatar()
          const formData = new FormData()
          formData.append('avatar', removeAvatar())
          dispatch(updateUser(user.id, formData))
          dispatch(setNotification('Avatar deleted', 10))
        } else {
          dispatch(setNotification('Nothing to delete', 10))
        }
      }
    } catch(error){
      dispatch(setNotification('Error', 10))
    }
  }

  return (
    <div className='update-form'>
      <h2>Edit Profile</h2>
      <form onSubmit={submitDetails} className='form update-form'>
        <label htmlFor='file'>Change avatar</label>
        <input
          type='file'
          id='file'
          accept='image/*'
          onChange={handleImageChange}
        ></input>
        <br/>
        <label htmlFor='name'>Name</label><br/>
        <input
          type='text'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Name'}
          placeholder='Name'
          id='name'
          value={name}
          onChange={({ target }) => setName(target.value)}
          maxLength={50}
        ></input>
        <br/>
        <label htmlFor='dateOfBirth'>Date of Birth</label><br/>
        <input
          type='date'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Date of Birth'}
          placeholder='Date of Birth'
          id='dateOfBirth'
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
        ></input>
        <br/>
        <label htmlFor='email'>Email</label><br/>
        <input
          type='email'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Email'}
          placeholder='Email'
          id='email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          maxLength={50}
        ></input>
        <br/>
        <button className='btn btn-primary' type='submit'>Update</button>
      </form>
      <h2>Change Password</h2>
      <p>Sends a link to your email to change password</p>
      <button className='btn' onClick={changePassword}>Request password change link</button>
      <h2>Delete Avatar</h2>
      <button className='btn btn-danger' onClick={deleteAvatar}>Delete avatar</button>
      <h2>Delete Profile</h2>
      <p>This permanently deletes your profile and forum posts</p>
      {user && <button className='btn btn-danger' onClick={() => removeUser(user.id, user, user)}>Delete profile</button>}
    </div>
  )
}
export default UpdateForm