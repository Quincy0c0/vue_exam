import axios from 'axios';

const request = axios.create({
  baseURL: 'http://39.103.151.139:3001/apis',
  timeout: 5000,
});
export default request;
