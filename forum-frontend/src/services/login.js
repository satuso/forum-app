import axios from 'axios'
const baseUrl = 'https://satuso-forum-frontend.herokuapp.com/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const object = {
  login
}

export default object