import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'reset-css'

import './index.css'

import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ECharts from 'vue-echarts'
import 'echarts'
// 挂载ECharts

const app = createApp(App)

app.use(createPinia())
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('ECharts', ECharts)
app.mount('#app')
