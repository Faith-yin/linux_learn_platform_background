/*
 * @author: 殷鹏飞
 * @Date: 2019-12-25 18:29:31
 * @information: 全局配置
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueInit from '@/vue_init.js'
import './style/index.scss'
import echarts from 'echarts'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(ElementUi)
Vue.use(vueInit)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
