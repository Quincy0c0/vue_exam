import requset from './request';

// 获取特殊日期
export const getSpecialDayApi = (key, date) => {
  return requset({
    url: '/day',
    method: 'get',
    params: {
      date,
      key,
    },
  });
};
