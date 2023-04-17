# VSCode 正则查找替换

## 字符串

`()` 可以表示为 `$X`

例如 `(a) (b)` 就可以是 `$1 $2`

注意: 这里的脚标从1开始

## 常用的匹配方式

* `(.*)` 任意字符匹配任意次
* `(.{n})` 任意字符匹配n次
* `([^a]*)` 除a以外的字符匹配任意次

## 实例

例如想要将以下包名进行操作
`com.samplestudio.reg.test`
`com.samplestudio.reg.module`
`com.samplestudio.reg2.service`
`com.samplestudio.reg2.sample`
希望修改为
`test模块在com.samplestudio.reg中`
`module模块在com.samplestudio.reg中`
`service模块在com.samplestudio.reg2中`
`sample模块在com.samplestudio.reg2中`

在vscode中使用正则匹配模式输入如下内容
`com\.samplestudio\.(reg|reg2)\.(.*)`

这样两个括号的位置就分别是`$1`, `$2`

从新组合来进行替换`$1模块在com.samplestudio.$2中`
