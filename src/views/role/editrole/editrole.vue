<template>
	<div class="content"> 
		<div class="role-container" >
			<h4 class="add-h-title">角色信息
				<el-button v-if="role_id" class="delect-btn" type="danger" @click="open_xw">删除</el-button>
			</h4>
			<el-form  ref="dataForm" :model="role_title" label-position="left" label-width="50px" >
		      	<el-form-item label="名称" prop="rolename">
		          <el-input type="text" placeholder="请输入角色名称" v-model="role_title">
		          </el-input>
		        </el-form-item> 
		    </el-form>
			<el-tree 
			  :data="data"
			  :props="defaultProps"
			  node-key="id"
			  show-checkbox
			  ref="tree"
			  default-expand-all
			
			  @check-change="handleCheckChange"
			  :expand-on-click-node="false"> 
			</el-tree>
			<div style="margin-top: 20px;text-align: right;">
		        <el-button @click="$router.go(-1)" style="width: 90px;">取消</el-button>
		        <el-button type="primary" v-if='role_id'  @click="editUser" style="width: 90px;">确定</el-button>
		        <el-button type="primary" v-if='parent_id' @click="addUser" style="width: 90px;">确定</el-button>
		    </div>
		</div>
	</div>
	
</template>

 
<script>
	import "@/font/iconfont.css";
	import listApi from '@/api/listApi'
	import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
	import waves from '@/directive/waves' // 水波纹指令
	import { parseTime } from '@/utils'
	import { getAdminToken } from '@/utils/auth'
	import pre_data from '@/common/city.data-3'  
	import Vue from 'vue'
	//let role_id = this.$route.params.role_id
	//let role_title = this.$route.params.name
	export default {
		name: 'complexTable',
		directives: {
			waves
		},
		components: {pre_data}, 
		data() {
			return {
				preData:pre_data,
				postForm: "request",
				data: [''],
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        },
				temp:{
					rolename:''
				},
				role_id:this.$route.params.role_id,
				role_title:this.$route.params.name,
				parent_id:this.$route.params.parent_id,
				checked_arr:[],
				checked_arr2:[],
				permission:{"modules":[],"methods":[],"privilege":[]},
				change_auto:false,
				checkedForm:[],
				treeLoading:true
				
			};
		},
		filters: {
			
		},
		created() {
			//Loading.service({document.querySelector('el-tree')});
			this.role_get()
			this.role_list_data()
			//console.log(this.cityData)
		},
		  computed: {
		  	search_time(){
		  		var _this = this
		  		var stime1 = Date.parse(_this.searchtime[0]) / 1000
		  		var stime2 = Date.parse(_this.searchtime[1]) / 1000
		  		return [stime1,stime2]
		  	},
		  	searchdata(){
		  		return {
		  			page: this.srarch_page,
			      	size: this.search_size,
			      	type: this.search_type,
			      	request_no: this.search_request_no,
			    		customer_name: this.search_customer_name,
			    		product_name: this.search_product_name,
			    		start_time: this.search_time[0],
			    		end_time: this.search_time[1],
			      	role_id: 80,
			      	token: 'test'
		  		}
		  	}
		  },
		methods: {
			role_get(){
				var _this = this;
				var arg = {
					data: {
						"token": getAdminToken()
					},
					success: function(res) {
						//_this.postForm = res.result
						//_this.data = _this.toTree(res.result.rows, '0')
					},
					error: function() {}
				}
				listApi.get_role(arg)
			},
			role_list_data() {
				var _this = this;
				var arg = {
					data: {
						"token": getAdminToken()
					},
					success: function(res) {
						_this.postForm = res.result
						_this.data = _this.toTree(res.result.rows,'catagory_0')
						//_this.role_module()
						//_this.role_method()
						_this.role_privilege()
					},
					error: function() {}
				}
				listApi.role_treepermission(arg)
			},
			toTree(data,id) {
			    var _this = this
		        var tree = [];
		        var temp;
		        for (var i = 0; i < data.length; i++) {
		            if (data[i].cid==id) {
		            	//console.log(data[i].id)
		            	//data[i].id = data[i].id;
		            	data[i].label = data[i].title;
		            	//alert(JSON.stringify(data[i])) 
		                var obj = data[i];
		                temp = _this.toTree(data, data[i].id); 
		                //alert(JSON.stringify(temp))
		                if (temp.length > 0) {
		                 obj.children = temp;
		                }  
		                tree.push(obj);
		            }
		        }
		        return tree;
		    },
		    handleCheckChange(data, checked, indeterminate) {
		    	var _this = this
		    	//this.change_auto = false
		    	//permission:{"modules":[],"methods":[],"privilege":[]},
		    	/*if(checked||indeterminate){
		    		//console.log(5)
		    		if(data.children[0].children){
			    		_this.permission.modules.push(data.id.substr(8))
			    	}else if(data.children){
			    		_this.permission.methods.push(data.id.substr(8))
			    	}else{
			    		_this.permission.privilege.push(data.privilege_id)
			    	}
			    	
		    	}else{
		    		
		    		if(data.children[0].children){//一级
		    			var _modules = _this.permission.modules
		    			for(var i =0;i<_modules.length;i++){
		    				if(data.id.substr(8)==_modules[i]){
		    					_this.permission.modules = _modules.splice(i+1,1)
		    				}
		    			} 
			    		//_this.permission.modules.push(data.id.substr(8))
			    	}else if(data.children){
			    		var _methods = _this.permission.methods
		    			for(var i=0;i<_methods.length;i++){
		    				if(data.id.substr(8)==_methods[i]){
		    					_this.permission.methods = _methods.splice(i+1,1)
		    				}
		    			}
			    		//_this.permission.methods.push(data.id.substr(8))
			    	}else{
			    		//_this.permission.privilege.push(data.privilege_id)
			    	}
		    	}
		    	
		        console.log(data, checked, indeterminate); */
		    },
		    setCheckedKeys() {
		        this.$refs.tree.setCheckedKeys(this.checked_arr);
		        _this.treeLoading = 'false'
		    },
		   	
		    role_module(){
		        var _this = this;
		       // var role_id = _this.role_id
				var arg = {
					data: {
						"token": getAdminToken(),
						'role_id':_this.role_id
						
					},
					success: function(res) {
						for(var i in res.result.rows){
							var row = res.result.rows[i] 
							if(!row.module_id){}else{
								_this.checked_arr.push('modules_'+row.module_id)
							}
						}
						_this.setCheckedKeys()
					},
					error: function() {}
				}
				listApi.role_listsmodule(arg)
		    },
		    role_method() {
		      	var _this = this;
				var arg = {
					data: {
						"token": getAdminToken(),
						'role_id':_this.role_id
						
					},
					success: function(res) {
						
						var arr=res.result.rows;  
						//console.log(JSON.stringify(arr)) 
						var arr1=_this.checked_arr2;  
						var a = [],b=[],r;
						for(var i=0;i<arr.length;i++){
						 	var index=arr1.indexOf(arr[i].method_id); 
						 	if(index!=-1){  
					            var r=a[i];  
					            for(var j=index;j<arr1.length;j++){  
					                if(arr1[j]==arr[i].method_id){  
					                    arr1.splice(j,1);  
					                    j=j-1;  
					                }         
					            }  
					            for(var k=i+1;k<arr.length;k++){  
				                    if(arr[k]==arr[i]){   
				                        arr.splice(k,1);  
				                        k=k-1;  
				                    }  
					            }  
					            arr.splice(i,1);  
					            i=i-1;             
					        } 
						}
						var row3 = arr.concat(arr1); 
						for(var i in row3){
							if(row3[i]){
								_this.checked_arr.push('methods_'+row3[i].method_id)
							}
						}
						
						_this.setCheckedKeys()
					},
					error: function() {}
				}
				listApi.role_listsmethod(arg)
		    },
		    role_privilege() {
		        var _this = this;
				var arg = {
					data: {
						"token": getAdminToken(),
						'role_id':_this.role_id
						
					},
					success: function(res) {
					
						for(var i in res.result.rows){
							var row = res.result.rows[i] 
							if(!row.id){}else{
								_this.checked_arr2.push(row.method_id)
								_this.checked_arr.push(row.id)
							}
						}
						_this.setCheckedKeys()
						_this.role_method()
					},
					error: function() {}
				}
				listApi.role_listsprivilege(arg)
		    },
		    addUser(){
		        var _this = this;
		        _this.checkedForm = _this.$refs.tree.getCheckedAll()
		        for(var i in _this.checkedForm){
		        	var data = _this.checkedForm[i]
		        	var data_id = data.id
		        	//console.log(JSON.stringify(data)) 
		        	if(data_id.indexOf('module')>=0){
		        		_this.permission.modules.push(data.id.substr(8))
		        	}
		        	if(data_id.indexOf('method')>=0){
		        		_this.permission.methods.push(data.id.substr(8))
		        	}
		        	if(data_id.indexOf('privilege')>=0){
		        		_this.permission.privilege.push(data.id.substr(10))
		        	}
		        }
		        
		        //console.log(8+JSON.stringify(_this.$refs.tree.getCheckedAll())) 
		       // var role_id = _this.role_id
				var arg = {
					data: {
						"token": getAdminToken(),
						title:_this.role_title,
						permission:_this.permission,
						parent_id:_this.parent_id
					},
					success: function(res) {
						if(res.error_no==200){
							_this.$notify({
								title: '成功',
								message: '添加成功',
								type: 'success',
								duration: 2000
							})
							_this.$router.go(-1)
						}else{
							_this.$notify({
								title: '失败',
								message: res.error_msg,
								type: 'error',
								duration: 2000
							})
						}
					},
					error: function() {}
				}
				listApi.add_role(arg)
		    },
		    editUser(){
		        var _this = this;
		        _this.checkedForm = _this.$refs.tree.getCheckedAll()
		        for(var i in _this.checkedForm){
		        	var data = _this.checkedForm[i]
		        	var data_id = data.id
		        	//console.log(JSON.stringify(data)) 
		        	if(data_id.indexOf('module')>=0){
		        		_this.permission.modules.push(data.id.substr(8))
		        	}
		        	if(data_id.indexOf('method')>=0){
		        		_this.permission.methods.push(data.id.substr(8))
		        	}
		        	if(data_id.indexOf('privilege')>=0){
		        		_this.permission.privilege.push(data.id.substr(10))
		        	}
		        }
				var arg = {
					data: {
						"token": getAdminToken(),
						'role_id':_this.role_id,
						title:_this.role_title,
						permission:_this.permission	
					},
					success: function(res) {
						if(res.error_no==200){
							_this.$notify({
								title: '成功',
								message: '编辑成功',
								type: 'success',
								duration: 2000
							})
							_this.$router.go(-1)
						}else{
							_this.$notify({
								title: '失败',
								message: res.error_msg,
								type: 'error',
								duration: 2000
							})
						}
					},
					error: function() {}
				}
				listApi.update_role(arg)
		    },
		    delectForm(){
		    	
		    	var _this = this;
				var arg = {
					data: {
						"token": getAdminToken(),
						'role_id':_this.role_id
						
					},
					success: function(res) {
						if(res.error_no==200){
							_this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
						}else{
							_this.$message({
					            type: 'error',
					            message: res.error_msg
					        }); 
						}
						
					},
					error: function() {}
				}
				listApi.delete_role2(arg)
		    	
		    },
		    open_xw() {
		        this.$confirm('是否删除这个角色？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.delectForm()
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		     },
		   	getUrlParam(name) { 
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    var r = window.location.search.substr(1).match(reg);  
			    if (r != null) return unescape(r[2]); return null; 
			}
			

		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   
  @import "src/styles/mixin.scss";
  .main-container,.content{
  	width: 100%;
  	background: #F3F5F9!important;
  	min-height: 750px;
  	padding: 50px 45px;
  }
  
  .role-container {
  	
  }
  .grid-content{border-radius: 5px;padding: 60px 50px;background: #fff;position: relative;}
  .add-btn{position: absolute;right: 60px;width: 80px;height: 30px;top: 60px;padding: 0;}
  .tree-container{
  	width: 60%;
  } 
  .delect-btn{
  	float: right;
  	height: 30px;
  	line-height: 30px;
  	padding: 0;
  	width: 66px;
  }
</style>
<style>
	.el-tree-node__content{
   		height: 45px!important; 
   		padding-right: 15px;
   		border-top: 1px solid #F3F5F9;
 	}
 	.el-tree-node__content .el-tree-node__label{font-size: 16px;}
 	.el-tree-node__children .el-tree-node__label{font-size: 14px;} 
 	.el-icon-caret-right:before{
 		content: "\E601"; 
 	}
    .el-tree-node__expand-icon.expanded{
      transform: rotate(0deg); 
    }
    .el-tree-node__expand-icon.expanded:before{
    	content: "\E635"; 
    }
    .el-tree-node__expand-icon{color:#357CED;}
    .el-icon-caret-right.is-leaf{
    	color: #357CED;
    }
    .el-icon-caret-right.is-leaf:before{
    	font-family:"fontFamily" !important;
		font-size:13px;
		font-style:normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
 		content: "\e605";
 	} 
 	.add-h-title{
font-size: 18px;
color: #4A4A4A;
letter-spacing: 0;margin-top: -1.33em;}
.el-select{width: 100%;}
.app-container{padding: 0px;background: #fff;}
</style>