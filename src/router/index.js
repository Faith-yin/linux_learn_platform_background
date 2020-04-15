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
      path: '/', //登录页面
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/HomePage', //主页面
      name: 'HomePage',
      component: () => import('@/views/HomePage')
    },
    {
      path: '*', //404
      name: '404',
      component: () => import('@/views/404')
    },
  ]
})
