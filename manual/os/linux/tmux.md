# tmux

tmux是一个终端复用工具，可以在一个终端窗口中运行多个会话，并且可以在它们之间快速切换。oh my tmux是一个tmux的配置框架，可以让用户更方便地使用tmux。

下面是tmux和oh my tmux的安装方法：

## 安装tmux

在Ubuntu和Debian系统中，可以使用以下命令安装tmux：

```shell
sudo apt-get install tmux
```

在CentOS和Fedora系统中，可以使用以下命令安装tmux：

```shell
sudo yum install tmux
```

## 安装oh my tmux

安装oh my tmux需要先安装git，可以使用以下命令安装：

```shell
sudo apt-get install git   # Ubuntu/Debian
sudo yum install git       # CentOS/Fedora
```

然后使用以下命令安装oh my tmux：

```shell
git clone https://github.com/gpakosz/.tmux.git ~/.tmux
ln -s ~/.tmux/.tmux.conf ~/.tmux.conf
cp ~/.tmux/.tmux.conf.local ~/
```

以上命令将oh my tmux的配置文件下载到~/.tmux目录中，并将.tmux.conf文件链接到~/.tmux.conf中。最后将.tmux.conf.local文件复制到用户主目录中，这个文件是用户自定义的配置文件，可以在这里添加自己的设置。

安装完成后，可以使用以下命令启动tmux：

```shell
tmux
```

启动后，可以使用Ctrl+b键作为前缀键，然后输入?来查看所有的tmux快捷键。

以上是tmux和oh my tmux的安装方法，如果需要更多的配置，可以编辑.tmux.conf.local文件进行修改。
