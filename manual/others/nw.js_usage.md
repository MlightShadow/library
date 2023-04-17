# NW.JS 使用方法

[参考](https://www.cnblogs.com/yswenli/archive/2018/01/31/8393787.html)

首先[官网](https://nwjs.io/)下载NW.js的最新发布包

直接解压即可

配置 `package.json` 文件, 放置在解压包根目录下

```json
{
  "name": "应用名称",
  "version": "0.0.1",
  "main": "http://host/index.html"
}
```

或者

```json
{
  "main": "http://host/index.html",
  "name": "应用名称",
  "description": "描述",
  "version": "0.0.1",
  "keywords": [ "关键字1", "关键字2" ],
  "window": {
    "title": "标题",
    "icon": "app/static/img/logo.jpg",
    "toolbar": true,
    "frame": true,
    "width": 1008,
    "height": 750,
    "position": "center",
    "min_width": 400,
    "min_height": 200
  },
  "webkit": {
    "plugin": true,
    "java": false,
    "page-cache": false
  },
  "chromium-args" :"-allow-file-access-from-files"
}
```

在解压包的根目录用cmd执行

```cmd
copy /b nw.exe+app.nw myApp.exe
```

之后的修改 `package.json` 文件即可无需重新执行命令
