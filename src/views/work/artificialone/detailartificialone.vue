<template>
  <div class="createPost-container artifitical">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">


      <div class="createPost-main-container">
        <el-row :gutter="divgutter">
          <el-col :span="13" class="left" style="padding: 40px; padding-top: 25px;">
          	<el-row :gutter="divgutter" class="mb">
          		<el-col :span="17">
          		<h2>客户基本资料</h2>
          		</el-col>
          		<el-col :span="7">
          		<h2><el-button type="primary" @click="imgModal"><svg-icon icon-class="video" style="margin-right: 10px;vertical-align: middle; width:18px; height:12px;"></svg-icon>客户影像资料</el-button></h2>
          		</el-col>
          	</el-row>

          	<el-row :gutter="divgutter">
          		  <el-col :span="12">
			          	<h3 class="sub-title">人行征信</h3>

						      	<el-row :gutter="divgutter">
						      		<el-col :span="24">
									      <el-form-item :label-width="labelwidth" label="征信结果" class="postInfo-container-item" style="width: 100%;">
									      	 <span>{{customerData.inquire_result|auditResult}}</span>
			                  </el-form-item>
								     	</el-col>
								      <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;">
			                	<span v-text="customerData.inquire_description"></span>
			                </el-form-item>
		                </el-col>
										</el-row>

						    </el-col>
						    <el-col :span="12">
					      	<h3 class="sub-title">fico数据查询<el-button type="primary" style="float:right;padding: 4px 15px;" @click="ficoquery" v-if="ficoBol">查询</el-button></h3>
		          		<div class="postInfo-container">
								      	<el-row :gutter="divgutter" v-if="customerData.retCode == '000'">
										      <el-col :span="24">
											      <el-form-item :label-width="labelwidth" label="评分分数" class="postInfo-container-item" style="width: 100%;">
					                    <span v-text="customerData.score"></span>
					                    <span style="color: blue;">&nbsp;总分850分,分数越高越好，信用越好</span>
					                  </el-form-item>
										     	</el-col>

										     	 <el-col :span="24">
											      <el-form-item :label-width="labelwidth" label="得分理由" class="postInfo-container-item" style="width: 100%;">
					                    <span v-text="customerData.reason"></span>
					                  </el-form-item>
										     	</el-col>
												</el-row>
												<el-row :gutter="divgutter" v-if="customerData.retCode == '999'">
													<el-col :span="24">

					                    <span> 用户数据不足，无法进行评分</span>

										     	</el-col>
												</el-row>

												<el-row :gutter="divgutter" v-if="customerData.retCode == '201'">
													<el-col :span="24">

					                    <span>  fico评分异常</span>

										     	</el-col>
												</el-row>

												<el-row :gutter="divgutter" v-if="ficoBol">
													<el-col :span="24">

					                    <span> fico评分系统忙，请重新查询</span>

										     	</el-col>
												</el-row>

												<el-row :gutter="divgutter" v-if="customerData.retCode == null">
													<el-col :span="24">
					                    <span> 用户暂无fico评分</span>
										     	</el-col>
										   </el-row>
								  </div>
						    </el-col>
          	</el-row>

						<h3 class="sub-title">百融失信执行查询</h3>
          	<div class="postInfo-container">
	            <el-row :gutter="divgutter" v-if="customerData.bairong_code == '00'">
						      <el-col :span="12">
							      <el-form-item :label-width="labelwidth" label="失信人姓名" class="postInfo-container-item" style="width: 100%;">
		                <span v-text="customerData.ex_bad1_name"></span>
		              </el-form-item>
						     	</el-col>

						     	 <el-col :span="12">
							      <el-form-item :label-width="labelwidth" label="执行案号" class="postInfo-container-item" style="width: 100%;">
		                <span v-text="customerData.ex_bad1_casenum"></span>
		              </el-form-item>
						     	</el-col>

						     	<el-col :span="12">
							      <el-form-item :label-width="labelwidth" label="执行法院" class="postInfo-container-item" style="width: 100%;">
		                <span v-text="customerData.ex_bad1_court"></span>
		              </el-form-item>
						     	</el-col>

						     	<el-col :span="12">
							      <el-form-item :label-width="labelwidth" label="立案日期" class="postInfo-container-item" style="width: 100%;">
		                <span v-text="transDay"></span>
		              </el-form-item>
						     	</el-col>

						     	<el-col :span="12">
							      <el-form-item :label-width="labelwidth" label="执行标的" class="postInfo-container-item" style="width: 100%;">
		                <span v-text="customerData.ex_execut1_money"></span>
		              </el-form-item>
						     	</el-col>

						     	<el-col :span="12">
							      <el-form-item :label-width="labelwidth" label="案件状态" class="postInfo-container-item" style="width: 100%;">
		                <span v-text="customerData.ex_execut1_statute"></span>
		              </el-form-item>
						     	</el-col>
							</el-row>

							<el-row :gutter="divgutter" v-if="customerData.bairong_code == '100002'" style="margin-bottom:20px;">
								<el-col :span="24" >
                  <span > {{customerData.ex_bad1_name}}无失信执行记录</span>
					     	</el-col>
							</el-row>

							<el-row :gutter="divgutter" v-if="bairongBol" style="margin-bottom:20px;">
								<el-col :span="24">
                  <span>百融征信查询系统异常</span>
					     	</el-col>
							</el-row>

							<el-row :gutter="divgutter" v-if="customerData.bairong_code == '200000'" style="margin-bottom:20px;">
								<el-col :span="12">
                  <span>百融征信查询系统服务忙，请重新查询</span>
					     	</el-col>
					     	<el-col :span="12">
                  <el-button type="primary" style="float:right; width: 80px; height: 40px;" @click="bairongquery">查询</el-button>
					     	</el-col>
							</el-row>

							<el-row :gutter="divgutter" v-if="customerData.bairong_code == '' || customerData.bairong_code == null" style="margin-bottom:20px;">
								<el-col :span="24">
                  <span> 百融征信暂无数据</span>
					     	</el-col>
							</el-row>

            </div>


						<h3 class="sub-title">来源信息</h3>
			      <div class="postInfo-container">
			      	<el-row :gutter="divgutter">
					      <el-col :span="12">
						      <el-form-item :label-width="labelwidth" label="产品类型" class="postInfo-container-item" style="width: 100%;">
                    <span v-text="customerData.product_name"></span>
                  </el-form-item>
					     	</el-col>

					     	<el-col :span="12">
						      <el-form-item :label-width="labelwidth" label="业务地区" class="postInfo-container-item" style="width: 100%;">
                    <span v-text="customerData.salesman_city"></span>
                  </el-form-item>
					     	</el-col>

					     	<el-col :span="12">
						      <el-form-item :label-width="labelwidth" label="申请件来源" class="postInfo-container-item" style="width: 100%;">
                    <span v-text="customerData.merchant_name"></span>
                  </el-form-item>
					     	</el-col>

					     	<el-col :span="12">
						      <el-form-item :label-width="labelwidth" label="业务人员" class="postInfo-container-item" style="width: 100%;">
                    <span v-text="customerData.salesman_name"></span>
                  </el-form-item>
					     	</el-col>

					     	<el-col :span="12">
						      <el-form-item :label-width="labelwidth" label="家访人员" class="postInfo-container-item" style="width: 100%;">
                    <span v-text="customerData.visitor_name"></span>
                  </el-form-item>
					     	</el-col>

					     	<el-col :span="12">
						      <el-form-item :label-width="labelwidth" label="申请时间" class="postInfo-container-item" style="width: 100%;">
                  <span v-text="nowDay"></span>
                  </el-form-item>
					     	</el-col>

							</el-row>
			      </div>



          	<h3 class="sub-title">基本信息</h3>
            <div class="postInfo-container">
              <el-row :gutter="divgutter">


                <el-col :span="12">
                	<el-form-item  label="" class="postInfo-container-item" style="width: 100%;">
                		<span>{{customerData.customer_name}} / {{customerData.customer_sex}} / {{customerData.customer_age}}</span>
	                  <!--<span v-text="customerData.customer_name"></span> /
	     							<span v-text=""></span> /
	     							<span v-text=""></span>-->
	     							 </el-form-item>
                </el-col>

								<el-col :span="12">

		                <el-form-item :label-width="labelwidth" label="户口所在地" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.hukou"></span>
		                </el-form-item>
	              </el-col>

								<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.customer_certificate_number">
	                  </span>
	                </el-form-item>
                </el-col>


                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="担保人" class="postInfo-container-item" style="width: 100%;">
	                  <span >
	                  	{{customerData.customer_has_bondsman|hasBondsman}}
	                  </span>
	                </el-form-item>
                </el-col>

								<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="手机号" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.customer_telephone">
	                  </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="单位电话" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.customer_company_phone_number">
		                  </span>
		                </el-form-item>
	              </el-col>

                 <el-col :span="24">
                  <el-form-item :label-width="labelwidth" label="婚姻状况" class="postInfo-container-item" style="width: 100%;">
                  	<span>
                  		{{customerData.customer_marital_status|maritalStatus}}
		                </span>
                  </el-form-item>
                </el-col>

                 <el-col :span="24">
		                <el-form-item :label-width="labelwidth" label="工作单位" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.customer_company_name">
		                   </span>
		                </el-form-item>
	              </el-col>

                <el-col :span="24">
		                <el-form-item :label-width="labelwidth" label="单位地址" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.company_address">
		                   </span>
		                </el-form-item>
	              </el-col>

                <el-col :span="24">
	                <el-form-item :label-width="labelwidth" label="居住地址" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.customer_address">
	                  </span>
	                </el-form-item>
                </el-col>
              </el-row>
            </div>

						<h3 v-if="isMarital" class="sub-title">联系人信息</h3>
						<div class="postInfo-container" v-if="isMarital">
							<el-row :gutter="divgutter">
								<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="联系人姓名:" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.contacts_man_name">
	                   </span>
	                </el-form-item>
	              </el-col>

	              <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="关系:" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.contacts_man_relationship|contactsManRelationship}}
	                   </span>
	                </el-form-item>
	              </el-col>

	              <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.contacts_man_certificate_number">
	                   </span>
	                </el-form-item>
	              </el-col>

	              <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="手机号:" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.contacts_man_telephone">
	                   </span>
	                </el-form-item>
	              </el-col>

							</el-row>
            </div>
            <h3 v-if="customerData.customer_marital_status == '1'" class="sub-title">配偶信息</h3>
            <div class="postInfo-container" v-if="customerData.customer_marital_status == '1'">
            	<el-row :gutter="divgutter">

            		<el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="配偶姓名:" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.spouse_name">
		                   </span>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.spouse_certificate_number">
		                  </span>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="手机号" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.spouse_telephone">
		                   </span>
		                </el-form-item>
	              </el-col>

	              <el-col :span="12">
		                <el-form-item :label-width="labelwidth" label="单位电话" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.spouse_company_telephone">
		                   </span>
		                </el-form-item>
	              </el-col>

	              <el-col :span="24">
		                <el-form-item :label-width="labelwidth" label="工作单位" class="postInfo-container-item" style="width: 100%;">
		                  <span v-text="customerData.spouse_company_name">
		                   </span>
		                </el-form-item>
	              </el-col>

               </el-row>
            </div>


            	<h3 v-if="customerData.customer_has_bondsman == '1'" class="sub-title">担保人信息</h3>
	             <div class="postInfo-container" v-if="customerData.customer_has_bondsman == '1'">
	            	<el-row :gutter="divgutter">

		            		<el-col :span="12">
				                <el-form-item :label-width="labelwidth" label="担保人姓名" class="postInfo-container-item" style="width: 100%;">
				                  <span  v-text="customerData.bondsman_name">
				                  </span>
				                </el-form-item>
			              </el-col>

			               <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;">
			                	 <span  v-text="customerData.bondsman_certificate_number">
				                 </span>
			                </el-form-item>
		             		 </el-col>

		             		 <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="手机号" class="postInfo-container-item" style="width: 100%;">
			                	 <span  v-text="customerData.bondsman_telephone">
				                 </span>
			                </el-form-item>
		             		 </el-col>

		             		 <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="单位电话" class="postInfo-container-item" style="width: 100%;">
			                	<span  v-text="customerData.bondsman_company_telephone">
				                </span>
			                </el-form-item>
		             		 </el-col>

		             		  <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="工作单位" class="postInfo-container-item" style="width: 100%;">
			                	<span  v-text="customerData.bondsman_company_name">
				                </span>
			                </el-form-item>
		             		 </el-col>

		             		 <el-col :span="24">
			                <el-form-item :label-width="labelwidth" label="单位地址" class="postInfo-container-item" style="width: 100%;">
			                	<span  v-text="customerData.bondsman_company_address">
				                </span>
			                </el-form-item>
		             		 </el-col>

		             		  <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="配偶姓名" class="postInfo-container-item" style="width: 100%;">
			                	<span  v-text="customerData.bondsman_spouse_name">
				                </span>
			                </el-form-item>
		             		 </el-col>

		             		 <el-col :span="12">
			                <el-form-item :label-width="labelwidth" label="身份证号" class="postInfo-container-item" style="width: 100%;">
			                	<span  v-text="customerData.bondsman_spouse_idcard">
				                </span>
			                </el-form-item>
		             		 </el-col>

	               </el-row>
	            </div>


            <h3 class="sub-title">商品信息</h3>
            <div class="postInfo-container">
            	<el-row :gutter="divgutter">

            		<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="合同编号" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.constract_no">
	                 </span>
	                </el-form-item>
                </el-col>


								 <el-col :span="12">
                  <el-form-item :label-width="labelwidth" label="车辆类型" class="postInfo-container-item" style="width: 100%;">
                  	<span>{{customerData.product_class_number|carType}}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车辆品牌" class="postInfo-container-item" style="width: 100%;">
	                   <span v-text="customerData.car_brand">
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
	                <el-form-item :label-width="labelwidth" label="车辆价格" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.car_price}}元
	                 </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车架号" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="customerData.car_vehicle_identification_number">
	                  </span>
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
	                <el-form-item :label-width="labelwidth" label="贷款形式" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	信用卡贷款
	                 </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="贷款金额" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.loan_prize}}元
	                   </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item :label-width="labelwidth" label="贷款期数" class="postInfo-container-item" style="width: 100%;">
                  	<span v-text="customerData.loan_date">
	                  </span>
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
	                <el-form-item :label-width="labelwidth" label="首付比例" class="postInfo-container-item" style="width: 100%;">
	                 <span>
	                 	{{customerData.first_pay_ratio}}%
	                 </span>
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
                  <el-form-item :label-width="labelwidth" label="有无保险" class="postInfo-container-item" style="width: 100%;">
                  	<span>{{customerData.has_insurance|hasInsurance}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="postInfo-container" v-if="customerData.has_insurance=='1'">
            	<el-row :gutter="divgutter" v-if="customerData.has_insurance=='1'">
            		<el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="保险公司" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.insurance_company}}
	                   </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="商业险" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.commercial_insurance}}元
	                  </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="交强险" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.compulsory_insurance}}元
	                  </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="车船税" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.vehicle_vessel_tax}}元
	                  </span>
	                </el-form-item>
                </el-col>

                <el-col :span="12">
	                <el-form-item :label-width="labelwidth" label="保费总额" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.gross_premium}}元
	                  </span>
	                </el-form-item>
                </el-col>
            </el-row>
          </div>

					<h3 class="sub-title">车行信息</h3>
					<div class="postInfo-container">
            <el-row :gutter="divgutter">
            	<el-col :span="12">
                <el-form-item :label-width="labelwidth" label="车行名称" class="postInfo-container-item" style="width: 100%;">
                  <span v-text="customerData.carshop_name">
                  </span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
	              <el-form-item :label-width="labelwidth" label="车行地址" class="postInfo-container-item" style="width: 100%;">
	                <span v-text="customerData.carshop_address">
	                </span>
	              </el-form-item>
              </el-col>

            </el-row>
          </div>

           <h3 class="sub-title">费用信息</h3>
            <div class="postInfo-container">
            	<el-row :gutter="divgutter">

            		<el-col :span="24">
	                <el-form-item :label-width="labelwidth" label="费用合计" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{customerData.total_expense}}元
	                  </span>
	                </el-form-item>
                </el-col>
              </el-row>
            </div>

            <h3 class="sub-title">备注信息</h3>
            <div class="postInfo-container">
            	<el-row :gutter="divgutter">

            		<el-col :span="24">
	                <el-form-item label-width=""  class="postInfo-container-item" style="width: 100%;">
	                	<span v-text="customerData.inputrequest_description"></span>

	                  </el-input>
	                </el-form-item>
                </el-col>

             </el-row>
            </div>
            <h3 v-if="customerData.route_name == 'detailartificialone'" class="sub-title">一审意见</h3>
            <h3 v-if="customerData.route_name == 'detailartificialtwo'" class="sub-title">二审意见</h3>
            <div class="postInfo-container" v-if="routeType">
            	<el-row :gutter="divgutter">

            		<el-col :span="24" class="label-special">
                  <el-form-item :label-width="labelwidth" label="审核结果" class="postInfo-container-item" style="width: 100%;">
                    <el-select class="filter-item" placeholder="" style="width: 100%;" v-model="customerData.artificial_status" >
        							<el-option label="通过" value="1">
        							</el-option>
        							<el-option label="拒绝" value="2">
        							</el-option>
        							<el-option label="待补件" value="3">
        							</el-option>
      							</el-select>
                  </el-form-item>


                </el-col>

                <el-col :span="24" v-if="customerData.artificial_status == '2'">
                	<el-form-item :label-width="labelwidth" label="拒绝理由" class="postInfo-container-item" style="width: 100%;">
	                  <el-checkbox-group v-model="customerData.artificial_refuse_reason">
									    <el-checkbox label="1">资料虚假</el-checkbox>
									    <el-checkbox label="2">客户否认申请</el-checkbox>
									    <el-checkbox label="3">黑名单</el-checkbox>
									    <el-checkbox label="4">征信有不良记录</el-checkbox>
									    <el-checkbox label="5">无法联系申请人</el-checkbox>
									    <el-checkbox label="9">其他</el-checkbox>
									  </el-checkbox-group>
								  </el-form-item>
                </el-col>

            		<el-col :span="24">
	                <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;">
	                  <el-input type="textarea":rows="4" placeholder="(必填)" v-model="customerData.artificial_description">
	                  </el-input>
	                </el-form-item>
                </el-col>

             </el-row>
            </div>

            <div style="overflow: hidden;" v-if="routeType">
            	<el-button type="primary" style="float:right; width: 120px; height: 40px;" @click="submitData">提交</el-button>
            	<el-button style="float:right; width: 120px; height: 40px;margin-right: 40px;" @click="cancelData">取消</el-button>
            </div>
          </el-col>
          <el-col :span="10" :gutter="divgutter" class="right" style="padding: 40px; padding-top: 25px;">

	          	<h3 style="color: #4A4A4A;font-size: 24px;">审核流程</h3>
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
							  			<div v-html="item.msg" style="padding-bottom: 40px;position: relative;">
							  			</div>
							  			<div style="position: absolute; right:0;bottom:8px;" v-if="item.isShow">
							  				<el-button style="padding: 6px 10px;font-size: 12px;" @click="dragShow(item.button_class,item.task_title)">{{item.button_title}}</el-button>
							  			</div>
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
        <span>（</span><span style="text-decoration: underline;color: #0000dd;cursor: pointer" @click="imgDownload">打包下载</span><span>）</span>
      </div>
      <template v-if="this.$route.name == 'detailtask'">
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
      </template>
      <el-row>
        <el-col :span="6">
          <el-menu
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
          <!--<template v-if="imgCompleted">-->
            <!--<el-button size="small" type="primary" @click="delImg" style="position: absolute; right: 0; bottom: 60px;z-index: 999;">删除当前图片</el-button>-->
          <!--</template>-->
          <div style="width: 100%;height: 616px;">
            <template v-if="imgCompleted">
              <div class="images" v-viewer="{movable: true,inline: true,navbar: true,url: 'data-original'}">
                <img v-for="src in imgShow" :src="src.thumb_file" :data-original="src.file_path" :key="src.file_id" style="width: 100px;height: 200px;display: none;">
              </div>
            </template>
            <div v-show="videoCompleted">
              <div style="width:100%;height:555px;">

                <video id="mainVideo" width="100%" :src="videoSrc" height="100%" controls>
                  <source :src="videoSrc"  type="video/mp4">
                </video>
              </div>
              <div style=" border-top: 1px solid #ffffff;width: 100%;height: 65px;" v-if="videoCompleted">
                <div style="position: relative;width: 100%;height: 84px;overflow-x: scroll;overflow-y: hidden">
                  <ul style="position: absolute;top: 0;padding: 0;height: 60px; " >
                    <li style="position: relative;width: 60px;height:60px;display: inline-block" v-for="src in imgShow">
                      <div class="videoMeng" @click="videoChange(src.file_path,src.file_id)" :data-id="src.file_id" :data-src=src.file_path style="width: 100%;height: 100%;position: absolute;top: 0;z-index: 1000;">
                      </div>
                      <!--删除视频按钮-->
                      <!--<template v-if="videoCanDel">-->
                        <!--<div @click="delvideo(src.file_path,src.file_id,src.id)" style="width: 15px; height: 15px; position: absolute;top: 0;right: 0;background-image: url(data:image/jpeg;base64,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TQQhAAAAAABdAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAFwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAQwAgADIAMAAxADcAAAABADhCSU0EBgAAAAAABwAEAAAAAQEA/+ENw2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmI3MGMyZTM3LTFkYzgtMTFlOC1iMDlkLWExMTRmM2Y5ZDIxMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MjE4YjM0NC05MzU1LWJkNDAtOGRmNC00NGNjOTUwNTAyMGIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iN0RBNjdBQjQ4M0RDMUQ0NUFBNEJDREU0NzUyN0JFNzgiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDMtMDJUMTE6MjA6MTMrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzM5MzQ4YjItZmJjYi1hYjRlLWIyZjktOTY5OTM5MDBjMmUzIiBzdEV2dDp3aGVuPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyMThiMzQ0LTkzNTUtYmQ0MC04ZGY0LTQ0Y2M5NTA1MDIwYiIgc3RFdnQ6d2hlbj0iMjAxOC0wMy0wMlQxMToyMToxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGQAAAAAAP/bAEMABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AAAsIABQAFAEBEQD/3QAEAAP/xADSAAAABwEBAQEBAAAAAAAAAAAEBQMCBgEABwgJCgsQAAIBAwMCBAIGBwMEAgYCcwECAxEEAAUhEjFBUQYTYSJxgRQykaEHFbFCI8FS0eEzFmLwJHKC8SVDNFOSorJjc8I1RCeTo7M2F1RkdMPS4ggmgwkKGBmElEVGpLRW01UoGvLj88TU5PRldYWVpbXF1eX1ZnaGlqa2xtbm9jdHV2d3h5ent8fX5/c4SFhoeIiYqLjI2Oj4KTlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAgBAQAAPwDpnmLzDrnmzXLvR9HuxbWVqsggtxIYXvHhNHAYfaYmvpx1VeC82yM6JZ68q3upWNy+mppasbm6kdoQJV/3RQ1DzN9n02X/AFvtZOP+Vqy/4M+t8E/T/q/U/Tp8HPjz9fj/AC+n8XCv958Gf//Qk1noirr9zY6jejS00yR5Lq5LcZQIWqpg7tNICrR0/wBb4sO9e16x82WEoWU6bc6YXuLa1uHAiu4gAC7EAAXgHb4vtf8AARv9EX3+H/056Z+o/Wvq3L34/bp/xk/dV/mz/9Hr35rf4N9ZPrXq/p/gPT+qcefCvw+vz+Dj14V/efyZz7Sf0B9ej/Tf1r6jX4vq3Cvty/b+fpfFndf+dX/wv/x7/wCHPq/t6HoU/wA/8rl/lZ//2Q==);background-size: 100% 100%; z-index: 1001"></div>-->
                      <!--</template>-->
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
    <el-dialog :visible.sync="isDialog" width='1000px' :title="taskTitle">
    	  <Dialog :workInfo="workInfo" :partType="partType"></Dialog>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/Upload/singleImage3'
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import { validateURL } from '@/utils/validate'
import { getAdminToken } from '@/utils/auth'
import detailApi from '@/api/detailApi'
import Dialog from '@/components/Dialog/dialog'
import Viewer from 'v-viewer'
import Vue from 'vue'
import crypto from 'crypto' // 用于md5
import $ from 'jquery' // 用于通过dom获取图片index
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
  components: { Upload, Viewer,Dialog},
  props: {
		ifResult:{
			type: Object,
			default:{}
		},
		maskResult:{
			type: Object,
			default:{}
		}
	},
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
    return {
    	// 表单数据
    	customerData:{
    		//基本信息
    		customer_name: '',//客户姓名
    		customer_sex:'',//客户性别
    		customer_age:'',//客户年龄
    		hukou:'',//客户户口所在地
	    	customer_certificate_number:'',//客户身份证
	    	customer_has_bondsman:'',//有无担保人
	    	customer_telephone:'',//客户手机号
	    	customer_company_phone_number:'',//客户单位电话
	    	customer_marital_status:'',//客户婚姻状况
	    	customer_company_name:'',//客户工作单位
	    	company_address:'',//客户单位地址
	    	customer_address:'',//居住地址
				//配偶信息
				spouse_name:'',//配偶姓名
				spouse_certificate_number:'',//配偶身份证号
				spouse_telephone:'',//配偶手机号
				spouse_company_telephone:'',//配偶单位电话
				spouse_company_name:'',//配偶工作单位
				//商品信息
				constract_no:'',//合同编号
				product_class_number:'',//车辆类型
				car_brand:'',//车辆品牌
				car_type:'',//车辆型号
				car_price:'',//车辆价格
				car_vehicle_identification_number:'',//车架号
				loan_bank:'',//贷款银行
				loan_prize:'',//贷款金额
				loan_date:'',//贷款期数
				first_pay:'',//首付款
				first_pay_ratio:'',//首付比例
				loan_rate:'',//利率
				has_insurance:'1',//有无保险
				insurance_company:'',//保险公司
				commercial_insurance:'',//商业险
				compulsory_insurance:'',//交强险
				vehicle_vessel_tax:'',//车船税
				gross_premium:'',//保费总额
				//费用合计
				total_expense:'',
				//备注信息
				inputrequest_description:'',
				//审核意见
				artificial_status:'1',
				artificial_description:'',
				artificial_refuse_reason:[],

				//人行征信结果
				inquire_result:'',
				inquire_description:'',
				//担保人信息
				bondsman_name:'',
				bondsman_certificate_number:'',
				bondsman_telephone:'',
				bondsman_company_telephone:'',
				bondsman_company_name:'',
				bondsman_company_address:'',
				bondsman_spouse_name:'',//担保人配偶姓名
				bondsman_spouse_idcard:'',//担保人配偶身份证
				//联系人信息
				contacts_man_name:'',//联系人姓名
				contacts_man_relationship:'',//联系人关系
				contacts_man_certificate_number:'',//联系人身份证号码
				contacts_man_telephone:'',//联系人电话号码
				//车商信息
				carshop_name:'',//车行名称
				carshop_address:'',//车行地址
				//来源信息
				product_name:'',//产品名称
				salesman_city:'',//业务地区
				visitor_name:'',//家访人员
				merchant_name:'',//申请件来源
				salesman_name:'',//业务人员
				create_time:'',//申请时间
				//fico数据
				retCode:'',//fico数据状态
				score:'',//评分分数
				reason:'',//得分理由
				//百融失信数据
				bairong_code:'',//百融状态码
				ex_bad1_name:'',//失信人姓名
  			ex_bad1_casenum:'',//执行案号
			  ex_bad1_court:'',//执行法院
			  ex_bad1_time:'',//立案日期
			  ex_execut1_money:'',//执行标的
			  ex_execut1_statute:'',//案件状态
				//判断路由来自风控初审还是风控终审
				route_name: this.$route.name
			},
			//审核流程中哪个显示
			workInfo:{},
			partType:'',
			isDialog:false,
			taskTitle:'',
			//审核流程数据
			auditProcess:[],
    	//请求得数据
      requestData:{
				token:getAdminToken(),
				work_id: this.$route.query.id,
				item_instance_id: this.$route.query.item_instance_id
			},
			//审核流程待认领
			isWait:true,
    	labelwidth: '95px',
      // 影像资料
      uploadBool: false,
      videoSrc: '', // 当前播放的视频地址
      aliUploadHost: '', // 图片上传host
      aliUploadHost2: '', // 视频上传host
      imgDir: '', // 图片上传dir备份
      imgDir2: '', // 视频上传dir备份
      imgData: {}, // 上传图片需要的表单
      imgData2: {}, // 上传视频需要的表单
      img_add: {}, // 添加过的图片
      img_delete: {}, // 删除过的图片
      imgSelectVal: 1, // 当前选择的图片种类
      imgOnUpload: [], // 当前正在上传的图片（防止上传成功前切换分组导致上传分组错误）
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
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      }
    }
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
    carType(type) {
    	if (type == 'XC') {
	        return '新车'
	    } else {
	        return '二手车'
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
    contactsManRelationship(val){
    	if(val=='1'){
    		return '父母'
    	}else if( val=='2'){
    		return '朋友'
    	}else if(val=='3'){
    		return '亲戚'
    	}else if(val=='4'){
    		return '其他'
    	}else{
    		return '- - -'
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
    	}else if(type == 'ES'){
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
    bankType(value){
    	if(value == '01'){
    		return '济南市中工行'
    	}else if(value == '02'){
    		return '济南乐源支行'
    	}else if(value == '03'){
    		return '临沂经开行'
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
  computed: {
    // 是否可以删除视频
    videoCanDel(){
      if(this.$route.name == ''){
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
  		var artificial;
  		if(this.customerData.route_name == 'detailartificialone'){
  			artificial=1;
  		}else if(this.customerData.route_name == 'detailartificialtwo'){
  			artificial=2;
  		}
  		return {
  				token: getAdminToken(),
					work_id: this.$route.query.id,
					item_instance_id: this.$route.query.item_instance_id,
					type:1,//1表示提交
					artificial: artificial,
					artificial_status: this.customerData.artificial_status,
					artificial_description: this.customerData.artificial_description,
					artificial_refuse_reason:this.customerData.artificial_refuse_reason.join(','),
					artificialtwo_description: this.customerData.artificial_description,
					artificialtwo_refuse_reason:this.customerData.artificial_refuse_reason.join(',')

  		}
  	},
    contentShortLength() {
      return this.postForm.content_short.length
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

		   	 if(this.customerData.create_time == '' || this.customerData.create_time ==null){
		   	 	var str = '---'
		   	 	return str;
		   	 }else{
		   	 	return now;
		   	 }
	  },
	  isMarital(){
    	if( this.customerData.customer_marital_status != '1'){
    		return true;
    	}
    },
	 	transDay(){
	       function p(s) {
	           return s < 10 ? '0' + s: s;
	       }
	       var myDate = new Date(this.customerData.ex_bad1_time*1000);
	       var year=myDate.getFullYear();
	       var month=myDate.getMonth()+1;
	       var date=myDate.getDate();
	       var h=myDate.getHours();       //获取当前小时数(0-23)
	       var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	       var s=myDate.getSeconds();
		   //var now=year+'-'+p(month)+"."+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
	       var now=year+'-'+p(month)+"-"+p(date);
	       return now;
	  },
	  //fico查询按钮控制
		 ficoBol(){

		 	if(this.customerData.retCode == '901' || this.customerData.retCode == '902' || this.customerData.retCode == '909'){
		 		return true;
		 	}else{
		 		return false;
		 	}
		 },
		 //百融失信查询按钮控制
		 bairongBol(){
		 	switch(this.customerData.bairong_code){
		 		case '100001': return true;
		 		break;
		 		case '100003': return true;
		 		break;
		 		case '100004': return true;
		 		break;
		 		case '100005': return true;
		 		break;
		 		case '100006': return true;
		 		break;
		 		case '100007': return true;
		 		break;
		 		case '100008': return true;
		 		break;
		 		case '100009': return true;
		 		break;
		 		case '100011': return true;
		 		break;
		 		case '100012': return true;
		 		break;
		 		case '1000015': return true;
		 		break;
		 		case '1000016': return true;
		 		break;
		 		default: return false;
		 	}
		 },
		 //路由来自其他详情页
		 routeType(){
		 	if(this.customerData.route_name != 'detailartificialtwo'&& this.customerData.route_name != 'detailartificialone'){
		 		return false;
		 	}else{
		 		return true;
		 	}
		 }
  },
  created() {
    this.getDetailInfo();//左侧基本信息
    this.getAuditProcess();//右侧审核历程
    this.getImgs();
    this.getUploadForm()
    this.getUploadForm2()
//  this.artificialType();//风控审核提交按钮：1 初审 2 终审
  },

  methods: {
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
    // 删除视频方法
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
        var videodelsurl = {}
        if (!videodelsurl.hasOwnProperty(_this.imgSelectVal)) {
          videodelsurl[_this.imgSelectVal] = {
            'source_type': 'video', //_this.imgSelectVal,
            'source_lists': []
          }
        }
        videodelsurl[_this.imgSelectVal].source_lists.push(thisImg) // 写入图片删除数组
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
        // 请求接口

      }).catch(() => {
      })
    },
    // 获取上传表单
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
      var imgsurl = {}
      if (!imgsurl.hasOwnProperty(uploadClass)) {
        var imgType = 'image'
        if(uploadClass == '7' || uploadClass == '8'){
          imgType = 'video'
        }
        imgsurl[uploadClass] = {
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
        imgsurl[uploadClass]['source_lists'].push(addObj.obj[i])
      }
      for(var i in addObj.obj1){
        _this.resImages.push(addObj.obj1[i])
      }
      var argimg = {
        data: {
          token: getAdminToken(),
          work_id: _this.$route.query.id,
          imgs: JSON.stringify({add: imgsurl})
        },
        success: res => {
          if(res.error_no == 200){
            this.$message.success('上传成功');
          } else {
            this.$message.error(res.error_msg);
          }
        },
        error: err => {
          _this.$message.error(err);
        }
      }
      detailApi.basicInfoImg(argimg)
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
        console.log('imgModal')
      this.imgDialog = true
      setTimeout(function () {
        $(".imgmenuitem[dataindex=1]").click()
      }, 200)
    },
  	//请求数据后赋值左侧对应数据
	  	getDetailInfo(){
	  		var _this = this;
	  		var arg = {
	  			data:this.requestData,
	  			success: res=>{
	  				this.workInfo = res;
	  				if(res.error_no == 200){
	  				var attrArr = ['customer_name','customer_sex','customer_age','customer_certificate_number','customer_has_bondsman','customer_telephone',
	  											 'customer_company_phone_number','customer_marital_status','customer_company_name','company_address','customer_address','hukou',
	  											 'contacts_man_name','contacts_man_relationship','contacts_man_certificate_number','contacts_man_telephone',
	  											 'spouse_name','spouse_certificate_number','spouse_telephone','spouse_company_telephone','spouse_company_name',
	  											 'bondsman_name','bondsman_certificate_number','bondsman_telephone','bondsman_company_telephone','bondsman_company_name','bondsman_company_address','bondsman_spouse_name','bondsman_spouse_idcard',
	  											 'constract_no','car_brand','car_type','car_price','car_vehicle_identification_number','loan_prize','first_pay','first_pay_ratio',
	  											 'loan_rate','insurance_company','commercial_insurance','compulsory_insurance','vehicle_vessel_tax','gross_premium',
	  											 'total_expense','inputrequest_description','inquire_description','carshop_name','carshop_address',
	  											 'product_name','salesman_city','visitor_name','merchant_name','salesman_name','create_time'
	  											]
	  				for( var i in attrArr){
	  					if( res.result[attrArr[i]] == '' || res.result[attrArr[i]] ==null){
	  						this.customerData[attrArr[i]] = '- - -';//姓名
	  					}else{
	  						this.customerData[attrArr[i]] = res.result[attrArr[i]];
	  					}
	  				}
	  				if(res.result.customer_has_bondsman == '' || res.result.customer_has_bondsman==null){//有无担保人
	  					this.customerData.customer_has_bondsman = '1'
	  				}else{
	  					this.customerData.customer_has_bondsman = res.result.customer_has_bondsman;
	  				}
	  				if(res.result.customer_marital_status == '' || res.result.customer_marital_status==null){//婚姻状况
	  					this.customerData.customer_marital_status = '1'
	  				}else{
	  					this.customerData.customer_marital_status = res.result.customer_marital_status;
	  				}
	  				if(res.result.product_class_number == '' || res.result.product_class_number==null){//车辆类型
	  					this.customerData.product_class_number = 'XC'
	  				}else{
	  					this.customerData.product_class_number = res.result.product_class_number;
	  				}
	  				if(res.result.has_insurance == '' || res.result.has_insurance==null){//有无保险
	  					this.customerData.product_class_number = 'XC'
	  				}else{
	  					this.customerData.has_insurance = res.result.has_insurance;
	  				}

	  				if(res.result.loan_bank == '' || res.result.loan_bank==null){//贷款银行
	  					this.customerData.loan_bank = '03'
	  				}else{
	  					this.customerData.loan_bank = res.result.loan_bank;
	  				}
	  				if(res.result.loan_date == '' || res.result.loan_date==null){//联系人关系
	  					this.customerData.loan_date = '12个月'
	  				}else{
	  					this.customerData.loan_date = res.result.loan_date;
	  				}
	  				if(this.customerData.total_expense !=''&& this.customerData.total_expense !=null&&this.customerData.total_expense !='- - -'){

//	  					var newTotal = Number(this.customerData.total_expense).tofixed(2);
//	  					alert(Number(this.customerData.total_expense).toFixed(2))
	  					this.customerData.total_expense = Number(this.customerData.total_expense).toFixed(2);
	  				}

	  				this.customerData.create_time = res.result.create_time;
//	  				attrArr.forEach(function(value,index,array){	//判断后台传过来得数据是否为空
//	  					console.log(res.result[value]);
//	  					if(res.result[value]){
//	  						this.customerData[value] = '1';//姓名
//	  					}
//			  			if(res.result[value] == '' || res.result[value] == null){
//			  				this.customerData[value] = '';//姓名
//			  			}else{
//			  				this.customerData[value] = res.result[value];//
//			  			}
//			  		})
	  					//个人基本信息
//	  					this.customerData.customer_name = res.result.customer_name;//姓名
//	  					this.customerData.customer_sex = res.result.customer_sex;//性别
//	  					this.customerData.customer_age = res.result.customer_age;//年龄
//	  					this.customerData.hukou = res.result.hukou;//年龄
//	  					this.customerData.customer_certificate_number = res.result.customer_certificate_number;//身份证号码
//	  					this.customerData.customer_has_bondsman = res.result.customer_has_bondsman;//有无担保人
//	  					this.customerData.customer_telephone = res.result.customer_telephone;//个人电话
//	  					this.customerData.customer_company_phone_number = res.result.customer_company_phone_number;//单位电话
//	  					this.customerData.customer_marital_status = res.result.customer_marital_status;//婚姻状况
//	  					this.customerData.customer_company_name = res.result.customer_company_name//工作单位
//	  					this.customerData.company_address = res.result.company_address;//单位地址
//	  					this.customerData.customer_address = res.result.customer_address//居住地址

//	  					//配偶信息
//		  				this.customerData.spouse_name = res.result.spouse_name;//配偶姓名
//		  				this.customerData.spouse_certificate_number = res.result.spouse_certificate_number;//配偶身份证号
//		  				this.customerData.spouse_telephone = res.result.spouse_telephone;//配偶手机号
//		  				this.customerData.spouse_company_telephone = res.result.spouse_company_telephone;//配偶单位电话
//		  				this.customerData.spouse_company_name = res.result.spouse_company_name;//配偶工作单位
//
//		  				//担保人信息
//		  				this.customerData.bondsman_name = res.result.bondsman_name;
//		  				this.customerData.bondsman_certificate_number = res.result.bondsman_certificate_number;
//		  				this.customerData.bondsman_telephone = res.result.bondsman_telephone;
//		  				this.customerData.bondsman_company_telephone = res.result.bondsman_company_telephone;
//		  				this.customerData.bondsman_company_name = res.result.bondsman_company_name;
//		  				this.customerData.bondsman_company_address = res.result.bondsman_company_address;
//		  				this.customerData.bondsman_spouse_name = res.result.bondsman_spouse_name;
//		  				this.customerData.bondsman_spouse_idcard = res.result.bondsman_spouse_idcard;
//
//							//联系人信息
//							this.customerData.contacts_man_name = res.result.contacts_man_name;
//							this.customerData.contacts_man_relationship = res.result.contacts_man_relationship;
//							this.customerData.contacts_man_certificate_number = res.result.contacts_man_certificate_number;
//							this.customerData.contacts_man_telephone = res.result.contacts_man_telephone;
//
//		  				//商品信息
//		  				this.customerData.constract_no = res.result.constract_no;//合同编号
//		  				this.customerData.car_brand = res.result.car_brand;//车辆品牌
//		  				this.customerData.product_class_number = res.result.product_class_number;//车辆类型
//		  				this.customerData.car_price = res.result.car_price;//车辆价格
//						  this.customerData.car_vehicle_identification_number = res.result.car_vehicle_identification_number;//车架号
//		  				this.customerData.loan_bank = res.result.loan_bank;//贷款银行
//	//	  				this.customerData. = res.result.;//贷款形式 写死
//	            this.customerData.loan_prize = res.result.loan_prize;//贷款金额
//		  				this.customerData.loan_date = res.result.loan_date;//贷款期数
//							this.customerData.first_pay = res.result.first_pay;//首付款
//							this.customerData.first_pay_ratio = res.result.first_pay_ratio;//首付比例
//							this.customerData.loan_rate = res.result.loan_rate;//利率
//							this.customerData.has_insurance = res.result.has_insurance;//有无保险
//							this.customerData.insurance_company = res.result.insurance_company;//保险公司暂时接口没有
//							this.customerData.car_type = res.result.car_type;//车辆型号
//							this.customerData.commercial_insurance = res.result.commercial_insurance;//商业险
//							this.customerData.compulsory_insurance = res.result.compulsory_insurance;//交强险
//							this.customerData.vehicle_vessel_tax = res.result.vehicle_vessel_tax;//车船税
//							this.customerData.gross_premium = res.result.gross_premium;//保费总额
//
//							//费用信息
//							this.customerData.total_expense = res.result.total_expense;//费用合计
//
//							//备注信息
//							this.customerData.inputrequest_description = res.result.inputrequest_description;//备注信息
//
//							//人行征信
							this.customerData.inquire_result = res.result.inquire_result;//审核结果
//							this.customerData.inquire_description = res.result.inquire_description;//审核备注
							//来源信息
//							this.customerData.product_name = res.result.product_name;//
//							this.customerData.salesman_city = res.result.salesman_city;//
//							this.customerData.visitor_name = res.result.visitor_name;//
//							this.customerData.merchant_name = res.result.merchant_name;//
//							this.customerData.salesman_name = res.result.salesman_name;//
//							this.customerData.create_time = res.result.create_time;//
							//fico数据信息
							this.customerData.retCode = res.result.retCode;//
							this.customerData.score = res.result.score;//
							this.customerData.reason = res.result.reason;//
							//百融失信信息
							this.customerData.bairong_code = res.result.bairong_code;//
							this.customerData.ex_bad1_name = res.result.ex_bad1_name;//
							this.customerData.ex_bad1_casenum = res.result.ex_bad1_casenum;//
							this.customerData.ex_bad1_court = res.result.ex_bad1_court;//
							this.customerData.ex_bad1_time = res.result.ex_bad1_time;//
							this.customerData.ex_execut1_money = res.result.ex_execut1_money;//
							this.customerData.ex_execut1_statute = res.result.ex_execut1_statute;//
	  				}else{
	  					this.$alert(res.error_msg, '审核结果', {
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
	  		if(JSON.stringify(this.ifResult) == "{}"){
	  			detailApi.getArtificalOneDetail(arg);
	  		}else{
	  			arg.success(this.ifResult);
	  		}

	  	},

      // 请求图片数据
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
	  	//请求右侧审核历程数据
	  	getAuditProcess (){
	  		var arg = {
	  			data:this.requestData,
	  			success: res =>{
	  				if(res.error_no == 200){
	  					 var data = res.result;
	  					 data.forEach((item,i)=>{
	  					 	  item.isShow = false;
	  					 	  if(item.button_title !=''){
	  					 	  	item.isShow = true;
	  					 	  }
					    		if (item.msg=='' || item.msg==null) {
					            if (item.status == '1') {
					            	item.isShow = false;
					            	item.msg = '已认领';
					            }
					            if (item.status == '4') {
					            	  item.isShow = false;
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
	  					this.$alert(res.error_msg, '审核结果', {
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
	  		if(JSON.stringify(this.maskResult) == "{}"){
	  			detailApi.getAuditProcess(arg);
	  		}else{
	  			arg.success(this.maskResult);
	  		}
	  	},
      imgChange(index){
        this.imgSelectVal = index
      },
      videoChange(src,id){
        this.videoSrc = src
      },
      imgModal(){
        this.imgDialog = true
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
		  //提交数据
			submitData(){
				var newData = {
					token: this.pagedata.token,
					work_id: this.pagedata.work_id,
					item_instance_id: this.pagedata.item_instance_id,
					type:1,//1表示提交
					artificial: this.pagedata.artificial,
					artificial_status: this.pagedata.artificial_status
				};
				if(this.customerData.route_name == 'detailartificialone'){
						newData.artificial_description = this.pagedata.artificial_description;
						newData.artificial_refuse_reason = this.pagedata.artificial_refuse_reason;
				}else if(this.customerData.route_name == 'detailartificialtwo'){
						newData.artificialtwo_description = this.pagedata.artificialtwo_description;
						newData.artificialtwo_refuse_reason = this.pagedata.artificialtwo_refuse_reason;
				}
				var arg ={
					data:newData,
					success: res =>{
						if(res.error_no == 200){
							this.$alert(res.error_msg, '审核结果', {
			          confirmButtonText: '确定',
			          beforeClose: (action,instance, done)=> {
			           if(action == 'confirm'){
			           		done();
			           		if(this.customerData.route_name == 'detailartificialone'){
								  			this.$router.push({ path: '/work/artificial',query: {searchtype: '2'} });
								  		}else if(this.customerData.route_name == 'detailartificialtwo'){
								  			this.$router.push({ path: '/work/artificialtwo',query: {searchtype: '2'} });
								  		}

			           }else if(action == 'cancel'){
			           		done();
			           }
		          	}
		        	});
						}else{
							this.$alert(res.error_msg, '审核结果', {
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
				  detailApi.auditView(arg);
				}).catch(() => {
				});

		},
			dragShow(clsName,title){
				this.isDialog = true;
				this.partType = clsName;
				this.taskTitle = title;
			},
		//fico数据查询
		ficoquery(){
			var req = {
				token: this.requestData.token,
				work_id: this.requestData.work_id
			}
			var arg ={
				data: req,
				success: res=>{
					if(res.error_no == 200){
						this.customerData.retCode = res.result.retCode;
					}else{
						 this.$alert(res.error_msg, '请求结果', {
	            confirmButtonText: '确定'
	         });
					}
				},
				error:function(error){

				}
			}
			detailApi.ficoquery(arg);
		},

		//百融失信数据查询
		bairongquery(){
			var req = {
				token: this.requestData.token,
				work_id: this.requestData.work_id
			}
			var arg ={
				data: req,
				success: res=>{
					if(res.error_no == 200){
						this.customerData.bairong_code = res.result.bairong_code;
					}else{
						 this.$alert(res.error_msg, '请求结果', {
	            confirmButtonText: '确定'
	         });
					}
				},
				error:function(error){
//					console.log(error);
				}
			}
			detailApi.bairongquery(arg);
		},

		//取消按钮
		cancelData(){
			if(this.customerData.route_name == 'detailartificialtwo'){
					this.$router.push({ path: '/work/artificialtwo' ,query: {searchtype: 2}});
			}else if(this.customerData.route_name == 'detailartificialone'){
					this.$router.push({ path: '/work/artificial' ,query: {searchtype: 2}});
			}

		},
  	show () {
	    const viewer = this.$el.querySelector('.images').$viewer
	    viewer.show()
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
    //取消按钮

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
     /* padding: 40px 45px 20px 50px;*/
      .postInfo-container {
        position: relative;
        @include clearfix;
       /* margin-bottom: 10px;*/
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
    .el-form-item__label{
    	text-align: left;
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
.el-form-item{
	margin-bottom: 0px;
}
</style>
<style>
	body{ background:#F2F5F9;}
	.left,.right{ background: #fff;}
	.right{ margin-left: 20px;}
	.el-form-item__label{
    	text-align: left;
    }
  .mb{ margin-bottom: 25px;}
  .el-step.is-vertical .el-step__line{
		  width: 2px;
	    top: 0;
	    bottom: 0;
	    left: 8px;
	}
	.el-step__title{
		font-size: 18px;
	}
	.el-step.is-vertical .el-step__title{
		padding-bottom: 20px;
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
	.el-step__icon.is-text {
    border-radius: 0;
    border: none;
    border-color: inherit;
}
.el-step__icon{
	  width: 18px;
    height: 18px;
}

/*单元格得行高*/
  .artifitical .postInfo-container-item .el-form-item__label{
   	line-height: normal;
   	color:#4A4A4A;
  }
    .artifitical .postInfo-container-item .label-special  .el-form-item__label{
   	line-height: 40px;
  }

	.artifitical .postInfo-container-item .el-form-item__content{
	   	line-height: normal;
	   	margin-bottom: 20px;
	   	color:#4A4A4A;
	  }

	.label-special .el-input__inner{

		height: 36px;
	}
	.createPost-main-container .label-special .el-input{
		width: 100%;
	}
</style>
