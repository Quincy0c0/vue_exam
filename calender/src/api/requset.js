import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://v.juhe.cn/calendar',
  timeout: 3000,
})

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance