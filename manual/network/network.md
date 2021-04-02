# NETWORK

参考文章:
[鸟哥基础网络概念](http://cn.linux.vbird.org/linux_server/0110network_basic.php)

## 关于网络

### 组成

### 区分 

按照区域区分:
* 广域网
* 局域网

### 构建设备

* 网络线
* hub
* switch

### MAC

###

## OSI 七层协议

### 组成

1. 物理层
2. 数据链路层
3. 网络层
4. 传输层
5. 会话层
6. 表现层
7. 应用层

## TCP/IP

### 组成

1. 链路层
2. 网络层
3. 传输层
4. 应用层

### 工作方式

### IP

* IPv4 (32位)
* IPv6 (128位)

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

#### 组成与分级 (IPv4)

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

#### 种类和获取

### 路由

### IP与MAC

### TCP

### 三次握手

### UDP

### 防火墙

### DNS

## 其他
