import request from './axios';

export const getReportData = () => {
  return request.get('/reportdata');
};
