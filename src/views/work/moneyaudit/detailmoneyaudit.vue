<template>
  <div class="createPost-container createPost-container-one">
  	<el-tabs v-model="search_type" style="background-color: #ffffff;padding-left: 50px;">
	    <el-tab-pane label="打款审核" name="1"></el-tab-pane>
	    <el-tab-pane label="客户详情" name="2"></el-tab-pane>
	  </el-tabs>
    <el-form class="form-container" :model="customerData" :rules="rules" ref="customerData" v-if="search_type == '1'">
      <div class="createPost-main-container">
      <el-row :gutter="divgutter">
      	<el-col :span="24" style="background:#fff; padding: 10px 30px;" >
      		<!--<div class="postInfo-container postInfo-container-one">
			      	<el-row :gutter="divgutter">-->


	                <el-form-item :label-width="labelwidth" label="业务团队:" class="postInfo-container-item" style="width: 100%; margin-bottom: 0px;margin-left: 25px;">
	                  <span v-text="customerData.credit_city">
	                  </span>
	                </el-form-item>

			      	<!--</el-row>
				  </div>-->
      	</el-col>
      </el-row>
      <el-row :gutter="divgutter" style="background:#fff; padding: 20px 40px 20px 338px; margin-top: 10px;">
      		  <el-col :span="10" >
				      <div class="postInfo-container postInfo-container-one">
				      	<el-row :gutter="divgutter">
						     		 <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="客户姓名" class="postInfo-container-item" style="width: 90%;">
			                  <span v-text="customerData.customer_name">
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="车辆型号" class="postInfo-container-item" style="width: 100%;">
			                  <span v-text="customerData.car_type">
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="车辆类型" class="postInfo-container-item" style="width: 100%;">
			                  <span>
			                  	{{customerData.product_class_number|carType}}
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="车辆价格" class="postInfo-container-item" style="width: 100%;">
			                  <span>
			                  	{{ customerData.car_price}}元
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="贷款额" class="postInfo-container-item" style="width: 100%;">
			                  <span>
			                  	{{ customerData.loan_prize}}元
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="贷款银行" class="postInfo-container-item" style="width: 100%;">
			                  <span>
			                  	{{customerData.loan_bank|bankType}}
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="贷款期数" class="postInfo-container-item" style="width: 100%;">
			                  <span v-text="customerData.loan_date">
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="利率" class="postInfo-container-item" style="width: 100%;">
			                  <span v-text="">
			                  	{{customerData.loan_rate}}%
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="首付款" class="postInfo-container-item" style="width: 100%;">
			                  <span v-text="">
			                  	{{customerData.first_pay }}元
             					</span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="首付比例" class="postInfo-container-item" style="width: 100%;">
			                  <span>
			                  	{{customerData.first_pay_ratio}}%
             					</span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="融入本金" class="postInfo-container-item" style="width: 100%;" prop='loan_principal'>
				                  <span>{{customerData.integration_principal}}元</span>
				                </el-form-item>
			              </el-col>

		                 <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="银行放款额" class="postInfo-container-item" style="width: 100%;">
				                <span >{{customerData.bank_lending}}元</span>
				                </el-form-item>
			               </el-col>

		                 <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="打给车行" class="postInfo-container-item" style="width: 100%;">
				                <span>{{customerData.finance_driving}}元</span>
				                </el-form-item>
			                </el-col>


								</el-row>
				      </div>
					  </el-col>
					  <el-col :span="10">
		          	<div class="postInfo-container">
					      	<el-row :gutter="divgutter">

											<el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="毛利率" class="postInfo-container-item" style="width: 100%;">
				                	 <span>
				                	 	{{customerData.gross_profit_rate}}%
             							</span>
				                </el-form-item>
			                </el-col>

											<el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="返车行" class="postInfo-container-item" style="width: 100%;">
					                <span>{{customerData.return_car_principal}}元</span>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="返车行利率" class="postInfo-container-item" style="width: 100%;" prop="return_car_rate">
				                 <span>{{customerData.return_car_rate}}%</span>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="车商尾款" class="postInfo-container-item" style="width: 100%;" prop="car_final_pay">
				                 <span>{{customerData.car_final_pay}}元</span>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="账号" class="postInfo-container-item" style="width: 100%;" prop="finance_account">
				                 <span v-text="customerData.finance_account"></span>
				                </el-form-item>
			                </el-col>



			                 <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="开户行" class="postInfo-container-item" style="width: 100%;" prop="finance_deposit_bank">
				                <span v-text="customerData.finance_deposit_bank"></span>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="打款户名" class="postInfo-container-item" style="width: 100%;" prop="finance_name">
				                 <span v-text="customerData.finance_name"></span>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="合计打款" class="postInfo-container-item" style="width: 100%;">
				                 <span>{{customerData.remittance_total_money}}元</span>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="车行全称" class="postInfo-container-item" style="width: 100%;" prop="car_name">
				                  <span v-text="customerData.car_name"></span>
				                </el-form-item>
			                </el-col>


			                 <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="业务发生地" class="postInfo-container-item" style="width: 100%;" prop="business_place">
				                	<span v-text="customerData.business_place"></span>
				                </el-form-item>
			                </el-col>


			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="打款日期" class="postInfo-container-item" style="width: 100%;" prop="finance_date">
				                	<span v-text="customerData.finance_date"></span>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;">
				                 <span v-text="customerData.finance_apply_description"></span>
				                </el-form-item>
			                </el-col>



					      	</el-row>
				      	</div>
					  </el-col>
      	</el-row>
				<el-row :gutter="divgutter" style="background:#fff; padding: 20px 40px 20px 338px;">
						<el-col :span="10">
                  <el-form-item :label-width="labelwidth" label="审核结果" class="postInfo-container-item" style="width: 100%;">
                    <el-select class="filter-item" placeholder="" style="width: 100%;" v-model="customerData.moneyaudit_status">
        							<el-option label="通过" value="1">
        							</el-option>
        							<el-option label="拒绝" value="2">
        							</el-option>
      							</el-select>
                  </el-form-item>
            </el-col>
            <el-col :span="6">
            	<el-button type="primary" style=" width: 120px; height: 40px;" @click="submitData">提交申请</el-button>
            </el-col>

				</el-row>
      </div>
    </el-form>


  <BasicInfo :ifResult="ifResult"  :maskResult="maskResult" v-else></BasicInfo>
  <!--客户详情-->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { userSearch } from '@/api/remoteSearch'
import detailApi from '@/api/detailApi'//列表得请求接口
import { getAdminToken } from '@/utils/auth'
import BasicInfo from '@/views/work/artificialone/detailartificialone'
import Viewer from 'v-viewer'
import Vue from 'vue'
//Vue.use(Viewer)

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  source_name: '', // 文章外部作者
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false
}

const FloatFun = {
			/**
			* 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
			*
			* @param num1加数1 | num2加数2
			*/
			'add': function(num1, num2) {
			    var baseNum, baseNum1, baseNum2;
			    try {
			        baseNum1 = num1.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum1 = 0;
			    }
		 	    try {
			        baseNum2 = num2.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum2 = 0;
			    }
			    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
			    return parseInt((num1 * baseNum + num2 * baseNum) / baseNum * 10000) / 10000;
			},
			/**
			* 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
			*
			* @param num1被减数  |  num2减数
			*/
			'sub': function(num1, num2) {
		    	var baseNum, baseNum1, baseNum2;
		    	var precision;// 精度
		    	try {
		    	    baseNum1 = num1.toString().split(".")[1].length;
		    	} catch (e) {
		     	    baseNum1 = 0;
		    	}
		    	try {
		        	baseNum2 = num2.toString().split(".")[1].length;
		    	} catch (e) {
		        	baseNum2 = 0;
		    	}
		    	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
		    	precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
		    	return parseInt(((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision) * 10000) / 10000;
			},
			/**
			* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
			*
			* @param num1被乘数 | num2乘数
			*/
			'multi': function(num1, num2) {
		    	var baseNum = 0;
		    	try {
		        	baseNum += num1.toString().split(".")[1].length;
		    	} catch (e) {
		    	}
		    	try {
		        	baseNum += num2.toString().split(".")[1].length;
		    	} catch (e) {
		    	}
		    	return parseInt(Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum) * 10000) / 10000;
			}
			/**
			* 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
			*
			* @param num1被除数 | num2除数
			*/
//			'div': function(num1, num2) {
//		    	var baseNum1 = 0, baseNum2 = 0;
//		    	var baseNum3, baseNum4;
//		    	try {
//		        	baseNum1 = num1.toString().split(".")[1].length;
//		    	} catch (e) {
//		        	baseNum1 = 0;
//		    	}
//		    	try {
//		        	baseNum2 = num2.toString().split(".")[1].length;
//		    	} catch (e) {
//		        	baseNum2 = 0;
//		    	}
//		    	with (Math) {
//		        	baseNum3 = Number(num1.toString().replace(".", ""));
//		        	baseNum4 = Number(num2.toString().replace(".", ""));
//		        	return parseInt((baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1) * 10000) / 10000;
//		    	}
//			}
}

export default {
  name: 'articleDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky , Viewer, BasicInfo},
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(null)
        }
      } else {
        callback()
      }
    }

    const checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(value.toString().replace(/^\d+(\.)?(\d)*$/g, '')){
      	// /[^\d|.]/
      	///^\d+(\.\d+)?$/
      	return callback(new Error('此项为数字和小数点'));
      }
    }

    const checkEmpty = (rule, value, callback) => {
    	if (!value) {
        	return callback(new Error('此项不能为空'));
      	}
    }

   const checkDate = (rule, value, callback) => {
    	if (!value) {
        	return callback(new Error('此项不能为空'));
      	}
   }
    return {
    	// 表单数据
    	customerData:{
    		customer_name: '',
    		car_type: '',
    		product_class_number: '',
    		car_price: '',
    		loan_prize: '',
    		loan_rate:'',
    		loan_date:'',
    		loan_bank:'',
    		first_pay: '',
    		first_pay_ratio: '',
    		integration_principal: '',//融入本金
    		bank_lending: '',//银行放款额
    		finance_driving: '',//打给车行
    		gross_profit_rate: '',//毛利率
    		return_car_principal: '',//返车行本金
    		return_car_rate: '',//返车行利率
    		car_final_pay: '',//车商尾款
    		finance_account: '',//账户
    		finance_deposit_bank: '',//开户行
    		finance_name: '',//打款户名
    		remittance_total_money: '',// 合计打款
    		car_name: '',//车行全称
    		business_place: '',//业务发生地
    		finance_date: '',//打款日期
    		finance_apply_description: '',//备注,
    		moneyaudit_status:'1',//审核结果
    		credit_city: '',////业务团队
    	},
    	//请求数据
    	requestData:{
				token:getAdminToken(),
				work_id: this.$route.query.id,
				item_instance_id: this.$route.query.item_instance_id
			},
			ifResult:{},//传递详情页得数据
			maskResult:{},//右侧审核历程数据
    	search_type:'1',
    	labelwidth: '95px',
    	space:'200px',
    	images: [{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"},{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/045b6526879073d440c470d1e78969fa.JPG"},{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/043147fb1aa26f82167a73b535ea4686.JPG"}],
			divgutter: 20,
			cartype: '1',
			imgs1: [],
			imgs2: [],
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      userLIstOptions: [],
      isEdit: false,
      platformsOptions: [
        { key: 'a-platform', name: 'a-platform' },
        { key: 'b-platform', name: 'b-platform' },
        { key: 'c-platform', name: 'c-platform' }
      ],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }],
        return_car_rate: [{validator: checkNumber, trigger:'blur' }],
        loan_principal: [{validator: checkNumber, trigger:'blur' }],
        car_final_pay: [{validator: checkNumber, trigger:'blur' }],
        car_name: [{validator: checkEmpty, trigger:'blur' }],
        finance_account: [{validator: checkEmpty, trigger:'blur' }],
        finance_name: [{validator: checkEmpty, trigger:'blur' }],
        business_place: [{validator: checkEmpty, trigger:'blur' }],
        finance_date: [{type: 'date',message: '请选择日期', trigger: 'change'}],
        finance_deposit_bank: [{validator: checkEmpty, trigger:'blur' }]
      }
    }
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
    },
    hasBondsman(value){

    		if(value == '1'){
	    		return '有担保人'

	    	}else{
	    		return '无担保人'
	    	}

    },
    maritalStatus(status){
    	if(status == '1'){
    		return '已婚'
    	}else if(status == '2'){
    		return '未婚'
    	}else if(status == '3'){
    		return '离婚'
    	}else if(status == '4'){
    		return '丧偶'
    	}
    },
    hasInsurance(value){
    	if(value == '1'){
	    		return '有保险'
    	}else{
    		return '无保险'
    	}
    },
    carType(type){
    	if(type == 'XC'){
	    		return '新车'
    	}else{
    		return '二手车'
    	}
    },
    bankType(value){
    	if(value == '01'){
    		return '济南市中工行'
    	}else if(value == '02'){
    		return '济南乐源支行'
    	}else{
    		return '临沂经开行'
    	}
    }

  },
  computed: {
  	pagedata(){//提交事件所传得信息
  		return {
  			token:getAdminToken(),
  			work_id: this.$route.query.id,
  			item_instance_id: this.$route.query.item_instance_id,
  			moneyaudit_status: this.customerData.moneyaudit_status
  		}
  	},

    contentShortLength() {
      return this.postForm.content_short.length
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
		this.getDetailInfo();
		this.getAuditProcess();
  },
  methods: {

  	//获取基本信息
  	getDetailInfo(){
  		var arg = {
  			data: this.requestData,
  			success: res =>{
  				this.ifResult = res;//父组件传值给子组件
  				if(res.error_no == 200){
  					var attrArr = ['customer_name','car_type','car_price','loan_prize','loan_rate','first_pay','first_pay_ratio','credit_city',
  												 'integration_principal','bank_lending','finance_driving','return_car_principal','gross_profit_rate',
  												 'return_car_rate','car_final_pay','finance_account','finance_name','finance_deposit_bank','remittance_total_money',
  												 'car_name','business_place','finance_apply_description',
  												]
  					for( var i in attrArr){
	  					if( res.result[attrArr[i]] == '' || res.result[attrArr[i]] ==null){
	  						this.customerData[attrArr[i]] = '---';//姓名
	  					}else{
	  						this.customerData[attrArr[i]] = res.result[attrArr[i]];
	  					}
	  				}
  					if(res.result.product_class_number == '' || res.result.product_class_number==null){
  						this.customerData.product_class_number = 'XC';
  					}else{
  						this.customerData.product_class_number = res.result.product_class_number;//车辆类型
  					}
  					if(res.result.loan_bank == '' || res.result.loan_bank==null){
  						this.customerData.loan_bank = '01';
  					}else{
  						this.customerData.loan_bank = res.result.loan_bank;//车辆类型
  					}
  					if(res.result.loan_date == '' || res.result.loan_date==null){
  						this.customerData.loan_date = '12个月';
  					}else{
  						this.customerData.loan_date = res.result.loan_date;//贷款期数
  					}
  					this.customerData.finance_date = this.nowDay(res.result.finance_date);//打款日期
//					this.customerData.finance_date = this.nowDay(res.result.finance_date);//打款日期
//					this.customerData.customer_name = res.result.customer_name;//姓名
//					this.customerData.car_type = res.result.car_type;//车辆型号
//					this.customerData.product_class_number = res.result.product_class_number;//车辆类型
//					this.customerData.car_price = res.result.car_price;//车辆价格
//					this.customerData.loan_prize = res.result.loan_prize;//贷款金额
//					this.customerData.loan_bank = res.result.loan_bank;//贷款银行
//					this.customerData.loan_date = res.result.loan_date;//贷款期数
//					this.customerData.loan_rate = res.result.loan_rate;//利率
//					this.customerData.first_pay = res.result.first_pay;//首付款
//					this.customerData.first_pay_ratio = res.result.first_pay_ratio;//首付比例
//					this.customerData.integration_principal = res.result.integration_principal;//融入本金
//					this.customerData.bank_lending = res.result.bank_lending;//银行放款额
//					this.customerData.finance_driving = res.result.finance_driving;//打给车行
//					this.customerData.gross_profit_rate = res.result.gross_profit_rate;//毛利率
//					this.customerData.return_car_principal = res.result.return_car_principal;//返车行
//					this.customerData.return_car_rate = res.result.return_car_rate;//返车行利率
//					this.customerData.car_final_pay = res.result.car_final_pay;//车商尾款
//					this.customerData.finance_account = res.result.finance_account;//帐号
//					this.customerData.finance_deposit_bank = res.result.finance_deposit_bank;//开户行
//					this.customerData.finance_name = res.result.finance_name;//打款户名
//					this.customerData.remittance_total_money = res.result.remittance_total_money;//合计打款
//					this.customerData.car_name = res.result.car_name;//车行全称
//					this.customerData.business_place = res.result.business_place;//业务发生地
//					this.customerData.finance_date = res.result.finance_date;//打款日期
//					this.customerData.finance_apply_description = res.result.finance_apply_description;//打款日期
//					this.customerData.credit_city = res.result.credit_city;//业务团队
  				}else{
  					this.$alert(res.error_msg, '申请打款', {
			          confirmButtonText: '确定',
			          beforeClose: (action,instance, done)=> {
			            done();
		          	}
		        });
  				}
  			},
  			error: function(error){
  			}
  		}
  		detailApi.getArtificalOneDetail(arg);
  	},
  	nowDay(stamp){//来源信息申请时间
	       function p(s) {
	           return s < 10 ? '0' + s: s;
	       }
	       var myDate = new Date(stamp*1000);
	       var year=myDate.getFullYear();
	       var month=myDate.getMonth()+1;
	       var date=myDate.getDate();
	       var h=myDate.getHours();       //获取当前小时数(0-23)
	       var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	       var s=myDate.getSeconds();
		   	 var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

		   	 if(stamp == '' || stamp ==null){
		   	 	var str = '---'
		   	 	return str;
		   	 }else{
		   	 	return now;
		   	 }
	  },
  	//请求右侧审核历程数据
	  getAuditProcess (){
	  		var arg = {
	  			data:this.requestData,
	  			success: res =>{
	  				this.maskResult = res;
	  			},
	  			error: function(){
	  			}
	  		}
	  		detailApi.getAuditProcess(arg);
	  },

  	//提交按钮的信息
  	submitData(formName){
  		var arg = {
  			data: this.pagedata,
  			success: res =>{
  				if(res.error_no == 200){
  					this.$alert('成功提交', '打款审核', {
		          confirmButtonText: '确定',
		          beforeClose: (action,instance, done)=> {
		           if(action == 'confirm'){
		           		done();
		           		this.$router.push({ path: '/work/moneyaudit' });
		           }else if(action == 'cancel'){
		           		done();
		           }
	          	}
	        	});
  				}else{
  					this.$alert(res.error_msg, '打款审核', {
		          confirmButtonText: '确定',
		          beforeClose: (action,instance, done)=> {
		            done();
	          	}
	        	});
  				}
  			},
  			error: function(error){
  			}
  		}
  		this.$confirm('是否确定提交', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消'
			}).then(() => {
			  detailApi.moneyAudit(arg);
			}).catch(() => {
			});
  	},
  	show() {
	    const viewer = this.$el.querySelector('.images').$viewer
	    viewer.show()
	  },
    fetchData() {
      fetchArticle().then(response => {
        this.postForm = response.data
      }).catch(err => {
        this.fetchSuccess = false
      })
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userLIstOptions = response.data.items.map(v => ({
          key: v.name
        }))
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
     padding: 40px 10px 20px 10px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
    /*来源信息公用样式*/
   .pl{
   	 width: 100%;
   		padding-left: 10px;
    	padding-right: 10px;
    	font-size: 14px;
			color: #4A4A4A;
			margin-bottom: 22px;
			position: relative;
   }
   .pl span{
   		display: inline-block;
   }
   .pl .title{
   		position: absolute;
   }
   .pl .text{
   /*	margin-left: 95px;*/
   }
   /*右侧部分的内容*/
  .right-box{
  	padding-left: 50px;
  	position: relative;
  }
  .right-box p{
  	margin: 0;
  	padding: 0;
  	text-align: right;
  }
  .right-box .el-steps{
  	margin-left: 110px;
  }
  .right-box .el-times{
  	width: 100px;
  	position: absolute;
  	top:0;
  	left:0px;
  }
  .right-box .time{
  	height: 127px;
  }
 .right-box .time-year{
  	font-size: 18px;
		color: #4A4A4A;
  }
   .right-box .time-hour{
   	margin-top: 10px;
   }
  .createPost-container .createPost-container-one{
  	padding-top: 10px;
  }

  }
</style>
<style>
	body{ background: #F5F6FA;}
  .el-form-item__label{
  	text-align: left;
  }
    .createPost-container-one .postInfo-container .el-form-item{
  	margin-bottom: 0px;
  }

</style>

