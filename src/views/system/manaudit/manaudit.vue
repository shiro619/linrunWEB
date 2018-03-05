<template>
  <div class="app-container calendar-list-container">
  	<el-tabs v-model="search_type" style="background-color: #ffffff;padding-left: 50px;">
	    <el-tab-pane label="申请件查询" name="1"></el-tab-pane>
	  </el-tabs>
    <div class="filter-container">
    	<el-col :span="24">
    		<el-row :gutter="10">
	    		<el-col :span="6">
		      	<el-form>
			        <el-form-item label-width="75px" label="申请编号:" class="postInfo-container-item" style="width: 100%;">
			          <el-input prefix-icon="el-icon-search" v-model="search_request_no" placeholder="申请编号">
			          </el-input>
			        </el-form-item>
		      	</el-form>
		      </el-col>
		      <el-col :span="6">
		      	<el-form>
			        <el-form-item label-width="75px" label="客户姓名:" class="postInfo-container-item" style="width: 100%;">
			          <el-input prefix-icon="el-icon-search" v-model="search_customer_name" placeholder="客户姓名">
			          </el-input>
			        </el-form-item>
		      	</el-form>
		      </el-col>
		      <el-col :span="8">
		      	<el-form>
			        <el-form-item label-width="75px" label="车辆类型:" class="postInfo-container-item" style="width: 100%;">
			          <el-radio v-model="search_product_name" label="">全部</el-radio>
								<el-radio v-model="search_product_name" label="1">新车</el-radio>
								<el-radio v-model="search_product_name" label="2">二手车</el-radio>
			        </el-form-item>
		      	</el-form>
		      </el-col>
		      <el-col :span="4">
			      <el-button type="primary" @click="getList">查询</el-button>
		      </el-col>
	    	</el-row>
      </el-col>
    	<el-col :span="24">
    		<el-row :gutter="10">
	    		<el-col :span="12">
		      	<el-form>
			        <el-form-item label-width="75px" label="进件时间:" class="postInfo-container-item" style="width: 100%;">
			          <div class="block">
							    <el-date-picker
							    	style="width: 100%;"
							      v-model="searchtime"
							      type="daterange"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期"
							      :default-value="searchtime1">
							    </el-date-picker>
							  </div>
			        </el-form-item>
		      	</el-form>
		    	</el-col>
	    	</el-row>
      </el-col>

    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="申请编号" min-width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.request_no}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="客户姓名">
        <template slot-scope="scope">
          <span>{{scope.row.customer_name}}</span><!--<span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>-->
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.customer_certificate_number}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{scope.row.customer_telephone}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="车辆类型">
        <template slot-scope="scope">
          <span>{{scope.row.product_class_number | carType}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="业务地区">
        <template slot-scope="scope">
          <span>{{scope.row.credit_city}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="进件时间" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="到件时间" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.receive_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="当前流程" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.current_item_title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220" class-name="small-padding">
        <template slot-scope="scope">
          	<el-button type="primary" size="mini" @click="taskJump(scope.row.id, scope.row.item_instance_id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="search_page"
        :page-sizes="[10,20,30, 50]" :page-size="search_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import listApi from '@/api/listApi'
import waves from '@/directive/waves' // 水波纹指令
import { carType, parseTime } from '@/common/filter' // filter函数
import { getAdminToken } from '@/utils/auth'

export default {
  name: 'complexTable',
  components: {},
  directives: {
    waves
  },
  data() {
    var searchtime = function(){
      var oStartDate = new Date()
	  	var oEndDate = new Date()
	  	oStartDate.setDate(oStartDate.getDate() - 7)
	  	return [oStartDate,oEndDate]
  	}
    return {
      search_request_no: '',
      search_type: '1',
      search_page: 1,
      search_size: 10,
      search_customer_name: '',
      search_product_name: '',
      token: getAdminToken(),
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      searchtime1: searchtime(),
      searchtime: ['','']//searchtime()//
    }
  },
  filters: {
    // 车辆类型转换
    carType,
    // 时间格式转换
    parseTime
  },
  computed: {
    // 时间转换
  	search_time(){
  		var _this = this
      if(_this.searchtime == '' || _this.searchtime == null){ // timepicker清空后默认返回null，单独处理
        return ['','']
      }
  		var stime1 = Date.parse(_this.searchtime[0]) / 1000
  		var stime2 = Date.parse(_this.searchtime[1]) / 1000
      if(_this.searchtime[0] == '' || _this.searchtime[1] == ''){
        return ['','']
      } else {
        return [stime1,stime2]
      }
  	},
    // 接口传入参数
  	searchdata(){
  		return {
  			page: this.search_page,
      	size: this.search_size,
      	request_no: this.search_request_no,
    		customer_name: this.search_customer_name,
    		product_name: this.search_product_name,
    		start_time: this.search_time[0],
    		end_time: this.search_time[1],
      	token: this.token
  		}
  	}
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
			var _this = this
      var arg1 = {
      	data: this.searchdata,
      	success: function(res){
          if(res.error_no == 200){
            for(var i in res.result.rows){
              res.result.rows[i].disabled = 0 // 添加认领按钮的状态
            }
            _this.list = res.result.rows
            _this.total = Number(res.result.total)
            _this.listLoading = false
          } else {
            _this.$alert(res.error_msg, '获取列表失败', {
              confirmButtonText: '确定'
            })
            _this.listLoading = false
          }
      	},
      	error: function(err){
          _this.listLoading = false
      	}
      }
      listApi.getBeforedata(arg1)
    },
    taskJump(id ,item_instance_id){
    	var _this = this
//    	this.$router.push({name:'detailinquire',query:{id:id,item_instance_id:item_instance_id}})
    },
    taskReturn(id ,item_instance_id){
      var _this = this
      var senddata = {
        token: _this.token,
        work_id: id,
        item_instance_id: item_instance_id
      }
      var arg1 = {
        data: senddata,
        success: function(res){
          if(res.error_no == '200'){
            _this.$message('退件成功')
            _this.getList()
          } else {
            _this.$alert(res.error_msg, '退件失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: function(err){
          _this.$alert(err, '退件失败', {
            confirmButtonText: '确定'
          })
        }
      }
      this.$confirm('确定退回此件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        listApi.returnInquire(arg1)
      }).catch(() => {
      })



    },
    handleClick(tab, event) {
	    this.getList()
	  },
    handleSizeChange(val) {
      this.search_size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.search_page = val
      this.getList()
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-tabs__nav-wrap::after{
		top: 1px;
		display: none;
	}
</style>
