<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-14 11:48:52
 * @Description: issues评论 部分
-->
<template>
  <div id="list-wrapper">
    <div class="title-wrapper">Issues评论管理</div>
    <!-- 搜索 -->
    <div class="search-wrapper">
      <el-input placeholder="输入搜索内容..." 
                v-model="searchValue" 
                clearable
                @keyup.enter.native="searchClick"
                class="input-with-select">
        <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData"
              height="470"
              border
              highlight-current-row
              style="width: 100%">
      <el-table-column  type="index"
                        label="索引"
                        width="50"
                        :index="1"></el-table-column>
      <el-table-column  prop="date"
                        label="Issue标题"
                        width="220"></el-table-column>
      <el-table-column  prop="name"
                        label="评论内容"
                        width="450"></el-table-column>
      <el-table-column  prop="username"
                        label="评论者(用户)"
                        width="170"></el-table-column>
      <el-table-column  prop="date"
                        label="发布时间"
                        width="170"></el-table-column>
      <el-table-column  label="操作"
                        width="220">
        <template slot-scope="scope">
          <el-button  size="mini"
                      @click="handleLook(scope.$index, scope.row)">查看</el-button>
          <el-button  size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button  type="danger" 
                      size="mini"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="Issues评论信息" :visible.sync="showDialogMark" @close='beforeClose' :close-on-click-modal='false'>
      <el-form :model="form" label-position="right" label-width="90px">
        <el-form-item label="发布者">
          <el-input v-model="form.username" 
                    disabled
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Issue标题" required>
          <el-input v-model="form.title" 
                    disabled
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" required>
          <el-input v-model="form.content" 
                    rows=4
                    show-word-limit
                    maxlength=240
                    type="textarea" 
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索值
      searchValue: null,
      // 弹出框显示标志
      showDialogMark: false,
      // 弹出框表单内容
      form: {
        username: null,
        title: null,
        content: null,
      },
      // 数据列表
      tableData: [
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03 09:28:00',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
      ]
    }
  },
  methods: {
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 16:10:26
     * @Description: 搜索
     */
    searchClick() {
      console.log('搜索-->',this.searchValue);
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 20:52:26
     * @Description: 关闭弹框时
     */
    beforeClose() {
      let arr = ['title', 'content']
      arr.forEach(el => this.form[el] = null)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 21:34:28
     * @Description: 弹窗确定事件
     */
    addSubmit() {

    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 21:39:08
     * @Description: 弹窗取消事件
     */
    addCancel() {
      let arr = ['title', 'content']
      arr.forEach(el => this.form[el] = null)
      this.showDialogMark = false
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 10:50:17
     * @Description: 查看
     */
    handleLook(index, row) {
      this.showDialogMark = true
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 17:33:39
     * @Description: 编辑
     */
    handleEdit(index, row) {
      console.log(index, row);
      this.showDialogMark = true
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 17:33:45
     * @Description: 删除
     */
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
      }).then(_ => {this.onDelete()})
        .catch(_ => {})
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 10:28:00
     * @Description: 删除确认操作
     */
    onDelete() {
      console.log('删除确认操作');
    },
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