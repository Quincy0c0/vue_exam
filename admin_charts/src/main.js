import Vue from 'vue';
// import { createPinia, PiniaVuePlugin } from 'pinia';

import App from './App.vue';
// import router from './router';

// Vue.use(PiniaVuePlugin);

import './plugins/element-ui.js';
import './plugins/encharts.js';

new Vue({
  // router,
  // pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
