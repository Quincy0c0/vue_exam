import request from './requset'



export const getHolidayApi = (key, year) => {
  return request({
    url: '/year',
    method: 'get',
    params: {
      key: key,
      year: year
    }
  })
}