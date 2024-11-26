import axios from 'axios'

const url = 'http://localhost:8080/'

const getWithAuth = async (token, path) => {
  try {
    const response = await axios.get(`${url + path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export default getWithAuth
