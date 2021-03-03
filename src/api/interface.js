import { get, post, put, del } from '@/api/http.js'
import API from '@/api/api.js'

const INTERFACE = {
    // 登录
    login:(params) => post(API.API_LOGIN, params),
}

export {
    INTERFACE,
    INTERFACE as default
}