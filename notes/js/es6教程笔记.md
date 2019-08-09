# ES6笔记

[ECMAScript 6 入门](http://es6.ruanyifeng.com)

## Generator

[原文](http://es6.ruanyifeng.com/#docs/generator)

* Generator 内部封装了多个状态 在执行.next()方法时会将指针依次指向不同的状态, 并返回
* `*` 号的书写只要在 `function` 与函数名之间即可, 比较推荐 `function* customGenerator(){}`

### yield

`yield` 为暂停执行的标志, 当执行`next()`方法时, 遇到`yield`就会暂停, 并输出`yield`后面的表达式值作为返回对象的`value`属性值

Generator 可以没有`yield`

`yield` 在普通的函数中会报错
