# pve

## 虚拟机迁移

### 通过 qcow2 文件

根据虚拟机raw磁盘文件转化为 qcow2 文件，并保存到其他位置。

```bash
qemu-img convert -f raw -O qcow2 /dev/pve/vm-100-disk-0 /mnt/win_share/fnOS.qcow2
```

创建一个空虚拟机, 并且将qcow2文件导入到新的存储位置，最终挂载到虚拟机中。

```bash
 qm importdisk 100 /mnt/win_share/fnOS.qcow2 local-lvm
```

## pve 关闭订阅弹窗

```bash
vi /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js
```

Ext.Msg.show 改为 Ext.Msg.noshow

## pve换源

安装https 和ce 

```bash
apt install apt-transport-https ca-certificates
```

备份源配置文件
```bash
cp /etc/apt/sources.list.d/pve-enterprise.list /etc/apt/sources.listd/pve-enterprise.list.bak
```

修改源文件内容为清华源
```properties
deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian/pve bullseye pve-no-subscription
```



## 创建无线网卡桥接

查看ip address

```bash
ip addr
```

查看其中无线网卡 一般是wlpls*, *部分不确定 记住这个名字

更新 
```bash
apt update
apt install wpasupplicant wireless_tools
```

配置无线网络
```bash
vi /etc/wpa_supplicant/wpa_supplicant.conf
```

```ini
network={
    ssid="your_ssid"
    psk="your_password"
}
```

启动wpa_supplicant
```bash
wpa_supplicant -B -i wlpls* -c /etc/wpa_supplicant/wpa_supplicant.conf
dhclient wlpls*
```

设置pve的网络

```bash
vi /etc/network/interfaces
```

```properties
auto lo
iface lo inet loopback

auto wlan
iface wlan inet static
    address 192.168.1.100
    gateway 192.168.1.1
    bridge_ports wlpls*
    bridge_stp off
    bridge_fd 0
```
这里的wlan是pve中创建的linux bridge名称，需要根据实际情况修改

重启网络

```bash
systemctl restart networking
```

pve 需要使用有线网络作为管理网络，创建的无线网可以通过端口直通给虚拟机，但是虚拟机还需要额外修改网口信息

