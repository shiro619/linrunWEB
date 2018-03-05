<template>
  <div class="createPost-container createPost-container-one">
  	<el-tabs v-model="search_type" style="background-color: #ffffff;padding-left: 50px;">
	    <el-tab-pane label="申请打款" name="1"></el-tab-pane>
	    <el-tab-pane label="客户详情" name="2"></el-tab-pane>
	  </el-tabs>
    <el-form class="form-container" :model="customerData" :rules="rules" ref="customerData" v-if="search_type == '1'">
      <div class="createPost-main-container">
      <el-row :gutter="divgutter">

      		<div class="postInfo-container postInfo-container-one">
			      	<el-row :gutter="divgutter">

		      			<el-col :span="12" style="padding-left: 30px;padding-top: 10px;">
	                <el-form-item :label-width="labelwidth" label="业务团队:" class="postInfo-container-item" style="width: 100%; margin-left: 31px;">
	                  <span v-text="customerData.credit_city">
	                  </span>
	                </el-form-item>
	             </el-col>

			      	</el-row>
				  </div>

      </el-row>
      <el-row :gutter="divgutter">
      		  <el-col :span="5" style="background: #fff; padding:40px 25px;padding-bottom: 46px;">
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
			                  	{{customerData.car_price }}元
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="贷款额" class="postInfo-container-item" style="width: 100%;">
			                  <span>
			                  	{{customerData.loan_prize}}元
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
			                  <span>
			                  	{{customerData.loan_rate}}%
			                  </span>
			                </el-form-item>
		                </el-col>

		                <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="首付款" class="postInfo-container-item" style="width: 100%;">
			                  <span>
			                  	{{customerData.first_pay}}元
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

								</el-row>
				      </div>
					  </el-col>
					  <el-col :span="19" style="background: #F5F6FA;padding-right: 0px;">
		          	<div class="postInfo-container applyremittance" style="background: #fff; margin-bottom: 0px; padding: 40px; padding-bottom: 0px; ">
					      	<el-row :gutter="divgutter">

						      		<el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="融入本金" class="postInfo-container-item" style="width: 100%;" prop='integration_principal'>
				                 <el-input v-model="customerData.integration_principal" placeholder="请输入融入本金(必填)">
				                 	<template slot="append">元</template>
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="返车行金额" class="postInfo-container-item" style="width: 100%;">
				                 <el-input v-model="returnMoney" disabled="disabled" placeholder="自动计算">
				                 	<template slot="append">元</template>
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="打给车行" class="postInfo-container-item" style="width: 100%;">
				                 <el-input v-model="financeDriving" disabled ="disabled" placeholder="请输入打给车行(必填)">
				                 	<template slot="append">元</template>
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="返车行利率" class="postInfo-container-item" style="width: 100%;" prop="return_car_rate">
				                 <el-input v-model="customerData.return_car_rate" placeholder="请输入返车行利率(必填)">
				                 	<template slot="append">%</template>
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="毛利率" class="postInfo-container-item" style="width: 100%;">
				                 <el-input v-model="grossProfitRate" disabled="disabled" placeholder="自动计算">
				                 	 <template slot="append">%</template>
	                  		</el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="车行全称" class="postInfo-container-item" style="width: 100%;" prop="car_name">
				                 <el-input v-model="customerData.car_name" placeholder="请输入车行全称(必填)">
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="合计打款" class="postInfo-container-item" style="width: 100%;">
				                 <el-input v-model="financeAmount" disabled="disabled" placeholder="自动计算">
				                 	<template slot="append">元</template>
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="开户行" class="postInfo-container-item" style="width: 100%;" prop="finance_deposit_bank">
				                 <el-input v-model="customerData.finance_deposit_bank" placeholder="请输入开户行(必填)">
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="银行放款额" class="postInfo-container-item" style="width: 100%;">
				                 <el-input v-model="bankLending" disabled="disabled" placeholder="自动计算">
				                 	<template slot="append">元</template>
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="账号" class="postInfo-container-item" style="width: 100%;" prop="finance_account">
				                 <el-input v-model="customerData.finance_account" placeholder="请输入账号(必填)">
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="打款日期" class="postInfo-container-item" style="width: 100%;" prop="finance_date">
								            <el-col :span="24" style="padding-left:0px;padding-right:0px;">
								             	<el-date-picker v-model="customerData.finance_date" type="date" placeholder="选择日期" style="width:80%;">

															</el-date-picker>
													</el-col>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="打款户名" class="postInfo-container-item" style="width: 100%;" prop="finance_name">
				                 <el-input v-model="customerData.finance_name" placeholder="请输入打款户名(必填)">
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="业务发生地" class="postInfo-container-item" style="width: 100%;" prop="business_place">
				                 <el-input v-model="customerData.business_place" placeholder="请输入业务发生地(必填)">
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="8">
				                <el-form-item :label-width="labelwidth" label="车商尾款" class="postInfo-container-item" style="width: 100%;" prop="car_final_pay">
				                 <el-input v-model="customerData.car_final_pay" placeholder="请输入车商尾款(必填)">
				                 		<template slot="append">元</template>
	                  		 </el-input>
				                </el-form-item>
			                </el-col>

			                <el-col :span="24">
				                <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;" prop="finance_apply_description">
				                 <el-input type="textarea" v-model="customerData.finance_apply_description" :rows="3" placeholder="( 选填 )">
	                  		 </el-input>
				                </el-form-item>
			                </el-col>


			               <!-- {{customerData}}-->
					      	</el-row>
				      	</div>
				      	<div style="overflow: hidden; background: #fff; padding-bottom: 22px; padding-right:40px;">
		            	<el-button type="primary" style="float:right; width: 120px; height: 40px;" @click="submitData('customerData')">提交申请</el-button>
		            	<el-button style="float:right; width: 120px; height: 40px;margin-right: 40px;" @click="resetForm('customerData')">重置信息</el-button>
					      </div>
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
          });
          callback(null)
        }
      } else {
        callback()
      }
    }
    const checkMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(!/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(value)){
      	return callback(new Error('请填写正确的信息'));
      }else{
      	return callback();
      }
    }
    //车商尾款
    const checkMoney1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(!/^(\-)?(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(value)){
      	return callback(new Error('请填写正确的信息'));
      }else{
      	return callback();
      }
    }


    const checkEmpty = (rule, value, callback) => {
    	if (!value) {
        	return callback(new Error('此项不能为空'));
      	}else{
      		return callback();
      	}
    }
    const checkBz = (rule, value, callback) => {
    	return callback();
    }

    const checkBank = (rule, value, callback) => {
				var bankno = value.replace(/\s/g, '');
		    if (bankno == "") {
		      return callback(new Error('此项不能为空'));
		    }
		    if (bankno.length < 16 || bankno.length > 19) {
		    	return callback(new Error('银行卡号长度必须在16到19之间'));
		    }
		    var num = /^\d*$/;// 全数字
		    if (!num.exec(bankno)) {
		    		return callback(new Error('银行卡号必须全为数字'));
		    }
		    // 开头两位
		    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
		    if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
		    	return callback(new Error('银行卡号开头两位不符合规范'));
		    }
		    // luhn校验
		    if (!luhnCheck(bankno)) {
		        return callback(new Error('银行卡号不正确'));
		    }
		    return callback();
			 /**
			 * 银行卡号luhn校验算法
			 * luhn校验规则：16位银行卡号（19位通用）:
			 * 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
			 * 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
			 * 3.将加法和加上校验位能被 10 整除。
			 * @param bankno 银行卡号
			 * @returns
			 */
			function luhnCheck(bankno) {
			    var lastNum = bankno.substr(bankno.length - 1, 1);// 取出最后一位（与luhn进行比较）
			    var first15Num = bankno.substr(0, bankno.length - 1);// 前15或18位
			    var newArr = new Array();
			    for (var i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
			        newArr.push(first15Num.substr(i, 1));
			    }
			    var arrJiShu = new Array(); // 奇数位*2的积 <9
			    var arrJiShu2 = new Array(); // 奇数位*2的积 >9
			    var arrOuShu = new Array(); // 偶数位数组
			    for (var j = 0; j < newArr.length; j++) {
			        if ((j + 1) % 2 == 1) {// 奇数位
			            if (parseInt(newArr[j]) * 2 < 9) {
			                arrJiShu.push(parseInt(newArr[j]) * 2);
			            } else {
			                arrJiShu2.push(parseInt(newArr[j]) * 2);
			            }
			        } else {
			            arrOuShu.push(newArr[j]);// 偶数位
			        }
			    }

			    var jishu_child1 = new Array();// 奇数位*2 >9 的分割之后的数组个位数
			    var jishu_child2 = new Array();// 奇数位*2 >9 的分割之后的数组十位数
			    for (var h = 0; h < arrJiShu2.length; h++) {
			        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
			        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
			    }
			    var sumJiShu = 0; // 奇数位*2 < 9 的数组之和
			    var sumOuShu = 0; // 偶数位数组之和
			    var sumJiShuChild1 = 0; // 奇数位*2 >9 的分割之后的数组个位数之和
			    var sumJiShuChild2 = 0; // 奇数位*2 >9 的分割之后的数组十位数之和
			    var sumTotal = 0;
			    for (var m = 0; m < arrJiShu.length; m++) {
			        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
			    }
			    for (var n = 0; n < arrOuShu.length; n++) {
			        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
			    }
			    for (var p = 0; p < jishu_child1.length; p++) {
			        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
			        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
			    }
			    // 计算总和
			    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu)
			            + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
			    // 计算luhn值
			    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
			    var luhn = 10 - k;
			    if (lastNum == luhn) {
			        return true;
			    } else {
			        return false;
			    }
			}
		}


    return {
    	// 表单数据
    	customerData:{
    		customer_name: '',
    		car_type: '',
    		product_class_number: '',
    		car_price:'',
    		loan_prize:'',
    		loan_rate:'',
    		loan_date:'',
    		loan_bank:'',
    		first_pay:'',
    		first_pay_ratio:'',
    		integration_principal:'',//融入本金
    		finance_driving:'',
    		finance_deposit_bank:'',
    		finance_name:'',
    		finance_account:'',
    		finance_date:'',
    		finance_amount:'',
    		finance_apply_description:'',
    		return_car_principal:'',//返车行本金
    		bank_lending:'',//银行放款额
    		return_car_rate:'',//返车行利率
    		car_final_pay:'',//车商尾款
    		remittance_total_money:'',// 合计打款
    		gross_profit_rate:'',//毛利率
    		car_name:'',//车行全称
    		business_place:'',//业务发生地
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
    	labelwidth: '82px',
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
        return_car_rate: [{validator: checkMoney, trigger:'blur' }],
        integration_principal: [{validator: checkMoney, trigger:'blur' }],
        car_final_pay: [{validator: checkMoney1, trigger:'blur' }],
        car_name: [{validator: checkEmpty, trigger:'blur' }],
        finance_account: [{validator: checkBank, trigger:'change' }],
        finance_name: [{validator: checkEmpty, trigger:'blur' }],
        business_place: [{validator: checkEmpty, trigger:'blur' }],
        finance_date: [{type: 'date',message: '请选择日期', trigger: 'change'}],
        finance_deposit_bank: [{validator: checkEmpty, trigger:'blur' }],
        finance_apply_description: [{validator: checkBz, trigger:'blur' }],


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
    	}else if(value == '03'){
    		return '临沂经开行'
    	}
    }

  },
  computed: {
  	pagedata(){//提交事件所传得信息
  		return {
  			token: getAdminToken(),
  			work_id: this.$route.query.id,
  			item_instance_id: this.$route.query.item_instance_id,
  			integration_principal: this.customerData.integration_principal,// 融入本金
  			return_car_principal: this.returnMoney,//返车行金额(需要计算)
  			finance_driving: this.financeDriving,//打给车行(需要计算)
  			return_car_rate: this.customerData.return_car_rate,//返车行利率
  			gross_profit_rate: this.grossProfitRate,//毛利率(需要计算)
  			car_name: this.customerData.car_name,//车行全称
  			remittance_total_money: this.financeAmount,//合计打款(需要计算)
  			finance_deposit_bank:this.customerData.finance_deposit_bank,//  开户行
  			bank_lending: this.bankLending,//银行反款额(需要计算)
  			finance_account: this.customerData.finance_account,// 账号
				finance_date: Date.parse(this.customerData.finance_date)/1000, //打款日期
  			finance_name: this.customerData.finance_name,//  打款户名
  			business_place: this.customerData.business_place,//业务发生地
  			car_final_pay: this.customerData.car_final_pay,//车商尾款
  			finance_apply_description: this.customerData.finance_apply_description// 申请打款备注
  		}
  	},
    contentShortLength() {
      return this.postForm.content_short.length
    },
    returnMoney(){//返车行金额=贷款额*返车行利率
    	var return_car_principal = this.customerData.return_car_principal;
    	if(!this.customerData.loan_prize || !this.customerData.return_car_rate || !/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(this.customerData.return_car_rate)){
    		return return_car_principal = '';
    	}else{
    		var num1 = FloatFun.multi(Number(this.customerData.loan_prize),this.toPoint(this.customerData.return_car_rate));
    		return return_car_principal = num1.toFixed(2)
    	}
    },
    //打给车行
    financeDriving(){
    	var finance_driving = this.customerData.loan_prize;
    	return finance_driving;
    },
    //毛利率
    grossProfitRate(){
    	var gross_profit_rate = this.customerData.gross_profit_rate;
    	if( !this.customerData.loan_rate || !this.customerData.return_car_rate || !/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(this.customerData.return_car_rate)){
    		return gross_profit_rate ='';
    	}else{
    		var num1 = FloatFun.sub(Number(this.customerData.loan_rate),Number(this.customerData.return_car_rate));
    		return gross_profit_rate = num1;
    	}
    },
    //银行放款金额
    bankLending(){
    	var bank_lending = this.customerData.bank_lending;
    	//alert(this.customerData.loan_principal)
    	if(this.customerData.loan_bank == '03'){//贷款银行为临沂经开行计算公式

    		//先判断参与运算得字段是否符合要求
    		if( this.customerData.integration_principal == '' || !this.customerData.integration_principal || !this.customerData.loan_prize || !this.customerData.loan_rate){

    			return bank_lending = '';
    		}else if(!/^(\-)?(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(this.customerData.integration_principal)){
    			return bank_lending = '';
    		}else{

    			var num1 =FloatFun.add(Number(this.customerData.loan_prize),Number(this.customerData.integration_principal));//贷款额+融入本金
    			var num2;//
    			var num3;
    			if( this.customerData.loan_date == '12个月'){//公式 银行放款金额 = (贷款额+融入本金)*(总利率-3.58%+1)
    				num2 =FloatFun.add(this.toPoint(this.customerData.loan_rate),0.9642);//总利率-3.58%+1
	    		}else if( this.customerData.loan_date == '24个月'){//公式 银行放款金额 = (贷款额+融入本金)*(总利率-6.6%+1)
	    			num2 =FloatFun.add(this.toPoint(this.customerData.loan_rate),0.934);//总利率-6.6%+1
	    		}else if( this.customerData.loan_date == '36个月'){//公式 银行放款金额 = (贷款额+融入本金)*(总利率-9%+1)
	    			num2 =FloatFun.add(this.toPoint(this.customerData.loan_rate),0.91);//总利率-9%+1
	    		}
//	    		alert(num1,num2)
	    	  num3 =FloatFun.multi(num1,num2);
	    		return bank_lending = this.numChange(num3).toFixed(2);
    		}
	    }else{//贷款银行为济南市中工行、济南乐源支行计算公式
	    		if(this.customerData.integration_principal == '' || !this.customerData.integration_principal || !this.customerData.loan_prize || !this.customerData.loan_rate){
	    			return bank_lending = '';
	    		}else if(!/^(\-)?(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(this.customerData.integration_principal)){
	    			return bank_lending = '';
	    		}else{
		    		var num1 =FloatFun.add(Number(this.customerData.loan_prize),Number(this.customerData.integration_principal));//贷款额+融入本金
	    			var num2;//
	    			var num3;
    			if( this.customerData.loan_date == '12个月'){//公式 银行放款金额 = (贷款额+融入本金)*(总利率-3.3%+1)
    				num2 =FloatFun.add(this.toPoint(this.customerData.loan_rate),0.967);//总利率-3.3%+1
	    		}else if( this.customerData.loan_date == '24个月'){//公式 银行放款金额 = (贷款额+融入本金)*(总利率-6.6%+1)
	    			num2 =FloatFun.add(this.toPoint(this.customerData.loan_rate),0.934);//总利率-6.6%+1
	    		}else if( this.customerData.loan_date == '36个月'){//公式 银行放款金额 = (贷款额+融入本金)*(总利率-9.5%+1)
	    			num2 =FloatFun.add(this.toPoint(this.customerData.loan_rate),0.905);//总利率-9%+1
	    		}
	    	  num3 =FloatFun.multi(num1,num2);
	    		return bank_lending = this.numChange(num3).toFixed(2);
	    		}
	    }
    },
    //合计打款金额
    financeAmount(){
    	var remittance_total_money = this.customerData.remittance_total_mone;
    	if( !this.customerData.loan_prize || !this.returnMoney || !this.customerData.car_final_pay ||!/^(\-)?(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(this.customerData.car_final_pay)){
    		return remittance_total_money = '';
    	}else{
    		var num1 = FloatFun.add(Number(this.customerData.loan_prize),Number(this.returnMoney));
    		var num2 = FloatFun.sub(num1,Number(this.customerData.car_final_pay));
    		return remittance_total_money = num2.toFixed(2);
    	}
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
  					var attrArr = ['customer_name','car_type','product_class_number','car_price','loan_prize','loan_bank','loan_date','loan_rate','first_pay','first_pay_ratio','credit_city'];
  					for( var i in attrArr){
	  					if( res.result[attrArr[i]] == '' || res.result[attrArr[i]] ==null){
	  						this.customerData[attrArr[i]] = '- - -';//姓名
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
  						this.customerData.loan_date = res.result.loan_date;//车辆类型
  					}
//					this.customerData.customer_name = res.result.customer_name;//姓名
//					this.customerData.car_type = res.result.car_type;//车辆型号有疑问
//					this.customerData.product_class_number = res.result.product_class_number;//车辆类型
//					this.customerData.car_price = res.result.car_price;//车辆价格
//					this.customerData.loan_prize = res.result.loan_prize;//贷款金额
//					this.customerData.loan_bank = res.result.loan_bank;//贷款银行
//					this.customerData.loan_date = res.result.loan_date;//贷款期数
//					this.customerData.loan_rate = res.result.loan_rate;//利率
//					this.customerData.first_pay = res.result.first_pay;//首付款
//					this.customerData.first_pay_ratio = res.result.first_pay_ratio;//首付比例
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
  					this.$alert('成功提交', '申请打款', {
			          confirmButtonText: '确定',
			          beforeClose: (action,instance, done)=> {
			           if(action == 'confirm'){
			           		done();
			           		this.$router.push({ path: '/work/applyremittance' });
			           }else if(action == 'cancel'){
			           		done();
			           }
		          	}
		        	});
  				}else if(res.error_msg == '资料不完整'){//资料填写不完整
  					this.$alert(res.error_msg, '打款审核', {
		          confirmButtonText: '确定',
		          beforeClose: (action,instance, done)=> {
		           if(action == 'confirm'){
		           		done();
		           		this.$refs[formName].validate((valid) => {
			  					if (!valid){

						            return false;
								      }
			  					});
		           }else if(action == 'cancel'){
		           		done();
		           }
	          	}
	        	});

  				}else{
  					this.$alert(res.error_msg, '审核打款', {
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
				this.$refs['customerData'].validate((valid) => {
						if(valid){
							if( Number(this.customerData.return_car_rate) >  Number(this.customerData.loan_rate)){
								this.$alert('返车行利率不能大于总利率', '申请打款', {
							          confirmButtonText: '确定',
							          beforeClose: (action,instance, done)=> {
							           done();
						          	}
						        	});

							}else{
								 detailApi.applyRemittance(arg);
							}
						}else{
							this.$alert('信息不完整,请检查信息', '申请打款', {
			          confirmButtonText: '确定',
		        	});
						}
					});
			}).catch(() => {
			});
  	},
  	//重置按钮信息
  	resetForm(formName){

	   this.$refs[formName].resetFields();

  	},
  	//百位取整
  	numChange(num) {
		   var num1 = parseInt(parseInt(num) / 100)
		   if(num <= num1 * 100){
		       return (num1 * 100)
		   } else {
		       return ((num1 + 1) * 100)
		   }
	 	},
  	//百分比转换为小数
  	toPoint(str){
		    str= str/100;
		    return str;
	},
  	show () {
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
  },
  watch:{
  	'customerData.return_car_rate':function(){
			if( Number(this.customerData.return_car_rate) >  Number(this.customerData.loan_rate)){
				this.$alert('返车行利率不能大于总利率', '申请打款', {
			          confirmButtonText: '确定',
			          beforeClose: (action,instance, done)=> {
			           done();
		          	}
		        	});

			}
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
  .postInfo-container-one .el-form-item{
  	margin-bottom: 0px;
  }
  }
</style>
<style>
	body{ background: #F5F6FA;}
	.createPost-container .createPost-main-container .postInfo-container-one{
  	background: #fff;
  }
  .el-col .el-col-one{
  	background: #fff;
  }
  .postInfo-container-one{
  	background: #fff;
  }
  .el-form-item__label{
  	text-align: left;
  }
  .applyremittance .postInfo-container-item .el-form-item__content{
   	line-height: 36px;
   	margin-bottom: 20px;
   	color:#4A4A4A;
  }
  .createPost-container-one .postInfo-container .el-form-item{
  	margin-bottom: 0px;
  }
.postInfo-container-one .postInfo-container-item  .el-form-item__label{
   	line-height: normal;
  }
  .postInfo-container-one .postInfo-container-item .el-form-item__content{
   line-height: normal;
   	margin-bottom: 20px;
   	color:#4A4A4A;
  }
</style>

