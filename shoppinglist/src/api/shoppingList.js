import request from './requset'


export const getShoppingApi = () => {
  return request({
    url: '/Products',
    method: 'GET',
  })
}

export const postShoppingApi = (data) => {
  return request({
    url: '/Products',
    method: 'POST',
    data,
  })
}

export const deleteShoppingApi = (id) => {
  return request({
    url: `/Products/${id}`,
    method: 'DELETE',
  })
}

export const putShoppingApi = (id, data) => {
  return request({
    url: `/Products/${id}`,
    method: 'PUT',
    data,
  })
}
