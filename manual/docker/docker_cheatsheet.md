# docker cheatsheet

[toc]

## 常用命令

## 常见问题参考

### docker离线部署

参考资料
[Linux下离线安装Docker最新版本](https://blog.csdn.net/ywd1992/article/details/82897394)
[docker下载](https://download.docker.com/linux/static/stable/x86_64/)

#### 部署

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

#### 镜像导出导入

##### 导出

一定要带上名字和tag否则导出时会都是none

```bash
docker save iamgeName:tag iamgeName:tag > docker_images.tar
```

##### 导入

```bash
docker load < docker_images.tar
```

### docker免sudo

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

### docker构建java镜像

#### 下载树莓派可用的jdk安装包

[JDK 8 for ARM](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

现在下载oracle的jdk都要注册了, 随便注册一下

#### 准备Dockerfile

```dockerfile
FROM ubuntu:latest

ADD jdk-8u221-linux-arm32-vfp-hflt.tar.gz /usr/local/src/
RUN ln -s /usr/local/src/jdk1.8.0_221 /usr/local/jdk

ADD profile /etc/profile

ENV JAVA_HOME /usr/local/jdk
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH $JAVA_HOME/lib/:$JRE_HOME/lib/
ENV PATH $PATH:$JAVA_HOME/bin

RUN rm -rf /etc/localtime && ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone
```

另外需要一个`profile`文件

```bash
export JAVA_HOME=/usr/local/jdk
export TOMCAT_HOME=/apps/tomcat
export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$TOMCAT_HOME/bin:$PATH
export CLASSPATH=.$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/lib:$JAVA_HOME/lib/tools.jar
```

#### 构建

```bash
docker build -t jdk8:221 .
```

### docker制作jenkins镜像

树莓派上没有好用的jenkins镜像所以需要自己做个

#### 下载.war文件

在jenkins官网[下载](https://jenkins.io/zh/download/).war文件

#### dockerfile

```dockerfile
FROM java:8-jdk
WORKDIR /jenkins_home
ENTRYPOINT ["java" ,"-jar","/jenkins_home/jenkins.war"]
```

### docker起redis

#### 拉取redis镜像

```bash
docker pull arm32v7/redis
```

#### 启动

```bash
docker run -p 6379:6379 --name redis \
-v /docker_conf/redis/redis.conf:/etc/redis/redis.conf \
-v /docker_conf/redis/data:/data \
-d redis redis-server /etc/redis/redis.conf --appendonly yes
```

#### 配置文件

[redis.conf](https://github.com/antirez/redis/blob/3.2/redis.conf)

### docker起nginx(挂载配置)

```bash
mkdir -p /home/pi/docker_conf/nginx/{conf,conf.d,html,logs}
```

```bash
nano /home/pi/docker_conf/nginx/conf/nginx.conf
```

`nginx.conf`配置

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

```bash
nano /home/pi/docker_conf/nginx/conf.d/default.conf
```

`default.conf`配置

```conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        autoindex  on;
        try_files $uri /index/index/page.html;
    }

    location /api {
        proxy_pass http://ip:port/;
    }

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

启动

```bash
docker run -itd \
-p 8080:80 \
-v /home/pi/docker_conf/nginx/html:/usr/share/nginx/html \
-v /home/pi/docker_conf/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/pi/docker_conf/nginx/logs:/var/log/nginx \
-v /home/pi/docker_conf/nginx/conf.d:/etc/nginx/conf.d \
nginx:latest
```

注意: 对于容器中的配置多个端口分发请求不要用 127.0.0.1 或者 localhost, 否则只会在容器内转发, 可以使用 0.0.0.0 或者局域网ip

### docker 起 mysql

```bash
docker pull mysql

# 创建一个临时的mysql, 以便复制出my.cnf等数据
$ docker run --restart=always -d -v /opt/data/mysql/:/var/lib/mysql -p 3306:3306 --name test-mysql -e MYSQL_ROOT_PASSWORD=root mysql

# /bin/bash 进入 bash 命令模式
$ docker exec -it test-mysql bash

# 拷贝配置文件 把Docker中的/etc/mysql/my.cnf文件拷贝到Docker的/var/lib/mysql目录，及主机的/opt/data/mysql/目录中
$ cp /etc/mysql/my.cnf /var/lib/mysql

# 把my.cnf文件放到宿主机/etc/mysql/目录下
$ mv /opt/data/mysql/my.cnf /etc/mysql/
$ docker rm -f test-mysql

# 启动mysql, 同时映射my.cnf
$ docker run --restart=always -d -v /opt/data/mysql/:/var/lib/mysql -v /etc/mysql/my.cnf:/etc/mysql/my.cnf -p 3306:3306 --name test-mysql -e MYSQL_ROOT_PASSWORD=root mysql

```
