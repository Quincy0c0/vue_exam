import axios from 'axios';

const instance = axios.create({
  baseURL: '/calender',
  timeout: 3000,
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
