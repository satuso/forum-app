import React, { useState } from 'react'
import axios from 'axios'

const Upload = ({ user }) => {
  const [avatar, setAvatar] = useState(null)
  const [name, setName] = useState(user.name)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const onImageChange = (e) => {
    const file = e.target.files[0]
    setAvatar(file)
  }
  console.log(avatar)
  const submitAvatar = (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    if (avatar){
      formData.append('name', name)
      formData.append('avatar', avatar)
      axios
        .put(`http://localhost:3003/api/users/${user.id}`, formData)
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
  return (
    <div>
      <form onSubmit={submitAvatar} className='update-form'>
        <input type='text' id='name' placeholder={user.name} onChange={handleNameChange}></input>
        <input type='file' multiple accept='image/*' onChange={onImageChange}></input>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default Upload