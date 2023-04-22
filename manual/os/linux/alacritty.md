# alacritty 配置

## alacritty 配色方案

alacritty的配色方案可以通过 `~/.config/alacritty/alacritty.yml` 来配置

```yml

colors:

# 默认前景颜色

  primary:
    foreground: '0xffffff'
    background: '0x1d2021'

# 默认背景和第二前景颜色

  cursor:
    foreground: '0x1d2021'
    background: '0x8ec07c'

# 颜色0~15

  normal:
    black:   '0x282828'
    red:     '0xcc241d'
    green:   '0x98971a'
    yellow:  '0xd79921'
    blue:    '0x458588'
    magenta: '0xb16286'
    cyan:    '0x689d6a'
    white:   '0xa89984'

# 颜色16~255

  bright:
    black:   '0x928374'
    red:     '0xfb4934'
    green:   '0xb8bb26'
    yellow:  '0xfabd2f'
    blue:    '0x83a598'
    magenta: '0xd3869b'
    cyan:    '0x8ec07c'
    white:   '0xebdbb2'

```

## SSH远程配色未显示

这里会有3种主要的情况

1. 本地SSH没有转发TERM变量
2. 本地没有配置LS_COLORS变量
3. 本地没有配置TERM变量

### SSH转发TERM变量

在SSH会话开始时，SSH客户端会将终端环境变量转发到远程服务器。检查 $TERM 环境变量是否被正确地设置为 alacritty。你可以在SSH会话中运行以下命令来检查：

```sh
echo $TERM
```

如果 $TERM 环境变量不是 alacritty，则需要在SSH客户端中配置正确的环境变量转发。以OpenSSH为例，在SSH配置文件（通常位于 ~/.ssh/config）中添加以下内容：

```sh
Host *
  SendEnv TERM
```

然后重启SSH客户端并重新连接到远程服务器。确认远程服务器上的终端仿真器是否支持256色

### 配置LS_COLORS

运行 echo $LS_COLORS 命令以查看当前LS_COLORS环境变量的值。

将输出复制到本地剪贴板中。

它的输出类似这样

```txt
rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:.tar=01;31:.tgz=01;31:.arc=01;31:.arj=01;31:.taz=01;31:.lha=01;31:.lz4=01;31:.lzh=01;31:.lzma=01;31:.tlz=01;31:.txz=01;31:.tzo=01;31:.zip=01;31:.z=01;31:.Z=01;31:.dz=01;31:.gz=01;31:.lrz=01;31:.lz=01;31:.lzo=01;31:.xz=01;31:.zst=01;31:.tzst=01;31:.bz2=01;31:.bz=01;31:.tbz=01;31:.tbz2=01;31:.tz=01;31:.deb=01;31:.rpm=01;31:.jar=01;31:.war=01;31:.ear=01;31:.sar=01;31:.rar=01;31:.alz=01;31:.ace=01;31:.zoo=01;31:.cpio=01;31:.7z=01;31:.rz=01;31:.cab=01;31:.jpg=01;35:.jpeg=01;35:.gif=01;35:.bmp=01;35:.pbm=01;35:.pgm=01;35:.ppm=01;35:.tga=01;35:.xbm=01;35:.xpm=01;35:.tif=01;35:.tiff=01;35:.png=01;35:.svg=01;35:.svgz=01;35:.mng=01;35:.pcx=01;35:.mov=01;35:.mpg=01;35:.mpeg=01;35:.m2v=01;35:.mkv=01;35:.webm=01;35:.ogm=01;35:.mp4=01;35:.m4v=01;35:.mp4v=01;35:.vob=01;35:.qt=01;35:.nuv=01;35:.wmv=01;35:.asf=01;35:.rm=01;35:.rmvb=01;35:.flc=01;35:.avi=01;35:.fli=01;35:.flv=01;35:.gl=01;35:.dl=01;35:.xcf=01;35:.xwd=01;35:.yuv=01;35:.cgm=01;35:.emf=01;35:.ogv=01;35:.ogx=01;35:.aac=00;36:.au=00;36:.flac=00;36:.m4a=00;36:.mid=00;36:.midi=00;36:.mka=00;36:.mp3=00;36:.mpc=00;36:.ogg=00;36:.ra=00;36:.wav=00;36:.oga=00;36:.opus=00;36:.spx=00;36:.xspf=00;36:
```

在Alacritty终端打开配置文件。如果你之前没有修改过这个文件，则可以通过运行以下命令来打开它：

```sh
vim ~/.config/alacritty/alacritty.yml
```

在打开的配置文件中添加以下行：

```yml
env:
    LS_COLORS: "PASTE_OUTPUT_OF_LS_COLORS_HERE"
```

将第三步中复制到本地剪贴板的LS_COLORS字符串粘贴到上一步添加的行的引号中。

保存并关闭配置文件，然后退出Alacritty终端并再次连接到远程服务器。

确认远程服务器上是否安装了LS_COLORS。你可以在Shell中输入以下命令来检查： echo $LS_COLORS。如果这个命令不能输出一些类似于“rs=0:di=01;34:”这样的文本，那么就需要先安装LS_COLORS。

确认你的连接环境是否支持256种颜色。要在Alacritty中启用256色，请确保在Alacritty配置文件中将color设置为alacritty，并且在终端会话中设置TERM变量为xterm-256color。

如果你使用的是zsh Shell而不是bash，那么你可能需要在你的zsh配置文件（例如.zshrc）中添加以下行：

```sh
autoload -Uz colors && colors
```

这将启用zsh的颜色支持。

如果你之前已经有过改动，那么可能需要重新启动Alacritty窗口，在新窗口中执行以上操作。

### 设置TERM

要将Alacritty的$TERM设置为xterm-256color，可以按照以下步骤进行操作：

打开Alacritty终端并进入命令行。

输入以下命令来打开Alacritty配置文件：

```sh
vim ~/.config/alacritty/alacritty.yml
```

在文件中添加以下行：

```yml
env:
    TERM: xterm-256color
```

保存并关闭文件。

关闭并重新打开Alacritty窗口

现在，当你打开一个新的终端会话时，Alacritty的$TERM环境变量会被自动设置为xterm-256color，这使得它能够支持256色。
