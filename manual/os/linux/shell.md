# shell

## bash 内建命令

GNU bash，版本 5.1.8(1)-release (x86_64-pc-linux-gnu)
这些 shell 命令是内部定义的。请输入 `help' 以获取一个列表。
输入`help 名称' 以得到有关函数`名称'的更多信息。
使用`info bash`来获得关于 shell 的更多一般性信息。
使用`man -k` 或 `info` 来获取不在列表中的命令的更多信息。

名称旁边的星号(*)表示该命令被禁用。

 job_spec [&]                            history [-c] [-d 偏移量] [n] 或 hist>
 (( 表达式 ))                            if 命令; then 命令; [ elif 命令; the>
 . 文件名 [参数]                         jobs [-lnprs] [任务声明 ...] 或 jobs>
 :                                       kill [-s 信号声明 | -n 信号编号 | >
 [ 参数... ]                             let 参数 [参数 ...]
 [[ 表达式 ]]                            local [option] 名称[=值] ...
 alias [-p] [名称[=值] ... ]             logout [n]
 bg [任务声明 ...]                       mapfile [-d 分隔符] [-n 计数] [-O >
 bind [-lpvsPSVX] [-m 键映射] [-f 文>   popd [-n] [+N | -N]
 break [n]                               printf [-v var] 格式 [参数]
 builtin [shell 内建 [参数 ...]]         pushd [-n] [+N | -N | 目录]
 caller [表达式]                         pwd [-LP]
 case 词 in [模式 [| 模式]...) 命令 ;;>  read [-ers] [-a 数组] [-d 分隔符] [->
 cd [-L|[-P [-e]] [-@]] [目录]           readarray [-d 定界符] [-n 计数] [-O>
 command [-pVv] 命令 [参数 ...]          readonly [-aAf] [名称[=值] ...] 或 r>
 compgen [-abcdefgjksuv] [-o option] [>  return [n]
 complete [-abcdefgjksuv] [-pr] [-DEI]>  select NAME [in 词语 ... ;] do 命令;>
 compopt [-o|+o 选项] [-DEI] [名称 ...>  set [--abefhkmnptuvxBCHP] [-o 选项名>
 continue [n]                            shift [n]
 coproc [名称] 命令 [重定向]             shopt [-pqsu] [-o] [选项名 ...]
 declare [-aAfFgiIlnrtux] [-p] [name[=>  source 文件名 [参数]
 dirs [-clpv] [+N] [-N]                  suspend [-f]
 disown [-h] [-ar] [任务声明 ... | pid>  test [表达式]
 echo [-neE] [参数 ...]                  time [-p] 管道
 enable [-a] [-dnps] [-f 文件名] [名称>  times
 eval [参数 ...]                         trap [-lp] [[参数] 信号声明 ...]
 exec [-cl] [-a name] [command [argume>  true
 exit [n]                                type [-afptP] 名称 [名称 ...]
 export [-fn] [名称[=值] ...] 或 expor>  typeset [-aAfFgiIlnrtux] [-p] name[=>
 false                                   ulimit [-SHabcdefiklmnpqrstuvxPT] >
 fc [-e 编辑器名] [-lnr] [起始] [终结]>  umask [-p] [-S] [模式]
 fg [任务声明]                           unalias [-a] 名称 [名称 ...]
 for 名称 [in 词语 ... ] ; do 命令; do>  unset [-f] [-v] [-n] [名称 ...]
 for (( 表达式1; 表达式2; 表达式3 )); >  until 命令; do 命令; done
 function 名称 { 命令 ; } 或 name () {>  variables - 一些 shell 变量的名称>
 getopts optstring name [arg ...]        wait [-fn] [-p var] [id ...]
 hash [-lr] [-p 路径名] [-dt] [名称 ..>  while 命令; do 命令; done
 help [-dms] [模式 ...]                  { 命令 ; }
