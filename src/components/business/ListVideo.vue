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
    </div>
    <!-- 表格 -->
    <el-table :data="dataList"
              height="470"
              border
              highlight-current-row
              style="width: 100%">
      <el-table-column  type="index"
                        label="索引"
                        align="center"
                        width="50"
                        :index="1"></el-table-column>
      <el-table-column  prop="title"
                        show-overflow-tooltip
                        align="center"
                        label="标题"
                        width="160"></el-table-column>
      <el-table-column  prop="content"
                        show-overflow-tooltip
                        align="center"
                        label="内容"
                        width="240"></el-table-column>
      <el-table-column  prop="link"
                        show-overflow-tooltip
                        align="center"
                        label="视频"
                        width="120">
        <template slot-scope="scoped">
          <el-link target="_blank" type="success" :href="scoped.row.link">打开视频</el-link>
        </template>
      </el-table-column>
      <el-table-column  prop="viewCount"
                        show-overflow-tooltip
                        align="center"
                        label="浏览次数"
                        width="100"></el-table-column>
      <el-table-column  prop="username"
                        show-overflow-tooltip
                        align="center"
                        label="发布者(用户)"
                        width="130"></el-table-column>
      <el-table-column  prop="date"
                        show-overflow-tooltip
                        align="center"
                        label="发布时间"
                        :formatter='formatter'
                        width="160"></el-table-column>
      <el-table-column  prop="checkStatus"
                        show-overflow-tooltip
                        :formatter='checkStatusFormatter'
                        align="center"
                        label="审核状态"
                        width="80"></el-table-column>
      <el-table-column  label="操作"
                        align="center"
                        width="250">
        <template slot-scope="scope">
          <el-button  size="mini"
                      @click="handleLook(scope.$index, scope.row)">查看</el-button>
          <el-button  size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)">更改状态</el-button>
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
                    :disabled="btnMark==2 || btnMark==3"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input v-model="form.content" 
                    :disabled="btnMark==2 || btnMark==3"
                    rows=4
                    type="textarea" 
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频" required>
          <!-- <el-input v-model="form.link" 
                    :disabled="btnMark==2 || btnMark==3"
                    autocomplete="off"></el-input> -->
          <el-link target="_blank" type="success" :href="form.link">打开视频</el-link>
        </el-form-item>
        <el-form-item label="审核状态" prop="checkStatus" required>
          <el-select v-model="form.checkStatus" placeholder="请选择" :disabled="btnMark==2">
            <el-option label="审核中" value="1"></el-option>
            <el-option label="未通过" value="3"></el-option>
            <el-option label="已通过" value="2"></el-option>
          </el-select>
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
        title: null,
        content: null,
        link: null,
        checkStatus: null,
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
      let arr = ['title', 'content']
      arr.forEach(el => this.form[el] = null)
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 13:47:23
     * @Description: 确定当前操作: 2查看，3编辑, 4删除
     */
    checkHandle() {
      let {btnMark} = this
      // 2查看
      if(btnMark == 2) return this.showDialogMark = false
      // 3编辑
      if(btnMark == 3) return this.updateSubmit()
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-17 13:47:44
     * @Description: 编辑确定事件
     */
    updateSubmit() {
      let {checkStatus} = this.form
      // 表单校验
      let mark = this.formRequired({arr: {checkStatus}, msg: '请输入必填项'})
      if(!mark)return;
      // 状态格式化为数字标识
      let checkStatusToNum = this.checkStatsToNum(checkStatus)
      // 请求参数
      let model = {
        id: this.rowInfo.id,
        checkStatus: checkStatusToNum,
      }
      this.$emit('onSubmit',this.btnMark,model)
      this.showDialogMark = false
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
      this.btnMark = 2
      // 格式化审核状态字段
      this.form.checkStatus = this.checkStatusFormatter('','',row.checkStatus,'')
      // 赋值
      let arr = ['username', 'title', 'content', 'link']
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
      // 格式化审核状态字段
      this.form.checkStatus = this.checkStatusFormatter('','',row.checkStatus,'')
      // 赋值
      let arr = ['username', 'title', 'content', 'link']
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

  .el-form-item__content {
    text-align: left;
  }
}
</style>