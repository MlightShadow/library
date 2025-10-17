# Java Stream cheatsheet

## 基础结构

### 一、创建 Stream

```java
// 1. 从集合创建
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream1 = list.stream();

// 2. 从数组创建
String[] array = {"a", "b"};
Stream<String> stream2 = Arrays.stream(array);

// 3. 直接创建元素
Stream<Integer> stream3 = Stream.of(1, 2, 3);

// 4. 生成无限流（需限制）
Stream<Double> randomStream = Stream.generate(Math::random).limit(5);
```

---

### 二、中间操作（返回新Stream）
1. 过滤  
   ```java
   stream.filter(s -> s.length() > 3); // 保留长度>3的字符串
   ```

2. 映射  
   ```java
   stream.map(String::toUpperCase);    // 转为大写
   stream.mapToInt(String::length);    // 转为数值流（避免装箱）
   ```

3. 去重  
   ```java
   stream.distinct();                   // 根据equals()去重
   ```

4. 排序  
   ```java
   stream.sorted();                     // 自然序排序
   stream.sorted((a,b) -> b.compareTo(a)); // 自定义排序
   ```

5. 限制/跳过  
   ```java
   stream.limit(3);    // 取前3个元素
   stream.skip(2);     // 跳过前2个元素
   ```

6. 扁平化  
   ```java
   List<List<String>> nested = Arrays.asList(
      Arrays.asList("a", "b"), 
      Arrays.asList("c")
   );
   nested.stream()
         .flatMap(Collection::stream); // 输出 ["a","b","c"]
   ```

---

### 终端操作

1. 遍历  

   ```java
   stream.forEach(System.out::println); // 遍历输出
   ```

2. 收集结果  
   ```java
   List<String> list = stream.collect(Collectors.toList());
   Set<String> set = stream.collect(Collectors.toSet());
   String str = stream.collect(Collectors.joining(",")); // 拼接字符串
   ```

3. 聚合计算  
   ```java
   long count = stream.count();         // 元素总数
   Optional<String> max = stream.max(String::compareTo); // 最大值
   int sum = stream.mapToInt(Integer::intValue).sum();  // 求和
   ```

4. 匹配检查  
   ```java
   boolean anyMatch = stream.anyMatch(s -> s.startsWith("A")); // 是否存在匹配
   boolean allMatch = stream.allMatch(s -> s.length() > 2);    // 是否全部匹配
   ```

5. 查找元素  
   ```java
   Optional<String> first = stream.findFirst(); // 返回第一个元素
   ```

## Collectors 和 Comparator

### Collectors

```java
// 1. 分组
Map<Integer, List<String>> groupByLength = 
    stream.collect(Collectors.groupingBy(String::length));

// 2. 分区（按条件分两组）
Map<Boolean, List<String>> partitioned = 
    stream.collect(Collectors.partitioningBy(s -> s.length() > 3));

// 3. 统计摘要
IntSummaryStatistics stats = 
    stream.collect(Collectors.summarizingInt(String::length));
stats.getAverage(); // 平均值
```

## 并行流优化

```java
List<String> data = Arrays.asList("a","b","c");
data.parallelStream()           // 启用并行处理
    .filter(s -> s.startsWith("a"))
    .forEach(System.out::println);
```

> **注意**：并行流适用于无状态操作且数据量大的场景，需避免共享变量。
