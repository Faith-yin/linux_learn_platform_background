<!--
 * @author: 殷鹏飞
 * @Date: 2019-12-25 18:46:44
 * @information: 主页面路由
-->
<template>
  <div id="home-page">
    home-page
  </div>
</template>

<script>
import publicInfo from '@/relyClass/public_info.js'
import publicClass from '@/mixins/public_class.js'

export default {
  mixins: [publicInfo, publicClass],
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss">
@import '@/style/business/home_page.scss';
</style>