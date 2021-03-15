import Axios from 'axios'
import router from '@/router/index.js'
// 请求的基本配置 起别名
// 使用别名方法时，不需要在配置中指定url、method和data属性
// axios.request(config)
const request = (url, params, method = 'get') => {
    let options = {
        method: method
    }
    options.data = params
    return Axios({url, ...options})
}

// 后端定义的resetful接口风格 映射
const actionMapping = {
    get: 'view',
    post: 'add',
    put: 'edit',
    delete: 'delete'
  }

// 请求拦截器
Axios.interceptors.request.use(req => {
    if (req.url !== '/login') {
        const action = actionMapping[req.method]
        const currentRight = router.currentRoute.meta
        if (currentRight && currentRight.indexOf(action) === -1) {
            alert('没有权限')
            return Promise.reject(new Error('没有权限'))
        }
    }
    return req
  })

export const get = request

export const post = (url, params) => request(url, params, 'post')

export const del = (url, params) => request(url, params, 'delete')

export const put = (url, params) => request(url, params, 'put')
