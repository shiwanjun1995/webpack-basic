import { get, post, put, del } from '@/api/http.js'
import API from '@/api/api.js'

const INTERFACE = {
    // 登录
    login:(params) => post(API.API_POST_LOGIN, params),

    // 获取列表
    getList:(params) => get(API.API_GET_LIST, params),

    // 获取列表总数
    getTotal:() => get(API.API_GET_TOTAL),

    // 删除
    deleteList:(params) => del(API.API_DEL_LIST, params),

    // 新增
    addList:(params) => post(API.API_ADD_LIST, params),

    // 编辑
    editList:(params) => put(API.API_EDIT_LIST, params),

    // 搜索
    searchList:(params) => get(API.API_SEARCH_LIST, params)
}

export {
    INTERFACE,
    INTERFACE as default
}