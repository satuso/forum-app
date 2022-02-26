import axios from 'axios'
const baseUrl = 'http://satuso-forum-backend.herokuapp.com/api/forgotpassword'

const update = async (email) => {
  const config = { email: email }
  const response = await axios.put(`${baseUrl}`, config)
  return response.data
}

const object = {
  update
}
export default object