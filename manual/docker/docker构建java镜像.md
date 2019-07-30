# docker构建java镜像

## 下载树莓派可用的jdk安装包

[JDK 8 for ARM](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

现在下载oracle的jdk都要注册了, 随便注册一下

## 准备Dockerfile

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

## 构建

```bash
docker build -t jdk8:221 .
```
