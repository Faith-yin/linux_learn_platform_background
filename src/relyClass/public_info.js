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
          portMethod: 'showAllArticle',
          updatePortMethod: 'updateArticle',
          addPortMethod: 'addArticle',
          deletePortMethod: 'deleteArticle',
        },
        {
          selectedTab: 3, 
          portMethod: 'showAllVideo',
          updatePortMethod: 'updateVideo',
          addPortMethod: 'addVideo',
          deletePortMethod: 'deleteVideo',
        },
        {
          selectedTab: 4, 
          portMethod: 'showAllIssues',
          updatePortMethod: 'updateIssues',
        },
        {
          selectedTab: 5,
          portMethod: 'showAllIssuesComment',
          updatePortMethod: 'updateIssuesComment',
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
          updatePortMethod: 'updateUserById',
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
      // 请求配置对象
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
    showAllArticle(model) {
      return publicApi.showAllArticle(model)
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
    showAllVideo(model) {
      return publicApi.showAllVideo(model)
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

  }
}