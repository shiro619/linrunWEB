<template>
	<!--寄件登记-->
  <div class="app-container calendar-list-container" style="padding:0px;background:none;" id="dialogComponents">
      <el-row v-if="partType == 'pop_sendtask'">
        <el-col :span="12">
          <el-form ref="dataForm1" :model="taskData1" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="客户姓名" prop="title">
              <span v-text="commonData.customer_name"></span>
            </el-form-item>
            <el-form-item label="身份证" prop="title">
              <span v-text="commonData.customer_certificate_number"></span>
            </el-form-item>
            <el-form-item label="手机号" prop="title">
              <span v-text="commonData.customer_telephone"></span>
            </el-form-item>
            <el-form-item label="申请编号" prop="title">
              <span v-text="commonData.request_no"></span>
            </el-form-item>
            <el-form-item label="合同编号" prop="title">
              <span v-text="commonData.constract_no"></span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="dataForm" :model="taskData" label-position="left" label-width="70px">
            <el-form-item label="寄件人" prop="title">
            	<span v-text="taskData.courier_man"></span>
            </el-form-item>
            <el-form-item label="快递商" prop="title">
            	<span v-text="taskData.courier_business"></span>
            </el-form-item>
            <el-form-item label="快递单号" prop="title">
              <span v-text="taskData.courier_number"></span>
            </el-form-item>
            <el-form-item label="寄件时间">
            	<span v-text="taskData.courier_time"></span>
            </el-form-item>
            <el-form-item label="备注" >
              <span v-text="taskData.courier_description"></span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!--车辆GPS登记-->
      <el-row v-if="partType == 'pop_gps'">
		    <el-col :span="12">
		      <el-form ref="dataForm1" :model="taskData1" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
		        <el-form-item label="客户姓名" prop="title">
		          <span v-text="commonData.customer_name"></span>
		        </el-form-item>
		        <el-form-item label="身份证" prop="title">
		          <span v-text="commonData.customer_certificate_number"></span>
		        </el-form-item>
		        <el-form-item label="手机号" prop="title">
		          <span v-text="commonData.customer_telephone"></span>
		        </el-form-item>
		        <el-form-item label="申请编号" prop="title">
		          <span v-text="commonData.request_no"></span>
		        </el-form-item>
		        <el-form-item label="合同编号" prop="title">
		          <span v-text="commonData.constract_no"></span>
		        </el-form-item>
		      </el-form>
		    </el-col>
		    <el-col :span="12">
		      <el-form ref="dataForm" :model="taskData" label-position="left" label-width="23%">
		        <el-form-item label="GPS编号1" prop="title">
		        	<span v-text="taskData.gps_number"></span>
		        </el-form-item>
		        <el-form-item label="GPS编号2" prop="title">
		        	<span v-text="taskData.gps_number2"></span>
		        </el-form-item>
		        <el-form-item label="安装位置" prop="title" >
		        	<span v-text="taskData.install_position"></span>
		        </el-form-item>
		        <el-form-item label="安装日期">
		        	<span v-text="taskData.install_time"></span>
		        </el-form-item>
		        <el-form-item label="备注">
		        	<span v-text="taskData.gps_description"></span>
		        </el-form-item>
		      </el-form>
		    </el-col>
	  	</el-row>
	  	<!--抄单登记-->
	  	<el-row v-if="partType == 'pop_copytask'">
        <el-col :span="12">
          <el-form ref="dataForm1" :model="taskData1" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="客户姓名" prop="title">
              <span v-text="commonData.customer_name"></span>
            </el-form-item>
            <el-form-item label="身份证" prop="title">
              <span v-text="commonData.customer_certificate_number"></span>
            </el-form-item>
            <el-form-item label="手机号" prop="title">
              <span v-text="commonData.customer_telephone"></span>
            </el-form-item>
            <el-form-item label="申请编号" prop="title">
              <span v-text="commonData.request_no"></span>
            </el-form-item>
            <el-form-item label="合同编号" prop="title">
              <span v-text="commonData.constract_no"></span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="dataForm" :model="taskData" label-position="left" label-width="70px">
            <el-form-item label="抄单人" prop="title">
            	 <span v-text="taskData.copytask_courier_man"></span>
            </el-form-item>
            <el-form-item label="时间">
            	 <span v-text="taskData.copytask_courier_time"></span>
            </el-form-item>
            <el-form-item label="备注">
            	<span v-text="taskData.copytask_courier_description"></span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!--抵押登记-->
      <el-row v-if="partType == 'pop_mortgage'">
        <el-col :span="12">
          <el-form ref="dataForm1" :model="taskData" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="客户姓名" prop="title">
              <span v-text="commonData.customer_name"></span>
            </el-form-item>
            <el-form-item label="身份证" prop="title">
              <span v-text="commonData.customer_certificate_number"></span>
            </el-form-item>
            <el-form-item label="手机号" prop="title">
              <span v-text="commonData.customer_telephone"></span>
            </el-form-item>
            <el-form-item label="申请编号" prop="title">
              <span v-text="commonData.request_no"></span>
            </el-form-item>
            <el-form-item label="合同编号" prop="title">
              <span v-text="commonData.constract_no"></span>
            </el-form-item>
            <el-form-item label="抵押物" prop="title">
              <span v-text="taskData.mortgage"></span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="dataForm" :model="taskData" label-position="left" label-width="23%">
            <el-form-item label="抵押人员" prop="title">
            	<span v-text="taskData.transactor"></span>
            </el-form-item>

            <el-form-item label="抵押权证号" prop="title">
            	<span v-text="taskData.mandate_number"></span>
            </el-form-item>
            <el-form-item label="抵押日期">
            	<span v-text="taskData.transact_time"></span>
            </el-form-item>
            <el-form-item label="备注">
            	<span v-text="taskData.mortgage_description"></span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!--申请打款-->
      <el-form v-if="partType == 'pop_applyremittance'">
	    <div class="createPost-main-container">
	    	<el-row :gutter="divgutter">
	      		<el-col :span="12" style="padding-left: 29px;">
		            <el-form-item :label-width="labelwidth" label="业务团队:" class="postInfo-container-item" style="width: 100%;">
		              <span v-text="commonData.credit_city">
		              </span>
		            </el-form-item>
	        	</el-col>
	      	</el-row>
	     	<el-row :gutter="divgutter" style="padding-left: 29px;">
				<el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="客户姓名" class="postInfo-container-item" style="width: 90%;">
	                  <span v-text="commonData.customer_name">
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="车辆型号" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="commonData.car_type">
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="车辆类型" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{commonData.product_class_number|carType}}
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="车辆价格" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{commonData.car_price }}元
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="贷款额" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{commonData.loan_prize}}元
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="贷款银行" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{commonData.loan_bank|bankType}}
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="贷款期数" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="commonData.loan_date">
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="利率" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{commonData.loan_rate}}%
	                  </span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="首付款" class="postInfo-container-item" style="width: 100%;">
	                  <span>
	                  	{{commonData.first_pay}}元
	 					</span>
	                </el-form-item>
	            </el-col>
	            
	            <el-col :span="8">
	                <el-form-item :label-width="labelwidth" label="首付比例" class="postInfo-container-item" style="width: 100%;">
	                  <span v-text="commonData.first_pay_ratio">
	 					</span>
	                </el-form-item>
	            </el-col>

			    <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="融入本金" class="postInfo-container-item" style="width: 100%;">
		  		 		<span>{{commonData.integration_principal}}元</span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="返车行金额" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{commonData.return_car_principal}}元</span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="打给车行" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{commonData.finance_driving}}元</span>
		            </el-form-item>
		        </el-col>
<!--		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="打给车行" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{commonData.finance_driving}} 从持续出现元</span>
		            </el-form-item>
		        </el-col>-->
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="返车行利率" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{commonData.return_car_rate}}%</span>
		            </el-form-item>
		        </el-col>
		        
		      
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="毛利率" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{commonData.gross_profit_rate}}%</span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="车行全称" class="postInfo-container-item" style="width: 100%;">
		            	<span v-text="commonData.car_name"></span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="合计打款" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{commonData.remittance_total_money}}元</span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="开户行" class="postInfo-container-item" style="width: 100%;">
		            	<span v-text="commonData.finance_deposit_bank"></span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="银行放款额" class="postInfo-container-item" style="width: 100%;">
		            	<span>{{commonData.bank_lending}}元</span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="账号" class="postInfo-container-item" style="width: 100%;" prop="finance_account">
		            	<span v-text="commonData.finance_account"></span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="打款日期" class="postInfo-container-item" style="width: 100%;" prop="finance_date">
		            	<span v-text="commonData.finance_date"></span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="打款户名" class="postInfo-container-item" style="width: 100%;" prop="finance_name">
		            	<span v-text="commonData.finance_name"></span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="业务发生地" class="postInfo-container-item" style="width: 100%;" prop="business_place">
		           		<span v-text="commonData.business_place"></span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="8">
		            <el-form-item :label-width="labelwidth" label="车商尾款" class="postInfo-container-item" style="width: 100%;" prop="car_final_pay">
		            	<span>{{commonData.car_final_pay}}元</span>
		            </el-form-item>
		        </el-col>
		        
		        <el-col :span="24">
		            <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;" prop="finance_apply_description">
		            <span v-text="commonData.finance_apply_description"></span>
		            </el-form-item>
		        </el-col>
      		</el-row>
	    </div>
    </el-form>
    <!--财务打款-->
    <el-form v-if="partType == 'pop_finance'">
      <div class="createPost-main-container">
      <el-row :gutter="divgutter">
      	<el-col :span="24" style="background:#fff; padding: 10px 30px;" >
	        <el-form-item :label-width="labelwidth" label="业务团队:" class="postInfo-container-item" style="width: 100%; margin-bottom: 0px;">
	          <span v-text="commonData.credit_city">
	          </span>
	        </el-form-item>
      	</el-col>
      </el-row>
      <el-row :gutter="divgutter" style="margin-top: 10px;">
	      <div class="postInfo-container postInfo-container-one" style="padding: 0px 30px; margin-bottom: 0px;">
	      	<el-row :gutter="divgutter">
			     	<el-col :span="8">
	            <el-form-item :label-width="labelwidth" label="客户姓名" class="postInfo-container-item" style="width: 90%;">
	              <span v-text="commonData.customer_name"></span>
	            </el-form-item>
            </el-col>
            
            <el-col :span="8">
	            <el-form-item :label-width="labelwidth" label="车辆型号" class="postInfo-container-item" style="width: 100%;">
	              <span v-text="commonData.car_type">
	              </span>
	            </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="车辆类型" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.product_class_number|carType}}
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="车辆价格" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.car_price}}元
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="贷款额" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.loan_prize}}元
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="贷款银行" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.loan_bank|bankType}}
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="贷款期数" class="postInfo-container-item" style="width: 100%;">
                  <span v-text="commonData.loan_date">
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="利率" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.loan_rate}}%
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="首付款" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  		{{commonData.first_pay}}元
 									</span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="首付比例" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.first_pay_ratio}}
 									</span>
                </el-form-item>
            </el-col>
            
	      		<el-col :span="8">
            <el-form-item :label-width="labelwidth" label="融入本金" class="postInfo-container-item" style="width: 100%;" >
            	<span>
            		{{commonData.integration_principal}}元
 							</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="银行放款额" class="postInfo-container-item" style="width: 100%;">
            	<span>
            		{{commonData.bank_lending}}元
            	</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="打给车行" class="postInfo-container-item" style="width: 100%;">
            		<span>
            			{{commonData.finance_driving}}元
            		</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="返车行利率" class="postInfo-container-item" style="width: 100%;">
            	<span>
            		{{commonData.return_car_rate}}%
            	</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="返车行金额" class="postInfo-container-item" style="width: 100%;">
            	<span>
            		{{commonData.return_car_principal}}元
            	</span>
            </el-form-item>
        </el-col>
        
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="车商尾款" class="postInfo-container-item" style="width: 100%;">
            	<span>
            		{{commonData.car_final_pay}}元
            	</span>
            </el-form-item>
        </el-col>
       
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="合计打款" class="postInfo-container-item" style="width: 100%;">
            	<span>
            		{{commonData.remittance_total_money}}元
            	</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="毛利率" class="postInfo-container-item" style="width: 100%;">
            	<span>
            		{{commonData.gross_profit_rate}}%
            	</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
        <el-form-item :label-width="labelwidth" label="打款户名" class="postInfo-container-item" style="width: 100%;">
        	<span v-text="commonData.finance_name"></span>
        </el-form-item>
        </el-col>
        
         <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="账号" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.finance_account"></span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="开户行" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.finance_deposit_bank"></span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="车行全称" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.car_name"></span>
            </el-form-item>
        </el-col>
        
			<el-col :span="8">
            <el-form-item :label-width="labelwidth" label="业务发生地" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.business_place"></span>
            </el-form-item>
        </el-col>
			
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="打款日期" class="postInfo-container-item" style="width: 100%;">
            		<span v-text="commonData.finance_date"></span>
            </el-form-item>
        </el-col>
        
   
        <el-col :span="24">
            <el-form-item :label-width="labelwidth" label="申请备注" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.finance_apply_description"></span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
      	  <el-form-item :label-width="labelwidth" label="已打款额" class="postInfo-container-item" style="width: 100%;" prop="remittance_prize">
      	  	{{commonData.remittance_prize}}元
            </el-form-item>
      	 </el-col>
      	 
      	 <el-col :span="8">
      	  <el-form-item :label-width="labelwidth" label="已打款日期" class="postInfo-container-item" style="width: 100%;">
      	  		<span v-text="commonData.remittance_time"></span>
            </el-form-item>
      	 </el-col>
      	 <el-col :span="16">
            <el-form-item :label-width="labelwidth" label="打款备注" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.finance_description"></span>
            </el-form-item>
        </el-col>
        
      </el-row>
	</div>      	 
      </el-row>
      </div>
    </el-form>
    <!--回款确认-->
    <el-form v-if="partType == 'pop_returnmoney'">
      <div class="createPost-main-container">
      <el-row :gutter="divgutter">
      	<el-col :span="24" style="background:#fff; padding: 10px 30px;padding-bottom: 0px;" >
	        <el-form-item :label-width="labelwidth" label="业务团队:" class="postInfo-container-item" style="width: 100%; margin-bottom: 0px;">
	          <span v-text="commonData.credit_city">
	          </span>
	        </el-form-item>
      	</el-col>
      </el-row>
      <el-row :gutter="divgutter">
	      <div class="postInfo-container postInfo-container-one" style="padding: 20px 30px; margin-bottom: 0px;">
	      	<el-row :gutter="divgutter">
			     	<el-col :span="8">
	            <el-form-item :label-width="labelwidth" label="客户姓名" class="postInfo-container-item" style="width: 90%;">
	              <span v-text="commonData.customer_name"></span>
	            </el-form-item>
            </el-col>
            
            <el-col :span="8">
	            <el-form-item :label-width="labelwidth" label="车辆型号" class="postInfo-container-item" style="width: 100%;">
	              <span v-text="commonData.car_type">
	              </span>
	            </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="车辆类型" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.product_class_number|carType}}
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="车辆价格" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.car_price}}元
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="贷款额" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.loan_prize}}元
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="贷款银行" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.loan_bank|bankType}}
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="贷款期数" class="postInfo-container-item" style="width: 100%;">
                  <span v-text="commonData.loan_date">
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="利率" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.loan_rate}}%
                  </span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="首付款" class="postInfo-container-item" style="width: 100%;">
                  <span>
                  	{{commonData.first_pay}}元
 									</span>
                </el-form-item>
            </el-col>
            
            <el-col :span="8">
                <el-form-item :label-width="labelwidth" label="首付比例" class="postInfo-container-item" style="width: 100%;">
                  <span v-text="commonData.first_pay_ratio">
 									</span>
                </el-form-item>
            </el-col>
            
	      		<el-col :span="8">
            <el-form-item :label-width="labelwidth" label="融入本金" class="postInfo-container-item" style="width: 100%;" >
            	<span>{{commonData.integration_principal}}元</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="银行放款额" class="postInfo-container-item" style="width: 100%;">
            	<span>{{commonData.bank_lending}}元</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="打给车行" class="postInfo-container-item" style="width: 100%;">
            		<span>{{commonData.finance_driving}}元</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="返车行利率" class="postInfo-container-item" style="width: 100%;">
            	<span>{{commonData.return_car_rate}}%</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="返车行金额" class="postInfo-container-item" style="width: 100%;">
            	<span>{{commonData.return_car_principal}}元</span>
            </el-form-item>
        </el-col>
        
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="车商尾款" class="postInfo-container-item" style="width: 100%;">
            	<span>{{commonData.car_final_pay}}元</span>
            </el-form-item>
        </el-col>
       
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="合计打款" class="postInfo-container-item" style="width: 100%;">
            	<span>{{commonData.remittance_total_money}}元</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="毛利率" class="postInfo-container-item" style="width: 100%;">
            	<span>{{commonData.gross_profit_rate}}%</span>
            </el-form-item>
        </el-col>
        
        <el-col :span="8">
        <el-form-item :label-width="labelwidth" label="回款金额" class="postInfo-container-item" style="width: 100%;">
        	<span>{{commonData.return_prize}}元</span>
        </el-form-item>
        </el-col>
        
         <el-col :span="8">
        <el-form-item :label-width="labelwidth" label="回款账户" class="postInfo-container-item" style="width: 100%;">
        	<span v-text="commonData.return_card"></span>
        </el-form-item>
        </el-col>
        
         <el-col :span="8">
            <el-form-item :label-width="labelwidth" label="回款日期" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.return_time"></span>
            </el-form-item>
        </el-col>
        
        <el-col :span="16">
            <el-form-item :label-width="labelwidth" label="备注" class="postInfo-container-item" style="width: 100%;">
            	<span v-text="commonData.return_description"></span>
            </el-form-item>
        </el-col>
      </el-row>
			</div> 
	    </el-row>	
					 
      </el-row>

      </div>
   </el-form>
  </div>
</template>

<script>
export default {
  name: 'complexTable',
  components: {},
  props: {
		workInfo:{
			type: Object,
			default:{}
		},
		partType:{
			type: String,
			default: ''
		}
	},
  directives: {
  },
  data() {
    return {
    	commonData:{
    		customer_name:'',
    		customer_certificate_number:'',
    		customer_telephone:'',
    		request_no:'',
	        constract_no:'',
	        credit_city:'',
	        car_type:'',
	        product_class_number:'',
	        car_price:'',
	        loan_prize:'',
	        loan_bank:'',
	        loan_date:'',
	        loan_rate:'',
	        first_pay:'',
	        first_pay_ratio:'',
	        integration_principal:'',
	        return_car_principal:'',
	        finance_driving:'',
	        return_car_rate:'',
	        gross_profit_rate:'',
	        car_name:'',
	        remittance_total_money:'',
	        finance_deposit_bank:'',
	        bank_lending:'',
	        finance_account:'',
	        finance_date:'',
	        finance_name:'',
	        business_place:'',
	        car_final_pay:'',
	        finance_apply_description:'',
	        remittance_prize:'',
	        remittance_time:'',
	        finance_description:'',
	        return_prize:'',
	        return_card:'',
	        return_time:'',
	        return_description:''
    	},
      taskData: { // 寄件处理时填写的表单
        courier_time: '',
        courier_man: '',
        courier_description: '',
        courier_business:'',
        courier_number:'',
        //gps登记
        gps_number:'',
        gps_number2:'',
        install_position:'',
        install_time:'',
        install_description:'',
        //抄单登记
        copytask_courier_man:'',
        copytask_courier_time:'',
        copytask_courier_description:'',
        //抵押登记
        mortgage:'车辆登记证书',
        transactor:'',
        mandate_number:'',
        transact_time:'',
        mortgage_description:''
      },
      labelwidth: '95px'
    }
  },
  filters: {
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
   
  },
  created() {
   this.setInfo()
  },
  methods: {
  	setInfo(){
  		var res = this.workInfo;
  		//公用的信息
  		var commonArr = ['customer_name','customer_certificate_number','customer_telephone','request_no','constract_no',
  										 'credit_city','car_type','car_price','loan_prize','loan_rate','first_pay','first_pay_ratio','integration_principal','return_car_principal',
  										 'finance_driving','return_car_rate','gross_profit_rate','car_name','remittance_total_money','finance_deposit_bank','bank_lending',
  										 'finance_account','finance_name','business_place','car_final_pay','finance_apply_description',
  										 'remittance_prize','finance_description',
  										 'return_prize','return_card','return_description'
  										]
  		for( var i in commonArr){
				if( res.result[commonArr[i]] == '' || res.result[commonArr[i]] ==null){
					this.commonData[commonArr[i]] = '---';//姓名
				}else{
					this.commonData[commonArr[i]] = res.result[commonArr[i]];
				}
			}
  		if(res.result.product_class_number == '' || res.result.product_class_number ==null){
  				this.commonData.product_class_number = 'XC';
  		}else{
  				this.commonData.product_class_number = res.result.product_class_number;
  		}
  		if(res.result.loan_bank == '' || res.result.loan_bank ==null){
  				this.commonData.loan_bank = '01';
  		}else{
  				this.commonData.loan_bank = res.result.loan_bank;
  		}
  		if(res.result.loan_date == '' || res.result.loan_date ==null){
  				this.commonData.loan_date = '12个月';
  		}else{
  				this.commonData.loan_date = res.result.loan_date;
  		}
	    this.commonData.finance_date = this.nowDay(res.result.finance_date);
	    this.commonData.remittance_time = this.nowDay(res.result.remittance_time);
	    this.commonData.return_time = this.nowDay(res.result.return_time);
  		//寄件登记
  		var sendtaskArr = ['courier_man','courier_business','courier_number','courier_description',
							'gps_number','gps_number2','install_position','gps_description',
							'copytask_courier_man','copytask_courier_description',
							'transactor','mandate_number','mortgage_description'
  						]
  											//申请编号 合同编号 寄件人 快递商 快递单号 寄件时间 备注
  		for( var i in sendtaskArr){
				if( res.result[sendtaskArr[i]] == '' || res.result[sendtaskArr[i]] ==null){
					this.taskData[sendtaskArr[i]] = '---';//姓名
				}else{
					this.taskData[sendtaskArr[i]] = res.result[sendtaskArr[i]];
				}
			}
  		this.taskData.courier_time = this.nowDay(res.result.courier_time);
	    this.taskData.copytask_courier_time = this.nowDay(res.result.copytask_courier_time);
	    this.taskData.transact_time = this.nowDay(res.result.transact_time);
	    this.taskData.install_time = this.nowDay(res.result.install_time);
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
		   	 if(stamp == '' || stamp ==null || stamp =='NaN'){
		   	 	var str = '---'
		   	 	return str;
		   	 }else{
		   	 	return now;
		   	 }
	  },
  }




}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	#dialogComponents{
		.postInfo-container-item {
			.el-form-item__content{
			   line-height: normal;
			   	margin-bottom: 20px;
			   	color:#4A4A4A;
			}
			.el-form-item__label{
				 line-height: normal;
		    	color: #4A4A4A;
			}
		}
	}
	.el-tabs__nav-wrap::after{
		top: 1px;
		display: none;
	}
	.el-form-item{
		margin-bottom: 8px;
	}
.dialog-style .postInfo-container-item .el-form-item__content{
   line-height: normal;
   	margin-bottom: 20px;
   	color:#4A4A4A;
  }
  .dialog-style .postInfo-container-item .el-form-item__label{
  	    line-height: normal;
    	color: #4A4A4A;
  }
</style>
