# CMaNGOS编译部署说明文档

本文主要内容来自 CMaNGOS wiki 中的 [Installation-Instructions](https://github.com/cmangos/issues/wiki/Installation-Instructions) 章节, 在自己编译部署的过程中总结了一些经验, 如果遇到类似的情况可以参考

**注意**: 请先阅读官方文档, 可以在有困难时参考本文做解决, 或者实践之前参考本文给出的相应意见再去尝试以避免踩坑

## 需要准备的工具 (Windows)

* Git
* CMAKE
* Visual C++ 2015 及以上 (建议: 直接使用 vs2017 社区版 (免费), 安装时只需安装 C++ 支持即可)
* MySQL5.7 及以上 (原文意思可以用多种版本, 但是避免麻烦我们建议直接MySQL5.7 及以上)

## 需要准备的源码

* [mangos-classic](https://github.com/cmangos/mangos-classic), 核心, 官方文档中`core`指的就是这个
* [classic-db](https://github.com/cmangos/classic-db), 数据库导入用

## 一个原则

wow服务端模拟项目多是炫技项目, 所以构建大多基于最新的工具和第三方库, 除了官方文档中点名的版本, 拿不定主意就找最新的版本搞

## 环境部署

### windows

需要boost环境, 官网给出了相关windows环境下的下载名单

我编译的时候的源码已经不再支持 `msvc14` 以下的版本所以在boost官网上你只能下载 `msvc14` 和 `msvc14.1` 的版本(这里要注意)

对应32位64位根据自己的情况选择

### linux

根据文档中给出的依赖直接安装就好, 比windows方便不少

## CMAKE

下载最新版本就行了, 对应官方文档操作 完成后用对应 msvc14 或者 14.1 版本的 vs 编译, linux按照按照文档来做即可

## DB导入

根据官方文档准备数据库版本, 导入直接在服务器上做 windows 要注意的就是, 使用一些可视化工具的时候会有字符和命令报错尤其是Navicat,能力允许请尽量使用命令行工具进行导入

## 提取工具

windows上提取工具cmake勾选extractor和game构建即可, linux上参考文档来做, linux导出的时候可以把windows下游戏文件copy过来做, 或者把make好的工具拿到windows下模拟(Cygwin)执行
