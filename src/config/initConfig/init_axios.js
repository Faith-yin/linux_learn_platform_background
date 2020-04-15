/*
 * @author: 殷鹏飞
 * @Date: 2019-12-26 08:51:44
 * @information: axios配置
 */
import axios from 'axios'
import { Message } from 'element-ui'

let path = {
    // 本地
    // development: `http://localhost:8888`,
    development: `/api`,
}

const ENV = process.env.NODE_ENV
export default class InitAxios {
    constructor() {
        // 基础URL
        this.baseURL = path[ENV]
        // 成功响应状态码
        this.successCode = [ 200 ]
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 请求拦截
    */
    requestFun(request) {
        return request
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 响应拦截
    */
    responseFun(response) {
        let { data } = response
        let { message, status } = data
        let isSuccess = this.verifyCode(status)
        if (isSuccess) {
            return Promise.resolve(data)
        }
        Message({showClose: true, message: message || '返回状态码错误', type: 'error'})
        return Promise.reject(data)
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 检验状态码
    */
    verifyCode(status) {
        return this.successCode.includes(status)
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 请求失败回调
    */
    errorRequestFun() {
        Message({showClose: true, message: '请求连接失败', type: 'error'})
        return Promise.reject()
    }
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-09 17:39:43
     * @Description: 响应失败回调
     */
    errorResponseFun() {
      Message({showClose: true, message: '请求连接失败', type: 'error'})
      return Promise.reject()
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 初始化axios
    */
    init() {
        let { requestFun, responseFun, errorRequestFun, errorResponseFun } = this
        // 基础url
        axios.defaults.baseURL = path[ENV];
        // 默认时间
        axios.defaults.timeout = 10000
        // 请求拦截
        axios.interceptors.request.use(requestFun.bind(this), errorRequestFun)
        // 响应拦截
        axios.interceptors.response.use(responseFun.bind(this), errorResponseFun)
    }
}
