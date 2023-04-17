# docker cheat-sheet 先导

写个适合复习(迅猛学习)的小材料, 同时也给之后做cheatsheet准备, 之前是看[Docker — 从入门到实践](https://github.com/yeasy/docker_practice)来学习的, 有些用的少(自己也不熟悉, 总结不出来)但内容多部分会直接指到相应章节

如果还没有阅读原书那么请先移步[Docker — 从入门到实践](https://github.com/yeasy/docker_practice)

## 1 基本概念

[基本概念-原文传送门](https://github.com/yeasy/docker_practice/blob/master/basic_concept/README.md)

### 1.1 镜像

镜像是一个文件系统, 类似linux启动时为用户挂载的文件系统, 如果硬是要类比到面向对象的内容上(因为大家对OO现在都比较熟悉了)那就是一个类, 类产生的实例就是容器

镜像是分层的, 这个具体看原文

### 1.2 容器

按之前给出的OO的类比直接理解, 原文也给了这个例子.

容器的本质就是进程, 尤其是关于映射端口的问题时一定要时刻谨记, 例如运行一个容器映射到了3306端口那么你就当它是使用3306端口的进程, 不要关心其内部使用什么端口, 其他进程去访问时只要关心映射出来的端口即可

### 1.3 仓库

镜像包含在仓库中以`<仓库名>:<标签>`指定具体版本, 如果不给出标签默认为`latest`.

## 2 安装

[安装-传送门](https://github.com/yeasy/docker_practice/blob/master/install/README.md)

win10 开启 Hyper-V, 大部分linux, mac, respdebian可以安装docker 原文有详细步骤

## 3 使用镜像

### 3.1 获取

```none
docker pull [选项] [Docker Registry <域名/IP>[:端口号]/]仓库名[:标签]
```

原文例子

```none
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

### 3.2 运行

原文例子

```none
$ docker run -it --rm ubuntu:16.04 bash
root@e7009c6ce357:
```

* -i 交互式操作
* -t 终端
* --rm 运行后删除
* bash 运行后执行命令

### 3.3 列出镜像

```none
docker image ls
```

### 3.4 删除镜像

```none
docker image rm [选项] <镜像1> [<镜像2> ...]

docker rmi [选项] <镜像1> [<镜像2> ...]
```

### 3.5 docker commit

可以使用 `commit` 保存现场, 但不要用这个来制作镜像

## 4 使用Dockerfile定制镜像

### 4.1 Dockerfile

### 4.2 docker build

### 4.3 Dockerfile指令

#### 4.3.1 FROM

FROM 就是指定 基础镜像
因此一个 Dockerfile 中 FROM 是必备的指令, 并且必须是第一条指令

Docker 还存在一个特殊的镜像, 名为 `scratch` 这个镜像是虚拟的概念, 并不实际存在, 它表示一个空白的镜像

```dockerfile
FROM scratch
...
```

如果你以 scratch 为基础镜像的话, 意味着你不以任何镜像为基础, 接下来所写的指令将作为镜像第一层开始存在

#### 4.3.2 RUN

RUN 指令是用来执行命令行命令的, RUN 指令在定制镜像时是最常用的指令之一

其格式有两种：

* shell 格式: `RUN <命令>`, 就像直接在命令行中输入的命令一样

```dockerfile
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

* exec 格式: `RUN ["可执行文件", "参数1", "参数2"]`, 这更像是函数调用中的格式

**!!! 以下写法是错误的 请注意 !!!**
一种典型的错误写法:  

```dockerfile
FROM debian:stretch

RUN apt-get update
RUN apt-get install -y gcc libc6-dev make wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN mkdir -p /usr/src/redis
RUN tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1
RUN make -C /usr/src/redis
RUN make -C /usr/src/redis install
```

这种写法, 创建了 7 层镜像, 这是完全没有意义的  

Dockerfile 中每一个指令都会建立一层  

每一个 RUN 的行为, 就和我们手工建立镜像的过程一样: 新建立一层, 在其上执行这些命令, 执行结束后, commit 这一层的修改, 构成新的镜像  

正确的写法应该是这样：

```dockerfile
FROM debian:stretch

RUN buildDeps='gcc libc6-dev make wget' \
    && apt-get update \
    && apt-get install -y $buildDeps \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && mkdir -p /usr/src/redis \
    && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
    && make -C /usr/src/redis \
    && make -C /usr/src/redis install \
    && rm -rf /var/lib/apt/lists/* \
    && rm redis.tar.gz \
    && rm -r /usr/src/redis \
    && apt-get purge -y --auto-remove $buildDeps
```

这里仅仅使用一个 RUN 指令, 并使用 && 将各个所需命令串联起来, 将之前的 7 层, 简化为了 1 层

#### 4.3.3 COPY

```dockerfile
COPY [--chown=<user>:<group>] <源路径>... <目标路径>
COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]
```

COPY 指令将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置

```dockerfile
COPY package.json /usr/src/app/
```

<目标路径> 可以是容器内的绝对路径, 也可以是相对于工作目录的相对路径 (工作目录可以用 WORKDIR 指令来指定)  
目标路径不需要事先创建, 如果目录不存在会在复制文件前先行创建缺失目录

使用 COPY 指令, 源文件的各种元数据都会保留  
比如读, 写, 执行权限, 文件变更时间等  
这个特性对于镜像定制很有用, 特别是构建相关文件都在使用 Git 进行管理的时候

在使用该指令的时候还可以加上 `--chown=<user>:<group>` 选项来改变文件的所属用户及所属组

```dockerfile
COPY --chown=55:mygroup files* /mydir/
COPY --chown=bin files* /mydir/
COPY --chown=1 files* /mydir/
COPY --chown=10:11 files* /mydir/
```

<源路径> 可以是多个, 甚至可以是通配符, 其通配符规则要满足 Go 的 filepath.Match 规则

```dockerfile
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

#### 4.3.4 ADD

ADD 指令和 COPY 的格式和性质基本一致, 但是在 COPY 基础上增加了一些功能

尽可能的使用 COPY, 因为 COPY 的语义很明确, 就是复制文件而已, 而 ADD 则包含了更复杂的功能, 其行为也不一定很清晰

最适合使用 ADD 的场合, 就是所提及的需要自动解压缩的场合

#### 4.3.5 CMD

CMD 指令的格式和 RUN 相似, 也是两种格式:

* shell 格式: `CMD <命令>`
* exec 格式: `CMD ["可执行文件", "参数1", "参数2"...]`
* 参数列表格式: `CMD ["参数1", "参数2"...]` 在指定了 ENTRYPOINT 指令后, 用 CMD 指定具体的参数

#### 4.3.6 ENTRYPOINT

场景一: 让镜像变成像命令一样使用
场景二: 应用运行前的准备工作

#### 4.3.7 ENV

* `ENV <key> <value>`
* `ENV <key1>=<value1> <key2>=<value2>...`

```dockerfile
ENV VERSION=1.0 DEBUG=on \
    NAME="Happy Feet"
```

在这里先定义了环境变量 NODE_VERSION, 其后的 RUN 这层里, 多次使用 $NODE_VERSION 来进行操作定制

```dockerfile
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs
```

可以看到, 将来升级镜像构建版本的时候, 只需要更新 7.2.0 即可, Dockerfile 构建维护变得更轻松了

#### 4.3.8 ARG

#### 4.3.9 VOLUME

```dockerfile
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

为了防止运行时用户忘记将动态文件所保存目录挂载为卷, 在 Dockerfile 中, 我们可以事先指定某些目录挂载为匿名卷, 这样在运行时如果用户不指定挂载, 其应用也可以正常运行, 不会向容器存储层写入大量数据

```dockerfile
VOLUME /data
```

这里的 /data 目录就会在运行时自动挂载为匿名卷, 任何向 /data 中写入的信息都不会记录进容器存储层, 从而保证了容器存储层的无状态化
运行时可以覆盖这个挂载设置

```none
docker run -d -v mydata:/data xxxx
```

在这行命令中, 就使用了 mydata 这个命名卷挂载到了 /data 这个位置, 替代了 Dockerfile 中定义的匿名卷的挂载配置

#### 4.3.10 EXPOSE

```dockerfile
EXPOSE <端口1> [<端口2>...]
```

EXPOSE 指令是声明运行时容器提供服务端口, 这只是一个声明, 在运行时并不会因为这个声明应用就会开启这个端口的服务

在 Dockerfile 中写入这样的声明有两个好处:

* 帮助镜像使用者理解这个镜像服务的守护端口, 以方便配置映射
* 运行时使用随机端口映射时, 也就是 `docker run -P` 时, 会自动随机映射 EXPOSE 的端口

要将 EXPOSE 和在运行时使用 -p <宿主端口>:<容器端口> 区分开来

* -p, 是映射宿主端口和容器端口, 换句话说, 就是将容器的对应端口服务公开给外界访问
* EXPOSE 仅仅是声明容器打算使用什么端口而已, 并不会自动在宿主进行端口映射

#### 4.3.11 WORKDIR

```dockerfile
WORKDIR <工作目录路径>
```

使用 WORKDIR 指令可以来指定工作目录(或者称为当前目录), 以后各层的当前目录就被改为指定的目录, 如该目录不存在, WORKDIR 会帮你建立目录

#### 4.3.12 USER

#### 4.3.13 HEALTHCHECK

```dockerfile
HEALTHCHECK [选项] CMD <命令> #设置检查容器健康状况的命令
HEALTHCHECK NONE #如果基础镜像有健康检查指令，使用这行可以屏蔽掉其健康检查指令
```

当在一个镜像指定了 HEALTHCHECK 指令后, 用其启动容器, 初始状态会为 starting, 在 HEALTHCHECK 指令检查成功后变为 healthy, 如果连续一定次数失败, 则会变为 unhealthy

HEALTHCHECK 支持下列选项:

* `--interval=<间隔>`: 两次健康检查的间隔, 默认为 30 秒
* `--timeout=<时长>`: 健康检查命令运行超时时间, 如果超过这个时间, 本次健康检查就被视为失败, 默认 30 秒
* `--retries=<次数>`: 当连续失败指定次数后, 则将容器状态视为 unhealthy, 默认 3 次

```dockerfile
FROM nginx
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
HEALTHCHECK --interval=5s --timeout=3s \
  CMD curl -fs http://localhost/ || exit 1
```

为了帮助排障, 健康检查命令的输出（包括 stdout 以及 stderr）都会被存储于健康状态里, 可以用 docker inspect 来查看

#### 4.3.14 ONBUILD
