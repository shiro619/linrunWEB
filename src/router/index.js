import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    },{
      path: '/changepassword',
      component: _import('changepassword/changepassword'),
      name: 'changepassword',
      meta: { title: 'changepassword', icon: 'dashboard', noCache: true }
    }],
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/work',
    component: Layout,
    redirect: 'noredirect',
    id: '5',
    name: 'work',
    meta: {
      title: 'work',
      icon: 'component'
    },
    children: [
      { path: 'creditrequest', component: _import('work/creditrequest/creditrequest'), id: '236', name: 'creditrequest', meta: { title: 'creditrequest'}},
      { path: 'inquire', component: _import('work/inquire/inquire'), id: '237', name: 'inquire', meta: { title: 'inquire'}},
      { path: 'detailinquire', component: _import('work/inquire/detailinquire'), id: '#', name: 'detailinquire', meta: { title: 'detailinquire'}, hidden: true},
      { path: 'inputrequest', component: _import('work/inputrequest/inputrequest'), id: '242', name: 'inputrequest', meta: { title: 'inputrequest'}},
      { path: 'artificial', component: _import('work/artificialone/artificial'), id: '238', name: 'artificial', meta: { title: 'artificial'}},
      { path: 'detailartificialone', component: _import('work/artificialone/detailartificialone'), id: '#', name: 'detailartificialone', meta: { title: 'detailartificialone'}, hidden: true},
      { path: 'detailartificialtwo', component: _import('work/artificialone/detailartificialone'), id: '#', name: 'detailartificialtwo', meta: { title: 'detailartificialtwo'}, hidden: true},
      { path: 'artificialtwo', component: _import('work/artificialtwo/artificialtwo'), id: '259', name: 'artificialtwo', meta: { title: 'artificialtwo'}},
      { path: 'applyremittance', component: _import('work/applyremittance/applyremittance'), id: '277', name: 'applyremittance', meta: { title: 'applyremittance'}},
      { path: 'detailinputrequest', component: _import('work/inputrequest/detailinputrequest'), id: '#', name: 'detailinputrequest', meta: { title: 'detailinputrequest'}, hidden: true},
      { path: 'detailapplyremittance', component: _import('work/applyremittance/detailapplyremittance'), id: '#', name: 'detailapplyremittance', meta: { title: 'detailapplyremittance'},hidden: true},
      { path: 'moneyaudit', component: _import('work/moneyaudit/moneyaudit'), id: '279', name: 'moneyaudit', meta: { title: 'moneyaudit'}},
      { path: 'finance', component: _import('work/finance/finance'), id: '240', name: 'finance', meta: { title: 'finance'}},
      { path: 'returnmoney', component: _import('work/returnmoney/returnmoney'), id: '241', name: 'returnmoney', meta: { title: 'returnmoney'}},
      { path: 'detailmoneyaudit', component: _import('work/moneyaudit/detailmoneyaudit'), id: '#', name: 'detailmoneyaudit', meta: { title: 'detailmoneyaudit'},hidden: true},
      { path: 'sendtask', component: _import('work/sendtask/sendtask'), id: '244', name: 'sendtask', meta: { title: 'sendtask'}},
      { path: 'cargpstask', component: _import('work/cargpstask/cargpstask'), id: '248', name: 'cargpstask', meta: { title: 'cargpstask'}},
      { path: 'detailfinance', component: _import('work/finance/detailfinance'), id: '#', name: 'detailfinance', meta: { title: 'detailfinance'},hidden: true},
      { path: 'detailreturnmoney', component: _import('work/returnmoney/detailreturnmoney'), id: '#', name: 'detailreturnmoney', meta: { title: 'detailreturnmoney'},hidden: true},
      { path: 'copytask', component: _import('work/copytask/copytask'), id: '245', name: 'copytask', meta: { title: 'copytask'}},
      { path: 'mortgagetask', component: _import('work/mortgagetask/mortgagetask'), id: '249', name: 'mortgagetask', meta: { title: 'mortgagetask'}},
      { path: 'salessupplement', component: _import('work/salessupplement/salessupplement'), id: '274', name: 'salessupplement', meta: { title: 'salessupplement'}},
      { path: 'detailsalessupplement', component: _import('work/inputrequest/detailinputrequest'), id: '#', name: 'detailsalessupplement', meta: { title: 'detailsalessupplement'},hidden: true}
    ]
  },
  {
    path: '/taskquery',
    component: Layout,
    redirect: 'noredirect',
    id: '7',
    name: 'taskquery',
    meta: {
      title: 'taskquery',
      icon: 'component'
    },
    children: [
      { path: 'detailtask', component: _import('work/artificialone/detailartificialone'), id: '#', name: 'detailtask', meta: { title: 'detailtask'},hidden: true},
      { path: 'taskqueryself', component: _import('taskquery/taskqueryself/taskqueryself'), id: '273', name: 'taskqueryself', meta: { title: 'taskqueryself'}},
      { path: 'taskquerymanager', component: _import('taskquery/taskquerymanager/taskquerymanager'), id: '250', name: 'taskquerymanager', meta: { title: 'taskquerymanager'}},
      { path: 'taskquerypartition', component: _import('taskquery/taskquerypartition/taskquerypartition'), id: '290', name: 'taskquerypartition', meta: { title: 'taskquerypartition'}},
      { path: 'taskqueryprovince', component: _import('taskquery/taskqueryprovince/taskqueryprovince'), id: '300', name: 'taskqueryprovince', meta: { title: 'taskqueryprovince'}},
      { path: 'beforedata', component: _import('taskquery/beforedata/beforedata'), id: '295', name: 'beforedata', meta: { title: 'beforedata'}},
      { path: 'changetask', component: _import('work/inputrequest/detailinputrequest'), id: '#', name: 'changetask', meta: { title: 'changetask'},hidden:true}
    ]
  },
  {
    path: '/postloan',
    component: Layout,
    redirect: 'noredirect',
    id: '19',
    name: 'postloan',
    meta: {
      title: 'postloan',
      icon: 'component'
    },
    children: [
      { path: 'bankdataquery', component: _import('postloan/bankdataquery/bankdataquery'), id: '278', name: 'bankdataquery', meta: { title: 'bankdataquery'}},
      { path: 'overduelist', component: _import('postloan/overduelist/overduelist'), id: '298', name: 'overduelist', meta: { title: 'overduelist'}},
      // { path: 'pushlist', component: _import('postloan/pushlist/pushlist'),id: '299', name: 'pushlist', meta: { title: 'pushlist'}}
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    id: '9',
    name: 'system',
    meta: {
      title: 'system',
      icon: 'component'
    },
    children: [
      { path: 'actionlog', component: _import('system/actionlog/actionlog'), id: '256', name: 'actionlog', meta: { title: 'actionlog'}},
      { path: 'loginlog', component: _import('system/loginlog/loginlog'), id: '257', name: 'loginlog', meta: { title: 'loginlog'}}
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: 'noredirect',
    name: 'role',
    id: '12',
    meta: {
      title: 'role',
      icon: 'component'
    },
    children: [
      { path: 'adduser', component: _import('role/adduser/adduser'), name: 'adduser',id:'251', meta: { title: 'adduser'}},
      { path: 'index', component: _import('role/index/index'), name: 'index',id:'252', meta: { title: 'index'}},
      { path: 'edituserauth', component: _import('role/index/edituserauth'), name: 'edituserauth',id:'#', meta: { title: 'edituserauth'},hidden: true},
      { path: 'roleset', component: _import('role/roleset/roleset'), name: 'roleset',id:'253', meta: { title: 'roleset'}},
      { path: 'editrole', component: _import('role/editrole/editrole'), name: 'editrole',id:'#',hidden: true},
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
