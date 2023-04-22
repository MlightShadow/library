# git

## 配置编辑器为vim

如果你想将提交 Git 时的默认编辑器设置为 Vim，可以按照以下步骤进行操作：

### 使用config命令进行配置

你可以使用 git config 命令在终端中为 Git 配置默认编辑器。以下是使用 git config 命令设置默认编辑器为 Vim 的步骤：

打开终端并输入以下命令以将默认编辑器配置为 Vim：

```sh
    git config --global core.editor vim
```

这将把 core.editor 的全局配置设置为 vim。

### 通过cofngi文件进行配置

打开终端并输入以下命令以打开 Git 的全局配置文件：

```sh
    git config --global -e
```

在打开的文件中找到 [core] 段，如果没有就创建该段，然后添加一行 editor = vim，如下所示：

```txt
[core]
    editor = vim
```

这样指定了默认的 Git 编辑器为 Vim。

保存并退出文件。

现在，每当你运行 git commit 命令时，Git 将使用 Vim 作为默认编辑器。
