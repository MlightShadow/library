# NETWORK

参考文章:

* [鸟哥基础网络概念](http://cn.linux.vbird.org/linux_server/0110network_basic.php)
* TCP/IP详解三卷
* 周志垒计算机网络视频课程

## 关于网络

网络需要解决的问题便是沟通的问题, 但凡沟通问题即包括两个方面送达与理解, 即:

1. 需要知道信息送往何方(信封上的地址, 以及整个递送处理的体系)
2. 送出何种信息且对方是否能理解(信件内的内容)

如果从广义的方式来理解, `TCP/IP`是internet的实现基础, 但实现网络的方式并不只局限于此

## TCP/IP

对于计算机网络则需要解决以下两个问题(或者应该说在`TCP/IP`协议集中)

1. 通讯寻路
2. 数据封装

寻路部分主要涉及IP, 路由与组网相关部分
数据封装则是对于数据封装相关的部分

* 组成

1. 链路层(router): 物理接口
2. 网络层(router): IP, ICMP, IGMP, ARP, RARP
3. 传输层(os): TCP, UDP
4. 应用层(app): FTP, HTTP, SMTP, DNS等

* OSI 七层协议 与 TCP/IP的四层对应
    1. 物理层 => 链路层
    2. 数据链路层 => 链路层
    3. 网络层 => 网络层
    4. 传输层 => 传输层
    5. 会话层 => 应用层
    6. 表现层 => 应用层
    7. 应用层 => 应用层

### 传输控制层

主要在内核中完成

网络io读写即读写的socket中的queue( recv-Q, send-Q ) 根据类型的不同还分为bio, nio, aio

### 数据封装

#### IP封包

IP封包的大小最大为65535bytes

IP 封包的组成(IPv4)

1. version (4bits)
    IP封包版本

2. IHL(internet header length) (4bits)
    IP封包的表头长度

3. total length (16bits)
    IP封包总量 最多为65536bytes

4. identification (16bits)
    IP分段所属的IP封包标识

5. flags (3bits)
    封包标识, `0DM` D位若为0则表示可分段否则1表示不可分段, M位为0则为IP最后分段, 否则1为非最后分段

6. fragment offset (13bits)
    分段偏移

7. time to live(ttl) (8bits)
    表示该封包的存活时间

8. protocol number (8bits)
    封包协议名称

9. header checksum (16bits)
    表头检查码

10. source address (32bits)
    来源地址

11. destination adress (32bits)
    目标地址

12. options (19bits)
    其他参数

13. padding (13bits)
    补齐

以上为32bits * 6 (192bits)

#### TCP

##### TCP封包

1. Source Port, Destination Port (32bits)
    来源端口, 目标端口

2. Sequence Number (32bits)
    封包序号

3. Acknoledge Number (32bits)
    回应序号

4. Data Offset (4bits)
    分段偏移

5. Reserved (6bits)
    保留字段

6. Code(Control Flag) (6bits)
    标志位字段 (UAPRSF.)
    URG: 紧急指针有效
    ACK: 确认序号有效
    PSH: 传送接收方应该尽快将这个报文段交给应用层, 而不是在缓冲区中排队
    RST: 重建连接即复
    SYN: 表示建立连接
    FIN: 释放一个连接
    .: 包含ack
7. Window (16bits)
    滑动窗口, 进行流量控制

8. Checksum (16bits)
    确认码 校验和

9. Urgent Pointer (16bits)
    紧急指针字段

10. Options (16bits)
    选项

11. Padding (16bits)
    补齐

以上为32bits * 6 (192bits)

##### UDP封包

##### 三次握手

1. 客户端发起联机请求, 开启大于1024的端口, 发起表头带有`SYN=1`的TCP封包发送至服务端, 同时需要记下发送封包序号 `SN(sequence number)` 也写作 `seq`
2. 服务端接收到封包, 且确定需要建立联机请求后需要返回`SYN=1, ACK =1`的封包, 并且传出`ack = seq(client) + 1`的`acknowledge`号, 同时发送`seq(server)`给客户端, 注意这边的服务端`seq(server)`不同于客户端, 由服务器自己建立
3. 当客户端接受到服务端发回的封包, 则会再次发送 `ACK=1, acknowledge= seq(server) + 1` 的数据封包
4. 当服务端再次接收到ACK=1的封包后, 联机将被建立

##### 四次挥手

1. 客户端发送FIN=1 的封包
2. 当服务端接收到之后发送ACK = 1 的封包同时根据 FIN的sequence number + 1 发送ack
3. 服务端再次发送FIN 封包
4. 当客户端收到服务端FIN封包后发送ACK =1, ack = sequence number (server) + 1 的封包
5. 当服务端收到ACK封包后四次挥手完成

##### 握手与挥手的差异

挥手时服务端接收到客户端的FIN封包, 仅仅表示客户端发送数据结束不再发送数据, 所以发送ACK作为应答, 而服务端发送至客户端的数据可能还未结束, 服务端在己方数据完全发送完成后才会发送FIN封包至客户端

因此, 两次封包分开发送, 这也就是挥手与握手的最大差异

### 通讯寻路

#### IP

* IPv4 (32位)
* IPv6 (128位)

##### 同一网段

同一网段使用广播传递数据, 且Net_ID相同

##### 组成与分级 (IPv4)

* A类: 以`0`开头的32位地址
* B类: 以`10`开头的32位地址
* C类: 以`110`开头的32位地址
* D类: 以`1110`开头的32位地址
* E类: 以`1111`开头的32位地址

私有IP

* A类: `10.0.0.0` - `10.255.255.255`
* B类: `172.16.0.0` - `172.31.255.255`
* C类: `192.168.0.0` - `192.168.255.255`

私有IP 只能限于内网中使用, 不得用于Internet
由于这样的性质内网ip无法被外网直接攻击, 但同时也无法被用于连接外网

##### 127.0.0.0/8

这个网段是Io, 不使用网卡

##### 如何获取

* 手动配置
* DHCP

##### 端口

小于1024的端口启动在linux下需要root权限

Socket Pair
Source Address + Source Port
Destinaion Address + Destination Port

#### 路由

##### 静态路由

当通讯双方ip不在同一网段时, 就需要借助路由来传递数据

通常这个过程主机和路由服务都会通过检索自己已知的路由设定并将信息发送至自己已知的或者预设的路由设定, 并且之后不再理会后续流向

##### 动态路由
