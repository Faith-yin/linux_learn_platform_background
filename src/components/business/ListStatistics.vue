<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-14 11:07:13
 * @Description: 学习资源使用统计 部分
-->
<template>
  <div id="list-wrapper">

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
#list-wrapper {
  // 标题部分
  .title-wrapper {
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    text-align: center;
  }

  // 搜索部分
  .search-wrapper {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .input-with-select {
      width: 70%;
      .el-button:hover {
        color: #409EFF;
      }
    }
  }
}
</style>