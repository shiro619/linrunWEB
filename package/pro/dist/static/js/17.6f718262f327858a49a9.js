webpackJsonp([17],{"2N9N":function(e,t,r){var n=r("U1Zw");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r("rjj0")("26947b2c",n,!0)},DnSN:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,"\n.main-container[data-v-438e4b58], .content[data-v-438e4b58] {\n  width: 100%;\n  background: #F3F5F9 !important;\n  min-height: 750px;\n  padding: 50px 45px;\n}\n.grid-content[data-v-438e4b58] {\n  border-radius: 5px;\n  padding: 60px 50px;\n  background: #fff;\n  position: relative;\n}\n.add-btn[data-v-438e4b58] {\n  position: absolute;\n  right: 60px;\n  width: 80px;\n  height: 30px;\n  top: 60px;\n  padding: 0;\n}\n.tree-container[data-v-438e4b58] {\n  width: 60%;\n}\n.delect-btn[data-v-438e4b58] {\n  float: right;\n  height: 30px;\n  line-height: 30px;\n  padding: 0;\n  width: 66px;\n}\n",""])},U1Zw:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,'\n.el-tree-node__content{\n   \t\theight: 45px!important; \n   \t\tpadding-right: 15px;\n   \t\tborder-top: 1px solid #F3F5F9;\n}\n.el-tree-node__content .el-tree-node__label{font-size: 16px;\n}\n.el-tree-node__children .el-tree-node__label{font-size: 14px;\n}\n.el-icon-caret-right:before{\n \t\tcontent: "\\E601";\n}\n.el-tree-node__expand-icon.expanded{\n      -webkit-transform: rotate(0deg);\n              transform: rotate(0deg);\n}\n.el-tree-node__expand-icon.expanded:before{\n    \tcontent: "\\E635";\n}\n.el-tree-node__expand-icon{color:#357CED;\n}\n.el-icon-caret-right.is-leaf{\n    \tcolor: #357CED;\n}\n.el-icon-caret-right.is-leaf:before{\n    \tfont-family:"fontFamily" !important;\n\t\tfont-size:13px;\n\t\tfont-style:normal;\n\t\t-webkit-font-smoothing: antialiased;\n\t\t-moz-osx-font-smoothing: grayscale;\n \t\tcontent: "\\E605";\n}\n.add-h-title{\nfont-size: 18px;\ncolor: #4A4A4A;\nletter-spacing: 0;margin-top: -1.33em;\n}\n.el-select{width: 100%;\n}\n.app-container{padding: 0px;background: #fff;\n}\n',""])},aq99:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});r("sPiM");var n=r("IubA"),o=(r("viA7"),r("cAgV")),i=(r("0xDb"),r("TIfe")),a=r("vKQe"),s=(r("7+uW"),{name:"complexTable",directives:{waves:o.a},components:{pre_data:a.a},data:function(){return{preData:a.a,postForm:"request",data:[""],defaultProps:{children:"children",label:"label"},temp:{rolename:""},role_id:this.$route.params.role_id,role_title:this.$route.params.name,parent_id:this.$route.params.parent_id,checked_arr:[],checked_arr2:[],permission:{modules:[],methods:[],privilege:[]},change_auto:!1,checkedForm:[],treeLoading:!0}},filters:{},created:function(){this.role_get(),this.role_list_data()},computed:{search_time:function(){return[Date.parse(this.searchtime[0])/1e3,Date.parse(this.searchtime[1])/1e3]},searchdata:function(){return{page:this.srarch_page,size:this.search_size,type:this.search_type,request_no:this.search_request_no,customer_name:this.search_customer_name,product_name:this.search_product_name,start_time:this.search_time[0],end_time:this.search_time[1],role_id:80,token:"test"}}},methods:{role_get:function(){var e={data:{token:Object(i.a)()},success:function(e){},error:function(){}};n.a.get_role(e)},role_list_data:function(){var e=this,t={data:{token:Object(i.a)()},success:function(t){e.postForm=t.result,e.data=e.toTree(t.result.rows,"catagory_0"),e.role_privilege()},error:function(){}};n.a.role_treepermission(t)},toTree:function(e,t){for(var r,n=[],o=0;o<e.length;o++)if(e[o].cid==t){e[o].label=e[o].title;var i=e[o];(r=this.toTree(e,e[o].id)).length>0&&(i.children=r),n.push(i)}return n},handleCheckChange:function(e,t,r){},setCheckedKeys:function(){this.$refs.tree.setCheckedKeys(this.checked_arr),_this.treeLoading="false"},role_module:function(){var e=this,t={data:{token:Object(i.a)(),role_id:e.role_id},success:function(t){for(var r in t.result.rows){var n=t.result.rows[r];n.module_id&&e.checked_arr.push("modules_"+n.module_id)}e.setCheckedKeys()},error:function(){}};n.a.role_listsmodule(t)},role_method:function(){var e=this,t={data:{token:Object(i.a)(),role_id:e.role_id},success:function(t){for(var r=t.result.rows,n=e.checked_arr2,o=0;o<r.length;o++){var i=n.indexOf(r[o].method_id);if(-1!=i){for(var a=i;a<n.length;a++)n[a]==r[o].method_id&&(n.splice(a,1),a-=1);for(var s=o+1;s<r.length;s++)r[s]==r[o]&&(r.splice(s,1),s-=1);r.splice(o,1),o-=1}}var c=r.concat(n);for(var o in c)c[o]&&e.checked_arr.push("methods_"+c[o].method_id);e.setCheckedKeys()},error:function(){}};n.a.role_listsmethod(t)},role_privilege:function(){var e=this,t={data:{token:Object(i.a)(),role_id:e.role_id},success:function(t){for(var r in t.result.rows){var n=t.result.rows[r];n.id&&(e.checked_arr2.push(n.method_id),e.checked_arr.push(n.id))}e.setCheckedKeys(),e.role_method()},error:function(){}};n.a.role_listsprivilege(t)},addUser:function(){var e=this;e.checkedForm=e.$refs.tree.getCheckedAll();for(var t in e.checkedForm){var r=e.checkedForm[t],o=r.id;o.indexOf("module")>=0&&e.permission.modules.push(r.id.substr(8)),o.indexOf("method")>=0&&e.permission.methods.push(r.id.substr(8)),o.indexOf("privilege")>=0&&e.permission.privilege.push(r.id.substr(10))}var a={data:{token:Object(i.a)(),title:e.role_title,permission:e.permission,parent_id:e.parent_id},success:function(t){200==t.error_no?(e.$notify({title:"成功",message:"添加成功",type:"success",duration:2e3}),e.$router.go(-1)):e.$notify({title:"失败",message:t.error_msg,type:"error",duration:2e3})},error:function(){}};n.a.add_role(a)},editUser:function(){var e=this;e.checkedForm=e.$refs.tree.getCheckedAll();for(var t in e.checkedForm){var r=e.checkedForm[t],o=r.id;o.indexOf("module")>=0&&e.permission.modules.push(r.id.substr(8)),o.indexOf("method")>=0&&e.permission.methods.push(r.id.substr(8)),o.indexOf("privilege")>=0&&e.permission.privilege.push(r.id.substr(10))}var a={data:{token:Object(i.a)(),role_id:e.role_id,title:e.role_title,permission:e.permission},success:function(t){200==t.error_no?(e.$notify({title:"成功",message:"编辑成功",type:"success",duration:2e3}),e.$router.go(-1)):e.$notify({title:"失败",message:t.error_msg,type:"error",duration:2e3})},error:function(){}};n.a.update_role(a)},delectForm:function(){var e=this,t={data:{token:Object(i.a)(),role_id:e.role_id},success:function(t){200==t.error_no?e.$message({type:"success",message:"删除成功!"}):e.$message({type:"error",message:t.error_msg})},error:function(){}};n.a.delete_role2(t)},open_xw:function(){var e=this;this.$confirm("是否删除这个角色？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.delectForm()}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},getUrlParam:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=window.location.search.substr(1).match(t);return null!=r?unescape(r[2]):null}}}),c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[r("div",{staticClass:"role-container"},[r("h4",{staticClass:"add-h-title"},[e._v("角色信息\n\t\t\t"),e.role_id?r("el-button",{staticClass:"delect-btn",attrs:{type:"danger"},on:{click:e.open_xw}},[e._v("删除")]):e._e()],1),e._v(" "),r("el-form",{ref:"dataForm",attrs:{model:e.role_title,"label-position":"left","label-width":"50px"}},[r("el-form-item",{attrs:{label:"名称",prop:"rolename"}},[r("el-input",{attrs:{type:"text",placeholder:"请输入角色名称"},model:{value:e.role_title,callback:function(t){e.role_title=t},expression:"role_title"}})],1)],1),e._v(" "),r("el-tree",{ref:"tree",attrs:{data:e.data,props:e.defaultProps,"node-key":"id","show-checkbox":"","default-expand-all":"","expand-on-click-node":!1},on:{"check-change":e.handleCheckChange}}),e._v(" "),r("div",{staticStyle:{"margin-top":"20px","text-align":"right"}},[r("el-button",{staticStyle:{width:"90px"},on:{click:function(t){e.$router.go(-1)}}},[e._v("取消")]),e._v(" "),e.role_id?r("el-button",{staticStyle:{width:"90px"},attrs:{type:"primary"},on:{click:e.editUser}},[e._v("确定")]):e._e(),e._v(" "),e.parent_id?r("el-button",{staticStyle:{width:"90px"},attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确定")]):e._e()],1)],1)])},staticRenderFns:[]},d=r("VU/8")(s,c,!1,function(e){r("y1Ay"),r("2N9N")},"data-v-438e4b58",null);t.default=d.exports},y1Ay:function(e,t,r){var n=r("DnSN");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r("rjj0")("147a9164",n,!0)}});