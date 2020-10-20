# linux安装shadowsocks

## 安装shadowsocks

我在使用的是树莓派安装的rasp-debian

```bash
sudo apt-get install shadowsocks
```

## ssserver

`ssserver`是ss的服务端

## sslocal

`sslocal`是ss的客户端

客户端配置文件在 `/etc/shadowsocks` 中, 修改`config.json`文件为合适的配置
当然你配置文件随便放哪里都行

```bash
sslocal -c /path/to/config.json
```

即可运行

以下问题暂未解决

sudo apt install shadowsocks-libev

method chacha20-ietf-poly1305 not supported
sudo apt install libsodium-dev
