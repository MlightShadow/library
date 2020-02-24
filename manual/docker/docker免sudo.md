# docker 免 sudo

```bash
$ sudo groupadd docker # 添加docker组
groupadd: group 'docker' already exists

$ sudo gpasswd -a <你的用户名> docker
# 将用户添加到用户组

$ sudo service docker restart
# 或者
$ snap restart docker
# 重启docker, 取决于安装方式
```

注意: 之后使用用户重新登入即可
