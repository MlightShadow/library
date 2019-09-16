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

## 对象创建

直接创建

```javascript
var a = {
    name: '...',
    skill: function(){
        //do something
    }
}
```

构造函数方式

```javascript
function Scout(name) {
    this.name = this;
    this.skill = function () {
        // do something
    }
}

var someone = new Scout('名字')

```

将方法移动到原型以节省内存, 否则每个对象将有一个自己的方法, 而不是共用一个方法

```javascript
function Scout(name) {
    this.name = name;
}

Scout.prototype.skill = function () {
    // do something
};
```

## call(), apply(), bind()

```javascript
obj.fn.call(pram1, pram2, pram3)
```

`fn` 中的 `this` 会被 `pram1` 替代执行

```javascript
obj.fn.apply(pram1, [pram2, pram3])
```

参数以数组方式传入, 其他与 `call()` 一致

```javascript
obj.fn.bind(pram1, pram2, pram3)
```

`find()` 返回 `fn()` 中 `this` 被修改后的函数, 不会直接执行 `fn()`, 其他与 `call()` 一致

## 原型继承

TODO

## class

```javascript
class Hero {
    constructor(name) {
        this.name = name;
    }

    skill() {
        // do something
    }
}

var h = new Hero('42');
h.skill();
```

```javascript
class TankHero extends Hero {
    constructor(name, strength) {
        super(name);
        this.strength = strength;
    }

    skill() {
        盾墙();
    }
}
```

## 浏览器端文件操作

TODO
