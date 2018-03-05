<template>
  <div class="createPost-container createPost-container-one">
    <el-form class="form-container" :model="customerData" :rules="rules" ref="customerData" v-if="search_type == '1'">
      <div class="createPost-main-container">
      <el-row :gutter="divgutter">
      	<el-col :span="24" style="background:#fff; padding: 10px 30px;" >
	        <el-form-item :label-width="labelwidth" label="业务团队:" class="postInfo-container-item" style="width: 100%; margin-bottom: 0px;">
	          <span v-text="customerData.credit_city">
	          </span>
	        </el-form-item>
      	</el-col>
      </el-row>
      <el-row :gutter="divgutter" style="margin-top: 10px;">
	      <div class="postInfo-container postInfo-container-one" style="padding: 20px 40px 20px 270px; margin-bottom: 0px;">
	      	<el-row :gutter="divgutter">
			     	<el-col :span="12">
	            <el-form-item :label-width="labelwidth" label="客户姓名" class="postInfo-container-item" style="width: 90%;">
	              <span v-text="customerData.customer_name"></span>
	            </el-form-item>
            </el-col>
						
						<el-col :span="12">
                <el-form-item :label-width="labelwidth" label="首付比例" class="postInfo-container-item" style="width: 100%;">
                	<span>
                  {{customerData.first_pay_ratio}}%
                  </span>
                </el-form-item>
            </el-col>
						
            <el-col :span="12">
	            <el-form-item :label-width="labelwidth" label="车辆型号" class="postInfo-container-item" style="width: 100%;">
	              <span v-text="customerData.car_type">
	              </span>
	            </el-form-item>
            </el-col>
	
						<el-col :span="12">
		            <el-form-item :label-width="labelwidth" label="融入本金" class="postInfo-container-item" style="width: 100%;" >
		            	<span>
		            		{{customerData.integration_principal}}元
		 							</span>
		            </el-form-item>
		        </el-col>

						
            <el-col :span="12">
                <el-form-item :label-width="labelwidth" label="车辆类型" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{customerData.product_class_number|carType}}
                  </span>
                </el-form-item>
            </el-col>
            
             <el-col :span="12">
		            <el-form-item :label-width="labelwidth" label="银行放款额" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{customerData.bank_lending}}元</span>
		            </el-form-item>
		        </el-col>

            <el-col :span="12">
                <el-form-item :label-width="labelwidth" label="车辆价格" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{customerData.car_price}}元
                  </span>
                </el-form-item>
            </el-col>
            
             <el-col :span="12">
			            <el-form-item :label-width="labelwidth" label="打给车行" class="postInfo-container-item" style="width: 100%;">
			            		<span>{{customerData.finance_driving}}元</span>
			            </el-form-item>
			        </el-col>

            <el-col :span="12">
                <el-form-item :label-width="labelwidth" label="贷款额" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{customerData.loan_prize}}元
                  </span>
                </el-form-item>
            </el-col>
            
             <el-col :span="12">
		            <el-form-item :label-width="labelwidth" label="返车行利率" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{customerData.return_car_rate}}%</span>
		            </el-form-item>
		        </el-col>

            <el-col :span="12">
                <el-form-item :label-width="labelwidth" label="贷款银行" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{customerData.loan_bank|bankType}}
                  </span>
                </el-form-item>
            </el-col>
            
             <el-col :span="12">
		            <el-form-item :label-width="labelwidth" label="返车行金额" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{customerData.return_car_principal}}元</span>
		            </el-form-item>
		        </el-col>


            <el-col :span="12">
                <el-form-item :label-width="labelwidth" label="贷款期数" class="postInfo-container-item" style="width: 100%;">
                  <span v-text="customerData.loan_date">
                  </span>
                </el-form-item>
            </el-col>
            
             <el-col :span="12">
		            <el-form-item :label-width="labelwidth" label="车商尾款" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{customerData.car_final_pay}}元</span>
		            </el-form-item>
		        </el-col>

            <el-col :span="12">
                <el-form-item :label-width="labelwidth" label="利率" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{customerData.loan_rate}}%
                  </span>
                </el-form-item>
            </el-col>
            
              <el-col :span="12">
			            <el-form-item :label-width="labelwidth" label="合计打款" class="postInfo-container-item" style="width: 100%;">
			            	<span>{{customerData.remittance_total_money}}元</span>
			            </el-form-item>
			        </el-col>

            <el-col :span="12">
                <el-form-item :label-width="labelwidth" label="首付款" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{customerData.first_pay}}元
 									</span>
                </el-form-item>
            </el-col>


        <el-col :span="12">
            <el-form-item :label-width="labelwidth" label="毛利率" class="postInfo-container-item" style="width: 100%;">
            	<span>{{customerData.gross_profit_rate}}%</span>
            </el-form-item>
        </el-col>

        <el-col :span="12" style="margin-top: 20px;">
        <el-form-item :label-width="labelwidth" label="回款金额" class="postInfo-container-item" style="width: 100%;" prop="return_prize">
        	<el-input v-model="customerData.return_prize" placeholder="请输入回款金额(必填)">
		        <template slot="append">元</template>
		  		</el-input>
        </el-form-item>
        </el-col>

         <el-col :span="12" style="margin-top: 20px;">
        <el-form-item :label-width="labelwidth" label="回款账户" class="postInfo-container-item" style="width: 100%;" prop="return_card">
        	<el-input v-model="customerData.return_card" placeholder="请输入回款账户(必填)">

		  		</el-input>
        </el-form-item>
        </el-col>

         <el-col :span="12" style="margin-top: 20px;">
            <el-form-item :label-width="labelwidth" label="回款日期" class="postInfo-container-item" style="width: 100%;" prop="return_time">
            	<el-col :span="24" style="padding-left:0px;padding-right:0px;">
	             	<el-date-picker v-model="customerData.return_time" type="date" placeholder="选择日期" style="width:80%;">

								</el-date-picker>
							</el-col>
            </el-form-item>
        </el-col>

        <el-col :span="12" style="margin-top: 20px;">
            <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;">
             <el-input type="textarea" v-model="customerData.return_description" placeholder="(选填)" style="width: 80%;">
  		 </el-input>
            </el-form-item>
        </el-col>
      </el-row>
			</div>
				<el-row style="background: #fff; padding: 20px 30px; padding-left:365px;" >
	    	<el-button type="primary" style="width: 120px; height: 40px;" @click="submitData('customerData')">确定</el-button>
	    	</el-row>
	    </el-row>

      </el-row>

      </div>
   </el-form>
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
import BasicInfo from '@/views/work/artificialone/detailartificialone'
import { getAdminToken } from '@/utils/auth'
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

     const checkMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(!/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(value)){
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
    return {
    	// 表单数据
    	customerData:{
    		customer_name:'',
    		car_type:'',
    		product_class_number:'1',
    		car_price:1000,
    		loan_prize:10000.25,
    		loan_rate:12,
    		loan_date:'12个月',
    		loan_bank:'03',
    		first_pay:'',
    		first_pay_ratio:'',
    		integration_principal:1000,//融入本金
    		finance_driving:0,
    		finance_apply_description:'备注',
    		return_car_principal:0,//返车行本金
    		bank_lending:'',//银行放款额
    		return_car_rate:'',//返车行利率
    		car_final_pay:'',//车商尾款
    		remittance_total_money:'',// 合计打款
    		gross_profit_rate:'',//毛利率
    		return_prize:'',//回款金额
    		return_time:'',//回款时间
    		return_description:'',//回款备注
    		return_card:'',//回款账户
    		credit_city:''//业务团队
    	},
    	//请求数据
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
        return_prize: [{ validator: checkMoney, trigger: 'blur' }],
        return_time: [{type: 'date',message: '请选择日期', trigger: 'change'}],
        return_card: [{ validator: checkEmpty, trigger: 'blur' }]
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
  			return_prize: this.customerData.return_prize,//回款金额
    		return_time: Date.parse(this.customerData.return_time)/1000,//回款时间
    		return_description: this.customerData.return_description ,//回款备注
    		return_card: this.customerData.return_card
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
	this.getDetailInfo()

  },
  methods: {
  	getDetailInfo(){
      var arg = {
        data: this.pagedata,
        success: res=>{
          if(res.error_no == 200){
          	var attrArr = ['customer_name','car_type','car_price','loan_prize','loan_rate','first_pay','first_pay_ratio','credit_city',
  												 'integration_principal','bank_lending','finance_driving','return_car_principal','gross_profit_rate',
  												 'return_car_rate','car_final_pay','finance_account','finance_name','finance_deposit_bank','remittance_total_money',
  												 'car_name','business_place','finance_apply_description'
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
//					this.customerData.finance_date = this.nowDay(res.result.finance_date);//打款日期
//          //个人基本信息
//          this.customerData.customer_name = res.result.customer_name;//性别
//          this.customerData.car_type = res.result.car_type;//年龄
//          this.customerData.product_class_number = res.result.product_class_number;//年龄
//          this.customerData.car_price = res.result.car_price;//年龄
//          this.customerData.loan_prize = res.result.loan_prize;//年龄
//          this.customerData.loan_bank = res.result.loan_bank;//年龄
//          this.customerData.loan_date = res.result.loan_date;//年龄
//          this.customerData.loan_rate = res.result.loan_rate;//年龄
//          this.customerData.first_pay = res.result.first_pay;//年龄
//          this.customerData.first_pay_ratio = res.result.first_pay_ratio;//年龄
//          this.customerData.integration_principal = res.result.integration_principal;//年龄
//          this.customerData.finance_driving = res.result.finance_driving;//年龄
//          this.customerData.bank_lending = res.result.bank_lending;//年龄
//          this.customerData.return_car_rate = res.result.return_car_rate;//年龄
//          this.customerData.return_car_principal = res.result.return_car_principal;//年龄
//          this.customerData.car_final_pay = res.result.car_final_pay;//年龄
//          this.customerData.remittance_total_money = res.result.remittance_total_money;//年龄
//          this.customerData.gross_profit_rate = res.result.gross_profit_rate;//年龄
//          this.customerData.credit_city = res.result.credit_city;//业务团队
          }else{
            alert(res.error_msg);
          }
        },
        error: function(){

        }
      }
      detailApi.getArtificalOneDetail(arg);
    },
  	//提交按钮的信息
  	submitData(formName){
  		var arg = {
  			data: this.pagedata,
  			success: res =>{
  				if(res.error_no == 200){
  					this.$alert(res.error_msg, '回款确认', {
			          confirmButtonText: '确定',
			          beforeClose: (action,instance, done)=> {
			           if(action == 'confirm'){
			           		done();
			           		this.$router.push({ path: '/work/returnmoney' });
			           }else if(action == 'cancel'){
			           		done();
			           }
		          	}
		        	});
  				}else{
  					this.$alert(res.error_msg, '回款确认', {
		          confirmButtonText: '确定',
		          beforeClose: (action,instance, done)=> {
		            done();
	          	}
	        	});
  				}
  			},
  			error: function(error){
  				console.log(error)
  			}
  		}
  		this.$confirm('是否确定提交', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消'
			}).then(() => {
				this.$refs['customerData'].validate((valid) => {
						if(valid){
							 detailApi.returnMoney(arg);
						}else{
							this.$alert('信息不完整,请检查信息', '回款确认', {
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
        console.log(err)
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
          console.log('error submit!!')
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
        console.log(response)
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
      padding: 20px 10px 20px 10px;
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
    .createPost-container-one .postInfo-container .el-form-item{
  	margin-bottom: 0px;
  }
</style>

