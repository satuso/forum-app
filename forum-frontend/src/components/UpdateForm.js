import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateUser } from '../reducers/userReducer'

const UpdateForm = ({ user, users }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      if (age < 0 || age > 120){
        return dispatch(setNotification('Age must be between 1-120', 10))
      } else if (age) formData.append('age', age)
      const emails = users.map(user => user.email.toLowerCase())
      if (emails.includes(email.toLowerCase())){
        return dispatch(setNotification('Email already exists', 10))
      } else if (email) formData.append('email', email)
      if (avatar) formData.append('avatar', avatar)
      if (password === confirmPassword) {
        formData.append('password', password)
        if (window.confirm('Are you sure you want to update profile?')){
          dispatch(updateUser(user.id, formData))
          dispatch(setNotification('Updated profile', 10))
        }
        setName('')
        setAge('')
        setPassword('')
        setAvatar(null)
      } else {
        return dispatch(setNotification('Passwords must match', 10))
      }
    } catch(error){
      dispatch(setNotification('Error', 10))
    }
  }

  return (
    <div>
      <h2>Edit profile</h2>
      <p>Fields that are empty will not be updated</p>
      <form onSubmit={submitDetails} className='form update-form'>
        <label htmlFor='file'>Change profile picture</label>
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
        <label htmlFor='age'>Age</label><br/>
        <input
          type='number'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Age'}
          placeholder='Age'
          id='age'
          value={age}
          onChange={({ target }) => setAge(target.value)}
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
        <label htmlFor='password'>New Password</label><br/>
        <input
          type='password'
          placeholder='Password'
          id='password'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Password'}
          onChange={({ target }) => setPassword(target.value)}
          minLength={8}
          maxLength={50}
        />
        <label htmlFor='passwordConfirm'>Confirm New Password</label><br/>
        <input
          type='password'
          placeholder='Confirm Password'
          id='passwordConfirm'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Confirm Password'}
          onChange={({ target }) => setConfirmPassword(target.value)}
          minLength={8}
          maxLength={50}
        />
        <br/>
        <button className='btn btn-secondary' type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default UpdateForm