<!--
 * @author: 殷鹏飞
 * @Date: 2019-12-25 18:46:44
 * @information: 主页面路由
-->
<template>
  <div id="home-page">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-row type="flex">
          <el-col :span="16"><div class="one grid-content bg-purple">Linux 学习平台后台管理系统</div></el-col>
          <el-col :span="4"><div class="two grid-content bg-purple-light">当前登陆者：{{adminInfo.username || '未知管理员'}}</div></el-col>
          <el-col :span="3"><div class="three grid-content bg-purple" @click="logout">退出登录</div></el-col>
        </el-row>
      </el-header>
      <!-- 主体区域 -->
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside width="220px">
          <navbar @selectTabClick='selectTabClick'></navbar>
        </el-aside>
        <!-- 右侧部分 -->
        <el-container>
          <!-- 右侧：上方 主要信息展示区 -->
          <el-main>
            <list-information v-if="selectedTab==1"
                              :dataList="selectedTab==1&&dataList"
                              :currentPage="selectedTab==1&&currentPage"
                              :pageSize="selectedTab==1&&pageSize"
                              @searchClick='fetchListData'
                              @onSubmit='onSubmit'></list-information>
            <list-article v-if="selectedTab==2"
                          :dataList="selectedTab==2&&dataList"
                          :currentPage="selectedTab==2&&currentPage"
                          :pageSize="selectedTab==2&&pageSize"
                          @searchClick='fetchListData'
                          @onSubmit='onSubmit'></list-article>
            <list-video v-if="selectedTab==3"
                        :dataList="selectedTab==3&&dataList"
                        :currentPage="selectedTab==3&&currentPage"
                        :pageSize="selectedTab==3&&pageSize"
                        @searchClick='fetchListData'
                        @onSubmit='onSubmit'></list-video>
            <list-issues  v-if="selectedTab==4"
                          :dataList="selectedTab==4&&dataList"
                          :currentPage="selectedTab==4&&currentPage"
                          :pageSize="selectedTab==4&&pageSize"
                          @searchClick='fetchListData'
                          @onSubmit='onSubmit'></list-issues>
            <list-issues-comment  v-if="selectedTab==5"
                                  :dataList="selectedTab==5&&dataList"
                                  :currentPage="selectedTab==5&&currentPage"
                                  :pageSize="selectedTab==5&&pageSize"
                                  @searchClick='fetchListData'
                                  @onSubmit='onSubmit'></list-issues-comment>
            <list-outsidelink v-if="selectedTab==6"
                              :dataList="selectedTab==6&&dataList"
                              :currentPage="selectedTab==6&&currentPage"
                              :pageSize="selectedTab==6&&pageSize"
                              @searchClick='fetchListData'
                              @onSubmit='onSubmit'></list-outsidelink>
            <list-user  v-if="selectedTab==7"
                        :dataList="selectedTab==7&&dataList"
                        :currentPage="selectedTab==7&&currentPage"
                        :pageSize="selectedTab==7&&pageSize"
                        @searchClick='fetchListData'
                        @onSubmit='onSubmit'></list-user>
            <list-statistics  v-if="selectedTab==8"
                              :dataList="selectedTab==8&&dataList"
                              :currentPage="selectedTab==8&&currentPage"
                              :pageSize="selectedTab==8&&pageSize"
                              @searchClick='fetchListData'
                              @onSubmit='onSubmit'></list-statistics>
            <list-admin v-if="selectedTab==9"
                        :dataList="selectedTab==9&&dataList"
                        :currentPage="selectedTab==9&&currentPage"
                        :pageSize="selectedTab==9&&pageSize"
                        @searchClick='fetchListData'
                        @onSubmit='onSubmit'></list-admin>
          </el-main>
          <!-- 右侧：下方 分页 -->
          <el-footer>
            <el-pagination  @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            background
                            :page-sizes="[10, 20, 30, 40, 50]"
                            :page-size="pageSize"
                            layout="sizes, prev, pager, next, total"
                            :total="dataList.length || 0"></el-pagination>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import publicInfo from '@/relyClass/public_info.js'
import publicClass from '@/mixins/public_class.js'

export default {
  mixins: [publicInfo, publicClass],
  data() {
    return {
      // 当前登录管理员信息
      adminInfo: {},
      // 当前导航选择项，默认是[公告管理]
      selectedTab: 1,
      // 当前页码
      currentPage: 1,
      // 初始每页条数
      pageSize: 10,
      // 数据列表
      dataList: [],
    }
  },
  methods: {
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 15:00:43
     * @Description: 退出登录
     */
    logout() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
      }).then(_ => {
        // 清除sessionStorage暂存的账户信息
        sessionStorage.clear()
        this.routeGo({name: 'Login'})
      }).catch(_ => {})
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 13:23:02
     * @Description: nav导航栏选项卡切换
     */
    selectTabClick(val) {
      this.selectedTab = val
      this.fetchListData()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 16:45:11
     * @Description: 每页条数改变时
     */
    handleSizeChange(val) {
      this.pageSize = val
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 16:45:38
     * @Description: 当前页码改变时
     */
    handleCurrentChange(val) {
      this.currentPage = val
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-16 15:12:05
     * @Description: 新建，查看，编辑，删除 确认操作
     */
    onSubmit(btnMark, model) {
      // 解构接口配置对象
      let obj = this.tabToRouterArr.find(el => el.selectedTab == this.selectedTab)
      // 解构请求配置对象
      let {msg, method} = this.reqArr.find(el => el.eventMark == btnMark)
      // 请求模板参数
      let methodModel = {
        pMethod: this[obj[method]](model),
        message: msg,
        callBack: 'onSubmitCallBack',
      }
      this.methodQuery(methodModel)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-16 15:12:21
     * @Description: 新建，查看，编辑，删除 确认操作 回调
     */
    onSubmitCallBack(res) {
      this.fetchListData()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-16 13:19:10
     * @Description: 获取页面信息
     */
    fetchListData(searchValue) {
      let {id} = this.adminInfo
      let {portMethod} = this.tabToRouterArr.find(el => el.selectedTab == this.selectedTab)
      // 请求模板参数
      let methodModel = {
        pMethod: this[portMethod]({value: searchValue, id}),
        callBack: 'fetchListDataCallBack',
      }
      this.methodQuery(methodModel)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-16 13:20:57
     * @Description: 获取页面信息回调
     */
    fetchListDataCallBack({data}) {
      this.dataList = data
    },
  },
  mounted() {
    // 判断是否登录状态
    let mark = this.judgeLogin()
    if(!mark) return this.routeGo({name: 'Login'})
    // 从 sessionStorage 中获取用户信息
    this.adminInfo = JSON.parse(sessionStorage.getItem('adminInfo'))
    this.fetchListData()
  },
}
</script>

<style lang="scss">
@import '@/style/business/home_page.scss';
</style>