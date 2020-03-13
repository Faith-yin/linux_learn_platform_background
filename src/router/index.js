/*
 * @author: 殷鹏飞
 * @Date: 2019-12-25 18:29:31
 * @information: 路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', //主页面
      name: 'HomePage',
      component: () => import('@/views/HomePage')
    }
  ]
})
