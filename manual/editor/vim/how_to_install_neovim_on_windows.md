# 如何在windows上安装neovim

## 准备工作

* node.js
* git
* neovim: 下载对应版本进行解压

## 配置

添加 `path/to/Neovim/bin` 至环境变量 `path` 中

在 `~/AppData/Local/` 目录下创建 `nvim` 文件夹并添加`vim.init` 文件

## 插件

### plug.vim

虽然vim-plug 提供了windows安装的命令但是我们这边还是考虑使用所有人都能够使用的方法来完成，下载plug.vim文件到`~/AppData/Local/nvim/autoload/plug.vim`

### coc.nvim
