<template>
  <div class="createPost-container" style="background-color: #ffffff;margin-top: 0px;margin-left: 7px">
    <!--<h2>客户基本资料</h2>-->
    <div id="overlay" v-show="shadowShow" @click="shadowHide"><div></div><img :src="shadowSrc" alt=""></div>
    <el-form class="form-container" ref="postForm">
      <div class="createPost-main-container">
        <el-row :gutter="divgutter" id="inquireContainer">
          <el-col :span="14">
            <el-col :span="11">
              <h3>来源信息</h3>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24" style="height: 40px">
                    <el-form-item :label-width="labelwidth" label="车辆类型:" class="postInfo-container-item" style="width: 100%">
                      <span v-text="userInfo.cartype"></span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" style="height: 40px">
                    <el-form-item :label-width="labelwidth" label="申请件来源:" class="postInfo-container-item" style="width: 100%">
                      <span v-text="userInfo.merchant_name"></span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" style="height: 40px">
                    <el-form-item :label-width="labelwidth" label="业务地区:" class="postInfo-container-item" style="width: 100%;">
                      <span v-text="userInfo.credit_city"></span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item :label-width="labelwidth" label="业务人员:" class="postInfo-container-item" style="width: 100%;">
                      <span v-text="userInfo.salesman_name"></span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <h3>基本信息</h3>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label-width="labelwidth" label="客户姓名:" class="postInfo-container-item" style="width: 100%;">
                      <span v-text="userInfo.customer_name"></span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item :label-width="labelwidth" label="性别:" class="postInfo-container-item" style="width: 100%;">
                      <span v-text="userInfo.customer_sex"></span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item :label-width="labelwidth" label="年龄:" class="postInfo-container-item" style="width: 100%;">
                      <span v-text="userInfo.customer_age"></span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item :label-width="labelwidth" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                      <span v-text="userInfo.customer_certificate_number"></span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item :label-width="labelwidth" label="手机号:" class="postInfo-container-item" style="width: 100%;">
                      <span v-text="userInfo.customer_telephone"></span>
                    </el-form-item>
                  </el-col>

                  <template v-if="hasspouse">
                    <el-col :span="24">
                      <el-form-item :label-width="labelwidth" label="配偶姓名:" class="postInfo-container-item" style="width: 100%;">
                        <span v-text="userInfo.spouse_name"></span>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item :label-width="labelwidth" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                        <span v-text="userInfo.spouse_certificate_number"></span>
                      </el-form-item>
                    </el-col>
                  </template>

                 </el-row>
              </div>

              <template v-if="hasbondsman">
                <h3>担保人信息</h3>
                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item :label-width="labelwidth" label="担保人姓名:" class="postInfo-container-item" style="width: 100%;">
                        <span v-text="userInfo.bondsman_name"></span>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item :label-width="labelwidth" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                        <span v-text="userInfo.bondsman_certificate_number"></span>
                      </el-form-item>
                    </el-col>

                    <template v-if="hasbondsmanspouse">
                      <el-col :span="24">
                        <el-form-item :label-width="labelwidth" label="配偶姓名:" class="postInfo-container-item" style="width: 100%;">
                          <span v-text="userInfo.bondsman_spouse_name"></span>
                        </el-form-item>
                      </el-col>

                      <el-col :span="24">
                        <el-form-item :label-width="labelwidth" label="身份证号:" class="postInfo-container-item" style="width: 100%;">
                          <span v-text="userInfo.bondsman_spouse_certificate_number"></span>
                        </el-form-item>
                      </el-col>
                    </template>

                  </el-row>
                </div>
              </template>
            </el-col>
            <el-col :span="13">
              <h3>人行征信</h3>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label-width="75px" label="征信结果:" class="postInfo-container-item" style="width: 100%;">
                      <!--<el-radio name="postInfo-container-item" label="1" checked="checked">通过</el-radio>-->
                      <!--<el-radio name="postInfo-container-item" label="2">不通过</el-radio>-->
                      <label role="radio" tabindex="0" class="el-radio">
                        <span class="el-radio__input" style="width: 15px;height: 15px;">
                          <input type="radio" class="el-radio__original" style="z-index: 1;opacity: 1;width: 15px;height: 15px;" checked value="1" name="inquire_result">
                        </span>
                        <span class="el-radio__label">通过</span>
                      </label>
                      <label role="radio" tabindex="0" class="el-radio">
                        <span class="el-radio__input" style="width: 15px;height: 15px;">
                          <input type="radio" class="el-radio__original" style="z-index: 1;opacity: 1;width: 15px;height: 15px;" value="2" name="inquire_result">
                        </span>
                        <span class="el-radio__label">不通过</span>
                      </label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" class="textareaCol">
                    <el-form-item label-width="75px" label="备注:" class="postInfo-container-item" style="width: 100%;">
                      <el-input type="textarea" :rows="4" placeholder="备注" ref="inquire_description" id="inquire_description">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="postInfo-container">
                <el-row>
                  <el-col :span="24" style="height: 55px;">
                    <span>征信照片 / {{imgShow2.length}}张</span><span style="color: lightgray;font-size: 12px;">（请上传客户的征信报告照片）</span>
                    <!--<el-button size="small" type="primary" @click="delImg" style="position: absolute; left: 0;top: 20px;z-index: 999;">删除当前图片</el-button>-->
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
                      style="text-align: right;position: absolute;right: 0;top: 20px;">
                    <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :span="24" style="background-color: #F6F7FA;height: 300px">
                    <swiper :options="swiperOption" ref="imgSlider">
                      <swiper-slide v-for="(item,index ) in imgShow2" style="height: 300px;width: 200px;">
                        <div @click="delImg(item.file_id)" style="background-color: #ffffff;border-radius: 15px;padding: 0px; position: absolute;top: 0;right: 0;"><span class="el-icon-error" style="font-size: 20px"></span></div>
                        <img :src="item.file_path" :alt="item.file_path" style="width: 100%;height: 100%;" @click="shadowShowFun(item.file_path)">
                      </swiper-slide>
                      <div class="swiper-button-prev" id="swiper-button-prev" slot="button-prev"></div>
                      <div class="swiper-button-next" id="swiper-button-next" slot="button-next"></div>
                      <div class="swiper-pagination" id="swiper-pagination" slot="pagination"></div>
                    </swiper>
                    <!--<el-carousel indicator-position="outside" :autoplay="false" ref="imgSlider">-->
                      <!--<el-carousel-item v-for="item in imgShow2" :key="item">-->
                        <!--<img :src="item.file_path" :alt="item.thumb_file" :data-fid="item.file_id" style="width: 100%;height: 100%;">-->
                      <!--</el-carousel-item>-->
                    <!--</el-carousel>-->
                  </el-col>
                </el-row>
              </div>
            </el-col>

            <el-col :span="24">
              <el-button type="primary" style="float: right;" @click="submitFun">提交</el-button>
            </el-col>
          </el-col>
          <el-col :span="10" :gutter="divgutter">
          	<h3>征信资料<span>（</span><span style="text-decoration: underline;color: #0000dd;cursor: pointer;font-size: 14px;font-weight: normal" @click="creditDownload">下载</span><span>）</span></h3>
            <div style="left: 100px;top: 15px">

            </div>
            <div class="postInfo-container">
              <el-row>
              	<el-col :span="24">
                  <el-col :span="24" style="margin-bottom: 10px">
                    <el-select v-model="imgSelectVal" placeholder="请选择">
                      <el-option
                        v-for="item in imgSelectOpt"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
              		<el-col :span="24" style="height: 540px;">
                    <div style="background-color: #F6F7FA;height: 600px">
                      <template v-if="imgCompleted">
                        <div class="images" v-viewer="{movable: true,inline: true,navbar: true,url: 'data-original'}" ref="viewerInquire">
                          <img v-for="src in imgShow" @click="imgClick" :src="src.thumb_file" :data-original="src.file_path" :key="src.file_id" style="width: 100px;height: 200px;display: none">
                        </div>
                      </template>
                    </div>
              		</el-col>
              	</el-col>
              </el-row>
            </div>
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
import Viewer from 'v-viewer'
import crypto from 'crypto' // 用于md5
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
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


export default {
  name: 'articleDetail',
  components: { Upload, Viewer, swiper, swiperSlide},
  data() {
    return {
      swiperOption: {
        observer:true,
        observeParents:true,
        slidesPerView: 1,
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
      shadowShow: false,
      shadowSrc: '',
      aliUploadHost: '', // 图片上传host
      imgDir: '', // 图片上传dir备份
      imgData: {}, // 上传图片需要的表单
      img_add: {}, // 添加过的图片
      img_delete: {}, // 删除过的照片
      resResult: [], // 借口拿到的图片备份（暂时没用）
      resImages: [], // 接口拿到的图片
      querydata: this.$route.query,
      requestdata: {
        token: getAdminToken(),
        work_id: this.$route.query.id
      },
      imgSelectOpt: [{
        value: '1',
        label: '身份证'
      },{
        value: '2',
        label: '授权书'
      }],
      imgSelectVal: '1',
      userInfo: {
        cartype: '',
        merchant_name: '',
        credit_city: '',
        salesman_name: '',
        customer_name: '',
        customer_sex: '',
        customer_age: '',
        customer_certificate_number: '',
        customer_telephone: '',
        spouse_name: '',
        spouse_certificate_number: '',
        bondsman_spouse_name: '',
        bondsman_spouse_certificate_number: '',
        bondsman_name: '',
        bondsman_certificate_number: ''
      },
      customerData: {
        token: getAdminToken(),
        work_id: this.$route.query.id,
        item_instance_id: this.$route.query.item_instance_id,
        type: 1,
        inquire_result: '1',
        inquire_description: '',
        imgs: ''
      },
    	isEdit: false,
      divgutter: 20,
      labelwidth: '100px',
    }
  },
//  created() {
//    this.$refs.viewerInquire.view(1)
//  },

  computed: {
    hasspouse(){
      var _this = this
      if(_this.userInfo.spouse_name == '' || _this.userInfo.spouse_name == null) {
        return false
      } else {
          return true
      }
    },
    hasbondsman(){
      var _this = this
      if(_this.userInfo.bondsman_name == '' || _this.userInfo.bondsman_name == null) {
        return false
      } else {
        return true
      }
    },
    hasbondsmanspouse(){
      var _this = this
      if(_this.userInfo.bondsman_spouse_name == '' || _this.userInfo.bondsman_spouse_name == null) {
        return false
      } else {
        return true
      }
    },
    imgShow(){
      var _this = this
      var putImages = []
      for(var i in _this.resImages){
        if(_this.resImages[i].file_class_id == _this.imgSelectVal){
//          _this.resImages[i].file_path = "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"
//          _this.resImages[i].thumb_file = "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"
          putImages.push(_this.resImages[i])
        }
      }
      return putImages
    },
    imgShow2(){
      var _this = this
      var putImages = []
      for(var i in _this.resImages){
        if(_this.resImages[i].file_class_id == 3){
//          _this.resImages[i].file_path = "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"
//          _this.resImages[i].thumb_file = "http://test-linrun.anjietest-feature.ifcar99.com/uploads/image/20171218/090f27f1048014138a65e18b9486a92f.JPG"
          putImages.push(_this.resImages[i])
        }
      }
      return putImages
    },
    imgCompleted(){
      if(this.imgShow.length > 0){
        return true
      } else {
        return false
      }
    },
    customerDataRequest(){ // 实际提交的数据（加入img）
      var data = this.customerData
      var img = {'add':this.img_add,'delete':this.img_delete}
      data.imgs = JSON.stringify(img)
      return data
    }
  },
  created() {
    this.getInfo()
    this.getImgs()
    this.getUploadForm()
  },
  methods: {
    // word下载方法
    creditDownload(){
      var _this = this
      var arg = {
        data: {token:getAdminToken(), work_id: _this.$route.query.id,},
        success: res => {
          if(res.error_no == 200){
            location.href = res.result.word_url
          } else {
            _this.$alert(res.error_msg, '下载失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: err => {

        }
      }
      detailApi.getCreditDownload(arg)
    },
    // 蒙版出现
    shadowShowFun(imgsrc){
      this.shadowSrc = imgsrc
      this.shadowShow = true
    },
    shadowHide(){
      this.shadowShow = false
    },
    getInfo() {
      var _this = this
      var arg = {
        data: _this.requestdata,
        success: function (res) {
          if(res.error_no == 200){
            _this.userInfo.cartype = res.result.product_name
            _this.userInfo.merchant_name = res.result. merchant_name
            _this.userInfo.credit_city = res.result.credit_city
            _this.userInfo.salesman_name = res.result.salesman_name
            _this.userInfo.customer_name = res.result.customer_name
            _this.userInfo.customer_sex = res.result.customer_sex
            _this.userInfo.customer_age = res.result.customer_age
            _this.userInfo.customer_certificate_number = res.result.customer_certificate_number
            _this.userInfo.customer_telephone = res.result.customer_telephone
            _this.userInfo.spouse_name = res.result.spouse_name
            _this.userInfo.spouse_certificate_number = res.result.spouse_certificate_number
            _this.userInfo.bondsman_name = res.result.bondsman_name
            _this.userInfo.bondsman_certificate_number = res.result.bondsman_certificate_number
            _this.userInfo.bondsman_spouse_name = res.result.bondsman_spouse_name
            _this.userInfo.bondsman_spouse_certificate_number = res.result.bondsman_spouse_idcard
          }
        },
        error: function (err) {

        }
      }
      detailApi.getInquireDetail(arg)
    },
    getUploadForm(){
      var _this = this
      var arg = {
        data: {
          file_type : 'image',
          project:'anjie'
        },
        success: function (res) {
          console.log('formData')
          console.log(res)
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
          console.log(err)
        }
      }
      detailApi.uploadForm(arg)
    },
    getImgs() {
      var _this = this
      var arg = {
        data: _this.requestdata,
        success: function (res) {
          if(res.error_no == 200){
            _this.resImages = res.result
          }
        },
        error: function (err) {

        }
      }
      detailApi.getListImgs(arg)
    },
    imgClick(){
      console.log('imgClick')
    },
    uploadSuccess(response, file, fileList){
      var _this = this
      if (!_this.img_add.hasOwnProperty('3')) {
        _this.img_add['3'] = {
          'source_type': 'image',
          'source_lists': []
        }
      }
      var addObj = { obj : [] , obj1: []}
      for(var i in fileList){
        var obj = {
          org: fileList[i].response.result.url,
          src: fileList[i].response.result.url,
          alt: fileList[i].response.result.fid
        }
        var obj1 = {
          file_class_id: '3',
          file_id: fileList[i].response.result.fid,
          file_path: fileList[i].response.result.url,
          thumb_file: fileList[i].response.result.url
        }
        addObj.obj.push(obj)
        addObj.obj1.push(obj1)
      }
      for(var i in addObj.obj){
        _this.img_add['3'].source_lists.push(addObj.obj[i])
      }
      for(var i in addObj.obj1){
        _this.resImages.push(addObj.obj1[i])
      }
      _this.$refs.upload.clearFiles()
    },
    beforeUpload(file){
      // 传入md5后的文件名与key（避免key重复导致上传失败）
      var filenameMd5 = file.name.split('.')[0] + file.uid
      const md5 = crypto.createHash('md5')
      md5.update(filenameMd5)
      this.imgData.name = md5.digest('hex') + '.' + file.name.split('.')[1]
      this.imgData.key = this.imgDir + this.imgData.name
    },
    delImg(fid){
      var _this = this
      var imgFid = fid//$(".el-carousel__item.is-active>img").attr('data-fid') // 通过jquery拿到插件当前index
      var thisImg = {
        org: '',
        src: '',
        alt:''
      }
      for(var i in _this.resImages){
          if(_this.resImages[i].file_id == imgFid){
            thisImg.org = _this.resImages[i].thumb_file
            thisImg.src = _this.resImages[i].file_path
            thisImg.alt = _this.resImages[i].file_id // 如果是刚上传的图片，添加进imgShow里面时没有id属性
            break
          }
      }
      if (!_this.img_delete.hasOwnProperty('3')) {
        _this.img_delete['3'] = {
          'source_type': 'image',
          'source_lists': []
        }
      }
      _this.img_delete['3'].source_lists.push(thisImg) // 写入图片删除数组
      for(var i in _this.resImages){
        if(_this.resImages[i].file_id == imgFid){
          _this.resImages.splice(i, 1)
          break
        }
      }
    },
    submitFun(){
      var _this = this
      var submitData = _this.customerDataRequest
      submitData['inquire_result'] = $('input:radio[name="inquire_result"]:checked').val()
      submitData['inquire_description'] = $('#inquire_description').val()
      var arg = {
        data: submitData,
        success: function (res) {
          if(res.error_no == 200){
            _this.$alert('提交成功', '提交成功', {
              confirmButtonText: '确定'
            })
            _this.$router.push({ path: '/work/inquire' , query: {searchtype: 2}})
          } else {
            _this.$alert(res.error_msg, '提交失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: function (err) {
//          _this.$alert(err, '提交失败', {
//            confirmButtonText: '确定'
//          })
        }
      }

      if(submitData['inquire_description'] == ''){
        _this.$alert('请填写征信备注', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
//      if (_this.img_add.hasOwnProperty('3')) {
//        if(_this.img_add['3'].source_lists.length == 0){
//          _this.$alert('请上传征信照片', '请填写完整', {
//            confirmButtonText: '确定'
//          })
//          return
//        }
//      } else {
//        _this.$alert('请上传征信照片', '请填写完整', {
//          confirmButtonText: '确定'
//        })
//        return
//      }
      this.$confirm('是否确定提交', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        detailApi.submitInquire(arg)
      }).catch(() => {
      })
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  #inquireContainer{
    .postInfo-container{
      .el-col-24{
        height:40px;
      }
      .textareaCol{
        height: 120px;
        padding-top: 20px;
      }
    }
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }


</style>

<!--<style scoped>-->
  <!--.postInfo-container-item .el-form-item__label{-->
    <!--text-align: left;-->
  <!--}-->
<!--</style>-->

