<template>
	<div class="content"> 
		<div class="role-container">
			<el-tree
			  :data="data"
			  :props="defaultProps"
			  node-key="id"
			  default-expand-all
			  :expand-on-click-node="false"
			  :render-content="renderContent"> 
			</el-tree>
		</div>
	</div>
	
</template>

<script>
	import "@/font/iconfont.css";
	import listApi from '@/api/listApi'
	import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
	import waves from '@/directive/waves' // 水波纹指令
	import { parseTime } from '@/utils'
	import pre_data from '@/common/city.data-3'  
	import { getAdminToken } from '@/utils/auth'
	import Vue from 'vue'
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
		        }


			};
		},
		filters: {
			
		},
		created() {
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
			      	token: getAdminToken()
		  		}
		  	}
		  },
		methods: {

			role_list_data() {
				var _this = this;
				var arg = {
					data: {
						"token": getAdminToken()
					},
					success: function(res) {
						_this.postForm = res.result
						_this.data = _this.toTree(res.result.rows, res.result.rows[0].parent_id)
					},
					error: function() {}
				}
				listApi.role_tree(arg)
				
			},
			toTree(data,parent_id) {
			    var _this = this
		        var tree = [];
		        var temp;
		        for (var i = 0; i < data.length; i++) {
		        	data[i].index = i
		            if (data[i].parent_id == parent_id) {
		            	data[i].id = data[i].role_id;
		            	data[i].label = data[i].title+'('+data[i].nums+'人)';
		            	//alert(JSON.stringify(data[i]))
		                var obj = data[i];
		                temp = _this.toTree(data, data[i].role_id);
		                //alert(JSON.stringify(temp))
		                if (temp.length > 0) {
		                 obj.children = temp;
		                }  
		                tree.push(obj);
		            }
		        }
		        return tree;
		    },
		   	set_role(data) {
		   		//console.log(JSON.stringify(data))
		   		 this.$router.push({
		            path: '/role/editrole/editrole', 
		            name: 'editrole',
		            params: { 
		                name: data.title, 
		                role_id: data.role_id
		            }
		        })
		       
		       /* const newChild = { id: id++, label: 'testtest', children: [] };
		        if (!data.children) {
		          this.$set(data, 'children', []);
		        }
		        data.children.push(newChild);*/
		    },
		
		    append_role(node, data) {
		    	//console.log(JSON.stringify(data))
		   		 this.$router.push({
		            path: '/role/editrole/editrole', 
		            name: 'editrole',
		            params: { 
		                name: '', 
		                parent_id: data.role_id
		            }
		        })
		    },
		
		    renderContent(h, { node, data, store }) {
		    	if(data.index!=0){
		    		return (
		          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
		            <span>
		              <span>{node.label}</span>
		            </span>
		            <span>
		          	  	<el-button  style="font-size: 12px;" type="text" icon="el-icon-edit" on-click={ () => this.set_role(data) }>设置权限</el-button>
		              
		              <el-button style="font-size: 12px;" type="text" icon="el-icon-share" on-click={ () => this.append_role(node, data) }>添加下级角色</el-button>
		            </span>
		          </span>);
		    	}else{
		    	 	return (
		          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
		            <span>
		              <span>{node.label}</span>
		            </span>
		            <span>
		          	  	
		              <el-button style="font-size: 12px;" type="text" icon="el-icon-share" on-click={ () => this.append_role(node, data) }>添加下级角色</el-button>
		            </span>
		          </span>);
		    	}
		        
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
</style>
<style>
	.el-tree-node__content{
   		height: 45px!important; 
   		padding-right: 15px;
   		border-top: 1px solid #F3F5F9;
 	}
 	.el-tree-node__content .el-tree-node__label{font-size: 18px;}
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
</style>