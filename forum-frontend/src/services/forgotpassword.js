import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL + 'forgotpassword'

const update = async (email) => {
  const config = { email: email }
  const response = await axios.put(`${baseUrl}`, config)
  return response.data
}

const object = {
  update
}
export default object