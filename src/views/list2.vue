<template>
  <div class="app-container calendar-list-container" style="background-color: #f6f7fa;height: 100%">
    <div :style="{backgroundColor: '#ffffff',padding: '20px',paddingTop: '0',height: searchTopHeight}">
      <template v-if="routerData.tab_num=='2'">
        <el-tabs v-model="search_type" @tab-click="handleClick" style="background-color: #ffffff;">
          <el-tab-pane label="待认领案件" name="1"></el-tab-pane>
          <el-tab-pane label="待处理案件" name="2"></el-tab-pane>
        </el-tabs>
      </template>
      <template v-else>
        <div style="height: 20px" v-if="routerData.pagetype=='2' && routerData.router_name!='beforedata'"></div>
        <div style="height: 45px" v-else></div>
      </template>
      <div class="filter-container">
        <el-col :span="24">
          <el-row :gutter="60">
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
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row :gutter="60">
            <template v-if="routerData.router_name=='taskquerymanager'">
              <el-col :span="6">
                <el-form>
                  <el-form-item label-width="75px" label="省份:" class="postInfo-container-item" style="width: 100%;">
                    <el-select v-model="search_province_name" placeholder="请选择">
                      <el-option
                        v-for="item in search_province"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-col>
            </template>
            <template v-if="(routerData.pagetype=='2' && routerData.router_name != 'beforedata')">
              <el-col :span="6">
                <el-form>
                  <el-form-item label-width="75px" label="市级:" class="postInfo-container-item" style="width: 100%;">
                    <el-input prefix-icon="el-icon-search" v-model="search_city" placeholder="市级">
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </template>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row :gutter="60">
            <template v-if="routerData.pagetype=='3'">
              <el-col :span="6">
                <el-form>
                  <el-form-item label-width="75px" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                    <el-input prefix-icon="el-icon-search" v-model="search_id" placeholder="身份证号">
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </template>
            <template v-else>
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
            </template>
            <template v-if="routerData.pagetype=='2' && routerData.router_name != 'beforedata'">
              <el-col :span="8">
                <el-form>
                  <el-form-item label-width="75px" label="当前流程:" class="postInfo-container-item" style="width: 100%;">
                    <el-select v-model="search_current" placeholder="请选择">
                      <el-option
                        v-for="item in search_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-col>
            </template>
            <el-col :span="4">
              <el-button type="primary" plain @click="getList" >查询</el-button>
            </el-col>
          </el-row>
        </el-col>

      </div>
    </div>
    <div style="background-color: #ffffff;padding: 20px;margin-top: 20px">

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" :border="false" fit highlight-current-row :stripe="true" :cell-style="{height: '50px',paddingTop: '10px',paddingBottom: '10px', fontSize: '13px'}"
      style="width: 100%">
      <el-table-column align="center" label="申请编号" min-width="140px">
        <template slot-scope="scope">
          <span>{{scope.row.request_no}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户姓名" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.customer_name}}</span><!--<span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>-->
        </template>
      </el-table-column>
      <template v-if="routerData.pagetype=='3'">
        <el-table-column align="center" label="身份证号" min-width="170px">
          <template slot-scope="scope">
            <span>{{scope.row.customer_certificate_number}}</span>
          </template>
        </el-table-column>
      </template>
      <template v-if="routerData.router_name!='finance' && routerData.router_name!='returnmoney'">
        <el-table-column align="center" label="手机号码" min-width="110px">
          <template slot-scope="scope">
            <span>{{scope.row.customer_telephone}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="车辆类型" min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.product_class_number | carType}}</span>
          </template>
        </el-table-column>
      </template>
      <template v-if="routerData.router_name=='finance' || routerData.router_name=='returnmoney'">
        <el-table-column align="center" label="所在省份" min-width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.credit_province}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column align="center" label="业务地区" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.credit_city}}</span>
        </template>
      </el-table-column>
      <template v-if="routerData.router_name=='finance' || routerData.router_name=='returnmoney'">
        <el-table-column align="center" label="车辆类型" min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.product_class_number | carType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="打款金额" min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.remittance_total_money}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="打款户名" min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.finance_name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="贷款金额" min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.loan_prize}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="贷款期限" min-width="80px">
          <template slot-scope="scope">
            <span>{{scope.row.loan_date}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="贷款银行" min-width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.loan_bank | bankName}}</span>
          </template>
        </el-table-column>
      </template>
      <template v-if="routerData.pagetype=='2' && routerData.router_name!='beforedata'">
        <el-table-column align="center" label="所在省份" min-width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.credit_province}}</span>
          </template>
        </el-table-column>
      </template>
      <template v-if="routerData.pagetype=='3'">
        <template v-if="routerData.router_name=='pushlist'">
          <el-table-column align="center" label="推送时间" min-width="160px">
            <template slot-scope="scope">
              <span>{{scope.row.car_no}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="推送状态" min-width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.huankuan}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="补录时间" min-width="160px">
            <template slot-scope="scope">
              <span>{{scope.row.yuqi_status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="补录状态" min-width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.yuqi_money}}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="routerData.router_name=='bankdataquery'">
          <el-table-column align="center" label="汽车专用卡号" min-width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.credit_city}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="分期付款授权累计" min-width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.credit_city}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="累计逾期次数" min-width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.credit_city}}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="routerData.router_name=='overduelist'">
          <el-table-column align="center" label="汽车专用卡号" min-width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.credit_city}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="本期最优还款额" min-width="140px">
            <template slot-scope="scope">
              <span>{{scope.row.huankuan}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="当前逾期期限段" min-width="140px">
            <template slot-scope="scope">
              <span>{{scope.row.yuqi_status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="逾期金额" min-width="80px">
            <template slot-scope="scope">
              <span>{{scope.row.yuqi_money}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="逾期天数" min-width="80px">
            <template slot-scope="scope">
              <span>{{scope.row.yuqi_days}}</span>
            </template>
          </el-table-column>
        </template>
      </template>
      <template v-else>
        <el-table-column align="center" label="进件时间" min-width="150px">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="当前流程" min-width="200px">
          <template slot-scope="scope">
            <span>{{scope.row.current_item_title}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column align="center" label="操作" :min-width="buttonMinWidth" class-name="small-padding">
        <template slot-scope="scope">
          <template v-if="routerData.pagetype=='1'">
            <template v-if="search_type == '1'">
              <template v-if="routerData.router_name=='applyremittance' || routerData.router_name=='moneyaudit'">
                <el-button type="primary" size="mini" @click="taskJump(scope.row.id, scope.row.item_instance_id)">处理</el-button>
              </template>
              <template v-else>
                <el-button type="primary" size="mini" @click="pickup(scope.row.id, scope.row.item_instance_id,scope.row)" :disabled="scope.row.disabled == 1">{{scope.row.disabled == 1 ? '已' : ''}}认领</el-button>
              </template>
            </template>
            <template v-else="search_type == '2'">
              <template v-if="routerData.has_return=='2'">
                <el-button type="warning" size="mini" @click="taskReturn(scope.row.id, scope.row.item_instance_id)">退件</el-button>
              </template>
              <template v-if="routerData.has_dialog=='2'">
                <el-button type="primary" size="mini" @click="openDialog(scope.row.id, scope.row.item_instance_id)">处理</el-button>
              </template>
              <template v-else>
                <el-button type="primary" size="mini" @click="taskJump(scope.row.id, scope.row.item_instance_id)">处理</el-button>
              </template>
            </template>
          </template>
          <template v-else-if="routerData.pagetype=='2'">
            <template v-if="routerData.router_name=='taskquerymanager'">
              <el-button type="primary" size="mini" @click="taskRewrite(scope.row.id, scope.row.item_instance_id)">修改</el-button>
              <el-button type="primary" size="mini" @click="taskDel(scope.row.id, scope.row.item_instance_id)">删除</el-button>
            </template>
            <template v-else-if="routerData.router_name=='taskquerypartition' || routerData.router_name=='taskqueryprovince'">
              <el-button type="primary" size="mini" @click="taskDel(scope.row.id, scope.row.item_instance_id)">删除</el-button>
            </template>
            <el-button type="primary" size="mini" @click="taskJump(scope.row.id, scope.row.item_instance_id)">查看</el-button>
          </template>
          <template v-else-if="routerData.pagetype=='3'">
            <el-button type="primary" size="mini" @click="taskJump(scope.row.id, scope.row.item_instance_id)">查看</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="search_page"
        :page-sizes="[10,20,30, 50]" :page-size="search_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--登记弹窗-->
    <template v-if="routerData.has_dialog=='2'">
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-row>
          <el-col :span="12">
            <el-form ref="dataForm1" :model="taskData" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
              <el-form-item label="客户姓名" prop="title">
                <span v-text="taskData.customer_name"></span>
              </el-form-item>
              <el-form-item label="身份证" prop="title">
                <span v-text="taskData.customer_certificate_number"></span>
              </el-form-item>
              <el-form-item label="手机号" prop="title">
                <span v-text="taskData.customer_telephone"></span>
              </el-form-item>
              <el-form-item label="申请编号" prop="title">
                <span v-text="taskData.request_no"></span>
              </el-form-item>
              <el-form-item label="合同编号" prop="title">
                <span v-text="taskData.constract_no"></span>
              </el-form-item>
              <template v-if="routerData.router_name=='mortgagetask'">
                <el-form-item label="抵押物" prop="title">
                  <span v-text="taskData.mortgage"></span>
                </el-form-item>
              </template>
            </el-form>
          </el-col>
          <template v-if="routerData.router_name=='sendtask'">
            <el-col :span="12">
              <el-form ref="dataForm" :model="taskSendData.sendtask" label-position="left" label-width="70px">
                <el-form-item label="寄件人" prop="title">
                  <el-input v-model="taskSendData.sendtask.courier_man" placeholder="请输入寄件人(选填)"></el-input>
                </el-form-item>
                <el-form-item label="快递商" prop="title">
                  <el-input v-model="taskSendData.sendtask.courier_business" placeholder="请输入快递商(选填)"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" prop="title">
                  <el-input v-model="taskSendData.sendtask.courier_number" placeholder="请输入快递单号(选填)"></el-input>
                </el-form-item>
                <el-form-item label="寄件时间">
                  <el-date-picker v-model="taskSendData.sendtask.courier_time" type="datetime" placeholder="选择日期时间" style="width: 100%">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input style="margin-top:8px;" v-model="taskSendData.sendtask.courier_description" placeholder="备注(选填)"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </template>
          <template v-else-if="routerData.router_name=='cargpstask'">
            <el-col :span="12">
              <el-form ref="dataForm" :model="taskSendData.cargpstask" label-position="left" label-width="23%">
                <el-form-item label="GPS编号1" prop="title">
                  <el-input v-model="taskSendData.cargpstask.gps_number" placeholder="请输入GPS编号1(选填)"></el-input>
                </el-form-item>
                <el-form-item label="GPS编号2" prop="title">
                  <el-input v-model="taskSendData.cargpstask.gps_number2" placeholder="请输入GPS编号2(选填)"></el-input>
                </el-form-item>
                <el-form-item label="安装位置" prop="title">
                  <el-input v-model="taskSendData.cargpstask.install_position" placeholder="请输入安装位置(必填)"></el-input>
                </el-form-item>
                <el-form-item label="安装日期">
                  <el-date-picker v-model="taskSendData.cargpstask.install_time" type="datetime" placeholder="选择日期时间" style="width: 100%">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input style="margin-top:8px;" v-model="taskSendData.cargpstask.gps_description" placeholder="备注(选填)"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </template>
          <template v-else-if="routerData.router_name=='mortgagetask'">
            <el-col :span="12">
              <el-form ref="dataForm" :model="taskSendData.mortgagetask" label-position="left" label-width="23%">
                <el-form-item label="抵押人员" prop="title">
                  <el-input v-model="taskSendData.mortgagetask.transactor" placeholder="抵押人员(必填)"></el-input>
                </el-form-item>

                <el-form-item label="抵押权证号" prop="title">
                  <el-input v-model="taskSendData.mortgagetask.mandate_number" placeholder="抵押权证号(必填)"></el-input>
                </el-form-item>
                <el-form-item label="抵押日期">
                  <el-date-picker v-model="taskSendData.mortgagetask.transact_time" type="datetime" placeholder="选择日期时间(必填)" style="width: 100%">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input style="margin-top:8px;" v-model="taskSendData.mortgagetask.mortgage_description" placeholder="备注(选填)"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </template>
          <template v-else-if="routerData.router_name=='copytask'">
            <el-col :span="12">
              <el-form ref="dataForm" :model="taskSendData.copytask" label-position="left" label-width="23%">
                <el-form-item label="抄单人" prop="title">
                  <el-input v-model="taskSendData.copytask.copytask_courier_man" placeholder="请输入抄单人(必填)"></el-input>
                </el-form-item>
                <el-form-item label="抄单时间">
                  <el-date-picker v-model="taskSendData.copytask.copytask_courier_time" type="datetime" placeholder="选择日期时间" style="width: 100%">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input style="margin-top:8px;" v-model="taskSendData.copytask.copytask_courier_description" placeholder="备注(选填)"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </template>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFun">确 定</el-button>
        </div>
      </el-dialog>
    </template>
    </div>
  </div>
</template>

<script>
import listApi from '@/api/listApi'
import detailApi from '@/api/detailApi'
import { carType, parseTime } from '@/common/filter' // filter函数
import { getAdminToken } from '@/utils/auth'

export default {
  name: 'complexTable',
  components: {},
  directives: {
  },
  data() {
    var searchtime = function(){
      var oStartDate = new Date()
	  	var oEndDate = new Date()
	  	oStartDate.setDate(oStartDate.getDate() - 7)
	  	return [oStartDate,oEndDate]
  	}
  	// 路由信息处理方法
    var getrouterData = function(thisRouter){
      switch (thisRouter){
        // 征信报告
        case 'inquire': return {
          router_name: 'inquire',// 路由名
          jumpPage: 'detailinquire',//处理按钮跳转页面
          role_id: '80',// 接口请求role_id
          tab_num: '2',// tab数量
          tab_default: '1',// 默认当前tab
          has_dialog: '1',// 是否有弹窗 1.无 2.有
          has_return: '2',// 是否有退件 1.无 2.有
          pagetype: '1',// 页面所属类别 1.工作台 2.申请件
          getFun: arg => listApi.getInquireList(arg),// 请求的接口
          setFun: null
        }
        // 申请录入
        case 'inputrequest': return {
          router_name: 'inputrequest',
          jumpPage: 'detailinputrequest',
          role_id: '88',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '1',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
        // 人工一审
        case 'artificial': return {
          router_name: 'artificial',
          jumpPage: 'detailartificialone',
          role_id: '82',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '1',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
        // 人工二审
        case 'artificialtwo': return {
          router_name: 'artificialtwo',
          jumpPage: 'detailartificialtwo',
          role_id: '83',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '1',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
        // 财务打款
        case 'finance': return {
          router_name: 'finance',
          jumpPage: 'detailfinance',
          role_id: '86',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '1',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
        // 申请打款
        case 'applyremittance': return {
          router_name: 'applyremittance',
          jumpPage: 'detailapplyremittance',
          role_id: '168',
          tab_num: '1',
          tab_default: '1',
          has_dialog: '1',
          has_return: '1',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
        // 打款审核
        case 'moneyaudit': return {
          router_name: 'moneyaudit',
          jumpPage: 'detailmoneyaudit',
          role_id: '174',
          tab_num: '1',
          tab_default: '1',
          has_dialog: '1',
          has_return: '1',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
        // 回款确认
        case 'returnmoney': return {
          router_name: 'returnmoney',
          jumpPage: 'detailreturnmoney',
          role_id: '87',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '1',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
        // 寄件登记
        case 'sendtask': return {
          router_name: 'sendtask',
          jumpPage: '',
          role_id: '92',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '2',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: arg => detailApi.courier(arg)
        }
        // 车辆gps登记
        case 'cargpstask': return {
          router_name: 'cargpstask',
          jumpPage: '',
          role_id: '94',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '2',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: arg => detailApi.gpstask(arg)
        }
        // 抄单登记
        case 'copytask': return {
          router_name: 'copytask',
          jumpPage: '',
          role_id: '93',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '2',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: arg => detailApi.copytask(arg)
        }
        // 抵押登记
        case 'mortgagetask': return {
          router_name: 'mortgagetask',
          jumpPage: '',
          role_id: '95',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '2',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: arg => detailApi.mortgagetask(arg)
        }
        // 申请件补件
        case 'salessupplement': return {
          router_name: 'salessupplement',
          jumpPage: 'detailsalessupplement',
          role_id: '155',
          tab_num: '1',
          tab_default: '2',
          has_dialog: '1',
          has_return: '1',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: arg => null
        }
        /* 申请件 */
        // 申请件查询
        case 'taskqueryself': return {
          router_name: 'taskqueryself',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '2',
          has_dialog: '1',
          has_return: '1',
          pagetype: '2',
          getFun: arg => listApi.getTaskquerySelf(arg),
          setFun: arg => null
        }
        // 申请件查询(管理员)
        case 'taskquerymanager': return {
          router_name: 'taskquerymanager',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '2',
          has_dialog: '1',
          has_return: '1',
          pagetype: '2',
          getFun: arg => listApi.getTaskqueryList(arg),
          setFun: arg => null
        }
        // 申请件查询(省级)
        case 'taskqueryprovince': return {
          router_name: 'taskqueryprovince',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '2',
          has_dialog: '1',
          has_return: '1',
          pagetype: '2',
          getFun: arg => listApi.getTaskqueryProvince(arg),
          setFun: arg => null
        }
        // 申请件查询(分区)
        case 'taskquerypartition': return {
          router_name: 'taskquerypartition',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '2',
          has_dialog: '1',
          has_return: '1',
          pagetype: '2',
          getFun: arg => listApi.getTaskqueryPartition(arg),
          setFun: arg => null
        }
        // 申请件查询(老数据)
        case 'beforedata': return {
          router_name: 'beforedata',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '2',
          has_dialog: '1',
          has_return: '1',
          pagetype: '2',
          getFun: arg => listApi.getBeforedata(arg),
          setFun: arg => null
        }
        /*贷后管理*/
        // 工行数据查询
        case 'bankdataquery': return {
          router_name: 'bankdataquery',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '1',
          has_dialog: '1',
          has_return: '1',
          pagetype: '3',
          getFun: arg => listApi.getBankdata(arg),
          setFun: arg => null
        }
        // 逾期列表
        case 'overduelist': return {
          router_name: 'overduelist',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '1',
          has_dialog: '1',
          has_return: '1',
          pagetype: '3',
          getFun: arg => listApi.overdue_list(arg),
          setFun: arg => null
        }
        // 推送列表
        case 'pushlist': return {
          router_name: 'pushlist',
          jumpPage: 'detailtask',
          role_id: '',
          tab_num: '1',
          tab_default: '1',
          has_dialog: '1',
          has_return: '1',
          pagetype: '3',
          getFun: arg => listApi.push_list(arg),
          setFun: arg => null
        }
        // default
        default: return {
          router_name: 'inquire',
          jumpPage: 'detailinquire',
          role_id: '80',
          tab_num: '2',
          tab_default: '1',
          has_dialog: '1',
          has_return: '2',
          pagetype: '1',
          getFun: arg => listApi.getInquireList(arg),
          setFun: null
        }
      }
    }
    var searchtimeReady
    if(this.$route.name == 'beforedata'){
      searchtimeReady = ['','']
    } else {
      searchtimeReady = searchtime()
    }
    return {
      // 判断路由
      thisRouter: this.$route.name,
      routerData: getrouterData(this.$route.name),
      // 登记页面的弹窗弹出
      dialogFormVisible: false,
      // 弹窗展示数据
      taskData: {
        id: '',
        item_instance_id: '',
        customer_name: '',
        customer_certificate_number: '',
        customer_telephone: '',
        request_no: '',
        constract_no: '',
        mortgage:'车辆登记证书'
      },
      // 弹窗提交数据
      taskSendData: {
        sendtask: {
          courier_time: searchtime()[1],
          courier_man: '',
          courier_description: '',
          courier_business:'',
          courier_number:''
        },
        cargpstask: {
          install_time: searchtime()[1],
          gps_description: '',
          gps_number:'',
          gps_number2:'',
          install_position:''
        },
        copytask: {
          copytask_courier_time: searchtime()[1],
          copytask_courier_man: '',
          copytask_courier_description: ''
        },
        mortgagetask: {
          transact_time: searchtime()[1],
          transactor: '',
          mandate_number: '',
          mortgage_description: ''
        }
      },
      // 申请件页面流程查询选项
      search_current: '',
      search_options: [
        {
          value: '',
          label: '全部'
        }, {
          value: '|-2|',
          label: '已完成'
        }, {
          value: '|-1|',
          label: '已拒件'
        }, {
          value: '|3|',
          label: '银行征信查询'
        }, {
          value: '|7|',
          label: '家访签约'
        }, {
          value: '|8|',
          label: '申请录入'
        }, {
          value: '|9|',
          label: '人工一审'
        }, {
          value: '|37|',
          label: '人工二审'
        }, {
          value: '|47|',
          label: '申请打款'
        }, {
          value: '|48|',
          label: '打款审核'
        }, {
          value: '|39|',
          label: '财务打款'
        }, {
          value: '|43|',
          label: 'GPS登记'
        }, {
          value: '|41|',
          label: '寄件登记'
        }, {
          value: '|42|',
          label: '抄单登记'
        }, {
          value: '|44|',
          label: '抵押登记'
        }, {
          value: '|40|',
          label: '回款确认'
        }, {
          value: '|45|',
          label: '申请件补件'
        }
      ],
      // 申请件页面省份查询选项
      search_province_name: '全部',
      search_province: [{"id":"","code":"","name":"全部"},{"id":"1","code":"110000","name":"\u5317\u4eac\u5e02"},{"id":"2","code":"120000","name":"\u5929\u6d25\u5e02"},{"id":"3","code":"130000","name":"\u6cb3\u5317\u7701"},{"id":"4","code":"140000","name":"\u5c71\u897f\u7701"},{"id":"5","code":"150000","name":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a"},{"id":"6","code":"210000","name":"\u8fbd\u5b81\u7701"},{"id":"7","code":"220000","name":"\u5409\u6797\u7701"},{"id":"8","code":"230000","name":"\u9ed1\u9f99\u6c5f\u7701"},{"id":"9","code":"310000","name":"\u4e0a\u6d77\u5e02"},{"id":"10","code":"320000","name":"\u6c5f\u82cf\u7701"},{"id":"11","code":"330000","name":"\u6d59\u6c5f\u7701"},{"id":"12","code":"340000","name":"\u5b89\u5fbd\u7701"},{"id":"13","code":"350000","name":"\u798f\u5efa\u7701"},{"id":"14","code":"360000","name":"\u6c5f\u897f\u7701"},{"id":"15","code":"370000","name":"\u5c71\u4e1c\u7701"},{"id":"16","code":"410000","name":"\u6cb3\u5357\u7701"},{"id":"17","code":"420000","name":"\u6e56\u5317\u7701"},{"id":"18","code":"430000","name":"\u6e56\u5357\u7701"},{"id":"19","code":"440000","name":"\u5e7f\u4e1c\u7701"},{"id":"20","code":"450000","name":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a"},{"id":"21","code":"460000","name":"\u6d77\u5357\u7701"},{"id":"22","code":"500000","name":"\u91cd\u5e86\u5e02"},{"id":"23","code":"510000","name":"\u56db\u5ddd\u7701"},{"id":"24","code":"520000","name":"\u8d35\u5dde\u7701"},{"id":"25","code":"530000","name":"\u4e91\u5357\u7701"},{"id":"26","code":"540000","name":"\u897f\u85cf\u81ea\u6cbb\u533a"},{"id":"27","code":"610000","name":"\u9655\u897f\u7701"},{"id":"28","code":"620000","name":"\u7518\u8083\u7701"},{"id":"29","code":"630000","name":"\u9752\u6d77\u7701"},{"id":"30","code":"640000","name":"\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a"},{"id":"31","code":"650000","name":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a"},{"id":"32","code":"710000","name":"\u53f0\u6e7e\u7701"},{"id":"33","code":"810000","name":"\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a"},{"id":"34","code":"820000","name":"\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a"}],
      search_city: '',
      // 贷后管理页面身份证
      search_id: '',
      // search参数
      search_request_no: '',
      search_type: getrouterData(this.$route.name).tab_default,
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
      searchtime: ['','']//searchtimeReady//searchtime()//
    }
  },
  filters: {
    // 车辆类型转换
    carType,
    // 时间格式转换
    parseTime,
    // 银行名字
    bankName(id){
      if(id == '01'){
        return '济南市中工行'
      } else if(id == '02'){
        return '济南乐源支行'
      } else if(id == '03'){
        return '临沂经开行'
      } else {
        return ''
      }
    }
  },
  computed: {
    // 搜索栏高度
    searchTopHeight(){
      if(this.routerData.router_name=='finance' || this.routerData.router_name=='returnmoney'){
        return '200px'
      } else {
        return '200px'
      }
    },
    // 按钮栏宽度(申请件查询管理员时加宽)
    buttonMinWidth(){
      if(this.routerData.router_name == 'taskquerymanager'){
        return '220px'
      } else {
        return '180px'
      }
    },
    // dialog标题
    dialogTitle(){
      if(this.routerData.router_name == 'sendtask'){
        return '寄件登记'
      } else if(this.routerData.router_name == 'cargpstask'){
        return '车辆GPS登记'
      } else if(this.routerData.router_name == 'copytask'){
        return '抄单登记'
      } else if(this.routerData.router_name == 'mortgagetask'){
        return '抵押登记'
      } else {
        return ''
      }
    },
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
      var sData = {
        page: this.search_page,
        size: this.search_size,
        request_no: this.search_request_no,
        customer_name: this.search_customer_name,
        product_name: this.search_product_name,
        token: this.token
      }
      if(this.routerData.pagetype=='3'){
        sData.id_card = this.search_id
      } else {
        sData.start_time = this.search_time[0]
        sData.end_time = this.search_time[1]
//        if(this.routerData.router_name=='finance' || this.routerData.router_name=='returnmoney'){
//          sData.city_name = this.search_city // 财务打款和回款确认页面 添加市级
//          sData.province_name = this.search_province_name=='全部' ? '' : this.search_province_name // 财务打款和回款确认页面 添加省份
//        }
        if(this.routerData.pagetype=='2' && this.routerData.router_name != 'beforedata'){
          sData.current_item_id = this.search_current // 申请件页面 添加流程(老数据除外)
          sData.city_name = this.search_city // 申请件页面 添加市级
          if(this.routerData.router_name == 'taskquerymanager'){
            sData.province_name = this.search_province_name=='全部' ? '' : this.search_province_name // 申请件页面 管理员 添加省份
          }
        } else if(this.routerData.pagetype=='1'){
          sData.type = this.search_type // 工作台页面 添加type
          sData.role_id = this.routerData.role_id // 工作台页面 添加role_id
        }
      }
  		return sData
  	},
    // 弹窗提交传入参数
    taskSendDataForm(){
      var _this = this
      // 深度克隆，避免时间不能修改的问题
      const deepClone=(obj)=>{
        var proto=Object.getPrototypeOf(obj);
        return Object.assign({},Object.create(proto),obj);
      }
      var sendForm = deepClone(_this.taskSendData[_this.thisRouter])
      sendForm.token = getAdminToken()
      sendForm.work_id = _this.taskData.id
      sendForm.item_instance_id = _this.taskData.item_instance_id
      // 时间对象转时间戳
      if(_this.thisRouter == 'sendtask'){
        sendForm.courier_time = Date.parse(sendForm.courier_time) / 1000
      } else if(_this.thisRouter == 'cargpstask'){
        sendForm.install_time = Date.parse(sendForm.install_time) / 1000
      } else if(_this.thisRouter == 'copytask'){
        sendForm.copytask_courier_time = Date.parse(sendForm.copytask_courier_time) / 1000
      } else if(_this.thisRouter == 'mortgagetask'){
        sendForm.transact_time = Date.parse(sendForm.transact_time) / 1000
      }
      return sendForm
    }
  },
  created() {
    if(this.$route.query.searchtype == 2){
      this.search_type = '2'
    }
    this.getList()
  },
  methods: {
    // 获取列表
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
            if(_this.routerData.has_dialog == '2'){

            }
          } else {
            _this.$alert(res.error_msg, '获取列表失败', {
              confirmButtonText: '确定'
            })
            _this.listLoading = false
          }
      	},
      	error: function(err){
      		console.log(err)
          _this.listLoading = false
      	}
      }
      _this.routerData.getFun(arg1)
    },
    // 认领
    pickup(id ,item_instance_id,row){
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
	        	_this.$message('认领成功')
            row.disabled = 1 // 改变认领按钮状态
      		} else {
            _this.$alert(res.error_msg, '认领失败', {
              confirmButtonText: '确定'
            })
          }
      	},
      	error: function(err){
          _this.$alert('网络错误', '认领失败', {
            confirmButtonText: '确定'
          })
      	}
      }
      listApi.pickupInquire(arg1)
    },
    // 处理或查看
    taskJump(id ,item_instance_id){
    	var _this = this
    	this.$router.push({name: _this.routerData.jumpPage,query:{id:id,item_instance_id:item_instance_id}})
    },
    // 申请件删除
    taskDel(id ,item_instance_id){
      var _this = this
      var senddata = {
        token: _this.token,
        work_id: id,
        item_instance_id: item_instance_id
      }
      var arg = {
        data: senddata,
        success: function(res){
          if(res.error_no == '200'){
            _this.$message('删除成功')
            _this.getList()
          } else {
            _this.$alert(res.error_msg, '删除失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: function(err){
          _this.$alert(err, '删除失败', {
            confirmButtonText: '确定'
          })
        }
      }
      this.$confirm('确定删除此件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        listApi.delTaskquery(arg)
      }).catch(() => {
      })
    },
    // 申请件修改跳转方法
    taskRewrite(id ,item_instance_id){
      var _this = this
      this.$router.push({name:'changetask',query:{id:id,item_instance_id:item_instance_id}})
    },
    // 打开弹窗
    openDialog(id ,item_instance_id){
      var _this = this
      this.taskData.id = id
      this.taskData.item_instance_id = item_instance_id
      this.dialogFormVisible = true
      for(var i in _this.list){
        if(_this.list[i].id == id){
          _this.taskData.customer_name = _this.list[i].customer_name
          _this.taskData.customer_certificate_number = _this.list[i].customer_certificate_number
          _this.taskData.customer_telephone = _this.list[i].customer_telephone
          _this.taskData.request_no = _this.list[i].request_no
          _this.taskData.constract_no = _this.list[i].constract_no
          break;
        }
      }
    },
    // 登记方法
    submitFun(){
      var _this = this
      var arg = {
        data: _this.taskSendDataForm,
        success: function (res) {
          if(res.error_no == 200){
            _this.$message('登记成功')
            _this.dialogFormVisible = false
            _this.getList()
          } else{
            _this.dialogFormVisible = false
            _this.$alert(res.error_msg, '登记失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: function (err) {
          _this.dialogFormVisible = false
          _this.$alert(err, '登记失败', {
            confirmButtonText: '确定'
          })
        }
      }
      if(_this.thisRouter == 'sendtask'){
        if(arg.data.courier_man == '' && arg.data.courier_business == '' && arg.data.courier_number == '' && arg.data.courier_time == '' && arg.data.courier_description == ''){
          _this.$alert('请填写至少一项', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
      } else if(_this.thisRouter == 'cargpstask'){
        if(arg.data.gps_number == '' && arg.data.gps_number2 == ''){
          _this.$alert('请填写至少一个gps编号', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
        if(arg.data.install_position == ''){
          _this.$alert('请填写安装位置', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
        if(arg.data.install_time == ''){
          _this.$alert('请填写安装日期', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
      } else if(_this.thisRouter == 'copytask'){
        if(arg.data.copytask_courier_time == '' && arg.data.copytask_courier_man == '' && arg.data.copytask_courier_description == ''){
          _this.$alert('请填写至少一项', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
      } else if(_this.thisRouter == 'mortgagetask'){
        if(arg.data.transactor == ''){
          _this.$alert('请填写抵押人员', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
        if(arg.data.mandate_number == ''){
          _this.$alert('请填写抵押权证号', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
        if(arg.data.transact_time == ''){
          _this.$alert('请填写抵押日期', '请填写完整', {
            confirmButtonText: '确定'
          })
          return
        }
      }
      _this.routerData.setFun(arg)
    },
    // 退件方法
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
          _this.$alert('网络错误', '退件失败', {
            confirmButtonText: '确定'
          })
        }
      }
      this.$confirm('确定退回此件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        detailApi.giveup(arg1)
      }).catch(() => {
      })
    },
    // 列表相关
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
