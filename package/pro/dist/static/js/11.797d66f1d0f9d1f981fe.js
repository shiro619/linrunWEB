webpackJsonp([11],{CTvc:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.main-container[data-v-74832928], .content[data-v-74832928] {\n  width: 100%;\n  background: #F3F5F9 !important;\n  min-height: 750px;\n  padding: 50px 45px;\n}\n.grid-content[data-v-74832928] {\n  border-radius: 5px;\n  padding: 60px 50px;\n  background: #fff;\n  position: relative;\n}\n.add-btn[data-v-74832928] {\n  position: absolute;\n  right: 60px;\n  width: 80px;\n  height: 30px;\n  top: 60px;\n  padding: 0;\n}\n.tree-container[data-v-74832928] {\n  width: 60%;\n}\n",""])},fOeK:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,'\n.tree-container2 .el-tree-node__content{\n   \t\theight: 40px!important;\n   \t\tborder-top: 0px solid #F3F5F9!important;\n}\n.el-tree-node__content .el-tree-node__label{font-size: 18px;\n}\n.el-tree-node__children .el-tree-node__label{font-size: 14px;\n}\n.el-icon-caret-right:before{\n \t\tcontent: "\\E601";\n}\n.el-tree-node__expand-icon.expanded{\n      -webkit-transform: rotate(0deg);\n              transform: rotate(0deg);\n}\n.el-tree-node__expand-icon.expanded:before{\n    \tcontent: "\\E635";\n}\n.el-tree-node__expand-icon{color:#357CED;\n}\n.el-icon-caret-right.is-leaf{\n    \tcolor: #357CED;\n}\n.el-icon-caret-right.is-leaf:before{\n \t\tfont-family:"fontFamily" !important;\n\t\tfont-size:13px;\n\t\tfont-style:normal;\n\t\t-webkit-font-smoothing: antialiased;\n\t\t-moz-osx-font-smoothing: grayscale;\n \t\tcontent: "\\E605";\n}\n.app-container{padding: 0px;background: #fff;\n}\n',""])},g00i:function(t,e,i){var a=i("fOeK");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("1eae816e",a,!0)},hV2f:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("woOf"),n=i.n(a),o=i("mvHQ"),r=i.n(o),s=(i("sPiM"),i("IubA")),l=i("viA7"),c=i("cAgV"),d=i("0xDb"),u=i("TIfe"),p=i("vKQe"),m=(i("7+uW"),[{key:"0",display_name:"按姓名"},{key:"1",display_name:"按业务地区"},{key:"2",display_name:"按账号"}]),f=m.reduce(function(t,e){return t[e.key]=e.display_name,t},{}),h={name:"complexTable",directives:{waves:c.a},components:{pre_data:p.a},data:function(){return{preData:p.a,cityData:this.get_city(),townData:this.get_town(),postForm:"request",data:[""],defaultProps:{children:"children",label:"label"},tableKey:0,list:null,total:null,listLoading:!0,listQuery:{token:Object(u.a)(),page:1,size:10,importance:void 0,title:void 0,type:void 0,sort:"+id",condition:"",keyword:""},importanceOptions:[1,2,3],calendarTypeOptions:m,sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],statusOptions:["published","draft","deleted"],showAuditor:!1,temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published",account:"",name:"",province:"110000",city:"杭州市",town:"滨江",area_add:"",oldaccount:""},temp_add:{role_id:void 0,loginnames:"",add_to:"Root"},dialogFormVisible:!1,dialogAddFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},dialogPvVisible:!1,pvData:[],first_roleid:"",rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]}}},filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]},typeFilter:function(t){return f[t]}},created:function(){this.role_list_data(),this.getList()},computed:{search_time:function(){return[Date.parse(this.searchtime[0])/1e3,Date.parse(this.searchtime[1])/1e3]},searchdata:function(){return{page:this.srarch_page,size:this.search_size,type:this.search_type,request_no:this.search_request_no,customer_name:this.search_customer_name,product_name:this.search_product_name,start_time:this.search_time[0],end_time:this.search_time[1],role_id:80,token:Object(u.a)()}}},methods:{handleNodeClick:function(t){var e=t.role_id;this.temp_add.role_id=t.role_id,this.temp_add.title="添加用户至["+t.title+"]",this.getList(e)},showAddForm:function(){return this.temp_add.role_id?this.temp_add.role_id==this.first_roleid?(this.$notify({title:"错误",message:"没有权限",type:"error",duration:2e3}),!1):void(this.dialogAddFormVisible=!0):(this.$notify({title:"错误",message:"请选择需要添加的组",type:"error",duration:2e3}),!1)},role_list_data:function(){var t=this,e={data:{token:Object(u.a)()},success:function(e){t.postForm=e.result,t.data=t.toTree(e.result.rows,e.result.rows[0].parent_id),t.first_roleid=e.result.rows[0].role_id},error:function(){}};s.a.role_tree(e)},getList:function(t){var e=this,i=e.listQuery;t&&(i.role_id=t),e.listLoading=!0;var a={data:e.listQuery,success:function(t){e.list=t.result.rows,e.total=Number(t.result.total),e.listLoading=!1},error:function(){}};s.a.role_list(a)},getSList:function(t){var e=this,i=e.listQuery;t&&(i.role_id=t),e.listLoading=!0;var a={data:e.listQuery,success:function(t){e.list=t.result.rows,e.total=Number(t.result.total),e.listLoading=!1},error:function(){}};s.a.role_Slist(a)},toTree:function(t,e){for(var i,a=[],n=0;n<t.length;n++)if(t[n].parent_id==e){t[n].id=t[n].role_id,t[n].label=t[n].title+"("+t[n].nums+"人)";var o=t[n];(i=this.toTree(t,t[n].role_id)).length>0&&(o.children=i),a.push(o)}return a},addData:function(){var t=this;t.dialogAddFormVisible=!0;var e={token:Object(u.a)()};e.loginnames=r()([t.temp_add.loginnames]);var i={data:e,success:function(e){if(200!=e.error_no||0==e.result.rows.length)t.$notify({title:"错误",message:"未找到该用户！",type:"error",duration:2e3});else{var i=e.result.rows[0].user_id,a={data:{token:Object(u.a)(),user_id:i,role_ids:t.temp_add.role_id},success:function(e){console.log(r()(e)),200==e.error_no?(t.$notify({title:"成功",message:"添加用户成功",type:"success",duration:2e3}),t.role_list_data(),t.getList(t.temp_add.role_id)):t.$notify({title:"失败",message:e.error_msg,type:"error",duration:2e3})},error:function(t){}};s.a.adduser_role(a)}},error:function(t){}};s.a.find_role(i)},handleAdd:function(){this.dialogAddFormVisible=!0},get_city:function(t){for(var e in this.preData)this.preData[e].text==this.temp.province&&(this.cityData=this.preData[e].children,this.temp.city=this.cityData[0].text);this.get_town()},get_town:function(t){for(var e in this.cityData)this.cityData[e].text==this.temp.city&&(this.townData=this.cityData[e].children,this.temp.town=this.townData[0].text)},handleFilter:function(){this.listQuery.page=1,this.getSList()},handleSizeChange:function(t){this.listQuery.size=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),t.status=e},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){s.a.getList({data:{},success:function(t){},error:function(){}})},handleUpdate:function(t){this.temp=n()({},t),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.temp.account=t.user.mobile,this.temp.oldaccount=t.user.mobile,this.temp.name=t.user.loginname,this.dialogFormVisible=!0,this.temp.province="330000",this.get_city(),this.get_town(),this.temp.city="330100",this.temp.town="330106",this.temp.area_add="乡间小道"},updateData:function(){var t=this;t.temp.role="",t.temp.user="";var e={data:{token:Object(u.a)(),account:t.temp.account,name:t.temp.name,province:t.temp.province,city:t.temp.city,town:t.temp.town,area_add:t.temp.area_add,oldaccount:t.temp.oldaccount},success:function(e){200==e.error_no?(t.dialogFormVisible=!1,t.$notify({title:"成功",message:"编辑成功",type:"success",duration:2e3}),t.getList(),t.getList()):t.$notify({title:"错误",message:e.error_msg,type:"error",duration:2e3})},error:function(t){}};s.a.edit_role(e)},open_xw:function(t){var e=this;this.$confirm("是否删除这个用户？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.handleDelete(t)}).catch(function(){e.$notify({title:"取消",message:"已取消删除",type:"info",duration:2e3})})},open_setauth:function(t){var e={loginname:t.user.loginname,mobile:t.user.mobile,title:t.role.title,province:t.user.province,city:t.user.city,user_id:t.user.user_id,role_id:t.role.role_id};this.$router.push({name:"edituserauth",query:e})},handleDelete:function(t){var e=n()({},t),i=this,a={data:{token:Object(u.a)(),role_id:e.role.role_id,user_id:e.user.user_id},success:function(t){console.log(r()(t)),200==t.error_no?(i.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3}),i.getList(),i.role_list_data()):i.$notify({title:"错误",message:t.error_msg,type:"error",duration:2e3})},error:function(t){}};s.a.delete_role(a)},handleFetchPv:function(t){var e=this;Object(l.b)(t).then(function(t){e.pvData=t.data.pvData,e.dialogPvVisible=!0})},handleDownload:function(){var t=this;Promise.all([i.e(53),i.e(52)]).then(function(){(0,i("zWO4").export_json_to_excel)(["时间","地区","类型","标题","重要性"],t.formatJson(["timestamp","province","type","title","importance"],t.list),"table数据")}.bind(null,i)).catch(i.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return"timestamp"===t?Object(d.c)(e[t]):e[t]})})}}},_={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[i("div",{staticClass:"role-container"},[i("el-row",{attrs:{gutter:10}},[i("el-col",{attrs:{span:8}},[i("div",{staticClass:"grid-content bg-purple"},[i("div",{staticClass:"tree-container tree-container2"},[i("el-tree",{attrs:{"node-key":"id","default-expand-all":"",data:t.data,props:t.defaultProps},on:{"node-click":t.handleNodeClick}})],1),t._v(" "),i("el-button",{staticClass:"add-btn",attrs:{type:"primary"},on:{click:t.showAddForm}},[t._v("添加角色")])],1)]),t._v(" "),i("el-col",{attrs:{span:16}},[i("div",{staticClass:"grid-content bg-purple"},[i("div",{staticClass:"table-box"},[[i("div",{staticClass:"app-container calendar-list-container"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"用户名",width:"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.user.loginname))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"200px",align:"center",label:"业务地区"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.user.business_area))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"120px",align:"center",label:"账号"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.user.mobile))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"150px",align:"center",label:"员工号"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.user.employee_number))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"200px","class-name":"small-padding"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){t.open_xw(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[i("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.size,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"page",e)}}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"70px"}},[i("el-form-item",{attrs:{label:"账号",prop:"account"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入账号"},model:{value:t.temp.account,callback:function(e){t.$set(t.temp,"account",e)},expression:"temp.account"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"姓名",prop:"name"}},[i("el-input",{model:{value:t.temp.name,callback:function(e){t.$set(t.temp,"name",e)},expression:"temp.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"省份",prop:"province"}},[i("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择"},on:{change:t.get_city},model:{value:t.temp.province,callback:function(e){t.$set(t.temp,"province",e)},expression:"temp.province"}},t._l(t.preData,function(t){return i("el-option",{key:t.text,attrs:{label:t.text,value:t.text}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"市",prop:"city"}},[i("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择"},on:{change:t.get_town},model:{value:t.temp.city,callback:function(e){t.$set(t.temp,"city",e)},expression:"temp.city"}},t._l(t.cityData,function(t){return i("el-option",{key:t.text,attrs:{label:t.text,value:t.text}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"区/地域",prop:"town"}},[i("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择"},model:{value:t.temp.town,callback:function(e){t.$set(t.temp,"town",e)},expression:"temp.town"}},t._l(t.townData,function(t){return i("el-option",{key:t.text,attrs:{label:t.text,value:t.text}})}))],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"create"==t.dialogStatus?i("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确 定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:t.temp_add.title,visible:t.dialogAddFormVisible},on:{"update:visible":function(e){t.dialogAddFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.temp_add,"label-position":"left","label-width":"70px"}},[i("el-form-item",{attrs:{label:"用户名",prop:"account"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入账号"},model:{value:t.temp_add.loginnames,callback:function(e){t.$set(t.temp_add,"loginnames",e)},expression:"temp_add.loginnames"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogAddFormVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addData()}}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"阅读数统计",visible:t.dialogPvVisible},on:{"update:visible":function(e){t.dialogPvVisible=e}}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pvData,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{prop:"key",label:"渠道"}}),t._v(" "),i("el-table-column",{attrs:{prop:"pv",label:"pv"}})],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogPvVisible=!1}}},[t._v("确 定")])],1)],1)],1)]],2),t._v(" "),i("div")])])],1)],1)])},staticRenderFns:[]},g=i("VU/8")(h,_,!1,function(t){i("uG4B"),i("g00i")},"data-v-74832928",null);e.default=g.exports},uG4B:function(t,e,i){var a=i("CTvc");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("3a14f08c",a,!0)}});