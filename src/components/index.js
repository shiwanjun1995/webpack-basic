/**
 * 基础组件的自动化全局注册
 * 注：文件夹的名称即为components在页面的名称
 * 列：uploadImage ==> <upload-image></upload-image>
 */
import Vue from 'vue'
/**
 * 有三个参数
 * 参数1：其组件目录的相对路径
 * 参数2：是否查询其子目录
 * 参数3：匹配基础组件文件名的正则
 */
const requireComponent = require.context('../components', true, /\.vue$/)
console.log(requireComponent.keys());
requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 获取组件名称
    const componentName = fileName.split('/')[1].replace('.vue','')
    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})
