# JS小册

JS 复习巩固用

## 基础数据类型

* Number
* String
    > 模板字符串:
    > `` `boo${key}bar` ``, 多用这个来替代`+`
* Boolean
* null & undefined

## 数组

给数组的 `length` 属性赋值可以改变数组大小

* 末尾增删元素 `push()`, `pop()`
* 头部增删元素 `unshift()`, `shift()`

## 对象

使用`in` 判断属性是否存在时可能是继承得到的, 判断自身拥有使用 `hasOwnProperty()`

```javascript
'toString' in obj;
obj.hasOwnProperty('toString');
```

## Map

```javascript
var m1 = new Map([['key1', 42], ['key2', 42], ['key3', 42]]);

var m2 = new Map();
m2.set('key', 42);
m2.has('key');
m2.get('key');
m2.delete('key');
```

## Set

```javascript
var s1 = new Set();
var s2 = new Set([1, 2, 3]);
s2.add(4);
s2.delete(3);
```

## iterable

`for ( ... of ... ) { ... }` 修复了这些特性, 数组遍历为对象, 且只遍历数组本身

`for ( ... in ... ) { ... }` 对于数组遍历的对象为索引

## 函数参数

`function func (arg1, arg2, ...rest)` 可获取剩余所有参数
