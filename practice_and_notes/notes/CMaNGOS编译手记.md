# CMaNGOS编译部署教程

所有需要的源码都在 https://cmangos.net/ 官网Commit history的github链接中

# 需要准备的源码 
* 核心 这里就是官网所描述的`core` 到DB导入部分官网用这个词描述的这部分源码https://github.com/cmangos/mangos-classic
* DB不多解释, 导入db的https://github.com/cmangos/classic-db

# 环境部署
首先我们需要boost环境 下载boost 
官网给出了相关windows环境下的下载名单 首先我编译的时候的源码已经不再支持msvc14以下的版本所以在boost官网上你只能下载 msvc14 和msvc14.1的源码版本(此处巨坑) 对应32位64位根据自己的情况选择

# CMAKE
具体是啥自己去查
下载最新版本就行了我也没有注意有什么区别
对应官网wiki这部分完全没有坑 完成后用对应msvc14 或者14.1 版本的vs 编译 完成后就好了 直接编译release 不需要编译debug自己面壁思过为啥

# DB导入
网上说是需要mysql5.5 我自己也没管反正这年头大家早就用5.7了 为啥? ,自己面壁思过去, 导入的时候经常会报错 因为有的执行太长了 我这边用分拆执行的办法解决了 另外直接在服务器机子上执行 远程还有传输问题 另外执行有设置执行最大字节的 max byte啥的我忘了 自己查吧 注意这边先导入的sql 还是 core中的sql 文件夹里的 另外的sql等这部分完成了根据官网配置sh文件执行 注意装上git使用更佳 官网多次提到了 另外sh导入的时候有字符类型报错什么x99 拿notepad出来转字码 windows平台转个微软的那个A啥的我忘了 反正这个和utf8 

# 提取工具
最后编译提取工具cmake 勾选 extractor和game就可以编译了 此处巨坑