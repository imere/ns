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

## NodeJS 入门

```js
// server.js
var http = require("http");
http
  .createServer(function(req, res) {
    // 设置请求头
    res.writeHead(200, { "Content-Type": "text/plain" });
    // 设置返回信息
    res.end("Hellow world\n");
  })
  .listen(8000, function() {
    console.log("Server is running");
  });
```

```bash
# 运行http服务
node server.js
#Server is running
```

## 回调函数

```js
var fs = require("fs");

// 阻塞读取
var data = fs.readFileSync("data.txt");
console.log(1, data);

// 非阻塞读取
var data = fs.readFile("data.txt", function(err, data) {
  console.log(3, data);
});

console.log(2);
```

## 事件驱动机制

```js
// 1. 引入EventEmitter对象
var eventEmitter = new require("events").EventEmitter();
// 2. 绑定事件处理程序
var connectHandler = function() {
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

```js
// hello.js
// 逻辑
function Hello() {}
// 导出
module.exports = Hello;

// main.js
var hello = require("./hello"); // 相对路径
```

## 路由

```js
// server.js
function start(route) {
  function onRequest(request, response) {
    var pathname = require("url").parse(request.url).pathname;

    route(pathname);

    response.end("Hello World");
  }
  require("http")
    .createServer(onRequest)
    .listen(8888);
}
exports.start = start;

// router.js
function route(pathname) {
  console.log("Request for " + pathname);
}
exports.route = route;

// index.js
var server = require("./server");
var router = require("./router");
server.start(router.route);
```

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

## 文件系统

```js
var fs = require("fs");

// 异步读取
fs.readFile("file", function(err, data) {
  if (err) return console.error(err);
  console.log(data);
});

fs.open("file", "r+", function(err, data) {
  if (err) return console.error(err);
  console.log(data);
});

// 同步读取
var data = fs.readFileSync("file");
console.log(data);

// 异步写入
fs.writeFile("file", "content", function(err) {
  if (err) return console.error(err);
});

// 文件信息
fs.stat(function(err, stat) {
  if (err) return console.error(err);
  console.log(stat);
});
```
