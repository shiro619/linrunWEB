import { loginByUsername, logout, getUserInfo } from '@/api/login'
import userApi from '@/api/userApi'
import { getToken, getAdminToken, setToken, removeToken, removeAdminToken, setAdminToken, getThisToken, setThisToken } from '@/utils/auth'
import axios from 'axios'
import {url, urlc, upload} from '@/common/config'
import qs from 'qs'


const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    admintoken: getAdminToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ADMIN_TOKEN: (state, token) => {
      state.admintoken = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录(demo)
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          console.log(JSON.stringify(data))
          console.log('settoken:' + data.token)
          setToken(response.data.token) //response.data.token
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户名登录
    LoginByUsernameAdmin({ commit }, userInfo) {
      const params = qs.stringify(userInfo ?userInfo : {})
      return new Promise((resolve, reject) => {
        axios.post(url + 'auth/login',
          params
        ).then(response => {
          var res = response['data']
          if(res.error_no == 200){
            commit('SET_TOKEN', 'admin')
            commit('SET_ADMIN_TOKEN', res.result.token.token)
            // userinfo
            commit('SET_NAME', res.result.user.name)
            commit('SET_AVATAR', res.result.user.head_portrait)
            console.log('settoken:' + res.result.token.token)
            setToken('admin')
            setThisToken('adminAvatar',res.result.user.head_portrait)
            setThisToken('adminName',res.result.user.name)
            setAdminToken(res.result.token.token)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })

      })

      // var arg = {
      // 	data: userInfo,
      // 	success: function(res){
      // 		if(res.error_no == 200){
      //       commit('SET_TOKEN', 'admin')
      //       commit('SET_ADMIN_TOKEN', res.result.token.token)
      //       console.log('settoken:' + res.result.token.token)
      //       setToken('admin')
      //       setAdminToken(res.result.token.token)
      //   	}
      //
      // 	},
      // 	error: function(err){
      // 		console.log('error')
      // 		console.log(err)
      // 		_this.loading = false
      // 	}
      // }
      // return new Promise((resolve, reject) => {
      //   userApi.adminlogin(arg)
      //   resolve(res)
      // })
      // const username = userInfo.account.trim()
      // return new Promise((resolve, reject) => {
      //   userApi.adminlogin(username, userInfo.password).then(response => {
      //     const data = response.data
      //     if(data.error_no == 200){
      //       commit('SET_TOKEN', 'admin')
      //       commit('SET_ADMIN_TOKEN', data.result.token.token)
      //       console.log('settoken:' + data.result.token.token)
      //       setToken('admin')
      //       setAdminToken(response.data.result.token.token) //response.data.token
      //       resolve()
      //     } else {
      //       alert(data.error_msg)
      //     }
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },


    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(response => {
        var response = {"code":20000,"data":{"roles":["admin"],"role":["admin"],"name":"admin","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"}}
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          commit('SET_ROLES', data.role)
          // commit('SET_NAME', data.name)
          // console.log('setAvatar')
          // console.log(data.avatar)
          // commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ADMIN_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeAdminToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
