# 一些js片段

```js
//胜率转换为赔率
function rate(win_rate) {
    /**
     * 胜率50 即 win_rate 为 50
     */
    var BASE_RATE = 100; // 计算基数
    var TAX_RATE = 0.1; // 水钱: 系统抽水佣金
    return (BASE_RATE / win_rate) * (1 - TAX_RATE)
}
```
