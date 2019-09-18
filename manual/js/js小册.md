# JS小册

JS 复习巩固用

## 数据结构

### 基础数据类型

* Number
* String
    > 模板字符串:
    > `` `boo${key}bar` ``, 多用这个来替代`+`
* Boolean
* null & undefined

### 数组

给数组的 `length` 属性赋值可以改变数组大小

* 末尾增删元素 `push()`, `pop()`
* 头部增删元素 `unshift()`, `shift()`

### 对象

#### 对象创建

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

#### 原型继承

TODO

#### class

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

使用`in` 判断属性是否存在时可能是继承得到的, 判断自身拥有使用 `hasOwnProperty()`

```javascript
'toString' in obj;
obj.hasOwnProperty('toString');
```

#### 属性简洁表达

```javascript
function f(x, y) {
  return {x, y};
}
```

在大括号中变量名就是属性名, 变量值就是属性值

```javascript
const o = {
  method() {
    return "Hello!";
  }
};
```

方法也可以简写

模组输出就是这样

```javascript
module.exports = { getItem, setItem, clear };
```

属性的setter, getter也是这样的写法

```javascript
const cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}
```

输出时同样可以使用

```javascript
let user = {
  name: 'test'
};

let foo = {
  bar: 'baz'
};

console.log(user, foo)
// {name: "test"} {bar: "baz"}
console.log({user, foo})
// {user: {name: "test"}, foo: {bar: "baz"}}
```

#### 属性名表达式

```javascript
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

注意: 不得与简洁表达式同时使用

#### 对象.name

TODO

#### 属性枚举与遍历

每个属性包含一个描述对象(Descriptor), 该对象可用来控制属性行为

`Object.getOwnPropertyDescriptor()` 方法可获取该属性的描述对象

```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

其中`enumerable`属性称为可枚举性, 如果该属性为false, 则某些操作会忽略该属性
其中包括:

* `for ... in`循环
* `Object.keys()`
* `JSON.stringify()`
* `Object.assign()`

以上方法只会对具有可枚举性为true的属性起作用

对象原型的 `toString()` 和数组的 `length` 属性就是可枚举性为 `false` 的属性

ES6 中所有原型方法都是不可枚举的

`for ... in` 与 `Object.keys()` 的区别在于 `for ... in` 会返回自身属性与继承属性, 而`Object.keys()` 只会返回自身属性, 注意区分

#### 属性遍历

* for ... in
* Object.keys(obj)
* Object.getOwnPropertyNames(obj)
* Object.getOwnPropertySymbols(obj)
* Reflect.ownKeys(obj)

```javascript
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

遍历顺序 数值键, 字符串键, Symbol键

#### super

指向当前对象的原型对象

只能用在对象方法中, 不能用于属性

#### 对象扩展运算符

TODO

### Map

```javascript
var m1 = new Map([['key1', 42], ['key2', 42], ['key3', 42]]);

var m2 = new Map();
m2.set('key', 42);
m2.has('key');
m2.get('key');
m2.delete('key');
```

### Set

```javascript
var s1 = new Set();
var s2 = new Set([1, 2, 3]);
s2.add(4);
s2.delete(3);
```

### iterable

`for ( ... of ... ) { ... }` 修复了这些特性, 数组遍历为对象, 且只遍历数组本身

`for ( ... in ... ) { ... }` 对于数组遍历的对象为索引

### 解构赋值

#### 数组解构赋值

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [ , , third] = ["foo", "bar", "baz"];
let [x, , y] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];
let [x, y, ...z] = ['a'];
```

如果解构不成功则为 `undefined`

当等号右边值转为对象后不具备`iterator`接口, 或者本身不具备`iterator`接口, 则无法解构, 且报错

```javascript
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

解构时可以指定默认值, 当元素为 `undefined` 时则为默认值

注意: `null` 不是 `undefined`

```javascript
let [x, y = 'b'] = ['a', undefined];
```

#### 对象解构赋值

对象结构赋值时右值必须包含相同属性名才能取到值

```javascript
let { foo, baz } = { foo: 'aaa', bar: 'bbb' };
```

这其中 `baz` 则为 `undefined`

可以解构到相应对象的方法方便使用

```javascript
let { log, sin, cos } = Math;
```

以下为两个解构时属性名与变量名不同的写法, 其中 `foo` 称为模式而 `baz` 则是变量
之前的解构写法其实是这种写法的简写

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
```

也可以嵌套解构, 嵌套时就需要使用模式来进行解构, 此处 `p` 即为模式

```javascript
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
```

解构是父对象不存在则会报错

```javascript
let {foo: {bar}} = {baz: 'baz'};
```

解构赋值能够取到继承属性

```javascript
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
```

默认值设置方式与数组类似, 作用机制与数组相同, 需要严格等于 `undefined` 才有效

```javascript
var {x = 3} = {x: undefined};
```

注意以下几点:

以下这种写法 `{x}` 会被认为是代码块, 解释器将显示为错误

```javascript
let x;
{x} = {x: 1};
```

需要采用以下写法

```javascript
let x;
({x} = {x: 1});
```

以下代码虽然不会报错, 但是毫无意义

```javascript
({} = [true, false]);
({} = 'abc');
({} = []);
```

可以使用对象解构数组, 因为数组的本质也是对象

```javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
```

#### 字符串解构赋值

以数组解析, 以对象解析都可以

```javascript
const [a, b, c, d, e] = 'hello';
let {length : len} = 'hello';
```

#### 数值和布尔解构赋值

```javascript
let {toString: s} = 123;
let {toString: s} = true;
```

数字与布尔值转为对象对 `toString` 属性进行解构复制可以获得相应布尔值

对 `undefined` 和 `null` 进解构赋值会报错

#### 函数参数解构赋值

其中第三例与第四例不同的是: 第三例为 `x`, `y` 设置了默认值, 并且设置了传入对象的默认值, 而第四例仅为传入的对象参数设置了默认值, 等同于第五例

```javascript
function add([x, y]){
  return x + y;
}

[[1, 2], [3, 4]].map(([a, b]) => a + b);

function move({x = 0, y = 0} = {}) {
  return [x, y];
}

function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

[1, undefined, 3].map((x = 'yes') => x);

```

#### 解构赋值注意点

当模式中出现圆括号时可能导致歧义, 尽量不要再模式中使用圆括号

以下是正确的使用情况

```javascript
[(b)] = [3];
({ p: (d) } = {});
[(parseInt.prop)] = [3];
```

以下都是错误用例

```javascript
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };

function f([(z)]) { return z; }

function f([z,(x)]) { return x; }

({ p: a }) = { p: 42 };
([a]) = [5];

[({ p: a }), { x: c }] = [{}, {}];
```

#### 解构常用示例

变量交换

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

获取多个函数返回值

```javascript
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

函数参数定义, 注意: 数组需要有序放置, 而对象则可以无序放置

```javascript
function f([x, y, z]) { ... }
f([1, 2, 3]);

function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

同样可以加入默认值

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

提取 `JSON` 数据

```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;
```

遍历Map时

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

for (let [key] of map) {
  // ...
}

for (let [,value] of map) {
  // ...
}
```

加载模块时

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 函数

### 默认值

没有添加在尾部的参数不能省略必须显式添加 `undefined`

以下传递方式报错

```javascript
f(1, ,2)
```

使用默认值时, 不可使用同名参数

length只返回没有指定默认值的参数个数, rest也不会计入, 不是尾参数的带默认值参数之后的参数也不会计入length

当指定默认值时函数参数列表会形成一个独立的作用域, 在不指定默认值时不会出现这个作用域

```javascript
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2

let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

默认值设置必填参数检查

```javascript
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
```

### rest 参数

`function func (arg1, arg2, ...rest)` 可获取剩余所有参数

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3)
```

`arguments` 并不是数组所以使用没有 `rest` 方便, `rest` 就是一个数组

`rest` 参数之后不能再有其他参数, 否则报错

`length` 在有 `rest` 参数的情况下并不包含 `rest`

### 严格模式的一些注意

当使用默认值, 解构赋值, 扩展运算符的情况下, 函数内部无法被显示的设置为严格模式, 否则会报错

以下为两种合法模式, 全局严格模式或者在外部包含一个立即执行的函数并在函数体中显式声明严格模式

```javascript
'use strict';

function doSomething(a, b = a) {
  // code
}
```

```javascript
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());
```

### 函数.name

返回函数名
`Funciton` 构造函数返回 `anonymous`
`bind` 返回的函数会有 `bound` 前缀

```javascript
const bar = function baz() {};
bar.name//baz

(new Function).name // "anonymous"

function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "

```

### 箭头函数

```javascript
var f = v => v;
var sum = (num1, num2) => num1 + num2;
var sum = (num1, num2) => { return num1 + num2; }
```

如果直接返回对象需要加圆括号以避免被解释为代码块

```javascript
let getTempItem = id => ({ id: id, name: "Temp" });
```

只有一行, 无返回值情况下

```javascript
let fn = () => void doesNotReturn();
```

同样可以使用解构

```javascript
const full = ({ first, last }) => first + ' ' + last;
```

示例:

```javascript
const isEven = n => n % 2 === 0;
const square = n => n * n;

[1,2,3].map(x => x * x);

var result = values.sort((a, b) => a - b);

const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5)
const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5)
```

箭头函数注意:

* 函数体内的this对象为定义时所在的对象, 而非使用时所在对象
* 不可以当作构造函数, 使用new命令抛出错误
* 不可以使用arguments对象
* 不能使用yield, 即不能作为generator函数

### 箭头函数中的this

TODO

### 嵌套箭头函数

```javascript
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1);
```

pipeline 前一个函数的输出是后一个函数的输入

```javascript
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
```

简洁一点的写法

```javascript
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
```

### 箭头函数与λ演算

TODO

### 尾调用

由于尾调用是函数操作的最后一步所以可以删除外部函数调用帧, 只保留被调用的函数调用帧, 从而节省内存

```javascript
function f() {
  return g(3);
}
f();
```

这里f函数执行到最后一步即可删除f的调用帧, 只保留g(3)的调用帧即可

这称之为尾部优化(Tail call optimization) 利用尾部优化可以实现尾递归

### 柯里化(currying)

TODO

### 蹦床函数

TODO

### 函数的其他一些特性

* ES2019 toString()返回函数代码本身, 之前会省略空格
* ES2017 函数参数现在允许尾逗号
* ES2019 catch允许省略err参数

### call(), apply(), bind()

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

## 模块

## 示例

### 浏览器端文件操作

TODO
