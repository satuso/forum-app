import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/resetpassword'

const update = async (password, token) => {
  const config = {
    newPassword : password,
    resetLink : token
  }
  const response = await axios.put(`${baseUrl}`, config)
  return response.data
}

const object = {
  update
}
export default object