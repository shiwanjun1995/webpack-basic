import Axios from 'axios'

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

export const get = request

export const post = (url, params) => request(url, params, 'post')

export const del = (url, params) => request(url, params, 'delete')

export const put = (url, params) => request(url, params, 'put')
