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

## lambda

## 流式

在Java中，Stream是一个用于处理集合的抽象概念。它提供了一种高效、声明式的方式来处理数据集合。通过使用Stream，你可以轻松地对集合进行过滤、映射、排序、计数等操作。

Stream接口的主要方法是filter(), map(), reduce(), collect()等。这些方法可以用于处理数据流，并对流中的元素进行转换和聚合操作。

下面是一个简单的示例，展示了如何使用Java的Stream来处理一个整数列表：

```java
import java.util.Arrays;  
import java.util.List;  
import java.util.stream.Collectors;  
  
public class StreamExample {  
    public static void main(String[] args) {  
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);  
  
        // 使用filter方法过滤出偶数  
        List<Integer> evenNumbers = numbers.stream()  
                                            .filter(num -> num % 2 == 0)  
                                            .collect(Collectors.toList());  
  
        System.out.println("Even numbers: " + evenNumbers);  
    }  
}
```

在上面的示例中，我们创建了一个整数列表numbers。然后，我们使用stream()方法将该列表转换为一个流。接下来，我们使用filter()方法过滤出偶数，并使用collect()方法将结果收集到一个新的列表中。最后，我们打印出偶数列表。

这只是Java Stream的一个简单示例。你可以使用Stream进行更复杂的操作，例如对流中的元素进行转换、排序、分组等。

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

#### 多线程基础

创建方式：

* 继承Thread： 重写run方法，通过start方法启动线程
* 实现Runnable: 实现接口，重写run方法，通过Thread构造器传入runnable实现对象，通过start方法启动线程(同一个runnable对象启动多个线程共享该runnable对象)
* 实现Callable

设置优先级`thread.setPriority(Thread.MAX_PRIORITY)`

线程休眠`Thread.sleep(1000)` 当前线程睡眠

线程让步`Thread.yield()` 放弃剩余的cpu时间,以便其他线程有更多的时间被执行, 然而这次放弃并不意味着下一次cpu不会再次选择他进行执行，依然会有概率出现连续多次执行该线程(调度下次调用依然可能会选择该高风亮节的线程)

线程合并`thread.join()`

```java
thread.start();
thread.join();
```

线程类型:

* 用户线程
* 守护线程

守护线程`thread.setDaemon(true)`

java线程安全常用方法：

* 同步代码块`synchronized(lock){ ... }` 任意对象都可以充当lock 例如`Object lock = new Object();` 或者使用`this` 指定为当前对象 `synchronized(this){ ... }` 还可以使用`XXObject.class` 使用这个对象来锁
* 同步方法`synchronized`修饰的方法 它的锁是this 如果修饰静态对象则锁为 XXObject.class
* Lock 来自juc 其定义了多种锁实现， 其中 `ReentrantLock` 进行lock和unlock 在这这间的代码可以加锁  这种方法最为灵活好用 而condition可以用于进程间合作 相较于 wait/notify 更加灵活

等待唤醒机制

* wait()
* notify()
* notifyAll()

并且他们都是作用于关注这个锁的线程, 通过使用锁对象的wait和notify实现

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

## jdk一些常见问题

### 驱动程序无法通过使用安全套接字层(SSL)加密与 SQL Server 建立安全连接

> JDK 1.8；
JDBC 驱动版本mssql-jdbc-6.4.0.jre8.jar
在Eclipse下使用JDBC驱动程序连接SQL Server 2012数据库，报错信息如下：
驱动程序无法通过使用安全套接字层(SSL)加密与 SQL Server 建立安全连接。
错误:“The server selected protocol version TLS10 is not accepted by client preferences [TLS12]”。 ClientConnectionId:12d300ee-beb1-4677-80da-8936f5f80aac
com.microsoft.sqlserver.jdbc.SQLServerException: 驱动程序无法通过使用安全套接字层(SSL)加密与 SQL Server 建立安全连接。
错误:“The server selected protocol version TLS10 is not accepted by client preferences [TLS12]”。
ClientConnectionId:12d300ee-beb1-4677-80da-8936f5f80aac

The server selected protocol version TLS10 is not accepted by client preferences [TLS12]
客户端client引用的协议版本是TLS12即TSL1.2的版本, 而服务端The server selected选择的协议版本还是TSL10即TSL1.0

JDK1.8的安全策略里面，把低版本TSL1.0的安全算法禁用了，我们把它取消禁用就可以了。

1. 首先找到`JAVAPATH/jre/lib/security`路径下的`java.security`文件，没看错，文件的后缀是`.security`

2.修改里面的jdk.tls.disabledAlgorithms配置信息，禁用的算法目前有

```text
jdk.tls.disabledAlgorithms=SSLv3, TLSv1, TLSv1.1, RC4, DES, MD5withRSA, \
    DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL, \
```

将其中的TLSv1删除掉或者注释

JAVA的安装路径下jdk,jre都要修改

* JDK中 `JDKPATH/jre/lib/security/java.security`
* JRE中 `JREPATH/lib/security/java.security`
