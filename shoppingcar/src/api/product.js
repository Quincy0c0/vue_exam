// Copyright (c) 2023 smable<316245279@qq.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const products = [
  {
    id: 1,
    title: 'iphone 14',
    price: 5000,
    number: 10, //表示库存
  },
  {
    id: 2,
    title: 'xiaomi 13',
    price: 3000,
    number: 20, //表示库存
  },
  {
    id: 3,
    title: 'huawei mate10',
    price: 4000,
    number: 8, //表示库存
  },
];
//1s中之后返回数组数据
export const getProducts = async () => {
  //为了模拟真实的接口请求
  await wait(1000);
  return products;
};
//结算商品
export const buyProducts = async () => {
  await wait(1000);
  //如果返回true 页面显示结算成功 否则显示结算失败
  return Math.random() > 0.5;
};
function wait(delay) {
  //实现一个wait方法 模拟了 一秒后再执行后面的函数
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}
