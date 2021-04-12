### 一：介绍

> 这是一个用于练习Vue后台权限管理的简单模板，是我看了一个[B站视频](https://www.bilibili.com/video/BV15Q4y1K79c?t=5306)后，于是做来分享，分为两版：

* 基础模板：有基本操作，mock等功能了；
* 完整模板：基于基础模板加了权限的判定。

### 二：安装&运行

1. 克隆项目

   `git@github.com:shiwanjun1995/webpack-basic.git`

   这个直接会把基础模板和完整的模板都克隆下来的，develop的是基础模板，master的完整模板。

2. 安装依赖

   `npm install`；

3. 基础模板

   基础模板在`develop`分支，可以通过`git checkout develop`来切换；

4. 完整模板：

   基础模板在`master`分支， 可以通过`git checkout master`来切换；

5. 启动服务

   `npm run start`

6. 效果图：
    <img src="https://i.loli.net/2021/03/15/ag3jq4xtKecJvDy.png" />
    <img src="https://i.loli.net/2021/03/15/LOTDc8dI3SbfRui.png" />
    <img src="https://i.loli.net/2021/03/15/N6KjXZqv1eSF2mp.png" />

### 三：基本实现

这里说一下这个Demo的实现，通过什么技术，用的哪些知识点完成开发。以及，关于对于权限管理的一些理解与实现，大体分为以下几类：


- 视图

基于大名鼎鼎的饿了么UI组件[ElementUI](https://element.eleme.cn/)来搭建的。

- 数据Mock

数据是通过[mockjs](http://mockjs.com/)来实现的，使用起来挺方便的。

- 请求

请求数据的库是通过[axios](http://www.axios-js.com/)这个库，然后简单对axios简单封装了下。

- 数据保存

数据的保存通过Vuex+sesstionStorage结合来实现的，防止页面刷新数据丢失。

- 权限判断 主要是分为以下四类：

    +  路由级别的判定

        >通过**beforeEach**全局守卫钩子，来进行是否登录验证，之后是否能通过路由来登录其他页面；

    +   菜单级别的判定

        >通过后端返回的`json`菜单权限数据，进行动态渲染，这里通过`router.addRoutes`动态添加菜单，没有的就不会出现了；这里需要注意的是vueRouter的版本，代码中对该处作了说明；

    + 按钮级别的判定

        >通过后端返回的`json`操作权限数据，绑定在`router`元信息上，再通过`router.currentRoute`获取当前组件所对应的路由规则。再通过自定义指令的实现完成禁止操作等。

    + 请求级别的判定

        >通过axios的拦截器，判定某个用户在某个页面的操作是否有权限，通过`router.currentRoute`获取元信息来判定。

### 四：补充

用户有两个，一个是普通用户，一个是管理员。

- 普通用户名是：visitor，密码是：visitor；
- 管理员用户名是：admin，密码是：admin。

权限判定的指令使用：

  `v-permit="{action:'add',effect:'disabled'}"`

+ `action`：【view、add、delete、edit、search】按钮的行为，比如增删改查操作；
+ `effect`：按钮是否禁用，如果加了该项且当前角色拥有该按钮权限正常显示，否则页面按钮为禁用状态。

