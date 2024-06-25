import { ref, watch } from 'vue';

import { defineStore } from 'pinia';

import { getProducts, buyProducts } from '../api/product';

import { ElMessage } from 'element-plus';

export const useProductStore = defineStore('product', () => {
  const product = ref([]);

  getProducts().then((res) => {
    product.value = res;
  });

  const car = ref([]);

  const addToCar = (item) => {
    // console.log(item);
    if (product.value[item.id - 1].number > 0) {
      if (item.id in car.value) {
        product.value[item.id - 1].number--;
        car.value[item.id].number++;
        // console.log(car.value[item.id]);
      } else {
        product.value[item.id - 1].number--;
        car.value[item.id] = { ...item, number: 1 };
        // console.log(car.value[item.id]);
      }
    } else {
      ElMessage({
        message: '商品数量不足',
        type: 'warning',
      });
    }
  };
  const reduceToCar = (item) => {
    if (car.value[item.id].number > 1) {
      product.value[item.id - 1].number++;
      car.value[item.id].number--;
    } else {
      delete car.value[item.id];
      product.value[item.id - 1].number++;
    }
  };

  const removeToCar = (item) => {
    product.value[item.id - 1].number += item.number;
    delete car.value[item.id];
  };

  const totalPrice = ref(0);

  watch(
    car,
    (newValue) => {
      totalPrice.value = newValue.reduce((pre, cur) => {
        return pre + cur.price * cur.number;
      }, 0);
    },
    { deep: true, immediate: true }
  );

  const pay = () => {
    if (totalPrice.value > 0) {
      buyProducts(car.value).then((res) => {
        if (res === true) {
          ElMessage({
            message: '购买成功',
            type: 'success',
          });
          car.value = [];
          totalPrice.value = 0;
        } else {
          ElMessage({
            message: '购买失败',
            type: 'error',
          });
        }
      });
    } else {
      ElMessage({
        message: '购物车为空',
        type: 'warning',
      });
    }
  };
  return {
    product,
    car,
    addToCar,
    reduceToCar,
    removeToCar,
    totalPrice,
    pay,
  };
});
