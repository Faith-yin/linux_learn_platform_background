/*
 * @author: 殷鹏飞
 * @Date: 2019-12-26 13:58:53
 * @information: api层
 */
import axios from 'axios'

const publicApi = {

  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 13:57:27
   * @Description: information 操作接口
   */  
  // 查询全部
  showAllInformation(model) {
    return axios.post(`/information/showAllInformation`,model)
  },
  // 添加 
  addInformation(model) {
    return axios.post(`/information/addInformation`,model)
  },
  // 修改
  updateInformation(model) {
    return axios.put(`/information/updateInformation`,model)
  },
  // 删除 
  deleteInformation(model) {
    return axios.delete(`/information/deleteInformation/${model}`)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 14:01:39
   * @Description: article 操作接口
   */
  // 查询全部
  showAllArticle(model) {
    return axios.post(`/article/showAllArticle`,model)
  },
  // 添加
  addArticle(model) {
    return axios.post(`/article/addArticle`,model)
  },
  // 修改
  updateArticle(model) {
    return axios.put(`/article/updateArticle`,model)
  },
  // 删除
  deleteArticle(model) {
    return axios.delete(`/article/deleteArticle`,model)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 14:02:20
   * @Description: video 操作接口
   */
  // 查询全部
  showAllVideo(model) {
    return axios.post(`/video/showAllVideo`,model)
  },
  // 修改
  updateVideo(model) {
    return axios.put(`/video/updateVideo`,model)
  },
  // 添加
  addVideo(model) {
    return axios.post(`/video/addVideo`,model)
  },
  // 删除
  deleteVideo(model) {
    return axios.post(`/video/deleteVideo`,model)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 14:03:04
   * @Description: issues 操作接口
   */
  // 查询全部
  showAllIssues(model) {
    return axios.post(`/issues/showAllIssues`,model)
  },
  // 修改
  updateIssues(model) {
    return axios.put(`/issues/updateIssues`,model)
  },
  // 删除 
  deleteIssuesById(model) {
    return axios.delete(`/issues/deleteIssuesById`,model)
  },
  // issuesComment 查询全部
  showAllIssuesComment(model) {
    return axios.post(`/issuesComment/showAllIssuesComment`,model)
  },
  // issuesComment 条件查询：根据归属问题issueId查询
  findIssuesCommentByIssuesId(model) {
    return axios.post(`/issuesComment/findIssuesCommentByIssuesId/${model}`)
  },
  // issuesComment 修改
  updateIssuesComment(model) {
    return axios.put(`/issuesComment/updateIssuesComment`,model)
  },
  // issuesComment 删除
  deleteIssuesComment(model) {
    return axios.delete(`/issuesComment/deleteIssuesComment`,model)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 14:04:02
   * @Description: outsidelink 操作接口
   */
  // 查询全部
  showAllOutsidelink(model) {
    return axios.post(`/outsidelink/showAllOutsidelink`,model)
  },
  // 添加 
  addOutsidelink(model) {
    return axios.post(`/outsidelink/addOutsidelink`,model)
  },
  // 修改
  updateOutsidelink(model) {
    return axios.put(`/outsidelink/updateOutsidelink`,model)
  },
  // 删除 
  deleteOutsidelink(model) {
    return axios.delete(`/outsidelink/deleteOutsidelink`,model)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 14:05:11
   * @Description: 用户user 操作接口
   */
  // 查询全部
  showAllUser(model) {
    return axios.post(`/user/showAllUser`,model)
  },
  // 条件查询：根据用户名称
  findUserByName(model) {
    return axios.post(`/user/findUserByName`,model)
  },
  // 添加
  addUser(model) {
    return axios.post(`/user/addUser`,model)
  },
  // 修改
  updateUserById(model) {
    return axios.put(`/user/updateUserById`,model)
  },
  // 删除
  deleteUserById(model) {
    return axios.delete(`/user/deleteUserById`,model)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 14:06:16
   * @Description: 管理员admin 操作接口
   */
  // 查询全部
  showAllAdmin(model) {
    return axios.post(`/admin/showAllAdmin`,model)
  },
  // 条件查询：根据名称 和 密码查询
  findAdminByNameAndPassword(model) {
    return axios.post(`/admin/findAdminByNameAndPassword`,model)
  },
  // 添加 
  addAdmin(model) {
    return axios.post(`/admin/addAdmin`,model)
  },
  // 修改
  updateAdmin(model) {
    return axios.put(`/admin/updateAdmin`,model)
  },
  // 删除
  deleteAdmin(model) {
    return axios.delete(`/admin/deleteAdmin`,model)
  },



}
export default publicApi