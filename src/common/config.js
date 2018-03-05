// 配置信息
const urle = 'http://www.easy-mock.com/mock/59c47b52e0dc663341b427a3/thinkapi/'
const urlc = 'http://feature-lsk-adminissue.apitest-feature.ifcar99.com/api.php/sts/get_web_config' //'http://release-jcjr.apitest-feature.ifcar99.com/api.php/sts/get_web_config'
const urlc1 = 'http://feature-lsk-oss.apitest-feature.ifcar99.com/api.php/sts/get_web_config'
const url = /*'http://lrapi.zjhbjt.cn/'*//*'http://ly.zjhbjt.cn/'*//*'http://test.zjhbjt.cn/'*/'http://release-anjie.anjietest-feature.ifcar99.com/'

const upload = 'http://10.10.12.110:3001/api/upload'
const uploade = 'http://think.10jqka.com.cn/api/upload'

export default {
	url: url,
	urlc: urlc,
	upload: upload
}

// 支持结构赋值
export  {
	url,
	urlc,
	upload
}
