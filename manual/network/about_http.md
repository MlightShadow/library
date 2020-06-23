# https?协议

## 请求

请求报文格式:

* 请求行(请求方法 URL HTTP/版本号)
* 请求报文字段(可选)
* 空行
* 请求数据(只有POST请求有)

RESTful常用请求方法:

* GET: 获取资源
* POST: 提交数据
* PUT: 资源更新
* PATCH: 资源局部更新
* DELETE: 删除资源

其他请求方法:

* OPTIONS: 查询服务器性能返回所有可用请求方式
* HEAD: 只获取响应报头
* TRACE: 显示服务器收到的请求, 用于测试诊断
* CONNECT: 将连接改为管道方式的代理服务器

## 响应

响应报文格式:

* 状态行(HTTP/版本号 返回码 返回码描述)
* 响应报文字段(可选)
* 空行
* 响应正文

## 报文字段

### 请求报文字段

* Accept: 客户端能够处理的媒体类型
* Accept-Charset: 客户端支持的字符集
* Accept-Encoding: 客户端支持的编码格式
* Accept-Language: 客户端支持的自然语言
* Authorization: 客户端认证信息
* Host: 访问资源所在主机名
* If-Match
* If-Modified-Since
* If-None-Match
* If-Range
* If-Unmodified-Since
* Max-Forwards: 请求可经过服务器最大数目, 请求每被转发一次减1, 可用于通信问题定位
* Proxy-Authorization: 代理服务器认证信息
* Range
* Referer: 告知服务器请求发起页面
* User-Agent: 将请求的浏览器和代理名称发给服务端

### 应答报文字段

* Age: 告知客户端源服务器多久之前创建了响应
* ETag
* Location: 设置重定向(sendRedirect)时会设置, 即客户端需要提取文档的位置, 状态码会设置为302
* Proxy-Authenticate 告知客户端代理服务器需要的认证信息
* Retry-After: 告知客户端多久之后重试
* Server: 服务器名
* WWW-Authenticate: 告知客户端需要提供的授权信息

### 实体首部字段

* Allow: 告知客户端服务器支持哪些请求方法
* Content-Encoding: 告知客户端服务器对资源的内容编码
* Content-Language: 告知客户端服务器所提供资源的自然语言
* Content-Length: 告知客户端资源的长度
* Content-Location: 告知客户端资源所在位置
* Content-Type: 告知客户端资源的MIME类型
* Expires: 定义的资源过期时间
* Last-Modified: 资源最后改动时间

### 通用报文字段

* Cache-Control: 控制缓存行为
* Connection: 管理持久连接
* Date: 创建报文的GMT时间
* Pragma: 遗留字段, 表示客户端在请求过程中不循序服务端返回缓存的数据, 主要是客户端发给服务端的请求中用
* Transfer-Encoding: 传输报文主题使用的传输编码
* Upgrade: 用于检查HTTP协议或其他协议是否使用的更高版本
* Via: 追踪客户端和服务端之前的报文传输路径, 避免发生回环, 经过代理时必须添加此字段
* Warning: 告知用户缓存相关的警告信息

### 其他报文字段

* Cookie: 请求时使用的Cookie信息
* Set-Cookie: 服务器应答设置服务端Cookies

> * NAME=VALUE: 赋予Cookie的名称和值
> * expires=DATE: Cookie的有效期
> * path=PATH: 将服务器上的目录作为Cookie的适用对象, 若不指定, 则默认为文档所在的文件目录
> * domin=域名: 作为Cookies适用对象的域名, 若不指定, 则默认为创建Cookie的服务器域名
> * Secure: 仅在HTTPS安全通信是才会发送Cookie
> * HttpOnly: 使Cookie不能被JS脚本访问  

例:  `Set-Cookie:BDSVRBFE=Go; max-age=10; domain=m.baidu.com; path=/`

> 部分文档未提及
>
> * Refresh: 应当多久之后刷新文档, 单位秒

## HTTPS

TODO
