# docker制作jenkins镜像

树莓派上没有好用的jenkins镜像所以需要自己做个

## 下载.war文件

在jenkins官网[下载](https://jenkins.io/zh/download/).war文件

## dockerfile

```dockerfile
FROM java:8-jdk
WORKDIR /jenkins_home
ENTRYPOINT ["java" ,"-jar","/jenkins_home/jenkins.war"]
```
