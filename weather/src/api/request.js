import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://restapi.amap.com/v3/',
  timeout: 5000
})

export const request_ip = axios.create({
  baseURL: 'https://api.ipify.org/?format=json',
  timeout: 5000
})
