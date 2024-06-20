import request from './requset'


export const getUsersApi = () => {
  return request({
    url: '/users',
    method: 'GET',
  })
}