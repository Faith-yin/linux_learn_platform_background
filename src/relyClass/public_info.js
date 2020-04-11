/*
 * @author: 殷鹏飞
 * @Date: 2019-12-26 14:26:43
 * @information: 业务层
 */
import publicApi from '@/api/public_api.js'
import publicClass from '@/mixins/public_class.js'
import { Message } from 'element-ui'
import moment from 'moment'

export default {
  mixins: [publicClass],
  data() {
    return {
      // 配置对象
      tabToRouterArr: [
        {
          selectedTab: 1, 
          portMethod: 'showAllInformation',
          updatePortMethod: 'updateInformation',
          addPortMethod: 'addInformation',
          deletePortMethod: 'deleteInformation',
        },
        {
          selectedTab: 2, 
          portMethod: 'showArticle',
          updatePortMethod: 'updateArticle',
          addPortMethod: 'addArticle',
          deletePortMethod: 'deleteArticle',
        },
        {
          selectedTab: 3, 
          portMethod: 'showVideo',
          updatePortMethod: 'updateVideo',
          addPortMethod: 'addVideo',
          deletePortMethod: 'deleteVideo',
        },
        {
          selectedTab: 4, 
          portMethod: 'showAllIssues',
          updatePortMethod: 'updateIssues',
          deletePortMethod: 'deleteIssuesById',
        },
        {
          selectedTab: 5,
          portMethod: 'showAllIssuesComment',
          updatePortMethod: 'updateIssuesComment',
          deletePortMethod: 'deleteIssuesComment',
        },
        {
          selectedTab: 6, 
          portMethod: 'showAllOutsidelink',
          updatePortMethod: 'updateOutsidelink',
          addPortMethod: 'addOutsidelink',
          deletePortMethod: 'deleteOutsidelink',
        },
        {
          selectedTab: 7, 
          portMethod: 'showAllUser',
          updatePortMethod: 'updateUserPassword',
          addPortMethod: 'addUser',
          deletePortMethod: 'deleteUserById',
        },
        {
          selectedTab: 8, 
          portMethod: '',
          updatePortMethod: '',
          addPortMethod: '',
          deletePortMethod: '',
        },
        {
          selectedTab: 9, 
          portMethod: 'showAllAdmin',
          updatePortMethod: 'updateAdmin',
          addPortMethod: 'addAdmin',
          deletePortMethod: 'deleteAdmin',
        },
      ],
      // 请求配置对象   2查看
      reqArr: [
        {eventMark: 1, msg: '添加成功', method: 'addPortMethod'},    // 1新建
        {eventMark: 3, msg: '保存成功', method: 'updatePortMethod'}, // 3编辑
        {eventMark: 4, msg: '删除成功', method: 'deletePortMethod'}, // 4删除
      ]
    }
  },
  methods: {

// -------------------------  业务方法  ------------------------------

    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-16 13:15:26
     * @Description: 判断是否登录状态
     */
    judgeLogin() {
      // 从 sessionStorage 中获取管理员信息
      let adminInfo = JSON.parse(sessionStorage.getItem('adminInfo'))
      // 如果没有管理员信息，即未登录
      if(!adminInfo || !Object.keys(adminInfo).length) {
        Message({showClose: true, message: '请管理员登录', type: 'warning'})
        return false
      }
      return true
    },

    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-16 13:52:08
     * @Description: 时间格式化
     */   
    formatter(row, column, cellValue, index) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    }, 

    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 11:29:42
     * @Description: 审核状态格式化： 数字-->文字
     */    
    checkStatusFormatter(row, column, cellValue, index) {
      let str =''
      if(cellValue == 3) str = '未通过'
      if(cellValue == 2) str = '已通过'
      if(cellValue == 1) str = '审核中'
      return str
    },

    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 11:29:42
     * @Description: 审核状态格式化： 文字-->数字
     */    
    checkStatsToNum(val) {
      let number = 0
      if(val == '未通过') number = 3
      if(val == '已通过') number = 2
      if(val == '审核中') number = 1
      return number
    },

    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-18 11:26:09
     * @Description: 字符串加***展示
     */    
    encriptStr(row, column, cellValue, index) {
      if(typeof(cellValue) != 'string')return;
      let str = ''
      for(let i=0; i<cellValue.length; i++) {
        str += '*'
      }
      return str
    },





// -------------------------  接口方法  ------------------------------

    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 13:57:27
     * @Description: information 操作接口
     */  
    // 查询全部
    showAllInformation(model) {
      return publicApi.showAllInformation(model)
    },
    // 添加 
    addInformation(model) {
      return publicApi.addInformation(model)
    },
    // 修改
    updateInformation(model) {
      return publicApi.updateInformation(model)
    },
    // 删除 
    deleteInformation(model) {
      return publicApi.deleteInformation(model)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 14:01:39
     * @Description: article 操作接口
     */
    // 查询全部
    showArticle(model) {
      return publicApi.showArticle(model)
    },
    // 查询全部：按阅读量降序排列
    showArticleOrderByView() {
      return publicApi.showArticleOrderByView()
    },
    // 添加
    addArticle(model) {
      return publicApi.addArticle(model)
    },
    // 修改
    updateArticle(model) {
      return publicApi.updateArticle(model)
    },
    // 删除
    deleteArticle(model) {
      return publicApi.deleteArticle(model)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 14:02:20
     * @Description: video 操作接口
     */
    // 查询全部
    showVideo(model) {
      return publicApi.showVideo(model)
    },
    // 查询全部：按阅读量降序排列
    showVideoOrderByView() {
      return publicApi.showVideoOrderByView()
    },
    // 修改
    updateVideo(model) {
      return publicApi.updateVideo(model)
    },
    // 添加
    addVideo(model) {
      return publicApi.addVideo(model)
    },
    // 删除
    deleteVideo(model) {
      return publicApi.deleteVideo(model)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 14:03:04
     * @Description: issues 操作接口
     */
    // 查询全部
    showAllIssues(model) {
      return publicApi.showAllIssues(model)
    },
    // 查询全部：按阅读量降序排列
    showIssuesOrderByView() {
      return publicApi.showIssuesOrderByView()
    },
    // 修改
    updateIssues(model) {
      return publicApi.updateIssues(model)
    },
    // 删除 
    deleteIssuesById(model) {
      return publicApi.deleteIssuesById(model)
    },
    // issuesComment 查询全部
    showAllIssuesComment(model) {
      return publicApi.showAllIssuesComment(model)
    },
    // issuesComment 条件查询：根据归属问题issueId查询
    findIssuesCommentByIssuesId(model) {
      return publicApi.findIssuesCommentByIssuesId(model)
    },
    // issuesComment 修改
    updateIssuesComment(model) {
      return publicApi.updateIssuesComment(model)
    },
    // issuesComment 删除
    deleteIssuesComment(model) {
      return publicApi.deleteIssuesComment(model)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 14:04:02
     * @Description: outsidelink 操作接口
     */
    // 查询全部
    showAllOutsidelink(model) {
      return publicApi.showAllOutsidelink(model)
    },
    // 添加 
    addOutsidelink(model) {
      return publicApi.addOutsidelink(model)
    },
    // 修改
    updateOutsidelink(model) {
      return publicApi.updateOutsidelink(model)
    },
    // 删除 
    deleteOutsidelink(model) {
      return publicApi.deleteOutsidelink(model)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 14:05:11
     * @Description: 用户user 操作接口
     */
    // 查询全部
    showAllUser(model) {
      return publicApi.showAllUser(model)
    },
    // 条件查询：根据用户名称
    findUserByName(model) {
      return publicApi.findUserByName(model)
    },
    // 添加
    addUser(model) {
      return publicApi.addUser(model)
    },
    // 修改
    updateUserById(model) {
      return publicApi.updateUserById(model)
    },
    // 修改：重置密码
    updateUserPassword(model) {
      return publicApi.updateUserPassword(model)
    },
    // 删除
    deleteUserById(model) {
      return publicApi.deleteUserById(model)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 14:06:16
     * @Description: 管理员admin 操作接口
     */
    // 查询全部
    showAllAdmin(model) {
      return publicApi.showAllAdmin(model)
    },
    // 条件查询：根据名称 和 密码查询
    findAdminByNameAndPassword(model) {
      return publicApi.findAdminByNameAndPassword(model)
    },
    // 添加 
    addAdmin(model) {
      return publicApi.addAdmin(model)
    },
    // 修改
    updateAdmin(model) {
      return publicApi.updateAdmin(model)
    },
    // 删除
    deleteAdmin(model) {
      return publicApi.deleteAdmin(model)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-11 17:11:14
     * @Description: 文件(video,image,audio等)上传服务器 相关接口
     */ 
    // 视频上传
    uploadVideo(model) {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      return publicApi.uploadVideo(model, config)
    },
    // 图片上传
    uploadImg(model) {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      return publicApi.uploadImg(model, config)
    },


    /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 11:47:11
     * @Description: 网站访问量信息
     */
    // 查询全部：按日期降序排列
    showAllWebNum() {
      return publicApi.showAllWebNum()
    },
    // 更新数据viewCount访问量字段 +1
    updateWebNumById() {
      let model = moment().format('YYYY-MM-DD')
      return publicApi.updateWebNumById(model)
    },


      /**
     * @Author: 殷鹏飞
     * @Date: 2020-04-03 18:48:13
     * @Description: 各个表总数
     */
    findTotal() {
      return publicApi.findTotal()
    },
    showPublish() {
      return publicApi.showPublish()
    },
  }
}