import request from './axios';

export const getReportData = () => {
  return request.get('/reportdata');
};

export const getSaleData = () => {
  return request.get('/saledata');
};

export const getKeyWordData = () => {
  return request.get('/keyworddata');
};
