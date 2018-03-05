<template>
  <div class="createPost-container" style="background-color: #ffffff;margin-top: 0px;margin-left: 7px">
    <!--<h2>客户基本资料</h2>-->
    <div id="overlay" v-show="shadowShow" @click="shadowHide"><div></div><img :src="shadowSrc" alt=""></div>
    <el-form class="form-container" :model="postForm" ref="postForm">

      <div class="createPost-main-container">

        <el-row :gutter="divgutter">
          <el-col :span="10">
          	<h3>个人信息</h3>
            <div class="postInfo-container">
              <el-row>


                <el-col :span="24">
                  <el-form-item label-width="90px" label="客户姓名:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="客户姓名(必填)" v-model="subForm.customer_name">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="客户电话:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="客户电话(必填)" v-model="subForm.customer_telephone">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="身份证号(必填)" v-model="subForm.customer_certificate_number">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="配偶姓名:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="配偶姓名(选填)" v-model="subForm.spouse_name">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="身份证号(选填)" v-model="subForm.spouse_certificate_number">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <h3>来源信息</h3>
            <div class="postInfo-container">
            	<el-row>
            		<el-col :span="24">
                  <el-form-item label-width="90px" label="客户来源:" class="postInfo-container-item" style="width: 100%;">
                    <el-select class="filter-item" placeholder="客户来源" style="width: 100%;" v-model="subForm.merchant_id">
        							<el-option label="经销商" value="1">
        							</el-option>
      							</el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="车辆类型:" class="postInfo-container-item" style="width: 100%;">
                    <el-radio v-model="subForm.product_id" label="1">新车</el-radio>
  									<el-radio v-model="subForm.product_id" label="2">二手车</el-radio>
                  </el-form-item>
                </el-col>
               </el-row>
            </div>

            <h3>担保人信息</h3>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="90px" label="担保人姓名:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="担保人姓名(选填)" v-model="subForm.bondsman_name">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="身份证号(选填)" v-model="subForm.bondsman_certificate_number">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="配偶姓名:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="配偶姓名(选填)" v-model="subForm.bondsman_spouse_name">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label-width="90px" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                    <el-input placeholder="身份证号(选填)" v-model="subForm.bondsman_spouse_certificate_number">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="14" :gutter="divgutter">
            <el-col :span="24">
              <h3>征信资料</h3>

              <el-upload
                class="upload-demo"
                ref="upload"
                :action="aliUploadHost"
                :data="imgData"
                accept="image/*"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
                :multiple="true"
                :limit="100"
                :show-file-list="false"
                style="text-align: left;margin-bottom: 20px">
                <span style="font-size: 14px;line-height: 32px;">身份证 / {{subForm.imgs['1'].source_lists.length}}张</span><span style="font-size: 12px;color: #9B9B9B;line-height: 32px">（请上传客户的身份证照片）</span>
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24">
                    <el-col :span="24" style="height: 340px;background-color: #F6F7FA;padding: 20px">
                      <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index ) in subForm.imgs['1'].source_lists" style="height: 300px;width: 200px;">
                          <div @click="delImg1(index)" style="background-color: #ffffff;border-radius: 15px;padding: 0px; position: absolute;top: 0;right: 0;"><span class="el-icon-error" style="font-size: 20px"></span></div>
                          <img :src="item.src" :alt="item.src" style="width: 100%;height: 100%;" @click="shadowShowFun(item.src)">
                        </swiper-slide>
                        <div class="swiper-button-prev" id="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" id="swiper-button-next" slot="button-next"></div>
                        <div class="swiper-pagination" id="swiper-pagination" slot="pagination"></div>
                      </swiper>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="24">
              <el-upload
                class="upload-demo"
                ref="upload2"
                :action="aliUploadHost"
                :data="imgData"
                accept="image/*"
                :on-success="uploadSuccess2"
                :before-upload="beforeUpload"
                :multiple="true"
                :limit="100"
                :show-file-list="false"
                style="text-align: left;margin-bottom: 20px;margin-top: 40px">
                <span style="font-size: 14px;line-height: 32px;">授权书 / {{subForm.imgs['2'].source_lists.length}}张</span><span style="font-size: 12px;color: #9B9B9B;line-height: 32px">（请上传客户的授权书照片）</span>
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24">
                    <el-col :span="24" style="height: 340px;background-color: #F6F7FA;padding: 20px">
                      <swiper :options="swiperOption2">
                        <swiper-slide v-for="(item, index ) in subForm.imgs['2'].source_lists" style="height: 300px;width: 200px;">
                          <div @click="delImg2(index)" style="background-color: #ffffff;border-radius: 15px;padding: 0px; position: absolute;top: 0;right: 0;"><span class="el-icon-error" style="font-size: 20px"></span></div>
                          <img :src="item.src" :alt="item.src" style="width: 100%;height: 100%;" @click="shadowShowFun(item.src)">
                        </swiper-slide>
                        <div class="swiper-button-prev" id="swiper-button-prev2" slot="button-prev"></div>
                        <div class="swiper-button-next" id="swiper-button-next2" slot="button-next"></div>
                        <div class="swiper-pagination" id="swiper-pagination2" slot="pagination"></div>
                      </swiper>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="24" style="text-align: left;padding-top: 20px">
              <el-button size="small" @click="formReset" style="width: 120px;height: 40px;font-size: 16px;color: #357ced;">重置信息</el-button><el-button size="small" type="primary" :disabled="submitLoading" @click="formSubmit" style="width: 120px;height: 40px;margin-left: 50px;font-size: 16px">提交申请</el-button>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </el-form>

  </div>
</template>

<script>
import Upload from '@/components/Upload/singleImage3'
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import { getAdminToken } from '@/utils/auth'
import detailApi from '@/api/detailApi'
import crypto from 'crypto' // 用于md5
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

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
  comment_disabled: true
}


export default {
  name: 'articleDetail',
  components: { Upload,swiper, swiperSlide},
  data() {
    const checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(value.toString().replace(/^\d+(\.)?(\d)*$/g, '')){
        // /[^\d|.]/
        ///^\d+(\.\d+)?$/
        return callback(new Error('请填写正确信息'));
      }
    }

    const checkEmpty = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }
    }
    const checkNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value)){
        // /[^\d|.]/
        ///^\d+(\.\d+)?$/
        return callback(new Error('请填写正确信息'));
      }
    }
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(!(/^1[34578]\d{9}$/.test(value))){
        // /[^\d|.]/
        ///^\d+(\.\d+)?$/
        return callback(new Error('请填写正确信息'));
      }
    }
    const checkVehicle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项不能为空'));
      }else if(!(/^[a-zA-Z0-9]{17}$/.test(value))){
        // /[^\d|.]/
        ///^\d+(\.\d+)?$/
        return callback(new Error('此项为17数字和字母组合'));
      }
    }
    return {
      swiperOption: {
        observer:true,
        observeParents:true,
        slidesPerView: 3,
        spaceBetween: 10,
        // init: false,
        pagination: {
          el: '#swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '#swiper-button-next',
          prevEl: '#swiper-button-prev'
        }
      },
      swiperOption2: {
        slidesPerView: 3,
        spaceBetween: 10,
        // init: false,
        pagination: {
          el: '#swiper-pagination2',
          clickable: true
        },
        navigation: {
          nextEl: '#swiper-button-next2',
          prevEl: '#swiper-button-prev2'
        }
      },
      swiperNav:{nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev'},
      aliUploadHost: '', // 图片上传host
      imgDir: '', // 图片上传dir备份
      imgData: {}, // 上传图片需要的表单
      shadowShow: false,
      shadowSrc: '',
//    	images: [{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"},{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/045b6526879073d440c470d1e78969fa.JPG"},{src:"http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/043147fb1aa26f82167a73b535ea4686.JPG"}],
			divgutter: 20,
			cartype: '1',
			imgs1: [],
			imgs2: [],
      mechart_name: '1',
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      userLIstOptions: [],
      platformsOptions: [
        { key: 'a-platform', name: 'a-platform' },
        { key: 'b-platform', name: 'b-platform' },
        { key: 'c-platform', name: 'c-platform' }
      ],
      subForm: {
        token: getAdminToken(),
        customer_name: '',
        customer_telephone: '',
        customer_certificate_number: '',
        merchant_id: '1',
        merchant_name: '经销商',
        product_id: '1',
        bondsman_name: '',
        bondsman_certificate_number: '',
        spouse_name: '',
        spouse_certificate_number: '',
        bondsman_spouse_name: '',
        bondsman_spouse_certificate_number: '',
        imgs: {'1': {'source_type': 'image', 'source_lists': []}, '2': {'source_type': 'image', 'source_lists': []}}, // 添加过的图片
      },
      // 提交loading
      submitLoading: false

    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    subFormRequest() {
      var _this = this
      var customer_sex = ''
      var product_name = ''
      if (this.subForm.customer_certificate_number.length < 18) {
        customer_sex = '身份证错误'
      } else {
        if (parseInt(this.subForm.customer_certificate_number.substr(16, 1)) % 2 == 1) {
          customer_sex = "男"
        } else {
          customer_sex = "女"
        }
      }
      if(_this.subForm.product_id == 1){
        product_name = '新车'
      } else if (_this.subForm.product_id == 2){
        product_name = '二手车'
      }
      return {
        token: _this.subForm.token,
        customer_name: _this.subForm.customer_name,
        customer_telephone: _this.subForm.customer_telephone,
        customer_certificate_number: _this.subForm.customer_certificate_number,
        merchant_id: _this.subForm.merchant_id,
        merchant_name: _this.subForm.merchant_name,
        product_id: _this.subForm.product_id,
        product_name: product_name,
        customer_sex: customer_sex,
        bondsman_name: _this.subForm.bondsman_name,
        bondsman_certificate_number: _this.subForm.bondsman_certificate_number,
        spouse_name: _this.subForm.spouse_name,
        spouse_certificate_number: _this.subForm.spouse_certificate_number,
        bondsman_spouse_name: _this.subForm.bondsman_spouse_name,
        bondsman_spouse_idcard: _this.subForm.bondsman_spouse_certificate_number,
        imgs: _this.subForm.imgs,
      }
    }
  },
  created() {
      this.getUploadForm()
  },
  methods: {
    // 蒙版出现
    shadowShowFun(imgsrc){
      this.shadowSrc = imgsrc
      this.shadowShow = true
    },
    shadowHide(){
      this.shadowShow = false
    },
    // 删除身份证照片
    delImg1(index){
      this.subForm.imgs['1'].source_lists.splice(index,1)
    },
    // 删除授权书照片
    delImg2(index){
      this.subForm.imgs['2'].source_lists.splice(index,1)
    },
    onSlideChangeStart (currentPage) {
    },
    onSlideChangeEnd (currentPage) {
    },
    imgBar1(){
      this.$refs.imgBar1.prev()
    },
    getUploadForm(){
      var _this = this
      var arg = {
        data: {
          file_type: 'image',
          project: 'anjie'
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
    uploadSuccess(response, file, fileList){
      var _this = this
      var addObj = { obj: [] }
      for(var i in fileList){
        var obj = {
          org: fileList[i].response.result.url,
          src: fileList[i].response.result.url,
          alt: fileList[i].response.result.fid
        }
        addObj.obj.push(obj)
      }
      for(var i in addObj.obj){
        _this.subForm.imgs['1']['source_lists'].push(addObj.obj[i])
      }
      _this.$refs.upload.clearFiles()
    },
    uploadSuccess2(response, file, fileList){
      var _this = this
      var addObj = { obj: [] }
      for(var i in fileList){
        var obj = {
          org: fileList[i].response.result.url,
          src: fileList[i].response.result.url,
          alt: fileList[i].response.result.fid
        }
        addObj.obj.push(obj)
      }
      for(var i in addObj.obj){
        _this.subForm.imgs['2']['source_lists'].push(addObj.obj[i])
      }
      _this.$refs.upload2.clearFiles()
    },
    beforeUpload(file){
      const isPic = (file.type === 'image/bmp' || file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPic) {
        this.$message.error('上传图片只能是 JPG/PNG/BMP 格式!');
        return false
      }
      // 传入md5后的文件名与key（避免key重复导致上传失败）
      var filenameMd5 = file.name.split('.')[0] + file.uid
      var fileEx = file.name.split('.')[1].toLowerCase() // 大写后缀转小写
      const md5 = crypto.createHash('md5')
      md5.update(filenameMd5)
      this.imgData.name = md5.digest('hex') + '.' + fileEx
      this.imgData.key = this.imgDir + this.imgData.name
    },
    formReset(){
      this.subForm.customer_name = ''
      this.subForm.customer_telephone = ''
      this.subForm.customer_certificate_number = ''
      this.subForm.merchant_id = '1'
      this.subForm.merchant_name = '经销商'
      this.subForm.product_id = '1'
      this.subForm.product_name = '新车'
      this.subForm.bondsman_name = ''
      this.subForm.bondsman_certificate_number = ''
      this.subForm.bondsman_spouse_name = ''
      this.subForm.bondsman_spouse_certificate_number = ''
      this.subForm.spouse_name = ''
      this.subForm.spouse_certificate_number = ''
//      this.subForm.imgs = {'1': {'source_type': '1', 'source_lists': []}, '2': {'source_type': '2', 'source_lists': []}}
    },
    formSubmit(){
      var _this = this
      var arg = {
        data: _this.subFormRequest,
        success: function (res) {
          _this.submitLoading = false
          if(res.error_no == 200){
            _this.$alert('申请成功', '申请成功', {
              confirmButtonText: '确定'
            })
            _this.formReset()
            _this.subForm.imgs = {'1': {'source_type': 'image', 'source_lists': []}, '2': {'source_type': 'image', 'source_lists': []}}
          } else {
            _this.$alert(res.error_msg, '申请失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: function (err) {
          _this.submitLoading = false
          _this.$message(err)
        }
      }
      if(_this.subForm.customer_name == ''){
        _this.$alert('请填写客户姓名', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.subForm.customer_telephone == ''){
        _this.$alert('请填写客户电话', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
      if(!(/^1[34578]\d{9}$/.test(_this.subForm.customer_telephone))){
        _this.$alert('客户电话格式错误', '格式错误', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.subForm.customer_certificate_number == ''){
        _this.$alert('请填写客户身份证号', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
      if(!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_this.subForm.customer_certificate_number)){
        _this.$alert('客户身份证格式错误', '格式错误', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.subForm.spouse_certificate_number != '' && (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_this.subForm.spouse_certificate_number))){
        _this.$alert('客户配偶身份证格式错误', '格式错误', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.subForm.bondsman_certificate_number != '' && (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_this.subForm.bondsman_certificate_number))){
        _this.$alert('担保人身份证格式错误', '格式错误', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.subForm.bondsman_spouse_certificate_number != '' && (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_this.subForm.bondsman_spouse_certificate_number))){
        _this.$alert('担保人配偶身份证格式错误', '格式错误', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.subForm.imgs['1'].source_lists.length == 0){
        _this.$alert('请上传身份证照片', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.subForm.imgs['2'].source_lists.length == 0){
        _this.$alert('请上传授权书照片', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
//      if(_this.submitLoading == false){
//          return
//      }
      _this.submitLoading = true
      detailApi.creditRequest(arg)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  #overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 99999; /* 此处的图层要大于页面 */
    transition: 1s;
  }
  #overlay>div{
    background: #000;
    filter: alpha(opacity=50); /* IE的透明度 */
    opacity: 0.5;  /* 透明度 */
    width: 100%;
    height: 100%;
    z-index: 99999; /* 此处的图层要大于页面 */
  }
  #overlay>img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
    opacity: 1;
  }
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
      padding: 40px 45px 20px 50px;
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
  }
</style>

