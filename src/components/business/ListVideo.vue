<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-14 11:03:54
 * @Description: video 部分
-->
<template>
  <div id="list-wrapper">
    <div class="title-wrapper">课程视频管理</div>
    <!-- 搜索 -->
    <div class="search-wrapper">
      <el-input placeholder="输入搜索内容..." 
                v-model="searchValue" 
                clearable
                @keyup.enter.native="searchClick"
                class="input-with-select">
        <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="showDialogMark=true" type="primary">新建</el-button>
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
                        label="标题"
                        width="160"></el-table-column>
      <el-table-column  prop="name"
                        label="内容"
                        width="230"></el-table-column>
      <el-table-column  prop="link"
                        label="视频"
                        width="150"></el-table-column>
      <el-table-column  prop="viewCount"
                        label="浏览次数"
                        width="100"></el-table-column>
      <el-table-column  prop="username"
                        label="发布者"
                        width="130"></el-table-column>
      <el-table-column  prop="date"
                        label="发布时间"
                        width="160"></el-table-column>
      <el-table-column  prop="checkStatus"
                        label="审核状态"
                        width="80"></el-table-column>
      <el-table-column  label="操作"
                        width="220">
        <template slot-scope="scope">
          <el-button  size="mini"
                      @click="handleLook(scope.$index, scope.row)">查看</el-button>
          <el-button  size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button  type="danger" 
                      size="mini"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog  title="课程视频信息" 
                :visible.sync="showDialogMark" 
                @close='beforeClose' 
                :close-on-click-modal='false'
                top='6vh'>
      <el-form :model="form" label-position="right" label-width="80px">
        <el-form-item label="发布者">
          <el-input v-model="form.username" 
                    disabled
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" required>
          <el-input v-model="form.title" 
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input v-model="form.content" 
                    rows=4
                    type="textarea" 
                    autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传视频区域 -->
        <el-form-item label="视频" required>
          <el-upload  class="avatar-uploader el-upload--text"
                      ref="uploadRef"
                      action="" 
                      :before-remove="beforeRemove"
                      :http-request="addFile"
                      :limit='1'
                      accept=".mp4"> 
            <el-button  class="video-btn"
                        slot="trigger"
                        size="small"
                        type="primary">选取文件</el-button>
            <p class="msg-info">视频文件大小不能超过1000MB</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="审核状态" prop="checkStatus" required>
          <el-select v-model="form.checkStatus" placeholder="请选择">
            <el-option label="审核中" value="2"></el-option>
            <el-option label="未通过" value="0"></el-option>
            <el-option label="已通过" value="1"></el-option>
          </el-select>
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
      // 文件数据
      fileData: {},
      // 弹出框表单内容
      form: {
        username: null,
        title: null,
        content: null,
        link: null,
        checkStatus: null,
      },
      // 数据列表
      tableData: [
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '审核中'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '已通过'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '未通过'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '已通过'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '未通过'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '已通过'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '审核中'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '已通过'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '审核中'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '未通过'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '审核中'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '审核中'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '审核中'}, 
        {date: '2016-05-03 09:28:00',viewCount:29,name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin',checkStatus: '审核中'}, 
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
     * @Date: 2020-03-14 11:41:49
     * @Description: 添加文件
     */
    addFile(val) {
      this.fileData = val.file
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 11:41:49
     * @Description: 删除文件
     */
    beforeRemove() { 
      
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

  .el-form-item__content {
    text-align: left;
  }
}
</style>