import axios from 'axios'
import {url, urlc, upload} from '@/common/config'
import qs from 'qs'
import store from '../store'
import { Message } from 'element-ui'

class requestCore {

    get (api, arg) {
        const params = arg.data ? {
            params: arg.data
        } : {}
        axios.get(url + api,
            params
        ).then(response => {
          if( response['data'].error_no == 401 || response['data'].error_no == 402 || response['data'].error_no == 409 ){
            store.dispatch('LogOut').then(() => {
              Message.error(response['data'].error_msg)
              location.href = '#/login'
            })
            return
          }
        	arg.success && arg.success(response['data'])
//          if (response['data']['error_no'] == 200) {
//              arg.success && arg.success(response['data'])
//          } else {
//              arg.error && arg.error(response['data'][error_msg])
//          }
        }).catch(e => {
            arg.error && arg.error(e)
        })
    }

    post (api, arg) {
        const params = qs.stringify(arg.data ?arg.data : {})
        axios.post(url + api,
            params
        ).then(response => {
          if( response['data'].error_no == 401 || response['data'].error_no == 402 || response['data'].error_no == 409 ){
            store.dispatch('LogOut').then(() => {
              Message.error(response['data'].error_msg)
              location.href = './#/login'
            })
            return
          }
        	arg.success && arg.success(response['data'])
//          if (response['data']['error_code'] === 0) {
//              arg.success ? arg.success(response['data']) : ''
//          } else {
//              arg.error ? arg.error(response['data'][error_msg]) : ''
//          }
        }).catch(e => {
            arg.error && arg.error(e)
        })
    }

    // 图片上传使用
    postH (api, arg) {
        axios({
            url: urlc + api,
            method: 'post',
            data: arg.data,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(response => {
            arg.success(response['data'])
            // if (response['data']['error_code'] === 0) {
            //     arg.success ? arg.success(response['data']) : ''
            // } else {
            //     arg.error ? arg.error(response['data'][error_msg]) : ''
            // }
        }).catch(e => {
            arg.error ? arg.error(e) : ''
        })
    }
  getH (api, arg) {
    const params = arg.data ? {
      params: arg.data
    } : {}
    axios.get(urlc + api,
      params
    ).then(response => {
      arg.success && arg.success(response['data'])
    }).catch(e => {
      arg.error && arg.error(e)
    })
  }
}

export default requestCore
