# algorithms

## 数组

### 双指针

## 杂项技巧

### 遍历时改变数组长度可以用的方式

```javascript
let size = arr.length(); //首先将需要操作的次数获取过来，可以时原数组长度或者其他什么
for(let i = 0; i < size; ++i){
    // do something
    // arr.shift();
    // arr.pop();
    arr.push(xxx); // 这样即使适当改变原数组也都在可以控制的范围内
}
```

### 反向思考

题意中让选择大于某个值或者某种条件A的，在选择记录相对困难的情况下也可以反向考虑为，不需要不符合即非A的值可以进行排除，例如双指针对撞进行逼近之类的题目

### 无用数据直接覆盖

当一些元素不在数组整理范围时可以将其位置直接视作空白填入需要整理的元素
