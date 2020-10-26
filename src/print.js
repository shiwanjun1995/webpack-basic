function printMe() {
    console.log('🌈🌈🌈🌈🌈🌈','I get called from print.js');
    // 生成一个错误，用于测试webpack打包后能否精确定位出错的位置
    // cosnole.error('🌈🌈🌈🌈🌈🌈','I get called from print.js');
}

export default printMe