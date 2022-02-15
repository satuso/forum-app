import React, { useState } from 'react'
import userService from '../services/users'

const UploadForm = ({ user, setMessage }) => {
  const [avatar, setAvatar] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setAvatar(file)
  }

  const submitAvatar = (e) => {
    e.preventDefault()
    // eslint-disable-next-line no-undef
    const formData = new FormData()
    if (avatar){
      console.log(formData)
      formData.append('avatar', avatar)
      userService
        .update(user.id, formData)
        .then(res => {
          console.log(res)
          setMessage('uploaded new profile picture')
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
      <form onSubmit={submitAvatar}>
        <label><h3>Change profile picture</h3></label>
        <input type='file' multiple accept='image/*' onChange={handleImageChange}></input>
        <br />
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default UploadForm