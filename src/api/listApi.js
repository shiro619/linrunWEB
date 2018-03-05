// 列表类接口
import requestCore from '@/api/request-core'

class listApi extends requestCore {
    // 征信报告列表接口
    getInquireList (arg, ...other) {
        this.get('Api/workplatform/listworkplatform', arg)
    }

    // 征信报告列表接口
    // getMortgageList (arg, ...other) {
    //   this.get('Api/workplatform/listmortgage', arg)
    // }

    // 申请件查询
    getTaskquerySelf (arg, ...other) {
      this.get('Api/workplatform/taskqueryself', arg)
    }

    // 申请件查询(省级)
    getTaskqueryProvince (arg, ...other) {
      this.get('Api/workplatform/taskqueryprovince', arg)
    }

    // 申请件查询(分区)
    getTaskqueryPartition (arg, ...other) {
      this.get('Api/workplatform/taskquerypartition', arg)
    }

    // 申请件查询(老数据)
    getBeforedata (arg, ...other) {
      this.get('Api/workplatform/beforedata', arg)
    }

    // 申请件查询(管理员)
    getTaskqueryList (arg, ...other) {
      this.get('Api/workplatform/taskquery', arg)
    }
    delTaskquery (arg, ...other) {
      this.get('Api/workplatform/endwork', arg)
    }

    getBankdata (arg, ...other) {
      this.get('Api/workplatform/gethuankuan', arg)
    }

    getActionlog (arg, ...other) {
      this.get('Admin/system/getactionlog', arg)
    }

    getLoginlog (arg, ...other) {
      this.get('Admin/system/getloginlog', arg)
    }

    adminlogin (arg, ...other) {
        this.get('auth/login', arg)
    }
    pickupInquire (arg, ...other) {
        this.get('Api/workplatform/pickup', arg)
    }

    role_tree (arg, ...other) {//角色树形
        this.get('Admin/role/lists', arg)
    }
    role_list (arg, ...other) {//角色列表
        this.get('Admin/role/listsuser', arg)
    }
     role_Slist (arg, ...other) {//查询角色列表
        this.get('Admin/role/listsalluser', arg)
    }
    province_list (arg, ...other) {//省份列表
        this.get('system/system/getprovince', arg)
    }
    city_list (arg, ...other) {//getcity
        this.get('system/system/getprovince', arg)
    }
    edit_role (arg, ...other) {//编辑角色
        this.post('Admin/role/edituserpost', arg)
    }
    edit_role_auth (arg, ...other) {//编辑角色权限
      this.post('Api/role/setUserRoleAreaPrivilege', arg)
    }
    delete_role (arg, ...other) {//删除角色
        this.get('Admin/role/deleteuser', arg)
    }
    find_role (arg, ...other) {//查找角色
        this.get('Admin/role/finduser', arg)
    }
	  adduser_role (arg, ...other) {//添加用户至角色
        this.post('Admin/role/adduserrole', arg)
    }
	  adduser_all (arg, ...other) {//添加用户至所有
        this.post('Admin/role/adduserpost', arg)
    }

	  get_role (arg, ...other) {//获取用户角色
        this.get('Admin/role/get', arg)
    }
   	role_treepermission (arg, ...other) {//获取用户权限树
        this.get('Admin/role/treepermission', arg)
    }
   	role_listsmodule (arg, ...other) {//第一级选中
        this.get('Admin/role/listsmodule', arg)
    }
	role_listsmethod (arg, ...other) {//第二级选中
        this.get('Admin/role/listsmethod', arg)
    }
	role_listsprivilege (arg, ...other) {//第三级选中
        this.get('Admin/role/listsprivilege', arg)
    }
	delete_role2 (arg, ...other) {//删除角色2
        this.post('Admin/role/deleterole', arg)
    }
	delete_role3 (arg, ...other) {//删除角色3注销用户角色
        this.post('Admin/role/deleteuserpost', arg)
    }
	update_role(arg, ...other) {//更新用户权限
        this.get('Admin/role/updaterole', arg)
    }
	add_role(arg, ...other) {//用户权限添加用户
        this.get('Admin/role/roleadd', arg)
    }
	overdue_list(arg, ...other) {//逾期列表
        this.get('Api/workplatform/getyuqi', arg)
    }
	push_list(arg, ...other) {//推送列表
        this.get('Api/workplatform/getyuqi', arg)
    }


}

export default new listApi()
