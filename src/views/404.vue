<!--
 * @author: 殷鹏飞
 * @Date: 2020-04-15 19:19:56
 * @information: 404
-->
<template>
  <div id="not-fond-page">
    <div>
      <img src="@/assets/image/404.png" width="300px" height="300px">
    </div>
    <p>在这个星球找不到你想要的页面啦，返回首页吧~</p>
    <el-button type="primary" size="medium" @click="backHome">返回首页</el-button>
  </div>
</template>

<script>
import publicClass from '@/mixins/public_class.js'

export default {
  mixins: [publicClass],
  data() {
    return {}
  },
  methods: {
    /**
     * @author: 殷鹏飞
     * @Date: 2020-04-15 19:22:26
     * @information: 返回首页
     */
    backHome() {
      this.routeGo({name: 'HomePage'})
    },
  }
}
</script>

<style lang="scss">
#not-fond-page {
  width: 100%;
  margin-top: 200px;
  text-align: center;
  p {
    margin: 20px 0;
  }
}
</style>