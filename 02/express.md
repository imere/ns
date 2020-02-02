# Express 入门

## Express 介绍

```html
<!-- views/index.html -->
<html>
  <body>
    <div>Hello World</div>
  </body>
</html>
```

```js
// server.js
// 1. 引入
var express = require("express");
var app = express();
// 静态资源: 图片等
app.use(express.static("dir"));
// 2. 设置路由
app.get("/", function(request, response) {
  response.sendFile("views/index.html");
});
app.get("/:id", function(request, response) {
  console.log("id:", request.params.id);
  console.log("q:", request.query);
  response.send("Hello");
});
// 3. 监听端口
var server = app.listen(8080, function() {
  console.log("Server started");
});
```

```bash
# tty1
node server.js

# tty2
curl http://127.0.0.1:8080/asd?s=2

# tty1
# id: asd
# q: { s: '2' }
# Hello
```

[RESTful 架构](https://www.runoob.com/w3cnote/restful-architecture.html)

## Express 中间件

处理请求、响应

```js
function middleware(request, response, next) {
  // 操作request, response
  next(); // 调用堆栈中下一个中间件
}
app.use(middleware, middleware);
app.get("/", middleware);
```

## Express 路由

模式: controller/action

```js
// router.js
// 路由中间件
var router = require("express").Router();
// 相关分组
router.get("/controller/action", [callback0, callback1]);
// 同路由简写
router
  .get("/", fn0)
  .post(fn1)
  .put(fn2);
module.exports = router;

// server.js
var express = require("express");
var app = express();
app.use(require("./router.js"));
```

## Express 错误处理

```js
function middleware0(error, request, response, next) {
  if (error) {
    console.error(error.stack);
    next(error);
  }
}
function middleware1(error, request, response, next) {
  if (!error) return next();
  response.sendStatus(500);
}
app.use(middleware0, middleware1);
```

## Express 模版引擎

知名引擎有 jade(现为 pug), swig, ejs...

```html
<!-- views/index.html -->
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body></body>
</html>
```

```js
// server.js
var swig = require("swig");
app.set("view engine", "html");
app.engine("html", swig.renderFile);
app.get("/", function(req, res) {
  res.render("index", {
    title: "title"
  });
});
```
