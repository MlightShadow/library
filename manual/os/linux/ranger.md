# ranger

## 安装

在终端中输入以下命令进行安装：

```shell
sudo pacman -S ranger
```

配置ranger

打开ranger配置文件：

```shell
vim ~/.config/ranger/rc.conf
```

在文件中可以修改一些配置，例如：显示隐藏文件、把ranger设置为默认文件管理器等等。可以根据自己的需求进行修改。

使用ranger

在终端中输入以下命令启动ranger：

```shell
ranger
```

使用ranger的基本操作：

使用方向键或hjkl键进行移动光标
按回车键打开文件或进入目录
按q键退出ranger
按i键显示文件信息
按Shift + ? 显示ranger的帮助文档

## 插件

ranger支持许多插件和扩展。下面介绍几个常用的ranger插件：

### ranger_devicons

ranger_devicons插件可以为ranger中的文件和文件夹添加漂亮的图标，让界面更加美观。安装方法：

```shell
git clone https://github.com/alexanderjeurissen/ranger_devicons ~/.config/ranger/plugins/ranger_devicons
```

然后在ranger的配置文件中添加以下代码：

```shell
# Enable ranger_devicons plugin
default_linemode devicons
```

### ranger-git

ranger-git插件可以在ranger中方便地使用Git命令，如查看Git仓库状态、提交、拉取等。安装方法：

```shell
git clone https://github.com/alexanderjeurissen/ranger_devicons ~/.config/ranger/plugins/ranger_git
```

然后在ranger的配置文件中添加以下代码：

```shell
# Enable ranger-git plugin
default_linemode git
```

### ranger-cd

ranger-cd插件可以在ranger中快速切换目录，省去了使用cd命令的麻烦。安装方法：

```shell
git clone https://github.com/joepvd/ranger-cd ~/.config/ranger/plugins/ranger-cd
```

然后在ranger的配置文件中添加以下代码：

```shell
# Enable ranger-cd plugin
map <C-x><C-c> cd
```

以上是几个常用的ranger插件，安装方法也非常简单。如果需要更多的插件和扩展，可以在GitHub上搜索ranger相关的项目。
