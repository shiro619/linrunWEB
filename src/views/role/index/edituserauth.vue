<template>
	<div class="content">
		<div class="role-container">
			<el-row :gutter="10">
        <el-col :span="24" style="background: #fff; padding:40px 25px;padding-bottom: 46px;">
          <el-col :span="24">
            <el-col :span="24">
              <el-form class="form-container" ref="customerData">
                <el-form-item :label-width="labelwidth" label="姓名:" class="postInfo-container-item" style="width: 100%;max-width: 300px">
                  <span v-text="authquery.loginname"></span>
                </el-form-item>
                <el-form-item :label-width="labelwidth" label="账号:" class="postInfo-container-item" style="width: 100%;max-width: 300px">
                  <span v-text="authquery.mobile"></span>
                </el-form-item>
                <el-form-item :label-width="labelwidth" label="角色:" class="postInfo-container-item" style="width: 100%;max-width: 300px">
                  <span v-text="authquery.title"></span>
                </el-form-item>
                <el-form-item :label-width="labelwidth" label="所在地区:" class="postInfo-container-item" style="width: 100%;max-width: 300px">
                  <span v-text="authquery.province"></span>
                </el-form-item>
                <el-form-item :label-width="labelwidth" label="" class="postInfo-container-item" style="width: 100%;max-width: 300px">
                  <span v-text="authquery.city"></span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-col>
          <el-col :span="24">
            <template v-if="refreshtree">
              <div style="width: 700px;height: 50px;display: block">
                <span>【可选】</span>
                <span style="margin-left: 340px">【已选】</span>
              </div>
              <div style="width: 300px;height: 400px;display: inline-block;overflow: scroll;border: 1px solid">
                <el-tree
                  :data="citydataShow1"
                  show-checkbox
                  node-key="id"
                  ref="provinceTree1"
                  :props="defaultProps">
                </el-tree>
              </div>
              <div style="width: 100px;height: 400px;display: inline-block;position: relative;">
                <button style="width: 80px;display: inline-block;position: absolute; top: 45%;left: 10px;" @click="dataLeft"><</button>
                <button style="width: 80px;display: inline-block;position: absolute; top: 55%;left: 10px;" @click="dataRight">></button>
              </div>
              <div style="width: 300px;height: 400px;display: inline-block;overflow: scroll;border: 1px solid">
                <el-tree
                  :data="citydataShow2"
                  show-checkbox
                  node-key="id"
                  ref="provinceTree2"
                  :props="defaultProps">
                </el-tree>
              </div>
            </template>
          </el-col>
          <el-col :span="24">
            <div style="height: 20px"></div>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="saveSubmit">保存</el-button>
          </el-col>
        </el-col>
			</el-row>
		</div>
	</div>

</template>

<script>
	import "@/font/iconfont.css";
	import listApi from '@/api/listApi'
	import waves from '@/directive/waves' // 水波纹指令
	import { parseTime } from '@/utils'
	import { getAdminToken } from '@/utils/auth'
	import pre_data from '@/common/city_data'

	export default {
		name: 'edituserauth',
		directives: {
			waves
		},
		components: {pre_data},
		data() {
      function citydataShow(){
        var arr = []
        for (var i in pre_data) {
          var provinceData = {
            id: pre_data[i].value,
            label: pre_data[i].text,
            children: []
          }
          var citys = pre_data[i].children
          for(var j in citys){
            var citydata = {
              parid: pre_data[i].value,
              parlabel: pre_data[i].text,
              id: citys[j].value,
              label: citys[j].text
            }
            provinceData.children.push(citydata)
          }
          arr.push(provinceData)
        }
        return arr
      }
			return {
        refreshtree: true,
        labelwidth: '80px',
        authquery: {
          loginname: this.$route.query.loginname,
          mobile: this.$route.query.mobile,
          title: this.$route.query.title,
          province: this.$route.query.province,
          city: this.$route.query.city,
          user_id: this.$route.query.user_id,
          role_id: this.$route.query.role_id
        },
        citydataShow: citydataShow(), // 备份
        citydataShow1: citydataShow(),
        citydataShow2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
			}
		},
		filters: {

		},
		created() {
		},
    computed: {
      // 默认展开项（用户所在省份）
      defaultkey(){
        var defaultkeys = []
        for(var i in pre_data){
          if(pre_data[i].text == this.authquery.province){
            defaultkeys.push(pre_data[i].value)
            break
          }
        }
        return defaultkeys
      },
      submitData(){
        var _this = this
        var provinceStr = ''
        var cityStr = ''
        for(var i in _this.citydataShow2){
          provinceStr += (_this.citydataShow2[i].label + ',')
          var citys = _this.citydataShow2[i].children
          for(var j in citys){
            cityStr += (citys[j].label + ',')
          }
        }
        return {
          token: getAdminToken(),
          user_id: _this.authquery.user_id,
          username: _this.authquery.loginname,
          role_id: _this.authquery.role_id,
          province_names: provinceStr,
          city_names: cityStr
        }
      }

    },
		methods: {
      dataLeft(){
        var _this = this
        var changeData = this.$refs.provinceTree2.getCheckedNodes()
        // 查找是否有该子节点方法(通过id)
        function searchNode(data,nodeid) {
          console.log('nodeSearch')
          console.log(data)
          console.log(nodeid)
          var hasNode = -1
          for(var i in data){
            if(data[i].id == nodeid){
              hasNode = i
            }
          }
          return hasNode
        }
        // 将需要创建子节点的与不需要的分开
        var needpar = [] // 需要的
        var unneedpar = [] // 不需要的
        var needparArr = [] // 需要创建子节点的加上父节点的数组
        for(let i in changeData) {
          if(!changeData[i].hasOwnProperty('children')){
            (function () {
              var tag = false
              for (var l in _this.citydataShow1) {
                if (_this.citydataShow1[l].id == changeData[i].parid) {
                  unneedpar.push(changeData[i])
                  tag = true
                  break
                }
              }
              if(!tag){
                needpar.push(changeData[i])
              }
            })()
          }
        }
        for(let i in needpar){
          if(needparArr.hasOwnProperty(needpar[i].parid)){
            needparArr[needpar[i].parid].push(needpar[i])
          } else {
            needparArr[needpar[i].parid] = []
            needparArr[needpar[i].parid].push(needpar[i])
          }
        }
        // 添加
        for(let i in unneedpar){
          for(let j in _this.citydataShow1){
            if(_this.citydataShow1[j].id == unneedpar[i].parid){
              _this.citydataShow1[j].children.push(unneedpar[i])
              break
            }
          }
        }
        for(let i in needparArr){
          let oid
          let olabel
          for(let o in _this.citydataShow){
            if(_this.citydataShow[o].id == i){
              oid = _this.citydataShow[o].id
              olabel = _this.citydataShow[o].label
              break
            }
          }
          var proArr = {
            id: oid,
            label:olabel,
            children:needparArr[i]
          }
          _this.citydataShow1.push(proArr)
        }
        //从左侧框删除
        for(let i in changeData) {
          for (let j in _this.citydataShow2) {
            (function () {
              if (changeData[i].parid == _this.citydataShow2[j].id) {
                let citys = _this.citydataShow2[j].children
                for (var k in citys) {
                  (function () {
                    if (changeData[i].id == citys[k].id) {
                      _this.citydataShow2[j].children.splice(k, 1)
                    }
                  })()

                }
                // 如果父节点下没有子节点，则删除父节点
                if (citys.length == 0) {
                  _this.citydataShow2.splice(j, 1)
                }
              }
            })()
          }
        }
        // 重新渲染
        _this.refreshtree = false
        _this.$nextTick(function () {
          _this.refreshtree = true
        })

      },
      dataRight(){
        var _this = this
        var changeData = this.$refs.provinceTree1.getCheckedNodes()
        // 查找是否有该子节点方法(通过id)
        function searchNode(data,nodeid) {
            console.log('nodeSearch')
          console.log(data)
          console.log(nodeid)
          var hasNode = -1
          for(var i in data){
            if(data[i].id == nodeid){
              hasNode = i
            }
          }
          return hasNode
        }
        // 将需要创建子节点的与不需要的分开
        var needpar = [] // 需要的
        var unneedpar = [] // 不需要的
        var needparArr = [] // 需要创建子节点的加上父节点的数组
        for(let i in changeData) {
          if(!changeData[i].hasOwnProperty('children')){
            (function () {
              var tag = false
              for (var l in _this.citydataShow2) {
                if (_this.citydataShow2[l].id == changeData[i].parid) {
                  unneedpar.push(changeData[i])
                  tag = true
                  break
                }
              }
              if(!tag){
                needpar.push(changeData[i])
              }
            })()
          }
        }
        for(let i in needpar){
          if(needparArr.hasOwnProperty(needpar[i].parid)){
            needparArr[needpar[i].parid].push(needpar[i])
          } else {
            needparArr[needpar[i].parid] = []
            needparArr[needpar[i].parid].push(needpar[i])
          }
        }
        // 添加
        for(let i in unneedpar){
          for(let j in _this.citydataShow2){
            if(_this.citydataShow2[j].id == unneedpar[i].parid){
              _this.citydataShow2[j].children.push(unneedpar[i])
              break
            }
          }
        }
        for(let i in needparArr){
          let oid
          let olabel
          for(let o in _this.citydataShow){
            if(_this.citydataShow[o].id == i){
              oid = _this.citydataShow[o].id
              olabel = _this.citydataShow[o].label
              break
            }
          }
          var proArr = {
            id: oid,
            label:olabel,
            children:needparArr[i]
          }
          _this.citydataShow2.push(proArr)
        }
        //从左侧框删除
        for(let i in changeData) {
          for (let j in _this.citydataShow1) {
            (function () {
              if (changeData[i].parid == _this.citydataShow1[j].id) {
                let citys = _this.citydataShow1[j].children
                for (var k in citys) {
                  (function () {
                    if (changeData[i].id == citys[k].id) {
                      _this.citydataShow1[j].children.splice(k, 1)
                    }
                  })()

                }
                // 如果父节点下没有子节点，则删除父节点
                if (citys.length == 0) {
                  _this.citydataShow1.splice(j, 1)
                }
              }
            })()
          }
        }
        // 重新渲染
        _this.refreshtree = false
        _this.$nextTick(function () {
          _this.refreshtree = true
        })

      },
      saveSubmit() {
				var _this = this
				var arg = {
					data: _this.submitData,
					success: function(res) {
						if(res.error_no==200){
							_this.dialogFormVisible = false
							_this.$notify({
								title: '成功',
								message: '编辑成功',
								type: 'success',
								duration: 2000
							})
              _this.$router.push({name: 'index'})
						}else{
							_this.$notify({
								title: '错误',
								message: res.error_msg,
								type: 'error',
								duration: 2000
							})
						}

					},
					error: function(err) {}
				}
        this.$confirm('是否确定提交', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          listApi.edit_role_auth(arg)
        }).catch(() => {
        })
			},
      refreshFn(){
        this.refreshtree = false
        this.$nextTick(function () {
          this.refreshtree = true
        })
      },
      cancel(){
        var _this = this
        _this.$router.push({name: 'index'})
      }
		},
    watch:{
    }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .main-container,.content{
  	width: 100%;
  	background: #F3F5F9!important;
  	min-height: 750px;
  	padding: 50px 45px;
  }

  .role-container {

  }
  .grid-content{border-radius: 5px;padding: 60px 50px;background: #fff;position: relative;}
  .add-btn{position: absolute;right: 60px;width: 80px;height: 30px;top: 60px;padding: 0;}
  .tree-container{
  	width: 60%;
  }
</style>
<style>
</style>
