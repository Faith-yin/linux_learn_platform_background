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
          <el-col :span="4"><div class="two grid-content bg-purple-light">当前登陆者：Admin</div></el-col>
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
            <list-information v-if="selectedTab==1"></list-information>
            <list-article v-if="selectedTab==2"></list-article>
            <list-video v-if="selectedTab==3"></list-video>
            <list-issues v-if="selectedTab==4"></list-issues>
            <list-issues-comment v-if="selectedTab==5"></list-issues-comment>
            <list-outsidelink v-if="selectedTab==6"></list-outsidelink>
            <list-user v-if="selectedTab==7"></list-user>
            <list-statistics v-if="selectedTab==8"></list-statistics>
            <list-admin v-if="selectedTab==9"></list-admin>
          </el-main>
          <!-- 右侧：下方 分页 -->
          <el-footer>
            <el-pagination  @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            background
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="sizes, prev, pager, next, total"
                            :total="1000"></el-pagination>
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
      // 当前导航选择项，默认是[公告管理]
      selectedTab: 1,
      // 当前页码
      currentPage: 1,
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
        this.routeGo({name: 'Login'})
      })
        .catch(_ => {})
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 13:23:02
     * @Description: nav导航栏选项卡切换
     */
    selectTabClick(val) {
      this.selectedTab = val
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 16:45:11
     * @Description: 每页条数改变时
     */
    handleSizeChange(val) {

    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 16:45:38
     * @Description: 当前页码改变时
     */
    handleCurrentChange(val) {

    },
  },
}
</script>

<style lang="scss">
@import '@/style/business/home_page.scss';
</style>