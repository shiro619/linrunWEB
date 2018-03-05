// 文章详情类接口
import requestCore from '@/api/request-core'

class detailApi extends requestCore {

  //人行征信提交接口
  creditRequest (arg, ...other) {
    this.post('Api/workplatform/creditrequestsubmit', arg)
  }

  //风控初审详情接口
	getArtificalOneDetail (arg, ...other) {
	  this.get('Api/workplatform/getworkinfo/', arg)
  }

  // 退件接口
  giveup (arg, ...other) {
    this.post('Api/workflow/giveup', arg)
  }

  //征信处理详情接口
  getInquireDetail (arg, ...other) {
    this.get('Api/workplatform/getworkinfo', arg)
  }

  //征信处理接口
  submitInquire(arg, ...other){
    this.post('Api/workplatform/inquire', arg)
  }

  //审核历程
  getAuditProcess(arg, ...other){
    this.get('Api/workplatform/listtasks', arg)
  }

  //提交一审意见按钮
  auditView(arg, ...other){
    this.post('Api/workplatform/artificial', arg)
  }

  //获取图片
  getListImgs(arg, ...other) {
	  this.get('Api/file/listimages', arg)
  }

  // 图片打包下载
  getImgDownload(arg, ...other) {
    this.post('Api/file/packagefile/', arg)
  }

  // word下载
  getCreditDownload(arg, ...other) {
    this.post('system/file/wordcreate/', arg)
  }

	//资料录入
	basicInfo(arg, ...other){
		this.post('Api/workplatform/inputrequest', arg)
	}

  // 申请件查询中图片录入
  basicInfoImg(arg, ...other){
    this.post('Api/file/addworkimages', arg)
  }

  // 上传获取表单接口
  uploadForm(arg, ...other){
    this.getH('',arg)
  }

  // 抄单登记处理接口
  copytask(arg, ...other){
    this.post('Api/workplatform/copytask', arg)
  }
	//申请打款
	applyRemittance(arg, ...other){
		this.post('Api/workplatform/applyremittance', arg)
	}

	//打款审核
	moneyAudit(arg, ...other){
		this.post('Api/workplatform/moneyaudit', arg)
	}
	courier (arg, ...other) {//寄件登记
    this.post('Api/workplatform/courier', arg)
  }
	gpstask (arg, ...other) {//车辆gps登记
    this.post('Api/workplatform/gps', arg)
  }
	mortgagetask (arg, ...other) {//抵押登记
    this.post('Api/workplatform/mortgage', arg)
  }

	//财务打款
	finance(arg, ...other) {//抵押登记
    this.post('Api/workplatform/finance', arg)
  }

	//回款确认
	returnMoney (arg, ...other) {//抵押登记
    this.post('Api/workplatform/returnmoney', arg)
  }

	//fico数据查询
	ficoquery(arg, ...other) {//抵押登记
    this.post('system/workplatform/ficopost', arg)
  }

	//百融数据查询
	bairongquery(arg, ...other) {//抵押登记
    this.post('Api/workplatform/bairongcredit', arg)
  }
  //修改密码接口
  changePW (arg, ...other) {
    this.post('auth/changepasswordpost', arg)
  }
	//申请件修改
	changetask(arg, ...other) {//抵押登记
    this.post('Api/workplatform/editwork', arg)
  }
	//申请件补件
	salesSupplement(arg, ...other) {//申请件补件
    this.post('Api/workplatform/salessupplement', arg)
  }
}

export default new detailApi()
