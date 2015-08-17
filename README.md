# sonic

## 目录结构说明
    
    app.js              --> 应用配置文件
    package.json        --> npm (需要使用npm安装哪些软件包)
    public/             --> 所有客户端可以访问的公共文件的目录
      css/              --> css 文件目录
        app.css         --> 默认的样式文件
      img/              --> 图片文件
      js/               --> javascript 文件
        app.js          --> 生命应用模块(入口启动)
        controllers.js  --> 应用控制器
        directives.js   --> 自定义指令
        filters.js      --> 自定义过滤器
        services.js     --> 自定义服务
        lib/            --> 第三方 JavaScript 类库
          angular/
            angular.js            --> the latest angular js
            angular.min.js        --> the latest minified angular js
            angular-*.js          --> angular add-on modules
            version.txt           --> version number
    routes/
      api.js            --> route for serving JSON
      index.js          --> route for serving HTML pages and partials
    views/
      index.jade        --> 应用主页面
      layout.jade       --> 公用布局.title header footer
      partials/         --> 更多的视图文件目录
        partial1.jade
        partial2.jade
