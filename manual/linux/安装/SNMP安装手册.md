# SNMP安装手册

离线安装SNMP, [参考文档](https://www.jianshu.com/p/1293ca633995)

## 下载&安装

在[https://centos.pkgs.org/](https://centos.pkgs.org/)站点下载, 以下安装包

* `net-snmp-libs-5.7.2-43.el7.x86_64.rpm`
* `net-snmp-agent-libs-5.7.2-43.el7.x86_64.rpm`
* `net-snmp-5.7.2-43.el7.x86_64.rpm`
* `net-snmp-utils-5.7.2-43.el7.x86_64.rpm`

按照参考文档上的顺序进行安装

```bash
rpm -ivh net-snmp-libs-5.7.2-43.el7.x86_64.rpm
rpm -ivh net-snmp-agent-libs-5.7.2-43.el7.x86_64.rpm
rpm -ivh net-snmp-5.7.2-43.el7.x86_64.rpm
rpm -ivh net-snmp-utils-5.7.2-43.el7.x86_64.rpm
```

如果出现如下报错

```none
Header V3 RSA/SHA256 Signature, key ID fd431d51: NOKEY
```

执行

```bash
rpm --import /etc/pki/rpm-gpg/RPM*

rpm -ivh net-snmp-libs-5.7.2-43.el7.x86_64.rpm --force --nodeps
rpm -ivh net-snmp-agent-libs-5.7.2-43.el7.x86_64.rpm --force --nodeps
rpm -ivh net-snmp-5.7.2-43.el7.x86_64.rpm --force --nodeps
rpm -ivh net-snmp-utils-5.7.2-43.el7.x86_64.rpm --force --nodeps
```

检查是否安装完成

```bash
snmpd -v
```

## 启动

```bash
systemctl start snmpd.service
```

检查启动状态

```bash
systemctl status snmpd.service
```
