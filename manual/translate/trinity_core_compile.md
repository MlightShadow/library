# Trinity Core 编译手册 (ubuntu篇)

本篇为编译3.3.5环境

## 环境需求

* 支持SSE2的处理器
* Boost ≥ 1.67
* MySQL ≥ 5.7.0
* OpenSSL ≥ 1.0.x
* CMake ≥ 3.13.4
* Clang ≥ 5 (强烈推荐, 尤其是当你编译master分支时) 或 GCC ≥ 7.1.0
* zlib ≥ 1.2.7

> 注意: 在编译的时候可能会出现到一个错误，比如:"c++: internal compiler error: Killed (program cc1plus)", 其原因可能是:
Low ram/swap amount: increase ram/swap to a minimum of 2GB of ram and 2GB of swap or decrease the amount of make -j to 1 (more concurrent compile threads = more memory usage). (you can get this using VPS servers)
SELinux/grsecurity/Hardened kernel: Kernels that use ASLR as a security measure tend to mess up GCC's precompiled header implementation. Try using an unhardened kernel (without ASLR), or compiling using clang, or gcc without pch. (you can get this issue when using OVH hosting).

需要安装以下工具

```bash
apt-get update
apt-get install git clang cmake make gcc g++ libmariadbclient-dev libssl-dev libbz2-dev libreadline-dev libncurses-dev libboost-all-dev mariadb-server p7zip libmariadb-client-lgpl-dev-compat
update-alternatives --install /usr/bin/cc cc /usr/bin/clang 100
update-alternatives --install /usr/bin/c++ c++ /usr/bin/clang 100
```

当你使用最新的源码版本进行编译时, 建议使用最新的Ubuntu版本进行, 较低的版本可能会出现一些未经测试的问题

## 编译及安装步骤

### 创建账户

从登录到你的 Linux 设备开始, 请创建一个单独的账户来完成接下来的工作, 你可以使用以下命令来创建并且切换到该账户:

```bash
sudo adduser <username>
sudo su - <username>
```

### 获取代码

通过以下命令来获取源码

```bash
cd ~/
git clone -b 3.3.5 git://github.com/TrinityCore/TrinityCore.git
```

这将克隆3.3.5分支, 我们推荐这个分支作为初次尝试

### 编译源码

#### 创建构建目录

为了避免更新和源代码构建冲突的问题, 我们创建一个特定的构建目录

#### 编译配置
