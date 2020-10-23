// 这个是默认的入口文件 ./src下的index.js文件

// 导入css文件
import './style.css'

// 导入图片
import Icon from './icon.gif'
function component() {
    var ele = document.createElement('div')
    ele.innerHTML = `<h1>Hello,Webpack</h1>`

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
    return ele
}

document.body.appendChild(component())
