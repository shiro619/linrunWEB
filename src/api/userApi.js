// 列表类接口
import requestCore from '@/api/request-core'

class userApi extends requestCore {
  adminlogin (arg, ...other) {
    this.post('auth/login', arg)
  }
}

export default new userApi()
