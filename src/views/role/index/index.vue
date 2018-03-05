<template>
	<div class="content">
		<div class="role-container">
			<el-row :gutter="10">
			    <el-col :span="8">
				    <div class="grid-content bg-purple">
				    	<div class="tree-container tree-container2">
				    		<el-tree  node-key="id" default-expand-all :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				    	</div>
				    	 <el-button class="add-btn" type="primary" @click="showAddForm">添加角色</el-button>
				    </div>
				</el-col>
			    <el-col :span="16">
			    <div class="grid-content bg-purple">
			    	<div class="table-box">
			    		<template>
						  <div class="app-container calendar-list-container">
						    <!--<div class="filter-container">
						    	<el-select clearable class="filter-item" style="width: 25%" v-model="listQuery.condition" placeholder="按业务地区查询">
						        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
						        </el-option>
						      </el-select>
						      <el-input @keyup.enter.native="handleFilter" style="width: 55%;" class="filter-item" placeholder="标题" v-model="listQuery.keyword">
						      </el-input>

						      <el-button class="filter-item" style="width: 15%;float: right;" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>

						    </div>-->

						    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
						      style="width: 100%">
						      <el-table-column align="center" label="用户名" width="160px">
						        <template slot-scope="scope">
						          <span>{{scope.row.user.loginname}}</span>
						        </template>
						      </el-table-column>
						      <el-table-column min-width="200px" align="center" label="业务地区">
						        <template slot-scope="scope">
						          <span>{{scope.row.user.business_area}}</span>
						        </template>
						      </el-table-column>
						       <el-table-column width="120px" align="center" label="账号">
						        <template slot-scope="scope">
						          <span>{{scope.row.user.mobile}}</span>
						        </template>
						      </el-table-column>
						      <el-table-column width="150px" align="center" label="员工号">
						        <template slot-scope="scope">
						          <span>{{scope.row.user.employee_number}}</span>
						        </template>
						      </el-table-column>

						      <el-table-column align="center" label="操作" width="200px" class-name="small-padding">
						        <template slot-scope="scope">
						          <!--<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>-->
						          <el-button type="danger" size="mini" @click="open_xw(scope.row)">删除</el-button>
                      <el-button type="primary" size="mini" @click="open_setauth(scope.row)">设置</el-button>
						        </template>
						      </el-table-column>
						    </el-table>

						    <div v-show="!listLoading" class="pagination-container">
						      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
						        :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
						      </el-pagination>
						    </div>

						    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
						      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
						      	<el-form-item label="账号" prop="account">
						          <el-input type="text" placeholder="请输入账号" v-model="temp.account">
						          </el-input>
						        </el-form-item>
						        <el-form-item label="姓名" prop="name">
						          <el-input v-model="temp.name"></el-input>
						        </el-form-item>
						        <el-form-item label="省份" prop="province">
						          <el-select class="filter-item" v-model="temp.province" @change="get_city" placeholder="请选择">
						            <el-option v-for="item in preData" :key="item.text" :label="item.text" :value="item.text">
						            </el-option>
						          </el-select>
						        </el-form-item>
						        <el-form-item label="市" prop="city">
						          <el-select class="filter-item" v-model="temp.city" @change="get_town" placeholder="请选择">
						            <el-option v-for="item in cityData" :key="item.text" :label="item.text" :value="item.text">
						            </el-option>
						          </el-select>
						        </el-form-item>
						        <el-form-item label="区/地域" prop="town">
						          <el-select class="filter-item" v-model="temp.town" placeholder="请选择">
						            <el-option v-for="item in townData" :key="item.text" :label="item.text" :value="item.text">
						            </el-option>
						          </el-select>
						        </el-form-item>



						      </el-form>
						      <div slot="footer" class="dialog-footer">
						        <el-button @click="dialogFormVisible = false">取 消</el-button>
						        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
						        <el-button v-else type="primary" @click="updateData">确 定</el-button>
						      </div>
						    </el-dialog>


						    <el-dialog :title="temp_add.title" :visible.sync="dialogAddFormVisible">
						      <el-form :rules="rules" ref="dataForm" :model="temp_add" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
						      	<el-form-item label="用户名" prop="account">
						          <el-input type="text" placeholder="请输入账号" v-model="temp_add.loginnames">
						          </el-input>
						        </el-form-item>
						      </el-form>
						      <div slot="footer" class="dialog-footer">
						        <el-button @click="dialogAddFormVisible = false">取 消</el-button>

						        <el-button type="primary" @click="addData()">确 定</el-button>
						      </div>
						    </el-dialog>


						    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible">
						      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
						        <el-table-column prop="key" label="渠道"> </el-table-column>
						        <el-table-column prop="pv" label="pv"> </el-table-column>
						      </el-table>
						      <span slot="footer" class="dialog-footer">
						        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
						      </span>
						    </el-dialog>

						  </div>
						</template>
			    	</div>
			    	<div>


			    	</div>
			    </div>
			    </el-col>
			</el-row>
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
	const calendarTypeOptions = [{
			key: '0',
			display_name: '按姓名'
		},
		{
			key: '1',
			display_name: '按业务地区'
		},
		{
			key: '2',
			display_name: '按账号'
		}
	]

	// arr to obj ,such as { CN : "中国", US : "美国" }
	const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
		acc[cur.key] = cur.display_name
		return acc
	}, {})
	export default {
		name: 'complexTable',
		directives: {
			waves
		},
		components: {pre_data},
		data() {
			return {
				preData:pre_data,
				cityData:this.get_city(),
				townData:this.get_town(),
				postForm: "request",
				data: [''],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				//分页数据
				tableKey: 0,
				list: null,
				total: null,
				listLoading: true,
				listQuery: {
					token:getAdminToken(),
					page: 1,
					size: 10,
					importance: undefined,
					title: undefined,
					type: undefined,
					sort: '+id',
					condition:'',
					keyword:''
				},
				importanceOptions: [1, 2, 3],
				calendarTypeOptions,
				sortOptions: [{
					label: '按ID升序列',
					key: '+id'
				}, {
					label: '按ID降序',
					key: '-id'
				}],
				statusOptions: ['published', 'draft', 'deleted'],
				showAuditor: false,
				temp: {
					id: undefined,
					importance: 1,
					remark: '',
					timestamp: new Date(),
					title: '',
					type: '',
					status: 'published',
					'account' : '',
	                'name'    : '',
	                'province': '110000',
	                'city'    : '杭州市',
	                'town'    : '滨江',
	                'area_add':'',
	                'oldaccount':''
				},
				temp_add: {
					role_id: undefined,
					loginnames:'',
					add_to:'Root',
				},
				dialogFormVisible: false,
				dialogAddFormVisible:false,//添加用户弹窗
				dialogStatus: '',
				textMap: {
					update: '编辑',
					create: '创建'
				},
				dialogPvVisible: false,
				pvData: [],
				first_roleid:'',
				rules: {
					type: [{
						required: true,
						message: 'type is required',
						trigger: 'change'
					}],
					timestamp: [{
						type: 'date',
						required: true,
						message: 'timestamp is required',
						trigger: 'change'
					}],
					title: [{
						required: true,
						message: 'title is required',
						trigger: 'blur'
					}]
				}
				/*,

				      cartype: '1',
				      searchtime: searchtime()*/

			};
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				}
				return statusMap[status]
			},
			typeFilter(type) {
				return calendarTypeKeyValue[type]
			}
		},
		created() {
			this.role_list_data()
			this.getList()

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

			handleNodeClick(data) {
				var role_id = data.role_id

				this.temp_add.role_id = data.role_id
				this.temp_add.title = '添加用户至['+data.title+']'
				this.getList(role_id)
				//console.log(JSON.stringify(data));
			},
			showAddForm(){
				if(!this.temp_add.role_id){
					this.$notify({
						title: '错误',
						message: '请选择需要添加的组',
						type: 'error',
						duration: 2000
					})
					return false
				}
				if(this.temp_add.role_id==this.first_roleid){
					this.$notify({
						title: '错误',
						message: '没有权限',
						type: 'error',
						duration: 2000
					})
					return false
				}
				this.dialogAddFormVisible = true
			},
			role_list_data() {
				var _this = this;
				var arg = {
					data: {
						"token": getAdminToken()
					},
					success: function(res) {
						_this.postForm = res.result
						_this.data = _this.toTree(res.result.rows, res.result.rows[0].parent_id)
						_this.first_roleid = res.result.rows[0].role_id
					},
					error: function() {}
				}
				listApi.role_tree(arg)


			},
			getList(role_id){
				var _this = this;
				var request = _this.listQuery
				if(role_id){
					request.role_id = role_id
				}
				_this.listLoading = true;
				var arg = {
					data:_this.listQuery,
					success: function(res) {
						_this.list = res.result.rows
				        _this.total = Number(res.result.total)
				        _this.listLoading = false
					},
					error: function() {}
				}
				listApi.role_list(arg)
			},
			getSList(role_id){
				var _this = this;
				var request = _this.listQuery
				if(role_id){
					request.role_id = role_id
				}
				_this.listLoading = true;
				var arg = {
					data:_this.listQuery,
					success: function(res) {
						_this.list = res.result.rows
				        _this.total = Number(res.result.total)
				        _this.listLoading = false
					},
					error: function() {}
				}
				listApi.role_Slist(arg)
			},
			toTree(data,parent_id) {
			    var _this = this
		        var tree = [];
		        var temp;
		        for (var i = 0; i < data.length; i++) {

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
		    addData(){
		    	var _this = this;
				_this.dialogAddFormVisible = true
				var find_request = {'token':getAdminToken()}
				find_request.loginnames = JSON.stringify([_this.temp_add.loginnames])
				var find_arg = {
					data:find_request,
					success: function(res) {
						//console.log(JSON.stringify(res))
						if(res.error_no != 200 || res.result.rows.length == 0){
							_this.$notify({
								title: '错误',
								message: '未找到该用户！',
								type: 'error',
								duration: 2000
							})
						}else{
						 	var user_id = res.result.rows[0]['user_id'];
						 	var add_request = {
						 		token: getAdminToken(),
								user_id : user_id,
								role_ids : _this.temp_add.role_id
							}
							var add_arg = {
								data:add_request,
								success: function(res2) {
									console.log(JSON.stringify(res2))
									if(res2.error_no==200){
										_this.$notify({
											title: '成功',
											message: '添加用户成功',
											type: 'success',
											duration: 2000
										})
										_this.role_list_data()
										_this.getList(_this.temp_add.role_id)
									}else{
										_this.$notify({
											title: '失败',
											message: res2.error_msg,
											type: 'error',
											duration: 2000
										})
									}
								},
								error: function(err) {}
							}
							listApi.adduser_role(add_arg)
						}
					},
					error: function(err) {}
				}
				listApi.find_role(find_arg)
		    },
			handleAdd(){
				var _this = this;
				_this.dialogAddFormVisible = true

				/*var request = {
					'account' : _this.temp.account,
	                'name'    : _this.temp.name,
	                'province': _this.temp.province,
	                'city'    : _this.temp.city,
	                'town'    : _this.temp.town,
	                'area_add': _this.temp.area_add
				}
				var arg = {
					data:request,
					success: function(res) {
					console.log(JSON.stringify(res))
						_this.dialogFormVisible = false
						_this.$notify({
							title: '成功',
							message: '编辑成功',
							type: 'success',
							duration: 2000
						})
						_this.getList()
					},
					error: function(err) {}
				}
				listApi.roleA(arg)*/
			},
			get_city(id){
				var _this = this
				//alert(5)
				for(var i in _this.preData){
					if(_this.preData[i].text==_this.temp.province){
						_this.cityData = _this.preData[i]['children']
						_this.temp.city = _this.cityData[0].text
						//return _this.preData[i]['children']
						//this.cityData = this.preData[i].children
					}
				}
				_this.get_town()
			},
			get_town(id){
				var _this = this
				//alert(5)
				for(var i in _this.cityData){
					if(_this.cityData[i].text==_this.temp.city){
						_this.townData = _this.cityData[i]['children']
						_this.temp.town = _this.townData[0].text
					}
				}
			},
			handleFilter() {
				this.listQuery.page = 1
				this.getSList()
			},
			handleSizeChange(val) {
				this.listQuery.size = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.getList()
			},
			handleModifyStatus(row, status) {
				this.$message({
					message: '操作成功',
					type: 'success'
				})
				row.status = status
			},
			resetTemp() {
				this.temp = {
					id: undefined,
					importance: 1,
					remark: '',
					timestamp: new Date(),
					title: '',
					status: 'published',
					type: ''
				}
			},
			handleCreate() {
				this.resetTemp()
				this.dialogStatus = 'create'
				this.dialogFormVisible = true
				this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})
			},
			createData() {
				var _this = this;
				//_this.listLoading = true;
				var arg = {
					data:{},
					success: function(res) {
						/*_this.dialogFormVisible = false
						_this.$notify({
							title: '成功',
							message: '编辑成功',
							type: 'success',
							duration: 2000
						})
						_this.getList()*/
					},
					error: function() {}
				}
				listApi.getList(arg)
			},
			handleUpdate(row) {
				this.temp = Object.assign({}, row) // copy obj
				this.temp.timestamp = new Date(this.temp.timestamp)
				this.dialogStatus = 'update'
				this.temp.account = row.user.mobile
				this.temp.oldaccount=row.user.mobile
				this.temp.name = row.user.loginname
				this.dialogFormVisible = true
				this.temp.province = '330000'
				this.get_city()
				this.get_town()
				this.temp.city = '330100'
				this.temp.town = '330106'
				this.temp.area_add='乡间小道'
				//console.log(JSON.stringify(row.user.mobile))
				/*this.$nextTick(() => {
					this.$refs['dataForm'].clearValidate()
				})*/
			},
			updateData() {
				//alert(5)
				var _this = this;
				_this.temp.role = ''
				_this.temp.user=''
				var request = {
					'token':getAdminToken(),
					'account' : _this.temp.account,
	                'name'    : _this.temp.name,
	                'province': _this.temp.province,
	                'city'    : _this.temp.city,
	                'town'    : _this.temp.town,
	                'area_add': _this.temp.area_add,
	                'oldaccount':_this.temp.oldaccount
				}
				var arg = {
					data:request,
					success: function(res) {
						//console.log(res.error_no)
						//console.log(res)

						if(res.error_no==200){
							_this.dialogFormVisible = false
							_this.$notify({
								title: '成功',
								message: '编辑成功',
								type: 'success',
								duration: 2000
							})
							_this.getList()
							_this.getList()
						}else{
							//_this.dialogFormVisible = false
							_this.$notify({
								title: '错误',
								message: res.error_msg,
								type: 'error',
								duration: 2000
							})
						}

					},
					error: function(err) {}
				}
				listApi.edit_role(arg)

				/*this.$refs['dataForm'].validate((valid) => {
					if(valid) {
						const tempData = Object.assign({}, this.temp)
						tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
						updateArticle(tempData).then(() => {
							for(const v of this.list) {
								if(v.id === this.temp.id) {
									const index = this.list.indexOf(v)
									this.list.splice(index, 1, this.temp)
									break
								}
							}
							this.dialogFormVisible = false
							this.$notify({
								title: '成功',
								message: '更新成功',
								type: 'success',
								duration: 2000
							})
						})
					}
				})*/
			},
			open_xw(row) {
		        this.$confirm('是否删除这个用户？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.handleDelete(row)

		        }).catch(() => {
		        	this.$notify({
						title: '取消',
						message: '已取消删除',
						type: 'info',
						duration: 2000
					})
		        });
		    },
      open_setauth(row) {
        var authquery = {
          loginname: row.user.loginname,
          mobile: row.user.mobile,
          title: row.role.title,
          province: row.user.province,
          city: row.user.city,
          user_id: row.user.user_id,
          role_id: row.role.role_id
        }
        this.$router.push({name: 'edituserauth',query:authquery})
      },
			handleDelete(row) {
				var del_temp = Object.assign({}, row)
				//console.log(JSON.stringify(del_temp))
				var _this = this;
				//_this.temp.role = ''
				//_this.temp.user=''
				var request = {
					'token' : getAdminToken(),
          'role_id': del_temp.role.role_id,
          'user_id': del_temp.user.user_id
        }

				var arg = {
					data:request,
					success: function(res) {
						console.log(JSON.stringify(res))
						if(res.error_no==200){
							//_this.dialogFormVisible = false
							_this.$notify({
								title: '成功',
								message: '删除成功',
								type: 'success',
								duration: 2000
							})
							_this.getList()
							_this.role_list_data()
						}else{
							_this.$notify({
								title: '错误',
								message: res.error_msg,
								type: 'error',
								duration: 2000
							})
						}

					},
					error: function(err) {}
				}
				listApi.delete_role(arg)

			},
			handleFetchPv(pv) {
				fetchPv(pv).then(response => {
					this.pvData = response.data.pvData
					this.dialogPvVisible = true
				})
			},
			handleDownload() {
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require('@/vendor/Export2Excel')
					const tHeader = ['时间', '地区', '类型', '标题', '重要性']
					const filterVal = ['timestamp', 'province', 'type', 'title', 'importance']
					const data = this.formatJson(filterVal, this.list)
					export_json_to_excel(tHeader, data, 'table数据')
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
					if(j === 'timestamp') {
						return parseTime(v[j])
					} else {
						return v[j]
					}
				}))
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
	.tree-container2 .el-tree-node__content{
   		height: 40px!important;
   		border-top: 0px solid #F3F5F9!important;
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
 	.app-container{padding: 0px;background: #fff;}
</style>
