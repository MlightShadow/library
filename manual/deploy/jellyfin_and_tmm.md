# jellyfin & tmm

## jellyfin

### jellyfin安装

直接下载官网安装包下载即可

### jellyfin 配置

#### 元数据

#### 播放设置

### jellyfin 注意点

* 注意文件夹权限：如果设置了共享文件夹记得再次确认权限变化，可能导致jellyfin无法刷新到资源。

## tinyMediaManager

### tmm安装

### 刮削设置

* dns设置：当刮削时提示无法访问`api.themoviedb.org`时，使用 [dns查询](https://dnschecker.org/) 搜索 `api.themoviedb.org` 将查询到的china对应的ip地址保存到 `C:\WINDOWS\system32\drivers\etc`。
* 刮削时记得设置下载图片否则刮削不会下载图片默认只下载元数据信息
