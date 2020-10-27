// 这个是默认的入口文件 ./src下的index.js文件
console.log('❤️❤️',`当前的环境是：${process.env.NODE_ENV}`)
// 导入css文件
import './style.css'

// 导入图片
import Icon from './icon.gif'

// 导入打印的bundle
import printMe from './print.js'

// 导入math
import {cube} from './math.js'

function component() {
    var ele = document.createElement('div')
    ele.innerHTML = `<h1>Hello,Webpack</h1>`

    /**
     * 4.将math计算数字的平方结果返回到页面上
    */
//    var ele = document.createElement('pre')
//    ele.innerHTML = [
//        'Hello webpack!',
//        '5 cubed is equal to ' + cube(5)
//    ].join('\n\n')

    /**
     * 1.给当前的div添加css类名
    */
    ele.classList.add('red')

    /**
     * 2.将图片添加到现有的div
     */
    var myIcon = new Image()
    myIcon.src = Icon
    ele.appendChild(myIcon)

    /**
     * 3.将创建的按钮打印添加到现有的div
    */
    var btn = document.createElement('button')
    btn.innerHTML = '点击我check打印信息'
    btn.onclick = printMe
    ele.appendChild(btn)

    

    return ele
}

document.body.appendChild(component())
