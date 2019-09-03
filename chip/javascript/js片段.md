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

根据xpath获取元素

```js
function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }
    return xnodes;
}
```
