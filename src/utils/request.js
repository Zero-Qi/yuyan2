import axios from 'axios'
import Qs from 'qs'
import {store} from '../store'
import { Message } from 'element-ui'
import router from '@/router/index.js'
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' :'/api', // url = base url + request url
    // baseURL: process.env.NODE_ENV === 'production' ? '' :'/api',
    withCredentials: true, // 当跨域请求时发送cookie
    timeout: 1000 * 8 // request timeout
  })

  
  // request interceptor
  service.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
      if (token) {
        // let each request carry token
        config.headers['X-Access-Token'] = token
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  
  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */
  
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
            const res = response.data
  
      // if the custom code is not 20000, it is judged as an error.
      // if (res.code !== '0') {
      //   Message({
      //     message: res.msg || 'Error',
      //     type: 'error',
      //     duration: 5 * 1000
      //   })
      // }
      if (res.status === 500) {
        // 401, token失效
        router.push('/login')
      }
      return res
    },
    error => {
      router.push('/login')
      Message({
        message: '重新登录',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  
  export default service