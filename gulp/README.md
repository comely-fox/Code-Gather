- demo1 live-server 做为服务器自动通知浏览器更新
- demo2 nodejs: http 模块开启服务器， livereload 通知浏览器热更新
  "需安装 livereload 扩展" 或者在 html 文件中添加
  <script src="http://127.0.0.1:35729/livereload.js"></script>
- demo3 常用的前端任务化:
  - sass 转 css 并添加前缀
  - es6 转 es5
  - 拷贝其它目录
  - 热更新
- demo4 在 demo3 上优化, 更合理，更人性化，更全面。
  - use: ['browser-sync', 'portfinder','eslint', 'http-server', 'live-server','gulp-connect']
  - project: ['h', 'reg'] 是张巧丽工作时的游戏项目
