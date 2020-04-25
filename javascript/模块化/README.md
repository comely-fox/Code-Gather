#### amd 规范 异步, 依赖前置

- demo1 初化学习 amd 规范的模块化
  - 通过与 app.js nodejs 结合实现服务器端: 采用了 koa, mockjs 实现模拟数据.
  - 使用 "require.js" "axios" 库
- demo2 通过 require.js 模拟 "jsonp" 跨域请求.
  - user_data.js 定义数据
  - jQuery.Deferred 解决 require.js 异步请求

#### commonJs 规范 同步， 就近依赖

- common1 demo2 用 seajs 实现一次
  - 通过 define 定义模块, 内部通过遍历函数的 tostring， 顺序加载依赖的模块
  - 通过 require 载入模块数据

++++ 区别:
| **_模块规范_**- | -**_状态_**- | -**_require 作用_**- | -**_依赖_**- | 模块定义 | 模块使用 | 导入数据
| cmd | 同步 | 载入数据 | 就近依赖 | define | use | require
| amd | 异步 | 加载模块通过回调函数的参数接收数据 | 前置依赖 | define | require | 回调参数接收
