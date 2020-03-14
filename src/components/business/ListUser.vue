<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-14 11:05:25
 * @Description: user 部分
-->
<template>
  <div id="list-wrapper">
    <div class="title-wrapper">用户管理</div>
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
                        label="头像"
                        width="120"></el-table-column>
      <el-table-column  prop="date"
                        label="名称"
                        width="120"></el-table-column>
      <el-table-column  prop="name"
                        label="密码"
                        width="120"></el-table-column>
      <el-table-column  prop="username"
                        label="性别"
                        width="100"></el-table-column>
      <el-table-column  prop="date"
                        label="生日"
                        width="170"></el-table-column>
      <el-table-column  prop="description"
                        label="签名"
                        width="380"></el-table-column>
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
    <el-dialog  title="用户信息" 
                :visible.sync="showDialogMark"
                @close='beforeClose' 
                :close-on-click-modal='false'
                top="1vh">
      <el-form :model="form" label-position="right" label-width="80px">
        <!-- 头像上传 -->
        <el-form-item label="用户头像"> 
          <el-upload  class="upload-demo"
                      ref="uploadRef"
                      action=""
                      :limit='1'
                      :file-list='fileList'
                      accept=".jpg, .png"
                      :before-remove="beforeRemove"
                      :http-request="addFile">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <!-- 用户信息 -->
        <el-form-item label="用户名称" required>
          <el-input v-model="form.username" 
                    show-word-limit
                    maxlength=12
                    placeholder='请输入名称, 最长12位(必填)' 
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" required>
          <el-input placeholder='请输入密码, 最长12位(必填) '
                    v-model="form.password"
                    show-word-limit
                    maxlength=12 
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.birthday"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="我的签名">
          <el-input v-model="form.description" 
                    placeholder='输入几句话介绍一下自己吧...' 
                    type="textarea" 
                    rows=4
                    show-word-limit
                    maxlength=240></el-input>
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
      // 文件列表
      fileList: [],
      // 弹出框表单内容
      form: {
        photo: null,
        username: null,
        password: null,
        birthday: null,
        description: null,
      },
      // 数据列表
      tableData: [
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
        {date: '2016-05-03',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄',username:'Admin'}, 
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
     * @Date: 2020-03-14 12:40:23
     * @Description: 添加文件
     */
    addFile(val) {
      this.fileData = val.file
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 11:44:06
     * @Description: 删除文件
     */
    beforeRemove() {
      this.fileData = {}
      this.personForm.photo = ''
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