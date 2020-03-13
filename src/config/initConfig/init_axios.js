/*
 * @author: 殷鹏飞
 * @Date: 2019-12-26 08:51:44
 * @information: axios配置
 */
import axios from 'axios'
import { Message } from 'element-ui'

let path = {
    // 本地
    // development: `http://localhost:3000/`,
}

const ENV = process.env.NODE_ENV
export default class InitAxios {
    constructor() {
        // 基础URL
        this.baseURL = path[ENV]
        // 成功响应状态码
        this.successCode = [1000, 200]
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
        let { message, start } = data
        let isSuccess = this.verifyCode(start)
        if (isSuccess) {
            return Promise.resolve(data)
        }
        Message.error(message || '返回状态码错误')
        return Promise.reject(data)
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 检验状态码
    */
    verifyCode(statusCode) {
        return this.successCode.includes(statusCode)
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 请求失败回调
    */
    errorFun() {
        Message.error('数据库连接失败')
        return Promise.reject()
    }
    /*
    * @author: 殷鹏飞
    * @Date: 2019-12-26 08:51:44
    * @information: 初始化axios
    */
    init() {
        let { requestFun, responseFun, errorFun } = this
        // 基础url
        axios.defaults.baseURL = path[ENV];
        // 默认时间
        axios.defaults.timeout = 10000
        // 请求拦截
        axios.interceptors.request.use(requestFun.bind(this), errorFun)
        // 相应拦截
        axios.interceptors.response.use(responseFun.bind(this), errorFun)
    }
}
