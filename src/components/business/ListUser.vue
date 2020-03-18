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
      <el-button @click="addClick" type="primary">新建</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="dataList.slice((currentPage-1)*pageSize, currentPage*pageSize)"
              height="470"
              border
              highlight-current-row
              style="width: 100%">
      <el-table-column  type="index"
                        header-align="center"
                        label="索引"
                        width="50"
                        :index="1"></el-table-column>
      <el-table-column  prop="photo"
                        show-overflow-tooltip
                        header-align="center"
                        label="头像"
                        width="90">
        <template slot-scope="scope">
          <el-avatar size="medium" icon='el-icon-user' :src="scope.row.photo"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column  prop="username"
                        show-overflow-tooltip
                        header-align="center"
                        label="名称"
                        width="120"></el-table-column>
      <el-table-column  prop="password"
                        show-overflow-tooltip
                        :formatter="encriptStr"
                        header-align="center"
                        label="密码"
                        width="120"></el-table-column>
      <el-table-column  prop="sex"
                        show-overflow-tooltip
                        header-align="center"
                        label="性别"
                        width="100"></el-table-column>
      <el-table-column  prop="birthday"
                        show-overflow-tooltip
                        header-align="center"
                        label="生日"
                        width="170"></el-table-column>
      <el-table-column  prop="description"
                        show-overflow-tooltip
                        header-align="center"
                        label="签名"
                        width="380"></el-table-column>
      <el-table-column  label="操作"
                        header-align="center"
                        width="250">
        <template slot-scope="scope">
          <el-button  size="mini"
                      @click="handleLook(scope.$index, scope.row)">查看</el-button>
          <el-button  size="mini"
                      type="primary"
                      @click="handleRefreshPassword(scope.$index, scope.row)">重置密码</el-button>
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
                top="5vh">
      <el-form  :model="form" 
                label-position="right" 
                label-width="80px">
        <!-- 头像上传 -->
        <el-form-item label="用户头像"> 
          <el-upload  v-if="btnMark==1"
                      class="upload-demo"
                      ref="uploadRef"
                      action=""
                      :limit='1'
                      :file-list='fileList'
                      accept=".jpg, .png"
                      :before-remove="beforeRemove"
                      :http-request="addFile">
                      <el-button size="small" type="primary" :disabled="btnMark==2">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
          <el-avatar v-if="btnMark==2" size="medium" icon='el-icon-user' :src="form.photo"></el-avatar>
        </el-form-item>
        <!-- 用户信息 -->
        <el-form-item label="用户名称" required>
          <el-input v-model="form.username" 
                    :disabled="btnMark==2"
                    show-word-limit
                    maxlength=12
                    placeholder='请输入名称, 2~12字符(必填)' 
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" required>
          <el-input placeholder='请输入密码, 6~12字符(必填)'
                    type="password"
                    :disabled="btnMark==2"
                    v-model="form.password"
                    show-word-limit
                    maxlength=12></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" :disabled="btnMark==2">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
            <el-radio label="保密">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.birthday"
                          :disabled="btnMark==2"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="我的签名">
          <el-input v-model="form.description" 
                    :disabled="btnMark==2"
                    placeholder='输入几句话介绍一下自己吧...' 
                    type="textarea" 
                    rows=4
                    show-word-limit
                    maxlength=240></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="checkHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import publicClass from '@/mixins/public_class.js'
import publicInfo from '@/relyClass/public_info.js'
import { Message } from 'element-ui'

export default {
  props: {
    // 数据列表
    dataList: {
      type: Array,
      default: [],
    },
    // 当前页码
    currentPage: [Number],
    // 每页条数
    pageSize: [Number],
  },
  mixins: [publicClass, publicInfo],
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
        sex: null,
        password: null,
        birthday: null,
        description: null,
      },
      // 按钮点击标记：1新建，2查看，3编辑，4删除
      btnMark: null,
    }
  },
  methods: {
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 16:10:26
     * @Description: 搜索
     */
    searchClick() {
      this.$emit('searchClick',this.searchValue)
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
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 20:16:41
     * @Description: 表单校验
     */
    checkForm() {
      let {username, password} = this.form
      // 表单必填项检验
      let mark = this.formRequired({arr: {username, password}})
      if(!mark) return;
      // 用户名称 与 密码长度校验
      if(username.length<2 || password.length<6) {
        return Message({showClose: true, message: '用户名或密码长度不正确', type: 'warning'})
      }
      this.checkFile()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 17:54:07
     * @Description: 核验是否有添加文件
     */
    checkFile() {
      // 如果没有上传文件 or 没有修改文件，直接提交表单
      if(!Object.keys(this.fileData).length)return this.addSubmit()
      return this.uploadFile()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-12 16:11:09
     * @Description: 上传文件至服务器
     */
    uploadFile() {
      // 创建表单对象
      let formData = new FormData()
      // 触发组件自带方法
      this.$refs.uploadRef.submit()
      // 将文件数据转成表单对象
      formData.append('file', this.fileData)
      // 请求模板参数
      let methodModel = {
        pMethod: this.uploadImg(formData),
        callBack: 'uploadFileCallBack',
      }
      this.methodQuery(methodModel)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-12 16:11:17
     * @Description: 上传文件至服务器回调
     */
    uploadFileCallBack({data}) {
      this.form.photo = data
      // 调用提交表单
      this.addSubmit()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 20:52:26
     * @Description: 关闭弹框时
     */
    beforeClose() {
      let arr = ['photo', 'username', 'sex', 'password', 'birthday', 'description']
      arr.forEach(el => this.form[el] = null)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 16:57:20
     * @Description: 确定当前操作: 1新建，2查看，3编辑, 4删除
     */
    checkHandle() {
      let {btnMark} = this
      // 1新建
      if(btnMark == 1) return this.checkForm()
      // 2查看
      if(btnMark == 2) return this.showDialogMark = false
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 21:34:28
     * @Description: 新建确定事件
     */
    addSubmit() {
      this.$emit('onSubmit', this.btnMark, {...this.form})
      this.showDialogMark = false
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 21:39:08
     * @Description: 弹窗取消事件
     */
    addCancel() {
      let arr = ['photo', 'username', 'sex', 'password', 'birthday', 'description']
      arr.forEach(el => this.form[el] = null)
      this.showDialogMark = false
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 17:15:22
     * @Description: 新建
     */
    addClick() {
      this.showDialogMark = true
      this.btnMark = 1
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 10:50:17
     * @Description: 查看
     */
    handleLook(index, row) {
      this.btnMark = 2
      let arr = ['photo', 'username', 'sex', 'password', 'birthday', 'description']
      arr.forEach(el => {this.form[el] = row[el]})
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
      }).then(_ => {this.onDelete(row)})
        .catch(_ => {})
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 10:28:00
     * @Description: 删除确认操作
     */
    onDelete(row) {
      this.btnMark = 4
      this.$emit('onSubmit',this.btnMark,row.id)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-18 11:44:03
     * @Description: 重置密码
     */
    handleRefreshPassword(index, row) {
      this.$confirm('确定为此用户重置密码, 操作不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
      }).then(_ => {this.onRefresh(row)})
        .catch(_ => {})
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-18 11:46:19
     * @Description: 重置密码确认操作
     */
    onRefresh(row) {
      this.btnMark = 3
      this.$emit('onSubmit',this.btnMark,row.id)
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