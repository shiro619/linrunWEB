// 列表类接口
import requestCore from '@/api/request-core'

class loginApi extends requestCore {
    // 征信报告列表接口
    adminlogin (arg, ...other) {
        this.post('Api/workplatform/listworkplatform', arg)
    }

}

export default new loginApi()