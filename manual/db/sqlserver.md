# sqlserver


## cheatsheet


### 当希望改变null在排序中的顺序

默认情况下 sqlserver 中 null 参与排序时是最小值。

升序排列：null 值默认排在最前。 要想排后面，则：

```sql
order by case when col is null then 1 else 0 end ,col
```

降序排列：null 值默认排在最后。 要想排在前面，则：

```sql
order by case when col is null then 0 else 1 end , col desc
```
