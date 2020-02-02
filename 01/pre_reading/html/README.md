# 你不知道的 HTML

- HTML 语义化

- image 元素

  - crossOrigin 属性

  - onload 测网速

  - src 添加 query string 上报数据

  - 代码做图片, 解析执行

- 利用 iframe 扩展 localstorage

  - 发送数据: window.postMessage(data, origin), event.source.postMessage(data, orign)

  - 接收数据 window.onmessage

  - window.top 指向顶层

  - 利用 document.domain 跨域. 条件：两个域名必须属于同一个基础域名(二级域名+顶级域名), 协议，端口一致

- xss

  - css 值: expression(**js**)

  - css 值: url(**js**)
