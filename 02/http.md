# HTTP 协议

## Cookie 和 Session

Cookie 是保存在客户端的小段文本，随客户端点每一个请求发送该 url 下的所有 cookie 到服务器端。

Session 保存在服务器端，通过唯一的值 sessionID 来区别每一个用户。SessionID 随每个连接请求发送到服务器，服务器根据 sessionID 来识 别客户端，再通过 session 的 key 获取 session 值。

## 缓存策略

强制缓存

> 服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。

比较(协商)缓存

> 将缓存信息中的 Etag 和 Last-Modified 通过请求发送给服务器，由服务器校验，返回 304 状态码时，浏览器直接使用缓存。

## TLS 握手

1. ClientHello

   客户端发送所支持的 SSL/TLS 最高协议版本号和所支持的加密算法集合及压缩方法集合等信息给 服务器端。

2. ServerHello

   服务器端收到客户端信息后，选定双方都能够支持的 SSL/TLS 协议版本和加密方法及压缩方法， 返回给客户端。

3. SendCertificate（可选）

   服务器端发送服务端证书给客户端。

4. RequestCertificate（可选）

   如果选择双向验证，服务器端向客户端请求客户端证书。

5. ServerHelloDone

   服务器端通知客户端初始协商结束。

6. ResponseCertificate（可选）

   如果选择双向验证，客户端向服务器端发送客户端证书。

7. ClientKeyExchange

   客户端使用服务器端的公钥，对客户端公钥和密钥种子进行加密，再发送给服务器端。

8. CertificateVerify（可选）

   如果选择双向验证，客户端用本地私钥生成数字签名，并发送给服务器端，让其通 过收到的客户端公钥进行身份验证。

9. CreateSecretKey

   通讯双方基于密钥种子等信息生成通讯密钥。

10. ChangeCipherSpec

    客户端通知服务器端已将通讯方式切换到加密模式。

11. Finished

    客户端做好加密通讯的准备。

12. ChangeCipherSpec

    服务器端通知客户端已将通讯方式切换到加密模式。

13. Finished

    服务器做好加密通讯的准备。

14. Encrypted/DecryptedData

    双方使用客户端密钥，通过对称加密算法对通讯内容进行加密。

15. ClosedConnection

    通讯结束后，任何一方发出断开 SSL 连接的消息。

## HTTP2

### 特点

使用二进制格式传输，更高效紧凑

报头压缩，降低开销

多路复用，一个网络连接实现并行请求

服务器主动推送，减少请求延迟

默认使用加密

### 伪头部字段

内置的几个特殊的以”:”开始的 key，用于替代 HTTP/1.x 中请求行/响应行中的信息，比如请求方法，响应状态码等

:method 目标 URL 模式部分（请求）

:scheme 目标 URL 模式部分（请求）

:authority 目标 URL 认证部分（请求）

:path 目标 URL 的路径和查询部分（绝对路径 产生式和一个跟着"?"字符的查询产生式）。（请求）

:status 响应头中的 HTTP 状态码部分（响应）

## 反向代理

加密和 SSL 加速

负载均衡

缓存静态内容

压缩

减速上传

安全

外网发布
