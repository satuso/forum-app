import React, { useState } from 'react'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const UpdateForm = ({ user }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setAvatar(file)
  }

  const submitDetails = (e) => {
    e.preventDefault()
    const formData = new FormData()
    try {
      const regex = /[^a-zA-Z]/g
      if (name.match(regex)){
        return dispatch(setNotification('Name can only contain letters', 10))
      } else if (name) formData.append('name', name)
      if (age) formData.append('age', age)
      if (email) formData.append('email', email)
      if (avatar) formData.append('avatar', avatar)
      userService.update(user.id, formData)
      setName('')
      setAge('')
      dispatch(setNotification('Updated profile', 10))
      navigate(`/user/${user.username}`)
    } catch(error){
      dispatch(setNotification('Error', 10))
    }
  }

  return (
    <div>
      <form onSubmit={submitDetails} className='form update-form'>
        <label htmlFor='file'>Change profile picture</label>
        <input
          type='file'
          id='file'
          multiple accept='image/*'
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
          maxLength={30}
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
        ></input>
        <br/>
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
      <p>Fields that are empty will not be updated</p>
    </div>
  )
}
export default UpdateForm