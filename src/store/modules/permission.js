import { asyncRouterMap, constantRouterMap } from '@/router'
import axios from "axios/index";
import {url, urlc, upload} from '@/common/config'
import { getToken, getAdminToken } from '@/utils/auth' // 验权

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return  accessedRouters
}

function filterAdminRouter(asyncRouterMap, sidebarRes) {
  // const accessedRouters = asyncRouterMap.filter(route => {
  //   if (hasPermission(roles, route)) {
  //     if (route.children && route.children.length) {
  //       route.children = filterAsyncRouter(route.children, roles)
  //     }
  //     return true
  //   }
  //   return false
  // })
  function searchRouter(routerid ,type) {
    var categroy = sidebarRes.result.category
    var method = sidebarRes.result.method
    if(type == 1){ // 区分一级菜单与二级菜单
      for(var r in categroy){
        if(routerid == categroy[r].id){
          return true
        }
      }
    } else if(type == 2){
      for(var r in method){
        if(routerid == method[r].method_id){
          return true
        }
      }
    }
    return false
  }
  var accessedRouters = asyncRouterMap
  // 先标记删除
  for(var i in asyncRouterMap){
    if(asyncRouterMap[i].hasOwnProperty('id')) { // 一级菜单是否有id属性
      if(!searchRouter(asyncRouterMap[i].id ,1)){
        accessedRouters[i].isdelete = '1' // 标记删除一级菜单
        continue // 跳出当前一级菜单
      }
    }
    if(asyncRouterMap[i].hasOwnProperty('children') && asyncRouterMap[i].children.length > 1){ // 判断是否有children属性
      let routerChildren = asyncRouterMap[i].children
      for(var j in routerChildren){ // 遍历children
        if(routerChildren[j].hasOwnProperty('id')){ // 是否有id属性
          if(!searchRouter(routerChildren[j].id ,2) && routerChildren[j].id != '#'){ // 判断res里是否有对应id
            accessedRouters[i].children[j].isdelete = '1' // 标记删除二级菜单
          }
        }else {
          // accessedRouters[i].children[j].isdelete = '1' // 标记删除二级菜单
        }
      }
    }
  }
  // 删除
  for(let i = accessedRouters.length - 1; i >= 0; i--){ // 逆向遍历删除
    if(accessedRouters[i].hasOwnProperty('isdelete')) { // 一级菜单是否有id属性
      accessedRouters.splice(i,1)
      continue
    }
    if(accessedRouters[i].hasOwnProperty('children') && accessedRouters[i].children.length > 1){ // 判断是否有children属性
      let routerChildren = accessedRouters[i].children
      for(let j = routerChildren.length - 1; j >= 0; j--){ // 遍历children
        if(routerChildren[j].hasOwnProperty('isdelete')){ // 是否要删除
          accessedRouters[i].children.splice(j,1)
        }
      }
    }
  }
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // sidebar接口
        var params = {
          token: getAdminToken()
        }
        axios.get(url + 'Api/privilege/sidebar',
          {params: params}
        ).then(response => {
          var res = response['data']
          // console.log(JSON.stringify(res))
          let accessedRouters
          accessedRouters = asyncRouterMap
          if(res.error_no == 200){
            accessedRouters = filterAdminRouter(asyncRouterMap, res)
            console.log(accessedRouters)
            commit('SET_ROUTERS', accessedRouters)
            resolve(res)
          } else {
            resolve(res)
          }


        }).catch(e => {
          // reject(error)
        })


        // const { roles } = data
        // let accessedRouters
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // commit('SET_ROUTERS', accessedRouters)
        // resolve()
      })
    }
  }
}

export default permission
