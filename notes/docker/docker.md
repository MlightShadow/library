# docker

写个适合复习(迅猛学习)的小材料, 同时也给之后做cheatsheet准备, 之前是看[Docker — 从入门到实践](https://github.com/yeasy/docker_practice)来学习的, 有些用的少(自己也不熟悉, 总结不出来)但内容多部分会直接指到相应章节

## 基本概念

[基本概念-原文传送门](https://github.com/yeasy/docker_practice/blob/master/basic_concept/README.md)

### 镜像

镜像是一个文件系统, 类似linux启动时为用户挂载的文件系统, 如果硬是要类比到面向对象的内容上(因为大家对OO现在都比较熟悉了)那就是一个类, 类产生的实例就是容器

镜像是分层的, 这个具体看原文

### 容器

按之前给出的OO的类比直接理解, 原文也给了这个例子.  

容器的本质就是进程, 尤其是关于映射端口的问题时一定要时刻谨记, 例如运行一个容器映射到了3306端口那么你就当它是使用3306端口的进程, 不要关心其内部使用什么端口, 其他进程去访问时只要关心映射出来的端口即可

### 仓库

镜像包含在仓库中以`<仓库名>:<标签>`指定具体版本, 如果不给出标签默认为`latest`.

## 安装

[安装-传送门](https://github.com/yeasy/docker_practice/blob/master/install/README.md)

win10 开启 Hyper-V, 大部分linux, mac, respdebian可以安装docker 原文有详细步骤

## 使用镜像

### 获取

```bash
docker pull [选项] [Docker Registry <域名/IP>[:端口号]/]仓库名[:标签]
```

原文例子

```bash
$ docker pull ubuntu:16.04
16.04: Pulling from library/ubuntu
bf5d46315322: Pull complete
9f13e0ac480c: Pull complete
e8988b5b3097: Pull complete
40af181810e7: Pull complete
e6f7c7e5c03e: Pull complete
Digest: sha256:147913621d9cdea08853f6ba9116c2e27a3ceffecf3b492983ae97c3d643fbbe
Status: Downloaded newer image for ubuntu:16.04
```

### 运行

原文例子

```bash
$ docker run -it --rm ubuntu:16.04 bash
root@e7009c6ce357:
```

* -i 交互式操作
* -t 终端
* --rm 运行后删除
* bash 运行后执行命令

### 列出镜像

```bash
docker image ls
```

### 删除镜像

```bash
docker image rm [选项] <镜像1> [<镜像2> ...]

docker rmi [选项] <镜像1> [<镜像2> ...]
```

### docker commit

可以使用 `commit` 保存现场, 但不要用这个来制作镜像

## 使用 Dockerfile 定制镜像

### Dockerfile

### docker build

### FROM

### RUN

### COPY

```bash
COPY [--chown=<user>:<group>] <源路径>... <目标路径>
COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]
```

COPY 指令将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置

```bash
COPY package.json /usr/src/app/
```

<目标路径> 可以是容器内的绝对路径, 也可以是相对于工作目录的相对路径 (工作目录可以用 WORKDIR 指令来指定)  
目标路径不需要事先创建, 如果目录不存在会在复制文件前先行创建缺失目录

使用 COPY 指令, 源文件的各种元数据都会保留  
比如读, 写, 执行权限, 文件变更时间等  
这个特性对于镜像定制很有用, 特别是构建相关文件都在使用 Git 进行管理的时候

在使用该指令的时候还可以加上 `--chown=<user>:<group>` 选项来改变文件的所属用户及所属组

```bash
COPY --chown=55:mygroup files* /mydir/
COPY --chown=bin files* /mydir/
COPY --chown=1 files* /mydir/
COPY --chown=10:11 files* /mydir/
```

<源路径> 可以是多个, 甚至可以是通配符, 其通配符规则要满足 Go 的 filepath.Match 规则

```bash
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

### ADD

### CMD

### ENTRYPOINT

### ENV

### ARG

### VOLUME

### EXPOSE

### WORKDIR

### USER

### HEALTHCHECK

### ONBUILD
