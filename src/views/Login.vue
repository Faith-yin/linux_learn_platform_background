<!--
 * @Author: 殷鹏飞
 * @Date: 2020-03-13 17:37:36
 * @Description: 登录页面
-->
<template>
  <div id="login-page">
    <div class="login-container">
        <!-- 表单 -->
        <el-form    ref="loginForm" 
                    :model="form" 
                    :rules="rules" 
                    class="login-box">
            <!-- 标题 -->
            <div class="login-title-box">
                <h3 class="login-title">Linux学习平台 后台管理系统</h3>
                <div class="login-info color--gray">请<span class="color--ff6700">管理员</span>登录：</div>
            </div>
            <!-- 账号 -->
            <el-form-item prop="username">
                <el-input   type="text" 
                            maxlength="12"
                            prefix-icon="el-icon-user"
                            placeholder="输入名称" 
                            v-model="form.username"
                            @keyup.enter.native="onSubmit"/>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input   type="password" 
                            maxlength="12"
                            show-password
                            prefix-icon="el-icon-lock"
                            placeholder="输入密码"
                            v-model="form.password"
                            @keyup.enter.native="onSubmit"/>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btn-box">
                <el-button  size="medium"
                            @click="refresh">重 置</el-button>
                <el-button  type="primary" 
                            size="medium"
                            @click="onSubmit">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import publicInfo from '@/relyClass/public_info.js'
import publicClass from '@/mixins/public_class.js'

export default {
  mixins: [publicInfo, publicClass],
  data() {
    return {
      // 表单内容
      form: {
          username: null,
          password: null,
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
          username: [
              {required: true, message: '名称不可为空', trigger: 'blur'}
          ],
          password: [
              {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
      },
    }
  },
  methods: {
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 17:52:04
     * @Description: 登录
     */
    onSubmit() {
      this.$refs.loginForm.validate().then(() => {
        // 请求模板参数
        let methodModel = {
          pMethod: this.findAdminByNameAndPassword(this.form),
          message: '登录成功',
          callBack: 'onSubmitCallBack',
        }
        this.methodQuery(methodModel)
      })
    },
    async onSubmitCallBack({data}) {
      // 将管理员信息存至 sessionStorage 中
      sessionStorage.setItem('adminInfo', JSON.stringify(data[0]))
      // 将最新登录时间存至数据库中
      let res = await this.updateAdmin({id: data[0].id,lastLoginTime: this.timeFormat(new Date())})
      // 路由跳转
      if(res.status ===200) this.routeGo({name: 'HomePage'})
    },
    /**
     * @Author: 殷鹏飞
     * @Date: 2020-03-13 17:52:23
     * @Description: 重置
     */
    refresh() {
      let arr = ['username', 'password']
      arr.forEach(el => this.form[el] = null)
    },
  },
}
</script>

<style lang="scss">
@import '@/style/business/login_page.scss';
</style>
