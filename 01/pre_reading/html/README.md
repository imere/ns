# 你不知道的HTML

- HTML语义化

- image元素

  - crossOrigin属性

  - onload测网速

  - src添加query string上报数据

  - 代码做图片, 解析执行

- 利用iframe扩展localstorage

  - 发送数据: window.postMessage(data, origin), event.source.postMessage(data, orign)

  - 接收数据 window.onmessage

  - window.top指向顶层

  - 利用document.domain跨域. 条件：两个域名必须属于同一个基础域名(二级域名+顶级域名), 协议，端口一致

- xss

  - css值: expression(**js**)

  - css值: url(**js**)
