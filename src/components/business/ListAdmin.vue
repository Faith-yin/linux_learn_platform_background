<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-14 11:07:42
 * @Description: 管理员 部分
-->
<template>
  <div id="list-wrapper">
    <div class="title-wrapper">管理员信息</div>
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
                        show-overflow-tooltip
                        label="索引"
                        width="90"
                        :index="1"></el-table-column>
      <el-table-column  prop="username"
                        header-align="center"
                        show-overflow-tooltip
                        label="名称"
                        width="480"></el-table-column>
      <el-table-column  prop="password"
                        header-align="center"
                        show-overflow-tooltip
                        :formatter="encriptStr"
                        label="密码"
                        width="480"></el-table-column>
      <el-table-column  label="操作"
                        header-align="center"
                        show-overflow-tooltip
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
    <el-dialog title="管理员信息" :visible.sync="showDialogMark" @close='beforeClose' :close-on-click-modal='false'>
      <el-form :model="form" label-position="right" label-width="100px">
        <el-form-item label="管理员名称" required>
          <el-input v-model="form.username" 
                    :disabled="btnMark==2"
                    show-word-limit
                    maxlength=12
                    placeholder='请输入名称, 2~12位(必填)' 
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" required>
          <el-input placeholder='请输入密码, 6~12位(必填)'
                    v-model="form.password"
                    :disabled="btnMark==2"
                    show-word-limit
                    maxlength=12 
                    :show-password="btnMark!=2"></el-input>
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
      // 弹出框表单内容
      form: {
        username: null,
        password: null,
      },
      // 按钮点击标记：1新建，2查看，3编辑，4删除
      btnMark: null,
      // 点击[编辑]，当前行信息
      rowInfo: {},
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
     * @Date: 2020-03-13 20:52:26
     * @Description: 关闭弹框时
     */
    beforeClose() {
      let arr = ['username', 'password']
      arr.forEach(el => this.form[el] = null)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-18 13:30:27
     * @Description: 确定当前操作: 1新建，2查看，3编辑, 4删除
     */
    checkHandle() {
      let {btnMark} = this
      // 1新建
      if(btnMark == 1) return this.addSubmit()
      // 2查看
      if(btnMark == 2) return this.showDialogMark = false
      // 3编辑
      if(btnMark == 3) return this.updateSubmit()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 21:34:28
     * @Description: 弹窗确定事件
     */
    addSubmit() {
      let {username, password} = this.form
      // 表单检验
      let mark = this.formRequired({arr: {username, password}, msg: '请输入必填项'})
      if(!mark)return;
      // 用户名称 与 密码长度校验
      if(username.length<2 || password.length<6) {
        return Message({showClose: true, message: '用户名或密码长度不正确', type: 'warning'})
      }
      this.$emit('onSubmit',this.btnMark,{username, password})
      this.showDialogMark = false
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-18 13:35:37
     * @Description: 编辑确定事件
     */
    updateSubmit() {
      let {username, password} = this.form
      // 表单校验
      let mark = this.formRequired({arr: {username, password}, msg: '请输入必填项'})
      if(!mark)return;
      // 用户名称 与 密码长度校验
      if(username.length<2 || password.length<6) {
        return Message({showClose: true, message: '用户名或密码长度不正确', type: 'warning'})
      }
      // 请求参数
      let model = {password, id: this.rowInfo.id}
      // 取出管理员id
      let adminId = JSON.parse(sessionStorage.getItem('adminInfo')).id
      // 判断：如果修改者是超级管理员(id==1000) && 并且修改的不是自己的信息，则不需要重新登录
      if(adminId === 1000 && this.rowInfo.id !== 1000) {
        this.$emit('onSubmit',this.btnMark,model)
        this.showDialogMark = false
        return;
      }
      // 判断：如果是普通管理员操作 || 或者超管修改自己的信息，则需要重新登录
      if(username !== this.rowInfo.username) model = {username, ...model}
      this.$confirm('修改账户信息后需重新登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
      }).then(_ => {
        this.$emit('onSubmit',this.btnMark,model)
        this.showDialogMark = false
        // 清除sessionStorage暂存的账户信息
        sessionStorage.clear()
        // 返回至登录页面重新登录
        this.routeGo({name: 'Login'})
      }).catch(_ => {})
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 21:39:08
     * @Description: 弹窗取消事件
     */
    addCancel() {
      let arr = ['username', 'password']
      arr.forEach(el => this.form[el] = null)
      this.showDialogMark = false
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-18 14:15:22
     * @Description: 新建
     */
    addClick() {
      this.btnMark = 1
      this.showDialogMark = true
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-14 10:50:17
     * @Description: 查看
     */
    handleLook(index, row) {
      this.btnMark = 2
      let arr = ['username', 'password']
      arr.forEach(el => {this.form[el] = row[el]})
      this.showDialogMark = true
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 17:33:39
     * @Description: 编辑
     */
    handleEdit(index, row) {
      this.btnMark = 3
      let arr = ['username', 'password']
      arr.forEach(el => {this.form[el] = row[el]})
      this.rowInfo = row
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