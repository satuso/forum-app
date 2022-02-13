import React, { useState } from 'react'
import axios from 'axios'

const UploadForm = ({ user, setMessage }) => {
  const [avatar, setAvatar] = useState(null)

  const onImageChange = (e) => {
    const file = e.target.files[0]
    setAvatar(file)
  }

  const submitAvatar = (e) => {
    e.preventDefault()
    console.log('submit', avatar)
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    if (avatar){
      formData.append('avatar', avatar)
      axios
        .put(`http://localhost:3003/api/users/${user.id}`, formData)
        .then(res => {
          console.log(res)
          setMessage('changed profile picture')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      setMessage('no file chosen')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <form onSubmit={submitAvatar} className='form'>
        <label>Change profile picture</label><br/>
        <input type='file' multiple accept='image/*' onChange={onImageChange}></input>
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default UploadForm