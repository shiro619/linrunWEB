<template>
  <div class="createPost-container inputrequest">
    <el-form class="form-container" :model="customerData" :rules="rules" ref="customerData">


      <div class="createPost-main-container">
        <el-row :gutter="divgutter">
          <el-col :span="13" class="left" style="padding: 40px">
          	<el-row :gutter="divgutter">
          		<el-col :span="16">
          		<h2>客户基本资料</h2>
          		</el-col>
          		<el-col :span="7">
          		<h2><el-button type="primary" @click="imgModal"><svg-icon icon-class="video" style="margin-right: 10px;vertical-align: middle; width:18px; height:12px;"></svg-icon>客户影像资料</el-button></h2>
          		</el-col>
          	</el-row>


          	<el-row :gutter="divgutter" class="resoursces">
          		  <el-col :span="12">
			          	<h3 class="sub-title">来源信息</h3>
						      <div class="postInfo-container">
						      	<el-row :gutter="divgutter">
								      <el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="产品类型" class="postInfo-container-item" style="width: 100%;">
			                    <span v-text="customerData.product_name"></span>
			                  </el-form-item>
								     	</el-col>

								     	<el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="申请件来源" class="postInfo-container-item" style="width: 100%;">
			                    <span v-text="customerData.merchant_name"></span>
			                  </el-form-item>
								     	</el-col>


								     	<el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="业务地区" class="postInfo-container-item" style="width: 100%;">
			                    <span v-text="customerData.salesman_city"></span>
			                  </el-form-item>
								     	</el-col>

								     	<el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="业务人员" class="postInfo-container-item" style="width: 100%;">
			                    <span v-text="customerData.salesman_name"></span>
			                  </el-form-item>
								     	</el-col>

								     	<el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="家访人员" class="postInfo-container-item" style="width: 100%;">
			                    <span v-text="customerData.visitor_name"></span>
			                  </el-form-item>
								     	</el-col>

								     	<el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="申请时间" class="postInfo-container-item" style="width: 100%;">
			                  <span v-text="nowDay"></span>
			                  </el-form-item>
								     	</el-col>

										</el-row>
						      </div>
						    </el-col>
						    <el-col :span="12">
			          	<h3 class="sub-title">人行征信</h3>
						      <div class="postInfo-container">
						      	<el-row :gutter="divgutter">
						      		<el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="征信结果" class="postInfo-container-item" style="width: 100%;">
									      	<span>{{customerData.inquire_result|auditResult}}</span>
			                  </el-form-item>
								     	</el-col>
								      <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;">
			                  <el-input type="textarea" :rows="5" v-model="customerData.inquire_description" disabled="disabled" style="width: 100%;">
			                  </el-input>
			                </el-form-item>
		                </el-col>
										</el-row>
						      </div>
						    </el-col>
          	</el-row>
          	<h3 class="sub-title">基本信息</h3>
            <div class="postInfo-container">
              <el-row :gutter="divgutter">


                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="姓名" class="postInfo-container-item" style="width: 100%;" prop='customer_name'>
	                  <el-input placeholder="请输入姓名(必填)" v-model="customerData.customer_name">
	                  </el-input>
	                </el-form-item>
                </el-col>

								<el-col :span="12">
	                <el-form-item  class="postInfo-container-item" style="height: 66px">
	                  <span>{{discriCardSex}} / {{discriCardAge}} 岁</span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;" prop="customer_certificate_number">
	                  <el-input placeholder="请输入身份证号(必填)" v-model="customerData.customer_certificate_number">
	                  </el-input>
	                </el-form-item>
                </el-col>

								<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="手机号" class="postInfo-container-item" style="width: 100%;" prop="customer_telephone">
	                  <el-input placeholder="请输入手机号(必填)" v-model="customerData.customer_telephone">
	                  </el-input>
	                </el-form-item>
                </el-col>
                <el-col :span="24" style="padding-left:0;">
									<el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="户口所在地" class="postInfo-container-item" style="width: 100%;" prop="hukou">
		                  <el-input placeholder="请输入户口所在地(必填)" v-model="customerData.hukou">
		                  </el-input>
		                </el-form-item>
	                </el-col>
                 </el-col>

                <el-col :span="24">
	                <el-form-item :label-width="labelwidth" label="居住地址" class="postInfo-container-item" style="width: 100%;" prop="customer_address">
	                  <el-input placeholder="请输入居住地址(必填)" v-model="customerData.customer_address">
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label-width="labelwidth" label="婚姻状况" class="postInfo-container-item" style="width: 100%;">
                    <el-select class="filter-item" style="width: 100%;" v-model="customerData.customer_marital_status">
                    	<!--<el-option label="请选择">
        							</el-option>-->
        							<el-option label="已婚" value="1">
        							</el-option>
        							<el-option label="未婚" value="2">
        							</el-option>
        							<el-option label="离婚" value="3">
        							</el-option>
        							<el-option label="丧偶" value="4">
        							</el-option>
      							</el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label-width="labelwidth" label="担保人" class="postInfo-container-item select" style="width: 100%;">
                    <el-radio v-model="customerData.customer_has_bondsman" label="1">有担保人</el-radio>
  									<el-radio v-model="customerData.customer_has_bondsman" label="2">无担保人</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="24" style="padding-left:0;">
	                <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="单位电话" class="postInfo-container-item" style="width: 100%;">
		                  <el-input placeholder="请输入单位电话(选填)" v-model="customerData.customer_company_phone_number">
		                  </el-input>
		                </el-form-item>
	                </el-col>
	               </el-col>

                <el-col :span="24">
		                <el-form-item :label-width="labelwidth" label="工作单位" class="postInfo-container-item" style="width: 100%;" prop="customer_company_name">
		                  <el-input placeholder="请输入工作单位(必填)" v-model="customerData.customer_company_name">
		                  </el-input>
		                </el-form-item>
	              </el-col>

                <el-col :span="24">
		                <el-form-item :label-width="labelwidth" label="单位地址" class="postInfo-container-item" style="width: 100%;">
		                  <el-input placeholder="请输入单位地址(选填)" v-model="customerData.company_address">
		                  </el-input>
		                </el-form-item>
	              </el-col>

              </el-row>
            </div>

            <h3 v-if="customerData.customer_marital_status == '1'" class="sub-title">配偶信息</h3>
            <div class="postInfo-container" v-if="customerData.customer_marital_status == '1'">
            	<el-row :gutter="divgutter">

            		<el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="配偶姓名:" class="postInfo-container-item" style="width: 100%;" prop="spouse_name" ref="nameForm">
		                  <el-input placeholder="请输入配偶姓名(必填)" v-model="customerData.spouse_name">
		                  </el-input>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;" prop="spouse_certificate_number" ref="certificateForm">
		                  <el-input placeholder="请输入配偶身份证号(必填)" v-model="customerData.spouse_certificate_number">
		                  </el-input>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="手机号" class="postInfo-container-item" style="width: 100%;" prop="spouse_telephone" ref="phoneForm">
		                  <el-input placeholder="请输入配偶的手机号(必填)" v-model="customerData.spouse_telephone">
		                  </el-input>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="单位电话" class="postInfo-container-item" style="width: 100%;">
		                  <el-input placeholder="请输入单位电话(选填)" v-model="customerData.spouse_company_telephone">
		                  </el-input>
		                </el-form-item>
	              </el-col>

	              <el-col :span="24">
		                <el-form-item :label-width="labelwidth" label="工作单位" class="postInfo-container-item" style="width: 100%;">
		                  <el-input placeholder="请输入工作单位(选填)" v-model="customerData.spouse_company_name">
		                  </el-input>
		                </el-form-item>
	              </el-col>

               </el-row>
            </div>

						<h3 v-if="customerMaritalStatus" class="sub-title">联系人信息</h3>
						<div class="postInfo-container" v-if="customerMaritalStatus">
            	<el-row :gutter="divgutter">

            		<el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="联系人姓名:" class="postInfo-container-item" style="width: 100%;">
		                  <el-input placeholder="请输入姓名(选填)" v-model="customerData.contacts_man_name">
		                  </el-input>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="关系" class="postInfo-container-item" style="width: 100%;">
		                	<el-select class="filter-item" style="width: 100%;" v-model="customerData.contacts_man_relationship">
        							<el-option label="父母" value="1">
        							</el-option>
        							<el-option label="朋友" value="2">
        							</el-option>
        							<el-option label="亲戚" value="3">
        							</el-option>
        							<el-option label="其他" value="4">
        							</el-option>
      								</el-select>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;">
		                  <el-input placeholder="请输入身份证号(选填)" v-model="customerData.contacts_man_certificate_number">
		                  </el-input>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="手机号" class="postInfo-container-item" style="width: 100%;">
		                  <el-input placeholder="请输入手机号(选填)" v-model="customerData.contacts_man_telephone">
		                  </el-input>
		                </el-form-item>
	              </el-col>
               </el-row>
            </div>



            <div class="postInfo-container" v-if="customerData.customer_has_bondsman == 1">
            	<h3 class="sub-title">担保人信息</h3>
	             <div class="postInfo-container">
	            	<el-row :gutter="divgutter">
		            		<el-col :span="12">
				                <el-form-item :label-width="labelwidth" label="担保人姓名" class="postInfo-container-item" style="width: 100%;" prop="bondsman_name">
				                  <el-input placeholder="请输入姓名(必填)" v-model="customerData.bondsman_name">
				                  </el-input>
				                </el-form-item>
			              </el-col>

			               <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;" prop="bondsman_certificate_number">
			                  <el-input placeholder="请输入身份证号(必填)" v-model="customerData.bondsman_certificate_number">
			                  </el-input>
			                </el-form-item>
		             		 </el-col>

		             		 <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="手机号" class="postInfo-container-item" style="width: 100%;" prop="bondsman_telephone">
			                  <el-input placeholder="请输入手机号(必填)" v-model="customerData.bondsman_telephone">
			                  </el-input>
			                </el-form-item>
		             		 </el-col>

		             		 <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="单位电话" class="postInfo-container-item" style="width: 100%;">
			                  <el-input placeholder="请输入单位电话(选填)" v-model="customerData.bondsman_company_telephone">
			                  </el-input>
			                </el-form-item>
		             		 </el-col>

		             		  <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="工作单位" class="postInfo-container-item" style="width: 100%;">
			                  <el-input placeholder="请输入工作单位(选填)" v-model="customerData.bondsman_company_name">
			                  </el-input>
			                </el-form-item>
		             		 </el-col>

		             		 <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="单位地址" class="postInfo-container-item" style="width: 100%;">
			                  <el-input placeholder="请输入单位地址(选填)" v-model="customerData.bondsman_company_address">
			                  </el-input>
			                </el-form-item>
		             		 </el-col>

										<el-col :span="12">
				                <el-form-item :label-width="labelwidth" label="配偶姓名" class="postInfo-container-item" style="width: 100%;">
				                  <el-input placeholder="请输入姓名(选填)" v-model="customerData.bondsman_spouse_name">
				                  </el-input>
				                </el-form-item>
			              </el-col>

			               <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;">
			                  <el-input placeholder="请输入身份证号(选填)" v-model="customerData.bondsman_spouse_idcard">
			                  </el-input>
			                </el-form-item>
		             		 </el-col>

	               </el-row>
	            </div>
            </div>

            <h3 class="sub-title">商品信息</h3>
            <div class="postInfo-container">
            	<el-row :gutter="divgutter">

            		<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="合同编号" class="postInfo-container-item" style="width: 100%;">
	                  <el-input placeholder="请输入合同编号(选填)" v-model="customerData.constract_no">
	                  </el-input>
	                </el-form-item>
                </el-col>

            		<el-col :span="12">
                  <el-form-item :label-width="labelwidth" label="车辆类型" class="postInfo-container-item select" style="width: 100%;height: 56.5px">
                    <el-radio v-model="customerData.product_class_number" label="XC" disabled="disabled">新车</el-radio>
  									<el-radio v-model="customerData.product_class_number" label="ES" disabled="disabled">二手车</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车辆品牌" class="postInfo-container-item" style="width: 100%;" prop="car_brand">
	                  <el-input placeholder="请输入车辆品牌(必填)" v-model="customerData.car_brand">
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车辆型号" class="postInfo-container-item" style="width: 100%;" prop="car_type">
	                  <el-input placeholder="请输入车辆型号(必填)" v-model="customerData.car_type">
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车辆价格" class="postInfo-container-item" style="width: 100%;" prop="car_price">
	                  <el-input placeholder="请输入车辆价格(必填)" v-model="customerData.car_price">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车架号" class="postInfo-container-item" style="width: 100%;" prop="car_vehicle_identification_number">
	                  <el-input placeholder="请输入车架号(必填)" v-model="customerData.car_vehicle_identification_number">
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="贷款银行" class="postInfo-container-item" style="width: 100%;">
	                  	<el-select class="filter-item" placeholder="" style="width: 100%;" v-model="customerData.loan_bank">
                      <el-option label="临沂经开行" value="03">
                      </el-option>
        							<el-option label="济南市中工行" value="01">
        							</el-option>
        							<el-option label="济南乐源支行" value="02">
        							</el-option>
      							</el-select>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="贷款形式" class="postInfo-container-item" style="width: 100%;">
	                  <el-input  disabled="disabled" v-model="customerData.loan_card">
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="贷款金额" class="postInfo-container-item" style="width: 100%;" prop="loan_prize">
	                  <el-input placeholder="请输入贷款金额(必填)" v-model="customerData.loan_prize">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label-width="labelwidth" label="贷款期数" class="postInfo-container-item" style="width: 100%;">
                    <el-select class="filter-item" placeholder="贷款期数" style="width: 100%;" v-model="customerData.loan_date">
                    	<!--<el-option label="请选择">
        							</el-option>-->
        							<el-option label="12个月" value="12个月">
        							</el-option>
        							<el-option label="24个月" value="24个月">
        							</el-option>
        							<el-option label="36个月" value="36个月">
        							</el-option>
      							</el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="首付款" class="postInfo-container-item" style="width: 100%;" prop="first_pay">
	                  <el-input placeholder="请输入首付款(必填)" v-model="customerData.first_pay">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="首付比例" class="postInfo-container-item" style="width: 100%;">
	                  <el-input placeholder="首付比例自动计算" v-model="firstPayRatio" disabled="disabled">
	                  	<template slot="append">%</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="利率" class="postInfo-container-item" style="width: 100%;" prop="loan_rate">
	                  <el-input placeholder="请输入利率(必填)" v-model="customerData.loan_rate">
	                  	<template slot="append">%</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label-width="labelwidth" label="有无保险" class="postInfo-container-item select" style="width: 100%;">
                    <el-radio v-model="customerData.has_insurance" label="1">有保险</el-radio>
  									<el-radio v-model="customerData.has_insurance" label="2">无保险</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

           <div class="postInfo-container" v-if="customerData.has_insurance == 1">
            	<el-row :gutter="divgutter">
            		<el-col :span="24">
	                <el-form-item :label-width="labelwidth" label="保险公司" class="postInfo-container-item" style="width: 100%;">
	                  <el-input placeholder="请输入保险公司(选填)" v-model="customerData.insurance_company">
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="商业险" class="postInfo-container-item" style="width: 100%;" prop="commercial_insurance">
	                  <el-input placeholder="请输入商业险(选填)" v-model="customerData.commercial_insurance">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="交强险" class="postInfo-container-item" style="width: 100%;" prop="compulsory_insurance">
	                  <el-input placeholder="请输入交强险(选填)" v-model="customerData.compulsory_insurance">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车船税" class="postInfo-container-item" style="width: 100%;" prop="vehicle_vessel_tax">
	                  <el-input placeholder="请输入车船税(选填)" v-model="customerData.vehicle_vessel_tax">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="保费总额" class="postInfo-container-item" style="width: 100%;">
	                  <el-input placeholder="自动计算" v-model="grossPremium" disabled="disabled">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

           		</el-row>
           </div>


					 <h3 class="sub-title">车行信息<el-button type="primary" style="float: right;margin-right: 8%;padding: 6px 4px;" @click="uploadCar">上传车商资料照片</el-button></h3>
					  <div class="postInfo-container">
            	<el-row :gutter="divgutter">
            		<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车行名称" class="postInfo-container-item" style="width: 100%;">
	                  <el-input placeholder="请输入车行名称(选填)" v-model="customerData.carshop_name">
	                  </el-input>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车行地址" class="postInfo-container-item" style="width: 100%;">
	                  <el-input placeholder="请输入车行地址(选填)" v-model="customerData.carshop_address">
	                  </el-input>
	                </el-form-item>
                </el-col>

                 <el-col :span="24">

                </el-col>

            	</el-row>
            </div>

           <h3 class="sub-title">费用信息</h3>
            <div class="postInfo-container">
            	<el-row :gutter="divgutter">

            		<el-col :span="24">
	                <el-form-item :label-width="labelwidth" label="费用合计" class="postInfo-container-item" style="width: 100%;" prop="total_expense">
	                  <el-input placeholder="请输入家访费、调查费等费用总额(选填)" v-model="customerData.total_expense">
	                  	<template slot="append">元</template>
	                  </el-input>
	                </el-form-item>
                </el-col>

             </el-row>
            </div>

            <h3 class="sub-title">备注信息</h3>
            <div class="postInfo-container">
            	<el-row :gutter="divgutter">

            		<el-col :span="24">
	               <!-- <el-form-item label-width="index.html" label="费用合计" class="postInfo-container-item" style="width: 100%;">-->
	                  <el-input type="textarea":rows="5" placeholder="(选填)" v-model="customerData.inputrequest_description">
	                  </el-input>
	               <!-- </el-form-item>-->
                </el-col>

             </el-row>
            </div>
            <div style="overflow: hidden;padding-top: 10px;" >
            	<el-button type="primary" style="float:right; width: 120px; height: 40px;" @click="submitInfo('customerData',1)">提交</el-button>
            	<el-button style="float:right; width: 120px; height: 40px;margin-right: 40px;" @click="submitInfo('customerData',2)" v-if="this.$route.name == 'detailinputrequest'||this.$route.name =='detailsalessupplement'">暂存</el-button>
            </div>
          </el-col>
          <el-col :span="10" :gutter="divgutter" class="right" style="padding: 40px">
	          	<h3>审核流程</h3>
	          	<div style="position: relative;">
							  <el-steps direction="vertical" process-status="success">
							  	<el-step v-for="item,index in auditProcess" class="step-pl">
							  		<template slot="title" v-if="item.name !=''">{{item.task_title}}({{item.name}})</template>
							  		<template slot="title" v-else>{{item.task_title}}{{item.name}}</template>
							  		<template slot="title">
							  			<span class="step-date-fl">{{item.create_time|FormatDate('1',item.create_time)}}</span>
							  			<span class="step-time-fl">{{item.create_time|FormatDate('2',item.create_time)}}</span>
							  		</template>
							  		<template slot="description">
							  			<div v-html="item.msg" style="padding-bottom: 40px;"> </div>
							  		</template>
							  		<template slot="icon" v-if="index == auditProcess.length-1">
							  			<svg-icon icon-class="finish1" style="width: 18px; height: 18px;"></svg-icon>
							  		</template>
							  		<template slot="icon" v-else>
							  			<svg-icon icon-class="finish" style="width: 18px; height: 18px;"></svg-icon>
							  		</template>
							  	</el-step>
							  </el-steps>
							</div>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <el-dialog title="影像资料" :visible.sync="imgDialog" width="990px">
      <div style="position: absolute;left: 100px;top: 15px">
        <span>（</span><span style="text-decoration: underline;color: #bdc2cb;cursor: pointer" @click="imgDownload">打包下载</span><span>）</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="aliUploadHost"
            :data="imgDataRequest"
            :accept="thisUploadType"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :disabled="uploadBool"
            :multiple="true"
            :limit="100"
            :show-file-list="false"
            style="text-align: right">
            <el-button size="small" type="primary" :disabled="uploadBool" :loading="uploadBool">{{uploadBool ? '上传中' : '点击上传' }}</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" id="selectMenu">
          <el-menu
            ref="selectMenu"
            class="el-menu-vertical-demo"
            @select="imgChange"
            :index="imgSelectVal"
            :default-active="1">
            <template v-for="item in imgTypes">
              <div v-if="item.index == 1" style="padding-left: 20px;font-size: 18px;height: 40px;line-height: 40px;font-weight: bold">照片</div>
              <div v-if="item.index == 7" style="padding-left: 20px;font-size: 18px;height: 40px;line-height: 40px;font-weight: bold">视频</div>
              <el-menu-item :index="item.index" style="height: 30px;line-height: 30px" :dataindex="item.index" class="imgmenuitem">
                <span slot="title">{{item.title,imgSum[item.index],item.index | imgSumFilter}}</span>
              </el-menu-item>
            </template>

          </el-menu>
        </el-col>
        <el-col :span="18">
          <template v-if="imgCompleted">
            <el-button size="small" type="primary" @click="delImg" style="position: absolute; right: 0; bottom: 60px;z-index: 999;">删除当前图片</el-button>
          </template>
          <div style="width: 100%;height: 616px;background-color: #F6F7FA;">
            <template v-if="imgCompleted">
              <div class="images" v-viewer="{movable: true,inline: true,navbar: true,url: 'data-original'}">
                <img v-for="src in imgShow" :src="src.thumb_file" :data-original="src.file_path" :key="src.file_id" style="width: 100px;height: 200px;display: none;">
              </div>
            </template>
            <div v-show="videoCompleted">
              <div style="width:100%;height:555px;">
                <video id="mainVideo" width="100%" :src="videoSrc" height="100%" controls v-if="videoSrc != ''">
                  <source :src="videoSrc"  type="video/mp4">
                </video>
              </div>
              <div style=" border-top: 1px solid #ffffff;width: 100%;height: 65px;" v-if="videoCompleted && videoRefresh">
                <div style="position: relative;width: 100%;height: 84px;overflow-x: scroll;overflow-y: hidden">
                  <ul style="position: absolute;top: 0;padding: 0;height: 60px;margin: 0;" >
                    <li style="position: relative;width: 60px;height:60px;border: 1px solid lightgray;display: inline-block" v-for="src in imgShow">
                      <div class="videoMeng" @click="videoChange(src.file_path,src.file_id)" :data-id="src.file_id" :data-src=src.file_path style="width: 100%;height: 100%;position: absolute;top: 0;z-index: 1000;">
                      </div>
                      <!--删除视频按钮-->
                      <template v-if="videoCanDel">
                        <div @click="delvideo(src.file_path,src.file_id,src.id)" style="width: 15px; height: 15px; position: absolute;top: 0;right: 0;background-image: url(data:image/jpeg;base64,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TQQhAAAAAABdAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAFwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAQwAgADIAMAAxADcAAAABADhCSU0EBgAAAAAABwAEAAAAAQEA/+ENw2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmI3MGMyZTM3LTFkYzgtMTFlOC1iMDlkLWExMTRmM2Y5ZDIxMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MjE4YjM0NC05MzU1LWJkNDAtOGRmNC00NGNjOTUwNTAyMGIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iN0RBNjdBQjQ4M0RDMUQ0NUFBNEJDREU0NzUyN0JFNzgiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDMtMDJUMTE6MjA6MTMrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzM5MzQ4YjItZmJjYi1hYjRlLWIyZjktOTY5OTM5MDBjMmUzIiBzdEV2dDp3aGVuPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyMThiMzQ0LTkzNTUtYmQ0MC04ZGY0LTQ0Y2M5NTA1MDIwYiIgc3RFdnQ6d2hlbj0iMjAxOC0wMy0wMlQxMToyMToxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGQAAAAAAP/bAEMABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AAAsIABQAFAEBEQD/3QAEAAP/xADSAAAABwEBAQEBAAAAAAAAAAAEBQMCBgEABwgJCgsQAAIBAwMCBAIGBwMEAgYCcwECAxEEAAUhEjFBUQYTYSJxgRQykaEHFbFCI8FS0eEzFmLwJHKC8SVDNFOSorJjc8I1RCeTo7M2F1RkdMPS4ggmgwkKGBmElEVGpLRW01UoGvLj88TU5PRldYWVpbXF1eX1ZnaGlqa2xtbm9jdHV2d3h5ent8fX5/c4SFhoeIiYqLjI2Oj4KTlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAgBAQAAPwDpnmLzDrnmzXLvR9HuxbWVqsggtxIYXvHhNHAYfaYmvpx1VeC82yM6JZ68q3upWNy+mppasbm6kdoQJV/3RQ1DzN9n02X/AFvtZOP+Vqy/4M+t8E/T/q/U/Tp8HPjz9fj/AC+n8XCv958Gf//Qk1noirr9zY6jejS00yR5Lq5LcZQIWqpg7tNICrR0/wBb4sO9e16x82WEoWU6bc6YXuLa1uHAiu4gAC7EAAXgHb4vtf8AARv9EX3+H/056Z+o/Wvq3L34/bp/xk/dV/mz/9Hr35rf4N9ZPrXq/p/gPT+qcefCvw+vz+Dj14V/efyZz7Sf0B9ej/Tf1r6jX4vq3Cvty/b+fpfFndf+dX/wv/x7/wCHPq/t6HoU/wA/8rl/lZ//2Q==);background-size: 100% 100%; z-index: 1001"></div>
                      </template>
                      <video class="list-video" width="60" height="60">
                        <source :src=src.file_path  type="video/mp4">
                      </video>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import Upload from '@/components/Upload/singleImage3'
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import { userSearch } from '@/api/remoteSearch'
import { getAdminToken } from '@/utils/auth'
import detailApi from '@/api/detailApi'
import Viewer from 'v-viewer'
import crypto from 'crypto' // 用于md5
import $ from 'jquery' // 用于通过dom获取图片index

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
	},

		/**
			* 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
			*
			* @param num1被除数 | num2除数
			*/
			'div': function(num1, num2) {
		    	var baseNum1 = 0, baseNum2 = 0;
		    	var baseNum3, baseNum4;
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

		      baseNum3 = Number(num1.toString().replace(".", ""));
		      baseNum4 = Number(num2.toString().replace(".", ""));
		     return parseInt((baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1) * 10000) / 10000;

			}
}

export default {
  name: 'articleDetail',
  components: { Upload, Viewer},
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
        // return false;
				return callback(new Error('此项为必填项'));
      } else if(!/^(0|[1-9][0-9]*)$/.test(value)){
      	return callback(new Error('请填写正确信息'));
      } else {
				return callback();
			}
  }

 const checkMoney2 = (rule, value, callback) => {
      if (!value) {
        // return false;
				return callback();
      } else if(!/^(0|[1-9][0-9]*)$/.test(value)){
      	return callback(new Error('请填写正确信息'));
      } else {
				return callback();
			}
  }
 //费用合计
const checkMoney1 = (rule, value, callback) => {
	if(!value){
		return callback();
	}else if(!/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(value)){
  	return callback(new Error('请填写正确的信息'));
  }else{
  	return callback();
  }
}

const checkMoney3 = (rule, value, callback) => {
	if(!value){
		return callback(new Error('此项为必填项'));
	}else if(!/^(0|[1-9][0-9]*)(\.\d{1,2})?$/.test(value)){
  	return callback(new Error('请填写正确的信息'));
  }else{
  	return callback();
  }
}

	const checkEmpty = (rule, value, callback) => {
		if (!value) {
			return callback(new Error('此项为必填项'));
		} else {
			return callback();
		}
	}

	const checkNo = (rule, value, callback) => {
		if (!value) {
			return callback(new Error('此项为必填项'));
		}else if(!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)){
			// /[^\d|.]/
			///^\d+(\.\d+)?$/
			return callback(new Error('请填写正确信息'));
		} else {
			return callback()
		}
	}

	const checkPhone = (rule, value, callback) => {
		if (!value) {
			return callback(new Error('此项为必填项'));
		} else if(!(/^1[34578]\d{9}$/.test(value))){
			// /[^\d|.]/
			///^\d+(\.\d+)?$/
			return callback(new Error('请填写正确信息'));
		} else {
			return callback();
		}
	}
	const checkVehicle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项为必填项'));
      } else if(!(/^[a-zA-Z0-9]{17}$/.test(value))){
      	// /[^\d|.]/
      	///^\d+(\.\d+)?$/
      	return callback(new Error('此项为17数字和字母组合'));
      } else {
				return callback();
			}
    }
    return {
      // 影像资料
      uploadBool: false,
      videoRefresh: true,
      videoSrc: '', // 当前播放的视频地址
      aliUploadHost: '', // 图片上传host
      aliUploadHost2: '', // 视频上传host
      imgDir: '', // 图片上传dir备份
      imgDir2: '', // 视频上传dir备份
      imgData: {}, // 上传图片需要的表单
      imgData2: {}, // 上传视频需要的表单
      img_add: {}, // 添加过的图片
      img_delete: {}, // 删除过的图片
      imgDialog: false, // 图片弹窗是否弹出
      resResult: [], // 借口拿到的图片备份（暂时没用）
      resImages: [], // 接口拿到的图片
      imgTypes: [ // 图片种类（写死）
        {index: 1, title: '身份证'},
        {index: 2, title: '授权书'},
        {index: 3, title: '征信报告'},
        {index: 4, title: '户口本'},
        {index: 5, title: '房产证明'},
        {index: 6, title: '银行流水'},
        {index: 12, title: '驾驶证'},
        {index: 13, title: '公司合同'},
        {index: 14, title: '收入证明'},
        {index: 15, title: '其他'},
        {index: 18, title: '车商资料'},
        {index: 7, title: '面签视频'},
        {index: 8, title: '家访视频'}
      ],
      imgSelectVal: 1, // 当前选择的图片种类
      imgOnUpload: [], // 当前正在上传的图片（防止上传成功前切换分组导致上传分组错误）
    	// 表单数据
    	customerData:{
    		customer_name: '',
    		customer_sex:'',
    		customer_age:'',
	    	customer_certificate_number:'',
	    	customer_telephone:null,
	    	hukou:'',
	    	customer_address:'',
				customer_marital_status:'1',
				customer_has_bondsman:'1',
				customer_company_phone_number:'',
				customer_company_name:'',
				company_address:'',
				spouse_name:'',
				spouse_certificate_number:'',
				spouse_telephone:'',
				spouse_company_telephone:'',
				spouse_company_name:'',
				constract_no:'',
				product_class_number:'XC',
				car_brand:'',
				car_type:'',
				car_price:'',
				car_vehicle_identification_number:'',
				loan_bank:'03',
				loan_prize:'',
				loan_date:'12个月',
				first_pay:'',
				first_pay_ratio:'',
				loan_rate:'',
				has_insurance:'1',
				commercial_insurance:'',
				compulsory_insurance:'',
				vehicle_vessel_tax:'',
				gross_premium:'',
				total_expense:'',
				inputrequest_description:'',
				//担保人信息
				bondsman_name:'',
				bondsman_certificate_number:'',
				bondsman_telephone:'',
				bondsman_company_telephone:'',
				bondsman_company_name:'',
				bondsman_company_address:'',
				bondsman_spouse_name:'',
				bondsman_spouse_idcard:'',
				//人行征信
				inquire_result:'1',
				inquire_description:'',
				//来源信息
				product_name:'',//产品名称
				salesman_city:'',//业务地区
				visitor_name:'',//家访人员
				merchant_name:'',//申请件来源
				salesman_name:'',//业务人员
				create_time:'',//申请时间
				//联系人信息
				contacts_man_name:'',//联系人姓名
				contacts_man_relationship:'1',//联系人关系
				contacts_man_certificate_number:'',//联系人身份证号码
				contacts_man_telephone:'',//联系人手机号码
				//车行信息
				carshop_name:'',
				carshop_address:'',
				loan_card:'信用卡贷款',
				//提交接口所的信息
				token: getAdminToken(),
				work_id: this.$route.query.id,
				item_instance_id: this.$route.query.item_instance_id,
				type:1,//1表示提交
        imgs: ''
			},
			zcFlag: true,
			tjFlag: true,
     //请求得数据
      requestData:{
				token:getAdminToken(),
				work_id: this.$route.query.id,
				item_instance_id: this.$route.query.item_instance_id
			},
			route_name: this.$route.name,
    	//审核流程数据
			auditProcess: [],
    	labelwidth: '76px',
    	space:'200px',
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
        source_uri: [{ validator: validateSourceUri}],
        customer_name: [{validator: checkEmpty, trigger: 'blur' }],
        spouse_name: [{validator: checkEmpty, trigger: 'blur' }],
        spouse_certificate_number: [{validator: checkNo, trigger: 'blur' }],
        customer_certificate_number: [{validator: checkNo, trigger: 'blur' }],
//      spouse_certificate_number: [{validator: checkNo, trigger: 'blur' }],
        customer_telephone:[{validator: checkPhone, trigger: 'blur' }],
        hukou: [{validator: checkEmpty, trigger: 'blur' }],
        customer_address: [{validator: checkEmpty, trigger: 'blur' }],
        customer_company_name:[{validator: checkEmpty, trigger: 'blur' }],
        spouse_telephone: [{validator: checkPhone, trigger: 'blur' }],
//      spouse_telephone: [{validator: checkEmpty, trigger: 'blur' }],
        car_brand: [{validator: checkEmpty, trigger: 'blur' }],
        car_type: [{validator: checkEmpty, trigger: 'blur' }],
        car_price: [{validator: checkMoney, trigger: 'blur' }],
        car_vehicle_identification_number: [{validator: checkVehicle, trigger: 'blur' }],
        first_pay: [{validator: checkMoney, trigger: 'change' }],
        loan_prize: [{validator: checkMoney, trigger: 'change' }],
        loan_rate: [{validator: checkMoney3, trigger: 'blur' }],
        bondsman_name: [{validator: checkEmpty, trigger: 'blur' }],
        bondsman_certificate_number: [{validator: checkNo, trigger: 'blur' }],
        bondsman_telephone: [{validator: checkPhone, trigger: 'blur' }],
        commercial_insurance: [{validator: checkMoney2, trigger: 'blur' }],
        compulsory_insurance: [{validator: checkMoney2, trigger: 'blur' }],
        vehicle_vessel_tax: [{validator: checkMoney2, trigger: 'blur' }],
        total_expense: [{validator: checkMoney1, trigger: 'blur' }],
      }
    }
  },
  computed: {
    videoCanDel(){
      if(this.$route.name == 'detailinputrequest' || this.$route.name == 'detailsalessupplement' || this.$route.name == 'changetask'){
        return true
      } else {
        return false
      }
    },
    imgSum(){
      var _this = this
      var sum = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '12': 0,
        '13': 0,
        '14': 0,
        '15': 0,
        '18': 0
      }
      for(var i in _this.resImages){
        var imgType = _this.resImages[i].file_class_id
        if(sum.hasOwnProperty(imgType)){
            sum[imgType]++
        }
      }
      return sum
    },
    thisUploadType(){
      if(this.imgSelectVal == '7' || this.imgSelectVal == '8'){
        return 'video/*'
      } else {
        return 'image/*'
      }
    },
    imgShow(){
      var _this = this
      var putImages = []
      for(var i in _this.resImages){
        if(_this.resImages[i].file_class_id == _this.imgSelectVal){
//          if(_this.resImages[i].hasOwnProperty('work_id')){
//            if(_this.imgSelectVal == 7 || _this.imgSelectVal == 8){
//              _this.resImages[i].file_path = 'http://static02.ifcar99.com/jcjr/data/upload/video/20180108/e95da92c47b8bc034553639ba5ee584b.mp4'
//              _this.resImages[i].thumb_file = 'http://static02.ifcar99.com/jcjr/data/upload/video/20180108/e95da92c47b8bc034553639ba5ee584b.mp4'
//            } else {
//              _this.resImages[i].file_path = "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"
//              _this.resImages[i].thumb_file = "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"
//            }
//          }
          putImages.push(_this.resImages[i])
        }
      }
      return putImages
    },
    imgDataRequest(){
      if(this.imgSelectVal == 7 || this.imgSelectVal == 8){
        return this.imgData2
      } else {
        return this.imgData
      }
    },
    imgCompleted(){
      if(this.imgShow.length > 0){
          if(this.imgSelectVal != 7 && this.imgSelectVal != 8){
            return true
          } else {
              return false
          }
      } else {
        return false
      }
    },
    videoCompleted(){
        if(this.imgSelectVal == 7 || this.imgSelectVal == 8){
            return true
        } else {
            return false
        }
    },
  	pagedata(){
      var _this = this
      var imgsdata = {
        'add': _this.img_add,
        'delete': _this.img_delete
      }
  		return {
        // 计时器
        timea: null,
  			token: getAdminToken(),
				work_id: this.$route.query.id,
				type:1,//1表示提交
  			customer_name: this.customerData.customer_name,
  			customer_sex: this.discriCardSex,
  			customer_age: this.discriCardAge,
	    	customer_certificate_number:this.customerData.customer_certificate_number,
	    	customer_telephone:this.customerData.customer_telephone,
	    	hukou:this.customerData.hukou,
	    	customer_address:this.customerData.customer_address,
				customer_marital_status:this.customerData.customer_marital_status,
				customer_has_bondsman:this.customerData.customer_has_bondsman,
				customer_company_phone_number:this.customerData.customer_company_phone_number,
				customer_company_name:this.customerData.customer_company_name,
				company_address:this.customerData.company_address,
				spouse_name:this.customerData.spouse_name,
				spouse_certificate_number:this.customerData.spouse_certificate_number,
				spouse_telephone:this.customerData.spouse_telephone,
				spouse_company_telephone:this.customerData.spouse_company_telephone,
				spouse_company_name:this.customerData.spouse_company_name,
				constract_no:this.customerData.constract_no,
				product_class_number:this.customerData.product_class_number,
				car_brand:this.customerData.car_brand,
				car_type:this.customerData.car_type,
				car_price:this.customerData.car_price,
				car_vehicle_identification_number:this.customerData.car_vehicle_identification_number,
				loan_bank:this.customerData.loan_bank,
				loan_prize:this.customerData.loan_prize,
				loan_date:this.customerData.loan_date,
				first_pay:this.customerData.first_pay,
				loan_rate:this.customerData.loan_rate,
				has_insurance:this.customerData.has_insurance,
				insurance_company:this.customerData.insurance_company,
				commercial_insurance:this.customerData.commercial_insurance,
				compulsory_insurance:this.customerData.compulsory_insurance,
				vehicle_vessel_tax:this.customerData.vehicle_vessel_tax,
				total_expense:this.customerData.total_expense,
				inputrequest_description:this.customerData.inputrequest_description,
				//担保人信息
				bondsman_name:this.customerData.bondsman_name,
				bondsman_certificate_number:this.customerData.bondsman_certificate_number,
				bondsman_telephone:this.customerData.bondsman_telephone,
				bondsman_company_telephone:this.customerData.bondsman_company_telephone,
				bondsman_company_name:this.customerData.bondsman_company_name,
				bondsman_company_address:this.customerData.bondsman_company_address,
				bondsman_spouse_name: this.customerData.bondsman_spouse_name,
				bondsman_spouse_idcard: this.customerData.bondsman_spouse_idcard,
				//联系人信息
				contacts_man_name: this.customerData.contacts_man_name,//联系人姓名
				contacts_man_relationship: this.customerData.contacts_man_relationship,//联系人关系
				contacts_man_certificate_number: this.customerData.contacts_man_certificate_number,//联系人身份证号码
				contacts_man_telephone: this.customerData.contacts_man_telephone,//联系人手机号码
//			loan_prize: this.customerData.loan_prize,
  			first_pay_ratio: this.firstPayRatio,
  			gross_premium: this.grossPremium,
  			//车行信息
				carshop_name:this.customerData.carshop_name,
				carshop_address: this.customerData.carshop_address,
        imgs: JSON.stringify(imgsdata)
  		}
  	},
  	nowDay(){//来源信息申请时间
	       function p(s) {
	           return s < 10 ? '0' + s: s;
	       }
	       var myDate = new Date(this.customerData.create_time*1000);
	       var year=myDate.getFullYear();
	       var month=myDate.getMonth()+1;
	       var date=myDate.getDate();
	       var h=myDate.getHours();       //获取当前小时数(0-23)
	       var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	       var s=myDate.getSeconds();
		   	 var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
	       return now;
	  },
    contentShortLength() {
      return this.postForm.content_short.length
    },

    //首付比例 首付款/车辆价格*100%
    firstPayRatio(){
     if( !this.customerData.car_price ||!/^[1-9]\d*$/.test(this.customerData.car_price) || this.customerData.car_price == '' || !this.customerData.first_pay ||!/^[1-9]\d*$/.test(this.customerData.first_pay) || this.customerData.first_pay == ''){
    		return this.customerData.first_pay_ratio = '';
    	}else{
        var num1 = Number(this.customerData.first_pay)/Number(this.customerData.car_price)*100;
        return this.customerData.first_pay_ratio = num1.toFixed(2);
      }
    },
    grossPremium(){
    	var grossPremium = this.customerData.gross_premium;
    	var commercial_insurance = this.customerData.commercial_insurance;
    	var compulsory_insurance = this.customerData.compulsory_insurance;
    	var vehicle_vessel_tax  = this.customerData.vehicle_vessel_tax;
    	var num1,num2;
    	if(commercial_insurance == '' || !/^(0|[1-9][0-9]*)$/.test(commercial_insurance)){
    		commercial_insurance = 0;
    	}
    	if(compulsory_insurance == 0 || !/^(0|[1-9][0-9]*)$/.test(compulsory_insurance)){
    		compulsory_insurance = 0;
    	}
    	if(vehicle_vessel_tax == '' || !/^(0|[1-9][0-9]*)$/.test(vehicle_vessel_tax)){
    		vehicle_vessel_tax = 0;
    	}
    	if(commercial_insurance == '' && compulsory_insurance == '' && vehicle_vessel_tax==''){
    		return grossPremium = '';
    	}else if( !/^(0|[1-9][0-9]*)$/.test(commercial_insurance)&&!/^(0|[1-9][0-9]*)$/.test(compulsory_insurance)&&!/^(0|[1-9][0-9]*)$/.test(vehicle_vessel_tax)){
    		return grossPremium = '';
    	}else{
    		num1 = FloatFun.add(Number(commercial_insurance),Number(compulsory_insurance));
	       num2 = FloatFun.add(num1,Number(vehicle_vessel_tax)).toFixed(2);
	    	 return grossPremium = num2;
    	}

    },
    customerDataRequest(){ // 实际提交的数据（加入img）
      var data = this.customerData
      var img = {'add':this.img_add,'delete':this.img_delete}
      data.img = JSON.stringify(img)
      return data
    },
    customerMaritalStatus(){//判断是否已婚或者离婚
    	if( this.customerData.customer_marital_status == '2' || this.customerData.customer_marital_status == '3' || this.customerData.customer_marital_status == '4'){//
    		return true;
    	}else{//已婚
    		return false;
    	}
    },
    //改变身份证号码
		discriCardAge()
		{
			var UUserCard = this.customerData.customer_certificate_number;
			var newAge = this.customerData.customer_age;
			if(!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(UUserCard)){
				return newAge;
			}else{
				UUserCard.substring(6,10)+"-"+UUserCard.substring(10,12)+"-"+UUserCard.substring(12,14);
				//获取年龄
				var myDate = new Date();
				var month = myDate.getMonth() + 1;
				var day = myDate.getDate();
				var age = myDate.getFullYear()-UUserCard.substring(6, 10) - 1;
				if(UUserCard.substring(10,12)<month||UUserCard.substring(10,12)==month&&UUserCard.substring(12,14)<=day){
					age++;
				}
				newAge = age;//年龄
				return newAge;
			}
		},
		discriCardSex(){
			var UUserCard = this.customerData.customer_certificate_number;
			var newSex = this.customerData.customer_sex;
			if(!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(UUserCard)){
				return newSex;
			}else{
				if(parseInt(UUserCard.substr(16,1))%2==1){
					 newSex = '男';//性别
				}else{
					 newSex = '女';//性别
				}
				return newSex;
			}

		}
  },
  created() {
    //请求展示的信息
    this.getDetailInfo()
    this.getAuditProcess()
    this.getImgs()
    this.getUploadForm()
    this.getUploadForm2()
  },
  filters: {
    imgSumFilter(title, sum, index){
        var word = ''
        if(index == 7 || index == 8){
            word = '段'
        } else {
            word = '张'
        }
        return (title + '(' + sum + word + ')')
    },
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
    productType(type) {
    	if (type == 'XC') {
	        return '新车'
	    } else {
	        return '二手车'
	    }
    },
    auditResult(value){
    	if(value == '1'){
    		return '通过'
    	}else if(value == '2'){
    		return '未通过'
    	}else if(value == '3'){
    		return '未征信'
    	}
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
    FormatDate(timestamp,type){
    	function p(s) {
	           return s < 10 ? '0' + s: s;
	       }
       var myDate = new Date(timestamp*1000);
       var year=myDate.getFullYear();
       var month=myDate.getMonth()+1;
       var date=myDate.getDate();
       var h=myDate.getHours();       //获取当前小时数(0-23)
       var m=myDate.getMinutes();     //获取当前分钟数(0-59)
       var s=myDate.getSeconds();
	   //var now=year+'-'+p(month)+"."+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
       var now = year+'.'+p(month)+"."+p(date);
       var time = p(h)+':'+p(m)+":"+p(s);
       if(type == '1'){//如果是1则返回日期，2则返回具体得时间点
       	return now;
       }else if(type == '2'){
       	return time;
       }

    }
  },
  methods: {
    uploadCar(){
      this.imgDialog = true
        setTimeout(function () {
          $(".imgmenuitem[dataindex=18]").click()
        }, 200)
    },
    // 下载方法
    imgDownload(){
      var _this = this
      var arg = {
        data: {token:getAdminToken(), work_id: _this.$route.query.id,},
        success: res => {
          if(res.error_no == 200){
            location.href = res.result
//            var id = 'downloadId'
//            var a = document.createElement('a');
//            a.setAttribute('href', res.result);
//            a.setAttribute('target', '_blank');
//            // 防止反复添加
//            if(!document.getElementById(id)) {
//              document.body.appendChild(a)
//            }
//            a.click()
          } else {
            _this.$alert(res.error_msg, '下载失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: err => {

        }
      }
      detailApi.getImgDownload(arg)
    },
    // 影像资料弹窗
    delImg(){
      var _this = this
      var imgIndex = $(".viewer-active>img").attr('data-index') // 通过jquery拿到插件当前index
      // 取url中的文件名
      function getFilenameInUrl(url){
        var arr = url.split('/')
        var arr1 = arr[arr.length-1].split('.')
        return (arr1[0])
      }
      var thisImg = {
        org: _this.imgShow[imgIndex].thumb_file, // 缩略图
        src: _this.imgShow[imgIndex].file_path, // 原图
        alt: getFilenameInUrl(_this.imgShow[imgIndex].file_path) // 文件名/fid
      }
      if(_this.imgShow[imgIndex].hasOwnProperty('id')){
          thisImg.id = _this.imgShow[imgIndex].id // 如果是刚上传的图片，添加进imgShow里面时没有id属性
      }
      if (!_this.img_delete.hasOwnProperty(_this.imgSelectVal)) {
        _this.img_delete[_this.imgSelectVal] = {
          'source_type': 'image', //_this.imgSelectVal,
          'source_lists': []
        }
      }
      _this.img_delete[_this.imgSelectVal].source_lists.push(thisImg) // 写入图片删除数组
      // 从resImages里删除对应图片
      for(var i in _this.resImages){
        if(_this.resImages[i].file_id == thisImg.alt){
          _this.resImages.splice(i, 1)
          break
        }
      }
    },
    delvideo(path,fid,id){
      var _this = this
      this.$confirm('是否删除此视频', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 取url中的文件名
        function getFilenameInUrl(url){
          var arr = url.split('/')
          var arr1 = arr[arr.length-1].split('.')
          return (arr1[0])
        }
        var thisImg = {
          org: path, // 缩略图
          src: path, // 原图
          alt: fid // 文件名/fid
        }
        if(id){
          thisImg.id = id // 如果是刚上传的图片，添加进imgShow里面时没有id属性
        }
        if (!_this.img_delete.hasOwnProperty(_this.imgSelectVal)) {
          _this.img_delete[_this.imgSelectVal] = {
            'source_type': 'video', //_this.imgSelectVal,
            'source_lists': []
          }
        }
        _this.img_delete[_this.imgSelectVal].source_lists.push(thisImg) // 写入图片删除数组
        // 从resImages里删除对应图片
        _this.videoRefresh = false
        for(var i in _this.resImages){
          if(_this.resImages[i].file_id == thisImg.alt){
            _this.resImages.splice(i, 1)
            break
          }
        }
        // 删除当前正在播放的视频时切换视频，以及视频数量为0时清空videoSrc
        var videoL = _this.imgShow.length
        if(videoL == 0){
          _this.videoSrc = ''
        } else {
          if(thisImg.src == _this.videoSrc){
            _this.videoSrc = _this.imgShow[0].file_path
          }
        }
        // 刷新dom之后再显示video列表
        _this.$nextTick(function () {
          _this.videoRefresh = true
        })
      }).catch(() => {
      })
    },
    getUploadForm(){
      var _this = this
      var arg = {
        data: {
          file_type : 'image',
          project:'anjie'
        },
        success: function (res) {
          var result = res.result
          _this.aliUploadHost = result.host
          // _this.imgData.name = '12345.jpg'
          _this.imgDir = result.dir
          // _this.imgData.key = result.dir
          _this.imgData.policy = result.policy
          _this.imgData.OSSAccessKeyId = result.accessid
          _this.imgData.success_action_status = 200
          _this.imgData.callback = result.callback
          _this.imgData['x-oss-security-token'] = result.token
          _this.imgData['x-oss-object-acl'] = result.acl
          _this.imgData.signature = result.signature
        },
        error: function (err) {
        }
      }
      detailApi.uploadForm(arg)
    },
    getUploadForm2(){
      var _this = this
      var arg = {
        data: {
          file_type : 'video',
          project:'anjie'
        },
        success: function (res) {
          var result = res.result
          _this.aliUploadHost2 = result.host
          // _this.imgData.name = '12345.jpg'
          _this.imgDir2 = result.dir
          // _this.imgData.key = result.dir
          _this.imgData2.policy = result.policy
          _this.imgData2.OSSAccessKeyId = result.accessid
          _this.imgData2.success_action_status = 200
          _this.imgData2.callback = result.callback
          _this.imgData2['x-oss-security-token'] = result.token
          _this.imgData2['x-oss-object-acl'] = result.acl
          _this.imgData2.signature = result.signature
        },
        error: function (err) {
        }
      }
      detailApi.uploadForm(arg)
    },
    uploadSuccess(response, file, fileList){
      var _this = this
      // 按钮变亮
      this.uploadBool = false
      // 确定imgClass并从上传中数组删除对应文件
      var uploadClass = _this.imgSelectVal
      for(var i in fileList){
        var upArrL = _this.imgOnUpload.length-1
        for(var k = upArrL; k >= 0; k--){
          if(_this.imgOnUpload[k].uploadId == fileList[i].response.result.fid){
            uploadClass = _this.imgOnUpload[k].uploadClass // 设置imgclass
            _this.imgOnUpload.splice(k,1) // 删除对应文件
            break
          }
        }
      }
      // 添加文件
      if (!_this.img_add.hasOwnProperty(uploadClass)) {
        var imgType = 'image'
        if(uploadClass == '7' || uploadClass == '8'){
         imgType = 'video'
        }
        _this.img_add[uploadClass] = {
          'source_type': imgType,//uploadClass,
          'source_lists': []
        }
      }
      var addObj = { obj : [] , obj1: []}
      for(var i in fileList){
        var obj = {
          org: fileList[i].response.result.url, // 缩略图
          src: fileList[i].response.result.url, // 原图
          alt: fileList[i].response.result.fid // 文件名/fid
        }
        var obj1 = {
          file_class_id: uploadClass, // class_id
          file_id: fileList[i].response.result.fid, // 文件名/fid
          file_path: fileList[i].response.result.url, // 原图
          thumb_file: fileList[i].response.result.url // 缩略图
        }
        addObj.obj.push(obj)
        addObj.obj1.push(obj1)
      }
      for(var i in addObj.obj){
        _this.img_add[uploadClass]['source_lists'].push(addObj.obj[i])
      }
      for(var i in addObj.obj1){
        _this.resImages.push(addObj.obj1[i])
      }
      _this.$refs.upload.clearFiles()
    },
    beforeUpload(file){
      const isPic = (file.type === 'image/bmp' || file.type === 'image/jpeg' || file.type === 'image/png')
      var isVid = /^(video\/)/.test(file.type)
      const thisval = this.imgSelectVal
      const isLt2M = file.size / 1024 / 1024 < 2;

//      if (!isLt2M) {
//        this.$message.error('上传头像图片大小不能超过 2MB!');
//      }
      // 传入md5后的文件名与key（避免key重复导致上传失败）
      var filenameMd5 = file.name.split('.')[0] + file.uid
      var fileEx = file.name.split('.')[1].toLowerCase() // 大写后缀转小写
      const md5 = crypto.createHash('md5')
      md5.update(filenameMd5)
      var md5Fid = md5.digest('hex')
      if(this.imgSelectVal == 7 || this.imgSelectVal == 8){
        if (!isVid) {
          this.$message.error('上传视频只能是 MP4/MPG/MOV/AVI 格式!');
          return false
        }
        this.imgData2.name = md5Fid + '.' + fileEx
        this.imgData2.key = this.imgDir2 + this.imgData2.name
      } else {
        if (!isPic) {
          this.$message.error('上传图片只能是 JPG/PNG/BMP 格式!');
          return false
        }
        this.imgData.name = md5Fid + '.' + fileEx
        this.imgData.key = this.imgDir + this.imgData.name
      }
      // 按钮变灰
      this.uploadBool = true
      // 写入上传中数组
      var uploadObj = {
        uploadClass: thisval,
        uploadId: md5Fid
      }
      this.imgOnUpload.push(uploadObj)
    },
    imgChange(index){
      this.imgSelectVal = index
    },
    videoChange(src,id){
      this.videoSrc = src
    },
    imgModal(){
      console.log('123321')
      this.imgDialog = true
      setTimeout(function () {
        $(".imgmenuitem[dataindex=1]").click()
      }, 200)
    },
    getImgs() {
      var _this = this
      var arg = {
        data: _this.requestData,
        success: function (res) {
          if(res.error_no == 200){
            _this.resResult = res.result
            _this.resImages = res.result
          }
        },
        error: function (err) {

        }
      }
      detailApi.getListImgs(arg)
    },
    //请求数据后赋值左侧对应数据
    getDetailInfo(){
      var _this = this
      var arg = {
        data: _this.requestData,
        success: res=>{
          if(res.error_no == 200){
            	//个人基本信息
	  					this.customerData.customer_name = res.result.customer_name;//姓名
	  					this.customerData.customer_sex = res.result.customer_sex;//性别
	  					this.customerData.customer_age = res.result.customer_age;//年龄
	  					this.customerData.hukou = res.result.hukou;//户口
	  					this.customerData.customer_certificate_number = res.result.customer_certificate_number;//身份证号码
	  					if(res.result.customer_has_bondsman == '' || res.result.customer_has_bondsman == null){
	  						this.customerData.customer_has_bondsman = '1';
	  					}else{
	  						this.customerData.customer_has_bondsman = res.result.customer_has_bondsman;//有无担保人
	  					}
	  					this.customerData.customer_telephone = res.result.customer_telephone;//个人电话
	  					this.customerData.customer_company_phone_number = res.result.customer_company_phone_number;//单位电话
	  					if(res.result.customer_marital_status == '' || res.result.customer_marital_status == null){
	  						this.customerData.customer_marital_status = '1'
	  					}else{
	  						this.customerData.customer_marital_status = res.result.customer_marital_status;//婚姻状况
	  					}
	  					this.customerData.customer_company_name = res.result.customer_company_name//工作单位
	  					this.customerData.company_address = res.result.company_address;//单位地址
	  					this.customerData.customer_address = res.result.customer_address//居住地址

            	//配偶信息
		  				this.customerData.spouse_name = res.result.spouse_name;//配偶姓名
		  				this.customerData.spouse_certificate_number = res.result.spouse_certificate_number;//配偶身份证号
		  				this.customerData.spouse_telephone = res.result.spouse_telephone;//配偶手机号
		  				this.customerData.spouse_company_telephone = res.result.spouse_company_telephone;//配偶单位电话
		  				this.customerData.spouse_company_name = res.result.spouse_company_name;//配偶工作单位

							if(res.result.contacts_man_relationship == '' || res.result.contacts_man_relationship == null){
	  						this.customerData.contacts_man_relationship = ''
	  					}else{
	  						this.customerData.contacts_man_relationship = res.result.contacts_man_relationship;//婚姻状况
	  					}

		  				//联系人信息
							this.customerData.contacts_man_name = res.result.contacts_man_name;//联系人姓名
		  				this.customerData.contacts_man_certificate_number = res.result.contacts_man_certificate_number;//联系人身份证号码
		  				this.customerData.contacts_man_telephone = res.result.contacts_man_telephone;//联系人手机号码

            	//担保人信息
		  				this.customerData.bondsman_name = res.result.bondsman_name;
		  				this.customerData.bondsman_certificate_number = res.result.bondsman_certificate_number;
		  				this.customerData.bondsman_telephone = res.result.bondsman_telephone;
		  				this.customerData.bondsman_company_telephone = res.result.bondsman_company_telephone;
		  				this.customerData.bondsman_company_name = res.result.bondsman_company_name;
		  				this.customerData.bondsman_company_address = res.result.bondsman_company_address;
		  				this.customerData.bondsman_spouse_name = res.result.bondsman_spouse_name;
		  				this.customerData.bondsman_spouse_idcard = res.result.bondsman_spouse_idcard;

            	//商品信息
		  				this.customerData.constract_no = res.result.constract_no;//合同编号
		  				this.customerData.car_brand = res.result.car_brand;//车辆品牌

		  				if(res.result.product_class_number == '' || res.result.product_class_number == null){
		  					this.customerData.product_class_number = 'XC';//车辆类型
		  				}else{
		  					this.customerData.product_class_number = res.result.product_class_number;//车辆类型
		  				}
		  				this.customerData.car_type = res.result.car_type;//车辆型号
		  				if(res.result.car_price == null){
		  					this.customerData.car_price = '';
		  				}else{
		  					this.customerData.car_price = res.result.car_price;//车辆价格
		  				}
						  this.customerData.car_vehicle_identification_number = res.result.car_vehicle_identification_number;//车架号
              if(res.result.loan_bank == '' || res.result.loan_bank == null) {
                this.customerData.loan_bank = '03';//贷款银行
              } else {
                this.customerData.loan_bank = res.result.loan_bank;//贷款银行
              }

		  				if(res.result.loan_prize == null){
		  					this.customerData.loan_prize = '';
		  				}else{
		  					this.customerData.loan_prize = res.result.loan_prize;//贷款金额
		  				}

		  				if(res.result.loan_date == '' || res.result.loan_date == null){
                this.customerData.loan_date = '';//贷款期数
              } else {
                this.customerData.loan_date = res.result.loan_date;//贷款期数
              }

		  				if(res.result.first_pay == null){
		  						this.customerData.first_pay = '';
		  				}else{
		  						this.customerData.first_pay = res.result.first_pay;//首付款
		  				}
							this.customerData.first_pay_ratio = res.result.first_pay_ratio;//首付比例
							this.customerData.loan_rate = res.result.loan_rate;//利率
							if(res.result.has_insurance == '' || res.result.has_insurance == null){
								this.customerData.has_insurance = '1';//有无保险
							}else{
								this.customerData.has_insurance = res.result.has_insurance;//有无保险
							}

							if(res.result.commercial_insurance == null){
								this.customerData.commercial_insurance = '';//商业险
							}else{
								this.customerData.commercial_insurance = res.result.commercial_insurance;//商业险
							}

							if(res.result.compulsory_insurance == null){
								this.customerData.compulsory_insurance = '';
							}else{
								this.customerData.compulsory_insurance = res.result.compulsory_insurance;//交强险
							}

						  if(res.result.vehicle_vessel_tax == null){
						  	this.customerData.vehicle_vessel_tax = '';
						  }else{
						  	this.customerData.vehicle_vessel_tax = res.result.vehicle_vessel_tax;//车船税
						  }
							this.customerData.insurance_company = res.result.insurance_company;//保险公司

							this.customerData.gross_premium = res.result.gross_premium;//保费总额
            	//车行信息
            	this.customerData.carshop_name = res.result.carshop_name;//车行名称
							this.customerData.carshop_address = res.result.carshop_address;//车行地址

            	//费用信息
							this.customerData.total_expense = res.result.total_expense;//费用合计

							//备注信息
							this.customerData.inputrequest_description = res.result.inputrequest_description;//备注信息

	            //人行征信
	            this.customerData.inquire_result = res.result.inquire_result;//审核结果
	            if(res.result.inquire_description == '' || res.result.inquire_description ==null){
	            	this.customerData.inquire_description = '无'
	            }else{
	            	this.customerData.inquire_description = res.result.inquire_description;
	            }
							//来源信息
							this.customerData.product_name = res.result.product_name;//
							this.customerData.salesman_city = res.result.salesman_city;//
							this.customerData.visitor_name = res.result.visitor_name;//
							this.customerData.merchant_name = res.result.merchant_name;//
							this.customerData.salesman_name = res.result.salesman_name;//
							this.customerData.create_time = res.result.create_time;//
          }else{
            alert(res.error_msg);
          }
        },
        error: function(){

        }
      }
      detailApi.getArtificalOneDetail(arg);
    },

    //请求右侧审核历程数据
	  	getAuditProcess (){
	  		var arg = {
	  			data:this.requestData,
	  			success: res =>{
	  				if(res.error_no == 200){
	  					 var data = res.result;
	  					 data.forEach((item,i)=>{
					    		if (item.msg=='' || item.msg==null) {
					            if (item.status == '1') {
					            item.msg = '已认领';
					            }
					            if (item.status == '4') {
					                item.msg = '待认领';
					            }
					            if (item.status == '2' &&　item.task_status=='1') {
					                item.msg = '审核已通过';
					            }
					            if (item.status == '2' &&　item.task_status=='2') {
					                item.msg = '已拒件';
					            }
					       }
					    });
	  					this.auditProcess = data;
	  				}else{
	  					this.$alert(res.error_msg, '风控初审', {
			          confirmButtonText: '确定',
			          beforeClose: (action,instance, done)=> {
			            done();
		          	}
		        	});
	  				}
	  			},
	  			error: function(){

	  			}
	  		}
	  		detailApi.getAuditProcess(arg);
	  	},



	  //提交填写的基本信息
	  submitInfo(postForm,type){
	  	var newData = this.pagedata;
	  	newData.type = type;
	  	if(this.$route.name == 'detailinputrequest' || this.$route.name == 'detailsalessupplement'){
	  		newData.item_instance_id = this.$route.query.item_instance_id;
	  	}
	  	var arg = {
	  		data:newData,
	  		success: res =>{
	  			if(res.error_no == 200){
	  				var msg = res.error_msg;
	  				if(newData.type == 2){
	  					msg = '暂存成功';
	  				}
	  				this.$alert(msg, '申请录入', {
			          confirmButtonText: '确定',
			          beforeClose: (action,instance, done)=> {
			          		this.zcFlag = true;
			           		this.tjFlag = true;
			           		done();
			           		if(this.$route.name == 'detailsalessupplement'){
			           			this.$router.push({ path: '/work/salessupplement' , query: {searchtype: '2'}});
			           		}else if(this.$route.name == 'changetask'){
			           			this.$router.push({ path: '/taskquery/taskquerymanager'});
			           		}else{
			           			this.$router.push({ path: '/work/inputrequest' , query: {searchtype: '2'}});
			           		}

		          	}
		        });
	  			}else{
	  				this.zcFlag = true;
			      this.tjFlag = true;
	  				this.$alert(res.error_msg, '申请录入', {
		          confirmButtonText: '确定',
		          beforeClose: (action,instance, done)=> {
		            done();
	          	}
	        	});
	  			}
	  		},
	  		error: function(){

	  		}
	  	}

	  	this.$confirm('是否确定提交', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消'
				}).then(() => {
				 if(newData.type == 1){//说明提交按钮
	  			this.$refs['customerData'].validate((valid) => {
						if(valid){
							if(this.tjFlag){
			  				this.tjFlag = false;
			  				if(this.$route.name == 'changetask'){
			  					detailApi.changetask(arg);
			  				}else if(this.$route.name == 'detailsalessupplement'){
			  					detailApi.salesSupplement(arg);
			  				}else{
			  					detailApi.basicInfo(arg);
			  				}
			  			}
						}else{
							this.$alert('信息不完整,请检查信息', '申请录入', {
			          confirmButtonText: '确定',
		        	});
						}
					});
		  	}else if(newData.type == 2){//说明暂存按钮
		  		if(this.zcFlag){
		  			this.zcFlag = false;
		  			detailApi.basicInfo(arg);
		  		}
		  	}
				}).catch(() => {
			});


	  },
  	show () {
	    const viewer = this.$el.querySelector('.images').$viewer
	    viewer.show()
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
  watch: {
    imgSelectVal: function (val) {
      var _this = this
      // 监听图片种类为视频时，播放视频切换为对应种类第一个视频
      if(val == 7 || val == 8){
        _this.videoRefresh = false
        for(var i in this.resImages){
          if(this.resImages[i].file_class_id == val){
            this.videoSrc = this.resImages[i].file_path
            break
          }
          // 如果没有视频，src置空
          if(i == this.resImages.length - 1){
            this.videoSrc = ''
          }
        }
        // 刷新dom之后再显示video列表
        _this.$nextTick(function () {
          _this.videoRefresh = true
        })
      } else {
        this.videoSrc = ''
      }
    },
    'customerData.first_pay': function(newval,oldval){
    	var reg = /^(0|[1-9][0-9]*)$/;
    	if(reg.test(this.customerData.car_price)&&reg.test(this.customerData.first_pay)){
    		this.customerData.loan_prize = Number(this.customerData.car_price)-Number(this.customerData.first_pay);
    	}else{
    		this.customerData.loan_prize = '';
    	}
    },
    'customerData.loan_prize': function(newval,oldval){
    	var reg = /^(0|[1-9][0-9]*)$/;
    	if(reg.test(this.customerData.car_price) && reg.test(this.customerData.loan_prize)){
    		this.customerData.first_pay = Number(this.customerData.car_price)-Number(this.customerData.loan_prize);
    	}else{
    			this.customerData.first_pay = '';
    	}
    },
    'customerData.customer_marital_status': function(newval,oldval){
    	if(this.customerData.customer_marital_status !='1'){
    		this.$refs['nameForm'].resetField();
    		this.$refs['certificateForm'].resetField();
    		this.$refs['phoneForm'].resetField();
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
      padding: 15px 10px 20px 40px;
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
  $marginBottom: 30px;
  $marginTop: 20px;
  $black: #4A4A4A;
  .sub-title{
  	margin-bottom: $marginBottom;
  	margin-top: $marginTop;
  	color: $black;
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
  .step-pl{padding-left: 113px; position: relative;}
  .step-date-fl{
  	position: absolute;
  	left: 2px;
  	font-size: 18px;
		color: #4A4A4A;
  	}
  .step-time-fl{
  	position: absolute;
  	left: 35px;
  	font-size: 14px;
		color: #4A4A4A;
		top: 30px;
  	}
  }
</style>
<style>
	body{ background:#F2F5F9;}
	.left,.right{ background: #fff;}
	.right{ margin-left: 10px;}
	.el-form-item__label{
    	text-align: left;
    	padding:0px;
    }
  .el-row-pl{ padding-left: 0;}
  .el-form-item{
  	/*margin-bottom: 10px;*/
  	font-size: 14px;
		color: #4A4A4A;
  }
  .mb{ margin-bottom: 25px;}

.el-step__icon.is-text {
    border-radius: 0;
    border: none;
    border-color: inherit;
}
.el-step__icon{
	  width: 18px;
    height: 18px;
}
.el-step.is-vertical .el-step__line{
	  width: 2px;
    top: 0;
    bottom: 0;
    left: 8px;
}
.el-step__title{
	font-size: 18px;
}
.el-step__title.is-wait{
	color: #4A4A4A;
}
.el-step__description{
	font-size: 14px;
}
.el-step__description.is-wait{
	color: #9B9B9B;
}

 .inputrequest .postInfo-container-item .el-form-item__label{
   	line-height: 36px;
   	color:#4A4A4A;
  }
  .inputrequest  .resoursces .postInfo-container-item  .el-form-item__label{
   	line-height: normal;
  }

 /*.inputrequest .select .el-form-item__content{
   	line-height: 36px;
   	color:#4A4A4A;
  }*/
.inputrequest .postInfo-container-item .el-form-item__content{
   	line-height: 36px;
   	margin-bottom: 20px;
   	color:#4A4A4A;
  }
.inputrequest  .resoursces .postInfo-container-item .el-form-item__content{
   	line-height: normal;
   	margin-bottom: 20px;
   	color:#4A4A4A;
  }
	 .el-input__inner{

		height: 36px;
	}
	.createPost-main-container .el-input{
		width: 100%;
	}
	.postInfo-container .el-form-item{
		margin-bottom: 0px;
	}
	.el-step.is-vertical .el-step__title{
		padding-bottom: 20px;
	}
	.el-textarea.is-disabled .el-textarea__inner{
		color:#4A4A4A;
	}
	 .el-input.is-disabled .el-input__inner{
		color:#4A4A4A;
	}
	.el-radio__input.is-disabled+span.el-radio__label{
		color:#4A4A4A;
	}
</style>

