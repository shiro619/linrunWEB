<template>
  <div class="createPost-container">
    <el-col :span="24">
      <el-row :gutter="10" style="text-align: center">
        <el-form style="width: 300px;display: inline-block;margin-top: 30px">
          <el-col :span="24">
            <el-form-item :label-width="labelwidth" label="旧密码" style="width: 100%;">
              <el-input placeholder="旧密码" v-model="oldPW">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item :label-width="labelwidth" label="新密码" style="width: 100%;">
              <el-input placeholder="新密码" v-model="newPW">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button size="small" type="primary" @click="formSubmit" style="float: right">修改密码</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import { getAdminToken } from '@/utils/auth'
import detailApi from '@/api/detailApi'
import crypto from 'crypto' // 用于md5


export default {
  name: 'articleDetail',
  components: { },
  data() {
    return{
      labelwidth: '75px',
      oldPW: '',
      newPW: ''
    }
  },
  computed: {
    postFormmd5(){
      var _this = this
      var pswmd5 = _this.oldPW
      const md5 = crypto.createHash('md5');
      md5.update(pswmd5)
      var pswmd52 = _this.newPW
      const md52 = crypto.createHash('md5');
      md52.update(pswmd52)
      var psw1 = md5.digest('hex')
      var psw2 = md52.digest('hex')
      return {
        'token': getAdminToken(),
        'oldpassword': psw1,
        'newpassword': psw2,
      }
    }
  },
  created() {
  },
  methods: {
    formSubmit(){
      var _this = this
      var arg = {
        data: _this.postFormmd5,
        success: function (res) {
          if(res.error_no == 200){
            _this.$alert('修改密码成功', '修改成功', {
              confirmButtonText: '确定'
            })
            _this.oldPW = ''
            _this.newPW = ''
          } else {
            _this.$alert(res.error_msg, '修改失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: function (err) {
          _this.$message(err)
        }
      }
      if(_this.oldPW == ''){
        _this.$alert('请填写旧密码', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
      if(_this.newPW == ''){
        _this.$alert('请填写新密码', '请填写完整', {
          confirmButtonText: '确定'
        })
        return
      }
      detailApi.changePW(arg)
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

