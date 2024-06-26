import axios from 'axios';

const request = axios.create({
  baseURL: 'http://39.103.151.139:3001/apis',
  timeout: 3000,
});
export default request;
