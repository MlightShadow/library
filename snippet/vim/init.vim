" my nvim config
"
" vim-plug
call plug#begin('~/.location/share/nvim/site/autoload/plugged')

Plug 'neoclide/coc.nvim', {'branch': 'release'}

Plug 'scrooloose/nerdtree', {'on': 'NERDTreeToggle'}

call plug#end()

" coc 插件
let g:coc_global_extensions = [ 
            \ 'coc-json', 
            \ 'coc-java',
            \ 'coc-tsserver',
            \ 'coc-vimlsp' ]

"inoremap <silent><expr> <TAB>
"      \ pumvisible() ? "\<C-n>" :
"      \ <SID>check_back_space() ? "\<TAB>" :
"      \ coc#refresh()
"inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

"nvim xsel
"
set clipboard+=unnamedplus

"
" vim配置
set encoding=utf-8
set number
set relativenumber
set showmode
set showcmd
syntax on
" 行高亮
set cursorline
highlight CursorLine   cterm=NONE ctermbg=240 ctermfg=NONE guibg=NONE guifg=NONE

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
set mouse-=a

" 搜索高亮
set hlsearch

set scrolloff=5
set wrap
set linebreak
set wrapmargin=2
set laststatus=2
set ruler
