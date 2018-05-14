# 门户

## 采用技术
> koa2+vue2+vuex+webpack

## web目录

```
├── assets/    (静态资源目录。非按需加载的静态资源，目前的状况是里面存放的是功能地图的全部图片 )
├── build/    (打包指令 )
├── conf/    (服务配置文件 )
├		├── server.config.js  (服务端代理)
├── src/      (开发用的目录 )
├		├── assets/  (静态资源)
├		├── components/  (功能模块/业务模块)
├		├		└── /index (首页vue组件的文件夹)
├		├		└── /login (登录vue组件)
├		├		└── /tpl (基础vue组件和公共vue组件的文件夹)
├		├── vuex/ (vuex目录： 放 数据管理状态管理的相关逻辑)
├		└── main.js/ (路由的配置)
├── dist/      (打包后的文件，用于生产环境的打包后的目录，也可以通过nginx代理到dist上运行)
├── gulpfile.js   (gulp配置文件)
├── package.json  (项目描述)
└── webpack.config.js （webpack配置）


## 跟原版本不同之处

1. 更改页面的router-view结构

2.更改全屏页面的路由配置，以前是index/1代表首页，index/sdfsdfsdf代表其他全屏页面，现在取消，直接用index代表首页

## 备注

1. static 里面的/lang和/themes全是ueditor的相关资源

2.

## 打包

1. dev是线上开发版。

2. prod是生产环境，但是需要先build，然后再prod

3. deployStatic是打包进一个静态文件夹内，交给后端部署的