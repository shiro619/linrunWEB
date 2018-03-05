<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">林润审批系统登录</h3>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="adminLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码" />
        <span class="show-pwd" @click="showPwd"></span>
      </el-form-item>
      <el-checkbox v-model="isRemember" style="margin-bottom: 20px;margin-left: 5px;">记住密码</el-checkbox>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="adminLogin">登录</el-button>
    </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import socialSign from './socialsignin'
import crypto from 'crypto'
import userApi from '@/api/userApi'
import router from '@/router'
import store from '@/store'
import { getUsername, setUsername, getToken, getAdminToken, setToken, removeToken, removeAdminToken, setAdminToken, getThisToken, setThisToken ,removeThisToken } from '@/utils/auth'

export default {
  components: { socialSign },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
//    if (!isvalidUsername(value)) {
//      callback(new Error('请输入正确的用户名'))
//    } else {
        callback()
//    }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: getUsername(),
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      showDialog: false,
      isRemember: false
    }
  },
  computed: {
  	loginFormmd5(){
  		var _this = this
  		var pswmd5 = _this.loginForm.password
  		const md5 = crypto.createHash('md5');
  		md5.update(pswmd5)
  		var psw1 = md5.digest('hex')
  		return {
  			account: _this.loginForm.username,
  			password: psw1
  		}
  	}
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
            // this.showDialog = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    adminLogin(){
      this.loading = true
      var _this = this
      _this.$store.dispatch('LoginByUsernameAdmin', _this.loginFormmd5).then((res) => {
        _this.loading = false
        if(res.error_no == 200){
          if(_this.isRemember){
            setThisToken('adminPW',_this.loginForm.password)
          } else {
            removeThisToken('adminPW')
          }
          // 登录时拉取一次sidebar，防止第一次登录没有sidebar
          const roles = ['admin']//res.data.role
          store.dispatch('GenerateRoutes', { roles }).then((res) => { // 生成可访问的路由表
            setUsername(_this.loginForm.username)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            _this.$router.push({ path: '/' })
//            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
          })
//          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//          setUsername(_this.loginForm.username)
//          _this.$router.push({ path: '/' })
        } else {
          alert(res.error_msg)
        }

        // this.showDialog = true
      }).catch(() => {
        _this.loading = false
      })
      // var arg = {
      // 	data: _this.loginFormmd5,
      // 	success: function(res){
      // 		if(res.error_no == 200){
	   //    		_this.$store.dispatch('LoginByUsernameAdmin', _this.loginFormmd5).then(() => {
		//       			console.log('success')
		// 	      		console.log(JSON.stringify(res))
		// 		        _this.loading = false
		// 	          _this.$router.push({ path: '/' })
	   //          // this.showDialog = true
	   //        }).catch(() => {
	   //          _this.loading = false
	   //        })
      //   	}
      //
      // 	},
      // 	error: function(err){
      // 		console.log('error')
      // 		console.log(err)
      // 		_this.loading = false
      // 	}
      // }
      // userApi.adminlogin(arg)
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    if(getThisToken('adminPW')){
      this.loginForm.password = getThisToken('adminPW')
      this.isRemember = true
    }
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
