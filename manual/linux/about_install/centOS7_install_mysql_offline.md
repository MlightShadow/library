# centOS7离线安装mysql

[参考文档](https://www.cnblogs.com/Orange42/p/8432185.html)

## 下载

在镜像网站下载[mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar](http://mirrors.163.com/mysql/Downloads/MySQL-5.7/mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar)

## 安装

```bash
tar -zxvf mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar
```

按照顺序安装

```bash
rpm -ivh mysql-community-common-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-devel-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-compat-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-5.7.28-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-5.7.28-1.el7.x86_64.rpm
```

如果出现如下报错

```none
Header V3 RSA/SHA256 Signature, key ID fd431d51: NOKEY
```

执行

```bash
rpm --import /etc/pki/rpm-gpg/RPM*
```

```bash
rpm -ivh mysql-community-common-5.7.28-1.el7.x86_64.rpm --force --nodeps
rpm -ivh mysql-community-libs-5.7.28-1.el7.x86_64.rpm --force --nodeps
rpm -ivh mysql-community-devel-5.7.28-1.el7.x86_64.rpm --force --nodeps
rpm -ivh mysql-community-libs-compat-5.7.28-1.el7.x86_64.rpm --force --nodeps
rpm -ivh mysql-community-client-5.7.28-1.el7.x86_64.rpm --force --nodeps
rpm -ivh mysql-community-server-5.7.28-1.el7.x86_64.rpm --force --nodeps
```

配置

`/etc/my.cnf`

中添加

```config
# Disabling symbolic-links is recommended to prevent assorted security risks
skip-grant-tables     # 添加这句话，这时候登入mysql就不需要密码
symbolic-links=0
```

使用mysql-client进行连接

```bash
mysql -u root -p
```

密码输入直接回车

依次键入以下命令, 如果有需要可以在 `mysql`库, `user` 表中将 `root@localhost` 改为 `root@'%'` 之后来进行操作

```sql
set password for root@localhost = password('123456');
flush privileges;
set password for root@localhost = password('123456');
flush privileges;
quit;
```
