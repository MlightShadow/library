set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

Plugin 'scrooloose/nerdtree', {'on': 'NERDTreeToggle'}

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line

" vim配置
set encoding=utf-8
set number
set relativenumber
set showmode
set showcmd
syntax on
" 行高亮
set cursorline

" 匹配括号
set showmatch

" 缩进
set tabstop=4
set shiftwidth=4
set expandtab
set softtabstop=4

" 保持缩进 与上一行
set autoindent

set t_Co=256
set mouse=a

" 搜索高亮
set hlsearch

set scrolloff=5
set wrap
set linebreak
set wrapmargin=2
set laststatus=2
set ruler
