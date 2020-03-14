/*
 * @author: 殷鹏飞
 * @Date: 2019-12-26 14:26:43
 * @information: 业务层
 */
import publicApi from '@/api/public_api.js'
import publicClass from '@/mixins/public_class.js'

export default {
  mixins: [publicClass],
  data() {
    return {

    }
  },
  methods: {

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