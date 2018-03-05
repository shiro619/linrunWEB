<template>
  <div class="app-container calendar-list-container" style="background-color: #f6f7fa;height: 100%">
    <div style="background-color: #ffffff;padding: 20px;padding-top: 0;height: 130px;">
      <div style="height: 45px"></div>
      <div class="filter-container">
        <el-col :span="24">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form>
                <el-form-item label-width="75px" label="账号:" class="postInfo-container-item" style="width: 100%;">
                  <el-input prefix-icon="el-icon-search" v-model="search_account" placeholder="账号">
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form>
                <el-form-item label-width="75px" label="时间范围:" class="postInfo-container-item" style="width: 100%;">
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
            <el-col :span="4">
              <el-button type="primary" @click="getList">查询</el-button>
            </el-col>
          </el-row>
        </el-col>

      </div>
    </div>
    <div style="background-color: #ffffff;padding: 20px;margin-top: 20px">
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" label="操作人">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作类型">
        <template slot-scope="scope">
          <span>登录</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户端IP">
        <template slot-scope="scope">
          <span>{{scope.row.login_ip}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作时间">
        <template slot-scope="scope">
          <span>{{scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="search_page"
        :page-sizes="[10,20,30, 50]" :page-size="search_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
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
      search_account: '',
      search_type: '1',
      search_page: 1,
      search_size: 10,
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
        keyword: this.search_account,
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
      listApi.getLoginlog(arg1)
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
