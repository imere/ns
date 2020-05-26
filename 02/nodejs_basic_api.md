# NodeJS 基础 API

## 走进 NodeJS

- 是什么

  - JavaScript 解释器
  - 服务器程序
  - 不是 Web 服务器

- 为什么

  - 高性能 Web 服务
  - IO 强大
  - 事件处理机制完善
  - 天然可处理 DOM
  - 社区活跃, 生态完善

- 优势
  - 大流量数据处理
  - 适合实时交互应用
  - 异步处理大量并发连接

## 事件驱动机制

```js
// 1. 引入EventEmitter对象
var eventEmitter = new require("events").EventEmitter();
// 2. 绑定事件处理程序
var connectHandler = function () {
  console.log(1);
};
eventEmitter.on("connection", connectHandler);
// 3. 触发事件
eventEmitter.emit("connection");
console.log(2);
```

## 模块化

概念及意义

- 相互调用
- 文件即模块

模块加载

1. 缓存区
2. 原生模块
3. 文件

## 全局方法和工具

```js
// 文件目录
console.log(__dirname);
// 文件名
console.log(__filename);

// NodeJS进程状态
console.log(process);

// 对象继承
require("util").inherits(obj, prototype);

// 对象转为字符串
require("util").inspect(obj);
```
