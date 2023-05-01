# zsh

## 安装

使用包管理工具安装zsh

```shell
sudo apt-get install zsh
# 或者
sudo pacman -S zsh
# 然后将shell 换成 zsh
chsh -s /bin/zsh
```

## oh my zsh

直接参考官网 [install](https://ohmyzsh.sh/#install)

```shell
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
# 或者
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

后面的部分主要是为了好看，其实ohmyzsh本身已经带有比较好看的theme了实用为主以下内容就不用继续了

## zsh vi模式

打开.zshrc 编辑

搜索 "plugins" 行并确保 "vi-mode" 插件已启用。如果尚未启用 "vi-mode"，则需要在 "plugins" 行中添加它：

```sh
plugins=(git vi-mode)
```

另外我们最好还要设置默认的editor

```sh
export EDITOR=nvim
```

```shell
source .zshrc
```

## powerlevel10k

安装

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

在.zshrc中设置theme

```config
ZSH_THEME="powerlevel10k/powerlevel10k"
```

```shell
source .zshrc
```

接下来就可以使用向导根据喜好配置p10k

```shell
p10k configure
```

会有几个关于配置的交互选项，根据自己的喜好直接选择就可以了

## nerd font

这部分内容其实经常会遇到，终端很多主题都会用到一些特殊字符，所以需要一款较好的字体来解决这些问题，否则各种美化主题安装完成后全都显示为框框就很尴尬，这边直接推荐 nerd font 字体

这边解决这样一个问题你需要在哪里安装这些字体

1. 如果你是直接使用终端那你肯定需要直接安装这些字体
2. 你使用本地模拟终端远程到其他计算机终端那你需要在本地安装这些字体
