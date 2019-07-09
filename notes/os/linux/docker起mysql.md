# docker 起 mysql

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
