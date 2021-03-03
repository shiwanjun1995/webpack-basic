import Axios from 'axios'

// 请求的基本配置 起别名
// 使用别名方法时，不需要在配置中指定url、method和data属性
// axios.request(config)
const request = (url, method = 'get', params) => {
    let options = {
        method: method
    }
    if (method === 'post' || method === 'put') {
        // data 是跟随请求一起发送的data请求实体 仅适用于 PUT、POST、PATCH方法 data: {firstName: '大猪'} 
        options.data = params
    } else {
        options.params = params
    }
    return Axios({url, ...options})
}

export const get = request

export const post = (url, params) => request(url, 'post', params)
