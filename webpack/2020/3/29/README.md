tip: 开发模式的配置
webpackOptions:

- watch 观察模式
- devtool - 生成 sourceMap
- mode - 生产或开发模式
- devServer 需要安装 webpack-dev-server 开启 http 服务器
  - npm script: 'webpack-dev-server --open'

---

cli:

- --watch - 观察模式, 文件变动代码自动重新编译

### 通过 nodejs API

用 nodemon 启动 dev-server.js 实现全自动化
