import { request, request_ip } from './request'

export const getIP = () => {
  return request_ip.get('')
}

export const getAdcode = (ip) => {
  return request.get(`ip?key=73da48818bed5c8e65bc1a06cd9859de&ip=${ip}`)
}

export const getDefaultWeather = (adcode) => {
  return request.get(`/weather/weatherInfo?key=73da48818bed5c8e65bc1a06cd9859de&city=${adcode}`)
}

export const getAllWeather = (adcode) => {
  return request.get(
    `/weather/weatherInfo?key=73da48818bed5c8e65bc1a06cd9859de&city=${adcode}&extensions=all`
  )
}
