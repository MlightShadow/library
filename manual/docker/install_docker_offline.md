# docker离线部署

## 参考资料

[Linux下离线安装Docker最新版本](https://blog.csdn.net/ywd1992/article/details/82897394)

[docker下载](https://download.docker.com/linux/static/stable/x86_64/)

## 部署

```bash

tar -xvf docker-18.06.1-ce.tgz

cp docker/* /usr/bin/

vim /etc/systemd/system/docker.service

```

`docker.service` 内容如下:

```conf
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP $MAINPID
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
# Uncomment TasksMax if your systemd version supports it.
# Only systemd 226 and above support this version.
#TasksMax=infinity
TimeoutStartSec=0
# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes
# kill only the docker process, not all processes in the cgroup
KillMode=process
# restart the docker process if it exits prematurely
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target
```

```bash
chmod +x /etc/systemd/system/docker.service

systemctl daemon-reload

systemctl start docker #启动Docker

systemctl enable docker.service #设置开机自启

```

```bash
systemctl status docker #查看Docker状态

docker -v #查看Docker版本
```

## 镜像打包

一定要带上名字和tag否则导出时会都是none

```bash
docker save iamgeName:tag iamgeName:tag > docker_images.tar
```

## 镜像导入

```bash
docker load < docker_images.tar
```
