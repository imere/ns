# Koa1 入门

## Koa 简介

> 组合 generator 避免回调

## Koa 应用

```js
var kos = require("koa");
var app = koa();

app.keys = ["long", "key"]; // sign cookies

app.use(function*() {
  this.body = "Hello World";
  this.cookies.set("key", "value", {
    signed: true
  });
});

app.on("error", function(err, ctx) {});

app.listen(8080);
```

## Context

```js
app.use(function*() {
  this; // Context
  this.request; // Koa Request
  this.response; // Koa Response
  this.req; // node Request 不推荐
  this.res; // node Response 不推荐
  this.throw(400, "Bad Request");
});
```

## Request

```js
var req = context.request;
req.status = req.method = req.url;
req.originalUrl;
req.path = req.query = req.get("a header");
// 内容协商
thi.accepts("a mime-type", /* optional */ "other more types"); // html, text/html, json, application/json, text...
```

## Response

```js
var res = context.response;
res.header;
res.status;
res.length = res.body = res.type = res.set({
  "a header": "value"
});
res.get("a header");
res.append("a header", "appended to the header");
res.redirect("/");
res.attachment(/* optional */ "specified filename");
```
