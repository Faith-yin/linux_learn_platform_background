<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-13 15:38:44
 * @Description: 导航栏部分
-->
<template>
  <div id="navbar">
    <el-menu  default-active="1"
              class="el-menu-vertical-demo"
              @select="selectTabClick"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
      <el-menu-item index=1>
        <i class="el-icon-edit-outline"></i>
        <span slot="title">公告管理</span>
      </el-menu-item>
      <el-menu-item index=2>
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index=3>
        <i class="el-icon-video-play"></i>
        <span slot="title">课程视频管理</span>
      </el-menu-item>
      <el-menu-item index=4>
        <i class="el-icon-question"></i>
        <span slot="title">Issues管理</span>
      </el-menu-item>
      <el-menu-item index=5>
        <i class="el-icon-chat-line-square"></i>
        <span slot="title">Issues评论管理</span>
      </el-menu-item>
      <el-menu-item index=6>
        <i class="el-icon-paperclip"></i>
        <span slot="title">站外学习链接管理</span>
      </el-menu-item>
      <el-menu-item index=7>
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index=8>
        <i class="el-icon-pie-chart"></i>
        <span slot="title">学习资源统计</span>
      </el-menu-item>
      <el-menu-item index=9>
        <i class="el-icon-info"></i>
        <span slot="title">管理员信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 15:48:55
     * @Description: 菜单选择
     */
    selectTabClick(val) {
      this.$emit('selectTabClick',val)
    },
  },
}
</script>

<style lang="scss">
#navbar {
  min-height: -webkit-calc(100vh - 60px);
  background-color: #545C64;
  .el-menu-vertical-demo {
    height: 100%;
    li {
      text-align: left;
    }
  }
}
</style>