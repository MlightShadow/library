# java

## 基础

### 基础数据类型

### 运算符

赋值运算符在 java 中只有一个 `=`

进行数值运算的的运算符
自增, 自减运算符作为语法糖亦在此列

同数学语言一样, 通过 `()` 可以改变其优先级

* `+`  : 加   
* `-`  : 减   
* `*`  : 乘   
* `/`  : 除   
* `%`  : 求余 

逻辑运算符

通常我喜欢称之为逻辑运算符
无论是进行比较或者做一些与,或运算 这类运算符的结果一般用于反馈真假的判断

* `>`  : 大于     
* `<`  : 小于     
* `==` : 等于     
* `<=` : 小于等于 
* `>=` : 大于等于 
* `!`  : 非       
* `!=` : 不等于   
* `&&` : 与       
* `||` : 或       
* `&`  : 按位与   
* `|`  : 按位或   
* `^`  : 异或     

todo 真值表

其他

* 移位 `>>` `<<`
* 三元运算 `?:`
* lamda 表达式 `=>`

### 控制

## 对象

## 函数式

## 流式

## 异常

## IO

## 泛型

## 集合
java集合主要由两个接口派生
* Collection : 用于存放单一元素 ， Collection还继承了Iterable接口，用于实现枚举
* Map : 存放键值对

Collection 主要有三个子接口及其若干实现：
* List
  * Vector
  * ArrayList
  * LinkedList(List和Deque实现)
* Set
  * HashSet
  * TreeSet(SortedSet实现)
  * LinkedHashSet
* Queue
  * PriorityQueue
  * LinkedList
  * ArrayDeque

Map的主要实现包括：
* HashTable
* HashMap
* TreeMap(Map的子接口SortedMap实现)

简单的理解为：
* List： 可以重复，元素有序
* Set：不可以重复，无序
* Queue：可以重复，元素有序
* Map：key无序不重复，value无序能够重复

### Collection

当我们使用单一元素时创建Collection接口的集合是个好主意


* List: 无需保证唯一元素
  * ArrayList
  * LinkedList
* Set: 保证唯一元素
  * TreeSet
  * HashSet
* Queue

### Map

当需要根据键值获取元素时选择Map是个好主意

* HashMap: 无需排序时
* TreeMap: 需要排序
* ConcurrentHashMap: 需要保证线程安全
* LinkedHashMap
* HashTable

## 枚举

## 并发

* 并发
* 并行

> 高性能，高扩展，高可用

实现高性能就需要两个方面
* 低延时 (提升延时相对困难，amdahl定律)
* 高吞吐量

其中提高吞吐量就是提高并发量

### 多线程

* 进程
* 线程

#### 基础

创建方式：
* 继承Thread： 重写run方法，通过start方法启动线程
* 实现Runnable: 实现接口，重写run方法，通过Thread构造器传入runnable实现对象，通过start方法启动线程(同一个runnable对象启动多个线程共享该runnable对象)
* 实现Callable

设置优先级`thread.setPriority(Thread.MAX_PRIORITY)`

线程休眠`Thread.sleep(1000)` 当前线程睡眠

线程让步`Thread.yield()` 放弃剩余的cpu时间,以便其他线程有更多的时间被执行, 然而这次放弃并不意味着下一次cpu不会再次选择他进行执行，依然会有概率出现连续多次执行该线程(调度下次调用依然可能会选择该高风亮节的线程)

线程合并`thread.join()`

线程类型:
* 用户线程
* 守护线程

#### 扩展

> 可见性, 有序性, 原子性

多少线程合适 需要压测 另外还要关注是cpu密集还是io密集

JOL

synchronized 修改对象头记录锁信息

JUC java.util.concurrent java并发包 有更多的锁类型

synchronized 属于悲观锁: 不管是否涉及安全的问题都上锁
乐观锁: CAS (Compare and Set/Swap) 是乐观锁的一种实现
乐观锁：在操作完成后，对比操作之前的值是否为原值，如果为原值则进行更新，否则重新读取，重新操作再次判断，直到为读取值，更新成功为止

ABA问题: 判断是值相等，但是实际上值已经改变后又改回去了
ABA解决办法:
* StampeReference （记录版本号）
* MarkableReference（记录布尔类型）

CAS原子性问题: CAS的过程即比较和设置的过程必须是原子性
CAS原子性解决办法: 由虚拟机底层C/C++/ASM完成 通过CPU指令(cmpxhg)完成 但是cmpxhg多处理器的时候其实也不能完全保证原子性, lock cmpxhg 可以保证多处理器时的原子性, lock 可以锁定总线

synchronized 与 juc
能用synchronized就用synchronized 高版本的jdk(>1.5)内部会有锁升级的过程 偏向锁 (... 贴个标签，基本属于没有锁， 方便单线程使用)->自旋锁(乐观锁)-> 重量级锁(上来就锁, 不说别的就是刚)

cpu指令重排的原则是不影响单线程的一致性 (8种情况不能还顺序（happens-before原则）)

由于半初始化状态的存在，不要再构造方法里启动线程，很可能由于指令重排导致调用还未初始化完成的变量

```java
int a = 0;

while(true){
    int temp = a;
    int update = a+1;
    if(a==temp){
      a = update;
      break;
    }
}
```

> 乐观锁 也叫 自旋锁，无锁（无悲观锁）








## JVM

## 设计模式