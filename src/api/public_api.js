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
  showArticle(model) {
    return axios.post(`/article/showArticle`,model)
  },
  // 查询全部：按阅读量降序排列
  showArticleOrderByView() {
    return axios.get(`/article/showArticleOrderByView`)
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
    return axios.delete(`/article/deleteArticle/${model}`)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-14 14:02:20
   * @Description: video 操作接口
   */
  // 查询全部
  showVideo(model) {
    return axios.post(`/video/showVideo`,model)
  },
  // 查询全部：按阅读量降序排列
  showVideoOrderByView() {
    return axios.get(`/video/showVideoOrderByView`)
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
    return axios.delete(`/video/deleteVideo/${model}`)
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
  // 查询全部：按阅读量降序排列
  showIssuesOrderByView() {
    return axios.get(`/issues/showIssuesOrderByView`)
  },
  // 修改
  updateIssues(model) {
    return axios.put(`/issues/updateIssues`,model)
  },
  // 删除 
  deleteIssuesById(model) {
    return axios.delete(`/issues/deleteIssuesById/${model}`)
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
    return axios.delete(`/issuesComment/deleteIssuesComment/${model}`)
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
    return axios.delete(`/outsidelink/deleteOutsidelink/${model}`)
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
  // 修改：重置密码
  updateUserPassword(model) {
    return axios.put(`/user/updateUserPassword/${model}`)
  },
  // 删除
  deleteUserById(model) {
    return axios.delete(`/user/deleteUserById/${model}`)
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
    return axios.delete(`/admin/deleteAdmin/${model}`)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-03-11 17:11:14
   * @Description: 文件(video,image,audio等)上传服务器 相关接口
   */ 
  // 视频上传
  uploadVideo(model, config) {
    return axios.post(`/uploadFile/uploadVideo`, model, config)
  },
  // 图片上传 
  uploadImg(model, config) {
    return axios.post(`/uploadFile/uploadImg`, model, config)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-04-03 11:47:11
   * @Description: 网站访问量信息
   */
  // 查询全部：按日期降序排列
  showAllWebNum() {
    return axios.get(`/webVisitorNum/showAllWebNum`)
  },
  // 更新数据viewCount访问量字段 +1
  updateWebNumById(model) {
    return axios.post(`/webVisitorNum/updateWebNumById`,model)
  },


  /**
   * @Author: 殷鹏飞
   * @Date: 2020-04-03 18:48:13
   * @Description: 各个表总数
   */
  findTotal() {
    return axios.get(`/findTableTotal/findTotal`)
  },
  showPublish() {
    return axios.get(`/findTableTotal/showPublish`)
  },


}
export default publicApi