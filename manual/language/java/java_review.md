# java面试复习手册

*文稿中以这个字体展示的内容* 都是吐槽，或者个人见解请仔细甄别

[toc]

## 基础篇

### 基本功

#### 面向对象的特征

封装, 继承(基类和接口的方式分别对应泛化和聚合的继承方式), 多态(重写, 重载)
*简单说说毕竟这个概念能写一章呢*

#### final, finally, finalize 的区别

final: 修饰符(可以修饰类, 变量, 方法)

* 修饰类: 不能够再派生子类
* 修饰变量: 无法修改变量内容
* 修饰方法: 无法重写

finally: 处理异常时最后执行操作的代码块
finalize: Object的方法, 在被垃圾回收前进行调用
名字类似但是实际上完全作用在不同概念下的关键字, *烂俗的概念混淆*

#### int 和 Integer 有什么区别

Integer是int的包装器类
类似的还有 byte与Byte, short与Short, long与Long, float与Float, double与Double, char与Char, boolean与Boolean
初始值和判断相等这些操作都需要注意一下

#### 重载和覆盖(重写)的区别

重载: 是相同方法名参数数量不同, 根据不同的参数调用不同的方法
覆盖(重写): 是将继承的方法进行重新实现, 参数数量必须相同
名字相似概念中都包含参数数量的问题, 其实没啥可比性, *都是烂俗的混淆概念*

#### 抽象类和接口有什么区别

首先, 类和接口的区别, 构造方法, 成员变量, 静态方法都是接口所不具备的
其次, 可以实现多个接口, 但是只能继承于一个父类
一个非常特殊的点, 当抽象类实现接口时不需要像普通类(继承于抽象类或者接口时)实现所有的方法, 只需要作为抽象方法即可, 这些将由子类去实现
另外, 还有抽象类继承抽象类的问题, 只能添加新的抽象方法, 成员变量等, 无法覆盖父类的抽象方法

#### 说说反射的用途及实现

动态的创建, 修改, 使用对象, 做一些骚操作
大部分反射需要用到的类都在java.lang.relfect下
容易导致安全问题, 破坏封装, 而且会消耗额外的资源, 需要按照实际需求使用

#### 说说自定义注解的场景及实现

可以用于实现一些AOP例如权限控制, 日志记录, 数据库切换, 事务处理等工作
实现 TODO: 我还不知道怎么说这个

#### HTTP 请求的 GET 与 POST 方式的区别

POST 和 GET 本质上都是 TCP 连接, 在参数传递, 请求结构上有所区别
其中要注意 POST 方法在大部分浏览器上会发送两次请求而 GET 只有一次

#### session 与 cookie 区别

session 是服务器端保存的一个数据结构用来追踪用户的状态, 可以落地到数据库或者文件中
cookie 是客户端保存用户信息的机制, 可以用来记录用户的信息, 是session的一种实现方式
当cookie被禁用时需要通过url重写添加sid的到url后进行识别完成session判断, 或者使用jwt等方式实现
部分大厂浏览器开始迫于隐私要求禁用cookie

#### session 分布式处理 (集群部署下的session处理)

一般用5种处理方式
粘性session
服务器seesion复制
session共享(包含两种方式粘性和非粘性)
session持久到数据库
利用terracotta实现session复制

#### JDBC 流程

第一步：加载Driver类，注册数据库驱动；
第二步：通过DriverManager,使用url，用户名和密码建立连接(Connection)；
第三步：通过Connection，使用sql语句打开Statement对象；
第四步：执行语句，将结果返回resultSet；
第五步：对结果resultSet进行处理；
第六步：倒叙释放资源resultSet-》preparedStatement-》connection。

#### MVC 设计思想(MVC是什么)

*就答MVC是什么就行了, 有时候出题的就是看着面大答的少*
model, view, controller 对应三种职责, 模型, 视图, 控制器
model: 主要包含数据获取, 逻辑处理, 设计为单一职责的处理单元
view: 前端展现的视图单元, 可以通过cotroller指定渲染
controller: 相当于view与model的胶水层, 主要将多个model和view结合起来

#### equals 与 == 的区别

`equals` 是对象值相等, `==` 是指针地址相等
栈区中的`int, float...`等基础类型是可以使用`==`的
有一个特殊情况, `""` 是可以使用==的 `""` 是在堆区的 比如 `"" == ""` 是true
另外, `String str = ""; str == ""` 也是true
以上的String 虽然是String 但是指向的是常量, 这是jvm优化的产物, 所以相同字符串指向同一对象, 只有 `new String("")` 时才会产生新的对象, 同时注意如果 `new` 的时候常量不存在也会向常量池中添加该对象的字符串常量但是地址并不相等是两个对象

```java
String str1 = "";
String str2 = "";
String str3 = new String("");

out.println(str1 == str2); // true
out.println("" == ""); // true
out.println(str1 == ""); // true
out.println(str1 == str3); // false
```

#### 什么是hash

Hash是一种将任意长度的消息压缩到某一固定长度的消息**摘要算法**。Hash算法的输入可以是任意长度的数据，输出是一个固定长度的哈希值。Hash算法的核心思想是将数据映射到一个哈希值，这个哈希值可以用来校验数据的完整性和一致性。

Hash算法具有以下特点：

1. 不可逆性：Hash算法是不可逆的，即无法从哈希值推导出原始数据。

2. 唯一性：不同的输入数据会产生不同的哈希值。

3. 散列性：Hash算法的输出值尽可能地分布在哈希值空间中，从而减小哈希冲突的概率。

Hash算法在数据安全领域有着广泛的应用，例如密码学、数字签名、数据完整性校验等。常见的Hash算法有MD5、SHA-1、SHA-256等。

在Java中，获取Hash值的方式主要有两种：

1. 使用 **hashCode()** 方法

    Object类的hashCode()方法可以返回一个对象的哈希码。该方法返回一个整型值，代表该对象的哈希码。默认情况下，hashCode()方法返回的是对象的内存地址。

    例如：

    ```java
    String str = "Hello World";
    int hashCode = str.hashCode();
    System.out.println(hashCode);
    ```

    输出结果：

    ```txt
    69609650
    ```

2. 使用MessageDigest类

    Java中的MessageDigest类提供了多种哈希算法，包括MD5、SHA-1、SHA-256等。可以使用该类来计算任意数据的哈希值。

    例如：

    ```java
    String str = "Hello World";
    MessageDigest md = MessageDigest.getInstance("MD5");
    md.update(str.getBytes());
    byte[] mdBytes = md.digest();
    StringBuffer sb = new StringBuffer();
    for (byte b : mdBytes) {
        sb.append(Integer.toHexString((b & 0xff)));
    }
    System.out.println(sb.toString());
    ```

    输出结果：

    ```txt
    ed076287532e86365e841e92bfc50d8c
    ```

以上代码使用了MD5算法来计算字符串"Hello World"的哈希值，并将结果转换成16进制字符串输出。注意，使用MessageDigest类计算哈希值时，需要先将原始数据转换成字节数组，并通过调用update()方法将其传递给MessageDigest对象。最后，通过调用digest()方法获取哈希值的字节数组，并将其转换成字符串输出。

### 集合

#### java中常用的数据结构

Java 中常用的数据结构有：

* 数组（Array）：一组按照顺序排列的相同类型元素的集合。
* 链表（Linked List）：一组按照顺序排列的元素的集合，每个节点都包含一个指向下一个节点的指针。
* 堆栈（Stack）：一种数据结构，按照先进后出（Last In First Out）的原则存储数据。
* 队列（Queue）：一种数据结构，按照先进先出（First In First Out）的原则存储数据。
* 集合（Collection）：一组对象的容器，包括 List、Set、Queue。
* Map：一种键值对的数据结构，其中每个键都唯一对应一个值。
* 树（Tree）：一种非线性数据结构，可以用于表示具有层次关系的数据。
* 图（Graph）：一种非线性数据结构，用于表示一组对象之间的关系。

#### java 常用集合

Java 常用的集合有以下几种：

* ArrayList：基于数组实现的可变长度的列表，支持快速随机访问和增删元素操作。
* LinkedList：基于链表实现的可变长度的列表，支持快速插入、删除元素操作，但是随机访问效率较低。
* HashSet：基于哈希表实现的无序集合，不允许重复元素，支持快速插入、删除和查找操作。
* TreeSet：基于红黑树实现的有序集合，不允许重复元素，支持快速插入、删除和查找操作，同时支持自然排序和自定义排序。
* HashMap：基于哈希表实现的键值对集合，不允许重复键，支持快速插入、删除和查找操作。
* TreeMap：基于红黑树实现的键值对集合，不允许重复键，支持快速插入、删除和查找操作，同时支持自然排序和自定义排序。
* Queue：队列接口，常用的实现类有 LinkedList 和 ArrayDeque。
* Stack：栈接口，常用
* LinkedHashMap：基于哈希表和双向链表实现的有序映射，可以按照插入顺序或者访问顺序进行排序。
* IdentityHashMap：基于对象引用的哈希表实现的映射，使用 == 运算符而不是 equals() 方法来比较键对象。
* WeakHashMap：基于对象弱引用的哈希表实现的映射，键对象被垃圾回收器回收时相应的键值对也会被删除。
* PriorityQueue：基于堆实现的优先队列。
* ArrayDeque：基于数组实现的双端队列。
* ConcurrentHashMap：线程安全的哈希表实现。
* ConcurrentSkipListMap 和 ConcurrentSkipListSet：基于跳表实现的有序映射和有序集合，支持高并发的访问。
* EnumMap 和 EnumSet：分别是基于枚举类型的映射和集合。

#### 使用treemap排序

Java TreeMap 是一种基于红黑树实现的有序 Map，可以根据键的自然顺序或自定义顺序进行排序。 TreeMap 采用红黑树作为内部实现，具有 O(log n) 的时间复杂度。

当创建 TreeMap 对象时，可以通过自定义 Comparator 实现对键的排序。如果不指定 Comparator，则根据键的自然顺序进行排序。

下面是一个例子，演示如何使用 TreeMap 来进行排序：

```java
import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

public class TreeMapExample {

    public static void main(String[] args) {
        
        // 定义一个 TreeMap，按键的自然顺序排序
        Map<Integer, String> treeMap = new TreeMap<>();
        
        // 添加元素
        treeMap.put(5, "E");
        treeMap.put(1, "A");
        treeMap.put(4, "D");
        treeMap.put(2, "B");
        treeMap.put(3, "C");
        
        // 打印元素
        System.out.println(treeMap); // 输出 {1=A, 2=B, 3=C, 4=D, 5=E}
        
        // 定义一个自定义的 Comparator，按键的逆序排列
        Comparator<Integer> reverseComparator = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2.compareTo(o1);
            }
        };
        
        // 使用自定义的 Comparator 创建一个 TreeMap，按键的逆序排列
        Map<Integer, String> reverseTreeMap = new TreeMap<>(reverseComparator);
        
        // 添加元素
        reverseTreeMap.put(5, "E");
        reverseTreeMap.put(1, "A");
        reverseTreeMap.put(4, "D");
        reverseTreeMap.put(2, "B");
        reverseTreeMap.put(3, "C");
        
        // 打印元素
        System.out.println(reverseTreeMap); // 输出 {5=E, 4=D, 3=C, 2=B, 1=A}
    }
}
```

在上面的例子中，我们首先创建了一个 TreeMap 对象，按键的自然顺序进行排序。然后，我们创建了一个自定义的 Comparator，按键的逆序排列。最后，我们使用自定义的 Comparator 创建了一个新的 TreeMap 对象，按键的逆序排列。

#### List, Set 和 Map 区别

Set 是不能有重复的, 其本质是数组, 可以通过equals()方法对比, 可以通过contaians()方法获取set是否包含某一对象
List 包含有arraylist(可变数组访问快但是插入删除慢)和linkedlist(链表插入删除快但是访问慢)
Map 键值对, 不允许重复, 底层由数组和链表实现, 通过hash值来确定在数组中的某个链表中, hash值由Object的hashCode()方法产生, 可以重写这一方法获得自己独特的hash规则防止hash碰撞(大量的数据对应有限的集合, 势必会出现重复, 如果被利用会出现可用性问题)
不同的场合需要以不同的判断使用

#### Arraylist 与 LinkedList 区别

`ArrayList` 基于索引, 查询速度和尾部删除插入较快, 而`LinkedList` 通过链表实现,所以插入删除较快

#### ArrayList 与 Vector 区别

都是List, 都是通过数组实现, Vector相比ArrayList具有线程同步

#### HashMap 和 Hashtable 的区别

hashMap: 是由数组和链表组成的, 谈到哈希碰撞的问题: 通过精心安排可以使某数组下的链表查询时间大大加长,从而破坏其访问速度, 解决办法是改写其`hashCode()`的方法

#### HashSet 和 HashMap 区别

是set和map的典型实现, 一个是无序集合, 一个是kv对集合

#### HashMap 和 ConcurrentHashMap 的区别

#### HashMap 的工作原理及代码实现

#### ConcurrentHashMap 的工作原理及代码实现

### jvm

#### jvm常见的优化内容

1. 调整内存分配：通过设置堆内存大小和非堆内存大小，以及调整垃圾回收机制，可以优化内存使用效率。

2. 调整垃圾回收机制：通过调整垃圾回收机制的参数，如回收算法、触发条件、回收频率等，可以优化垃圾回收效率和内存使用效率。

3. 使用并发垃圾回收器：并发垃圾回收器可以在垃圾回收时不影响程序的正常执行，从而提高程序的性能。

4. 使用JIT编译器：JIT编译器可以将代码在运行时编译成本地机器码，从而提高程序的执行效率。

5. 调整线程池大小和优先级：通过调整线程池的大小和优先级，可以优化多线程程序的性能和稳定性。

6. 使用缓存和缓存技术：通过使用缓存和缓存技术，可以减少对数据库和文件系统的访问，从而提高程序的执行效率。

7. 使用异步IO技术：异步IO技术可以在IO操作时不阻塞线程，从而提高程序的并发性和执行效率。

8. 使用代码优化技巧：如避免过多的对象创建和销毁、避免过多的方法调用、避免过多的异常处理等，可以优化程序的执行效率。

### 线程

#### 创建线程的方式及实现

Java创建线程的方式有三种：

* 继承Thread类
* 实现Runnable接口
* 通过callable 和 future实现。

实现Runnable接口比继承Thread类更好，因为Java是单继承的，在继承Thread类的同时可能会继承其他类，而实现Runnable接口可以避免这种限制。此外，实现Runnable接口还可以实现线程池等高级特性。

##### 继承Thread类

创建线程的步骤如下：

* 创建一个类，继承Thread类，并重写run方法；
* 在run方法中编写线程的执行代码；
* 创建该类的对象，并调用其start方法启动线程。

示例代码如下：

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        // 线程执行的代码
        System.out.println("MyThread is running.");
    }
}

public class Test {
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.start();
    }
}
```

##### 实现Runnable接口

创建线程的步骤如下：

* 创建一个类，实现Runnable接口，并重写run方法；
* 在run方法中编写线程的执行代码；
* 创建该类的对象，并将其作为参数传递给Thread类的构造方法中；
* 调用Thread类的start方法启动线程。

示例代码如下：

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        // 线程执行的代码
        System.out.println("MyRunnable is running.");
    }
}

public class Test {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}
```

##### Callable 和Future 实现多线程

使用 `Callable` 和 `Future` 接口可以实现多线程编程，具体步骤如下：

1. 实现 `Callable` 接口，并重写 `call` 方法，在该方法中编写需要在新线程中执行的代码

    ```java
    class MyCallable implements Callable<Integer> {
        @Override
        public Integer call() throws Exception {
            // do some computation
            return result;
        }
    }
    ```

2. 创建 `ExecutorService` 对象，该对象用于管理线程池，可以控制线程池的大小等属性

    ```java
    ExecutorService executor = Executors.newFixedThreadPool(10);
    ```

3. 创建 `Future` 对象，该对象用于获取线程执行结果

    ```java
    Future<Integer> future = executor.submit(new MyCallable());
    ```

4. 在需要获取线程执行结果的地方调用 `get` 方法

    ```java
    Integer result = future.get();
    ```

在这个示例中，我们首先定义了一个实现了 `Callable` 接口的 `MyCallable` 类，在该类中重写了 `call` 方法，实现了需要在新线程中执行的代码。然后我们创建了一个 `ExecutorService` 对象，该对象用于管理线程池，我们使用 `newFixedThreadPool` 方法创建了一个固定大小为 10 的线程池。接着，我们使用 `submit` 方法提交了一个 `MyCallable` 对象，该方法会返回一个 `Future` 对象，我们可以通过该对象获取线程执行结果。最后，在需要获取线程执行结果的地方，我们调用了 `get` 方法，等待线程执行完毕并返回结果。

需要注意的是，在使用 `Callable` 和 `Future` 接口时，需要处理可能抛出的异常，例如在 `call` 方法中可能会抛出异常，需要使用 `try...catch` 语句块来捕获异常。同时，调用 `get` 方法时也可能会抛出异常，例如当线程执行过程中被中断或超时时，需要处理相应的异常。

#### java 线程设置优先级

Java中线程的优先级通过Thread类的setPriority()方法来设置，其中优先级范围是1到10，1是最低优先级，10是最高优先级。默认情况下，线程的优先级是5。

由于优先级需要通过thread对象来进行设置所以不论是哪种方式创建线程最终都需要传递给thread对象来进行设置

##### thread方式

以下是设置线程优先级的示例代码：

```java
Thread t = new Thread();
t.setPriority(8);
```

需要注意的是，优先级较高的线程并不一定会比优先级较低的线程先执行完毕，因为线程的执行顺序是由操作系统决定的。因此，在编写多线程程序时，不要过度依赖线程优先级，更应该关注线程间的协作与同步。

##### runnable方式

使用`Runnable`接口实现多线程时，需要将`Runnable`对象作为参数传递给`Thread`类的构造方法中，然后调用`Thread`类的`setPriority()`方法来设置线程优先级。

以下是使用`Runnable`接口实现多线程并设置优先级的示例代码：

```java
public class MyRunnable implements Runnable {
    public void run() {
        // 线程执行的代码
    }
}

MyRunnable myRunnable = new MyRunnable();
Thread t = new Thread(myRunnable);
t.setPriority(8);
t.start();
```

与使用`Thread`类直接创建线程的方式相比，使用`Runnable`接口实现多线程需要多一步将`Runnable`对象传递给`Thread`类的构造方法中，但其优点在于可以避免单继承的限制，使得程序更加灵活。

需要注意的是，与使用`Thread`类直接创建线程的方式一样，优先级较高的线程并不一定会比优先级较低的线程先执行完毕，因为线程的执行顺序是由操作系统决定的。因此，在编写多线程程序时，不要过度依赖线程优先级，更应该关注线程间的协作与同步。

##### callable方式

使用`Callable`接口实现多线程时，需要将`Callable`对象作为参数传递给`FutureTask`类的构造方法中，然后调用`Thread`类的`setPriority()`方法来设置线程优先级。

以下是使用`Callable`接口实现多线程并设置优先级的示例代码：

```java
public class MyCallable implements Callable<Integer> {
    public Integer call() throws Exception {
        // 线程执行的代码
    }
}

MyCallable myCallable = new MyCallable();
FutureTask<Integer> task = new FutureTask<>(myCallable);
Thread t = new Thread(task);
t.setPriority(8);
t.start();
```

与使用`Runnable`接口实现多线程相比，使用`Callable`接口实现多线程需要多一步将`Callable`对象传递给`FutureTask`类的构造方法中，并且`Callable`接口的`call()`方法可以抛出异常，需要进行异常处理。

需要注意的是，与使用`Thread`类直接创建线程的方式一样，优先级较高的线程并不一定会比优先级较低的线程先执行完毕，因为线程的执行顺序是由操作系统决定的。因此，在编写多线程程序时，不要过度依赖线程优先级，更应该关注线程间的协作与同步。

#### 线程控制方法sleep,join,yield有什么区别

在Java中，sleep、join和yield都是线程的控制方法，但它们的作用和使用场景不同。

* sleep方法
    sleep方法是线程类中的静态方法，它让当前线程暂停执行指定的时间，让出CPU时间片，让其他线程有机会执行。在指定的时间到期后，当前线程会重新进入就绪状态，等待CPU的调度。一般情况下，sleep方法用于线程需要暂停一段时间，以等待某些资源准备好或者执行某些计算任务的时候。

* join方法
    join方法是线程类中的实例方法，用于等待当前线程执行完成，等待期间会阻塞当前线程，直到被等待的线程执行完成或者等待时间到期。一般情况下，join方法用于等待其他线程执行完毕后再执行当前线程，或者等待某些资源的释放。

* yield方法
    yield方法是线程类中的静态方法，它让当前线程让出CPU时间片，让其他线程有机会执行。与sleep方法不同的是，yield方法不会让当前线程暂停执行，而是直接进入就绪状态，等待CPU的调度。一般情况下，yield方法用于线程需要暂停一段时间，以等待其他线程执行完成，或者让优先级较低的线程有机会执行。

**tip**: yield方法也用于让各个线程执行能够更加平均化
综上所述，sleep方法和yield方法都是让当前线程让出CPU时间片，但sleep方法会暂停执行一段时间，而yield方法则直接进入就绪状态。join方法则是让当前线程等待其他线程执行完毕后再执行。

#### 设置守护线程

Java中的守护线程（Daemon Thread）是一种特殊类型的线程，它的作用是为其他线程提供服务。当Java虚拟机中只剩下守护线程时，Java虚拟机会自动退出。

守护线程的特点是与普通线程相比，具有较低的优先级，并且在Java虚拟机中运行时，如果所有非守护线程都结束了，则守护线程也会自动结束。因此，Java中的守护线程通常用于为其他线程提供后台服务的场景。

在Java中，通过设置Thread对象的setDaemon方法来创建守护线程。例如，以下代码创建了一个守护线程：

```java
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        // 守护线程的具体逻辑
    }
});
thread.setDaemon(true);
thread.start();
```

需要注意的是，一旦一个线程被设置为守护线程后，就不能再改变其状态。因此，在设置守护线程之前，一定要确保该线程不会对其他线程产生影响。

#### 说说 CountDownLatch 原理

#### 说说 CyclicBarrier 原理

#### 说说 Semaphore 原理

#### 说说 Exchanger 原理

#### 说说 CountDownLatch 与 CyclicBarrier 区别

#### ThreadLocal 原理分析

ThreadLocal 是一个线程级别的数据存储类，它提供了一种线程安全的方式来存储每个线程本地化的变量。这些变量的值只能被同一个线程读取和修改，其他线程无法访问。

ThreadLocal 的原理是，每个 Thread 对象内部都维护了一个 ThreadLocalMap 对象，ThreadLocalMap 是 ThreadLocal 的实现类，它是一个 key-value 对，其中 key 是 ThreadLocal 对象的弱引用，value 是线程本地变量的值。当调用 ThreadLocal 的 set() 方法时，ThreadLocal 会将当前线程作为 key，将要设置的值作为 value，存储到当前线程的 ThreadLocalMap 对象中。当需要获取线程本地变量的值时，ThreadLocal 会先获取当前线程，然后从当前线程的 ThreadLocalMap 对象中获取对应的 value 值。

由于每个线程内部都有一个 ThreadLocalMap 对象来存储线程本地变量的值，因此不同的线程之间访问的是不同的值，从而实现了线程本地变量的隔离。

需要注意的是，由于 ThreadLocalMap 中的 key 是 ThreadLocal 对象的弱引用，因此如果 ThreadLocal 没有被其他对象引用，那么它可能会被垃圾回收器回收，但是 ThreadLocalMap 中的 value 却不会被回收，这可能会导致内存泄露问题，因此在使用 ThreadLocal 时需要特别注意内存泄露问题的处理。如果必须使用 ThreadLocal，那么就要确保在使用完毕后，将其值设为 null，以便释放内存空间。

下面是一个 ThreadLocal 的示例：

```java
public class ThreadLocalDemo {
    private static final ThreadLocal<String> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            threadLocal.set("Thread t1");
            System.out.println(Thread.currentThread().getName() + " : " + threadLocal.get());
        }, "t1");

        Thread t2 = new Thread(() -> {
            threadLocal.set("Thread t2");
            System.out.println(Thread.currentThread().getName() + " : " + threadLocal.get());
        }, "t2");

        t1.start();
        t2.start();
    }
}
```

在这个示例中，我们创建了一个 ThreadLocal 对象，并在两个不同的线程中设置了不同的值。由于 ThreadLocal 是线程级别的，因此每个线程可以独立地访问和修改自己的值，而不会影响其他线程的值。在这个示例中，t1 线程访问的是 "Thread t1"，而 t2 线程访问的是 "Thread t2"。

#### 讲讲线程池的实现原理

Java线程池是通过ThreadPoolExecutor类来实现的。ThreadPoolExecutor类是一个线程池的实现，它提供了一系列的构造方法和参数，可以根据需求来创建不同类型的线程池。

ThreadPoolExecutor类的构造方法可以接收以下参数：

* corePoolSize：核心线程数，即在池中一直保持运行的线程数量。
* maximumPoolSize：最大线程数，即池中允许的最大线程数量。
* keepAliveTime：线程池中线程空闲后的存活时间。
* unit：存活时间的时间单位。
* workQueue：任务队列，用于保存等待执行的任务。
* threadFactory：线程工厂，用于创建新线程。
* handler：饱和策略，用于处理当任务队列已满并且线程池中的线程数达到最大值时采取的策略。

线程池的使用可以通过以下步骤来实现：

1. 创建ThreadPoolExecutor对象，指定核心线程数、最大线程数、任务队列等参数。
2. 创建Runnable或Callable任务对象。
3. 将任务对象添加到线程池中执行。
4. 关闭线程池。

线程池的作用是通过复用线程来提高程序的执行效率和资源的利用率，避免线程频繁创建和销毁的开销，同时还可以控制线程的数量和执行顺序，保证程序的稳定性和可靠性。

下面是一个简单的ThreadPoolExecutor的例子，以创建一个固定大小的线程池为例：

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        // 创建固定大小的线程池
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        
        // 向线程池中添加任务
        for (int i = 0; i < 10; i++) {
            executorService.submit(new Task(i));
        }
        
        // 关闭线程池
        executorService.shutdown();
    }
}

class Task implements Runnable {
    private int id;
    
    public Task(int id) {
        this.id = id;
    }
    
    @Override
    public void run() {
        System.out.println("Task " + id + " is running on thread " + Thread.currentThread().getName());
    }
}
```

上面的例子中，我们使用了ExecutorService接口的实现类Executors来创建了一个固定大小为5的线程池，然后通过for循环向线程池中添加了10个任务（这里使用了实现Runnable接口的Task类），最后调用shutdown()方法来关闭线程池。

在运行时，我们可以看到线程池中只有5个线程在运行，这是因为线程池大小为5，所以只会同时运行5个任务，其余的任务会在等待队列中等待执行。当某个线程执行完任务后，会去等待队列中取出一个任务继续执行。同时，我们也可以看到不同的任务会在不同的线程上执行，这是因为线程池会自动分配线程来执行任务。

当你调用ThreadPoolExecutor的submit()方法添加任务时，任务会被添加到线程池的任务队列中，但并不一定会立即执行。线程池会根据自己的调度策略来决定何时开始执行任务。如果线程池中有空闲线程，任务可能会立即执行。如果没有空闲线程，则任务会等待直到有空闲线程可用。

线程池的调度策略包括以下几种：

* 直接提交：每个任务都会立即执行，不会将任务添加到队列中。
* FIFO：按照任务提交的顺序依次执行。
* LIFO：按照任务提交的顺序的相反顺序执行。
* 优先级：根据任务的优先级来执行任务。

你可以通过ThreadPoolExecutor的构造函数或者方法来设置线程池的调度策略。

#### 线程池的几种方式

#### 线程的生命周期

### 锁机制

#### 说说线程安全问题

#### volatile 实现原理

`volatile` 是 Java 中的关键字，用于修饰变量。使用 `volatile` 关键字修饰的变量，可以保证多个线程之间对该变量的读写操作都是可见的，即一个线程修改了该变量的值，其他线程可以立即看到最新的值。**`volatile` 关键字可以保证变量在多线程环境下的可见性，但是不能保证原子性**，也就是说，使用 `volatile` 关键字修饰的变量，虽然可以保证多个线程之间对该变量的读写操作都是可见的，但是不能保证多个线程同时对该变量进行读写操作时的正确性。

#### synchronized 实现原理

`synchronized` 实现的原理是通过 Java 虚拟机中的监视器机制来实现的。**每个对象都有一个与之关联的监视器锁，当一个线程访问一个被 `synchronized` 关键字修饰的方法或代码块时，它必须先获得该对象的监视器锁**，如果该锁已经被其他线程占用，那么当前线程就会进入阻塞状态，直到该锁被释放为止。

在 Java 中，`synchronized` 关键字可以用于方法和代码块的修饰。当一个方法被 `synchronized` 关键字修饰时，该方法的所有代码都会被锁定，即使该方法中有多个代码块也是如此。当一个代码块被 `synchronized` 关键字修饰时，只有该代码块中的代码会被锁定，其他代码不受影响。

#### synchronized 与 lock 的区别

`Lock` 和 `synchronized` 都是用于实现多线程同步的机制。**`Lock` 接口提供了比 `synchronized` 关键字更多的功能和更细粒度的控制，但是使用起来比 `synchronized` 关键字更麻烦，需要手动管理锁的获取和释放，而且容易出现死锁等问题。** 因此，对于普通的多线程同步问题，建议使用 `synchronized` 关键字来实现同步，对于需要更高级的同步功能，可以考虑使用 `Lock` 接口。

它们的主要区别如下：

* 锁的获取和释放方式不同：使用 `synchronized` 关键字来实现同步时，锁的获取和释放是由 Java 虚拟机自动进行的，而使用 `Lock` 接口来实现同步时，则需要手动调用 `lock()` 方法来获取锁，调用 `unlock()` 方法来释放锁。

* `Lock` 接口提供了更多的功能：`Lock` 接口提供了一些 `synchronized` 关键字不具备的功能，如可重入锁、公平锁、读写锁等。

* 性能方面的差异：在低竞争情况下，`synchronized` 关键字的性能要比 `Lock` 接口好，在高竞争情况下，`Lock` 接口的性能要比 `synchronized` 关键字好。

* 使用方式的差异：`synchronized` 关键字的使用方式比较简单，只需要在方法或代码块前加上 `synchronized` 关键字即可，而使用 `Lock` 接口需要手动创建一个 `Lock` 对象，并在需要同步的代码块前后调用 `lock()` 和 `unlock()` 方法。

#### java中常见的锁实现

常见的锁的类型有以下几种：

* `synchronized` 关键字：Java 内置的关键字，可以用来实现对共享资源的互斥访问。它可以作用于方法或代码块，保证同一时刻只有一个线程执行被锁定的代码。

* `ReentrantLock` 类：Java 提供的一个可重入锁，可以替代 `synchronized` 关键字，在功能上更加灵活，提供更细粒度的锁控制，提供了公平锁和非公平锁两种模式。

* `ReadWriteLock` 接口：Java 提供的读写锁接口，它可以用来实现对共享资源的读写操作的并发控制，可以实现读写分离，提高多线程读取效率。ReadWriteLock允许多个线程同时读取共享资源，但只允许一个线程写入共享资源。

* `StampedLock` 类：Java 8 新增的一种锁机制，可以实现乐观读锁、悲观读锁和写锁等，提高了读取效率。

* `Semaphore` 类：Java 提供的一种计数信号量机制，可以控制同时访问某个资源的线程数。

* `CountDownLatch` 类：Java 提供的一种倒计时计数器，可以让某个线程等待其他线程执行完毕后再执行。

* `CyclicBarrier` 类：Java 提供的一种同步辅助类，可以让一组线程相互等待，直到到达某个公共屏障点后再继续执行。

* `Exchanger` 类：Java 提供的一种线程间数据交换工具类，可以让两个线程交换彼此的数据。

* `Lock`的`Condition`接口：`Condition`接口可以让线程在特定的条件下等待或唤醒。

这些锁实现各有优缺点，需要根据具体的使用场景选择合适的锁机制。在使用锁的过程中，需要注意锁的粒度、并发性能、死锁等问题。同时，使用锁的过程中还需要遵循一些最佳实践，例如尽量减小锁的持有时间，避免重复加锁等。

#### CAS 乐观锁

CAS（Compare-and-Swap）是一种乐观锁，**它是一种无锁的同步机制**，常用于实现并发算法。CAS 操作包含三个操作数：内存位置 V，旧的预期值 A 和新值 B。当执行 CAS 操作时，**只有当内存位置 V 的值等于预期值 A 时，才会将内存位置 V 的值更新为新值 B，否则不进行任何操作。** 这个操作是原子的，因此可以保证多线程环境下的数据一致性。

CAS 操作的一般流程如下：

1. 获取内存位置 V 的值；
2. 判断内存位置 V 的值是否等于预期值 A；
3. 如果等于预期值 A，则将内存位置 V 的值更新为新值 B；
4. 如果不等于预期值 A，则返回到第 1 步，重新执行操作。

CAS 操作的优点是避免了线程阻塞和上下文切换的开销，因为它是无锁的同步机制。但是，由于 CAS 操作需要不断地进行重试，所以如果同时有多个线程在进行 CAS 操作，就会出现多个线程同时修改同一个内存位置的情况，这称为 ABA 问题。为了解决 ABA 问题，可以使用版本号或时间戳等机制，每次更新内存位置时都将版本号或时间戳加 1，这样就可以避免多个线程同时修改同一个内存位置的问题。

#### ABA 问题

ABA 问题指的是在并发编程中，当一个值从 A 变成 B，又从 B 变成 A，最后再变成了 B，那么如果只是简单地比较值，就会出现错误。因为这个时候，比较值是一样的，但实际上这个值已经被修改了两次，可能会导致程序出现意料之外的结果。

举个例子，假设有两个线程 A 和 B，初始时一个共享变量的值为 1。线程 A 将这个变量的值修改为 2，然后又将其修改为 1；在此期间，线程 B 将这个变量的值修改为 3，然后又将其修改为 1。此时，如果只是比较值，就会认为线程 B 并没有修改共享变量的值，但实际上它已经修改了共享变量的值，并且修改了两次。

为了解决 ABA 问题，可以使用一些技术手段，例如增加版本号、时间戳等机制，在每次修改共享变量时都将版本号或时间戳加 1，这样就可以避免多个线程同时修改同一个内存位置的问题。另外，Java 中的 `AtomicStampedReference` 类和 `AtomicMarkableReference` 类可以用来解决 ABA 问题。

#### 乐观锁的业务场景及实现方式

乐观锁是一种基于冲突检测的并发控制机制，它在处理多个并发事务时，**假设事务之间不会产生冲突，因此不会加锁，而是在提交事务前检查数据是否被其他事务修改过。如果检测到冲突，则放弃当前操作，否则提交事务。**

乐观锁适用于并发更新冲突不频繁的业务场景，例如：

1. **读多写少的场景**，例如新闻网站的文章浏览和编辑，大多数用户只是浏览文章，只有少数用户同时编辑同一篇文章，此时采用乐观锁就能提高并发性能。

2. 数据库中的数据版本控制，例如通过在表中增加一个版本号字段来实现乐观锁，每次更新记录时将版本号加 1，当检测到版本号不一致时就放弃当前操作。

3. 在分布式系统中，如果两个节点同时更新同一个数据，可以使用乐观锁来避免冲突，例如通过版本号或时间戳来检测数据是否被其他节点修改过。

需要注意的是，乐观锁虽然能提高并发性能，但是在**并发更新冲突频繁的场景下，乐观锁的重试次数会增加，从而导致性能下降。** 因此，在选择乐观锁时，需要根据业务场景和实际情况来进行评估和选择。

#### 悲观锁

悲观锁是一种保守的锁策略，它假设在整个并发环境中，多个线程会频繁地互相干扰，因此每次访问共享资源时都要先获取锁，以保证线程安全。**悲观锁的典型实现是使用 synchronized 关键字，它可以保证同一时刻只有一个线程能够获得锁，其他线程必须等待锁的释放才能继续执行。**

悲观锁的优点是实现简单，容易理解和使用，可以有效地解决并发访问共享资源的问题。但是悲观锁的缺点也非常明显，它需要频繁地加锁和释放锁，这样会带来较大的性能开销，尤其是在高并发场景下。此外，悲观锁容易引起死锁问题，因为如果一个线程在等待锁的时候被阻塞了，那么其他线程也可能被阻塞，导致整个程序停滞不前。

#### 其他锁思想

除了悲观锁和乐观锁之外，还有一些其他的锁思想，例如：

1. 自旋锁：**自旋锁是一种轻量级的锁，在等待锁的过程中，不断地检查锁是否被释放。如果锁被其他线程占用，则当前线程会一直循环等待，直到获取到锁为止。** 自旋锁适用于锁的持有时间比较短的场景，可以避免线程进入内核态的开销，从而提高并发性能。

2. 可重入锁：可重入锁是一种可重复获取的锁，同一个线程在持有锁的情况下，可以再次获取锁，而不会导致死锁。可重入锁适用于需要递归调用同步方法的场景，可以避免死锁和线程阻塞的问题。

3. 公平锁和非公平锁：公平锁和非公平锁是针对锁的获取顺序的不同策略。公平锁会按照线程的请求顺序来获取锁，线程会进入一个队列中等待获取锁；而非公平锁则会优先考虑已经请求过锁的线程，如果当前锁被释放了，则优先给已经请求过锁的线程分配锁。公平锁能够保证线程获取锁的顺序，但是会导致线程上下文切换的开销增加，而非公平锁则能够提高并发性能，但是可能会导致某些线程长时间等待锁。

4. 分段锁：分段锁是一种并发控制机制，它将一个锁分成多个小锁，每个小锁控制一部分数据，不同的线程可以同时访问不同的小锁，从而提高并发性能。分段锁适用于数据结构中有多个独立的部分，例如 ConcurrentHashMap 就使用了分段锁来实现高效的并发访问。

不同的锁思想适用于不同的业务场景，需要根据实际情况选择合适的锁。

#### java实现了哪些锁思想

Java 实现了多种锁思想，包括：

1. **悲观锁**：使用 synchronized 关键字实现的锁，它假设在整个并发环境中，多个线程会频繁地互相干扰，因此每次访问共享资源时都要先获取锁，以保证线程安全。

2. 乐观锁：使用 CAS（Compare and Swap）机制实现的锁，它假设在整个并发环境中，多个线程不会频繁地互相干扰，因此每次访问共享资源时不需要获取锁，而是通过 CAS 操作来判断是否能够进行修改，如果能够进行修改，则直接更新数据，否则重试或者放弃。
    Java 中的 CAS（Compare and Swap）操作主要使用了 sun.misc.Unsafe 类的 compareAndSwapXXX 方法实现，目前已经被 java.util.concurrent.atomic 包中的类所封装，提供了一系列原子操作的支持，比如 AtomicBoolean、AtomicInteger、AtomicLong 等。

    CAS 操作的实现原理是基于硬件的原子性操作实现的，它可以保证在多线程环境下，对于共享资源的修改操作是线程安全的。CAS 操作的基本思想是先读取共享资源的值，然后判断该值是否和期望值相等，如果相等，则进行修改操作，否则返回失败，重新尝试。

    CAS 操作的优点是可以避免加锁操作的开销，并且可以保证同时只有一个线程能够修改共享资源，从而保证线程安全。但是 CAS 操作也有一些缺点，比如在高并发场景下，CAS 的失败次数会比较多，从而导致性能下降，同时也存在 ABA 问题，需要额外的解决方案来避免这种问题的发生。

    当多个线程同时对同一数据进行修改时，为了避免数据的不一致性，我们可以使用乐观锁来解决这个问题。乐观锁的基本思想是，每次修改数据时，都要先读取数据并记录版本号，然后进行修改。当写入数据时，检查版本号是否被其他线程修改，如果版本号不一致，则说明数据已经被其他线程修改，此时需要重试。

    下面是一个使用Java实现乐观锁的示例：

    ```java
    public class OptimisticLockExample {
        private int value;
        private int version;

        public synchronized void update(int newValue) {
            if (version == getVersion()) {
                value = newValue;
                version++;
            } else {
                throw new RuntimeException("Data has been modified by other thread.");
            }
        }

        public synchronized int getValue() {
            return value;
        }

        public synchronized int getVersion() {
            return version;
        }
    }
    ```

    在上面的示例中，我们定义了一个包含值和版本号的类，其中`update`方法用于更新值，`getValue`方法用于获取值，`getVersion`方法用于获取版本号。在`update`方法中，我们首先获取当前版本号，然后判断当前版本号是否与实际版本号相同，如果相同，则更新值并增加版本号，否则抛出异常。

    需要注意的是，由于乐观锁是一种无阻塞的锁，因此在并发量较大的情况下，可能会出现大量重试的情况，从而导致性能下降。因此，在实际使用中，需要根据实际情况来选择合适的锁机制。

3. 自旋锁：在获取锁的时候，如果发现资源已经被其他线程占用，那么不是进入阻塞状态，而是采用循环等待的方式进行等待，不断地尝试获取锁，直到获取成功或者超时。

    ```java
    import java.util.concurrent.atomic.AtomicReference;

    public class SpinLock {
        private AtomicReference<Thread> owner = new AtomicReference<>();
        
        public void lock() {
            Thread currentThread = Thread.currentThread();
            while (!owner.compareAndSet(null, currentThread)) {
                // 自旋等待锁释放
            }
        }
        
        public void unlock() {
            Thread currentThread = Thread.currentThread();
            owner.compareAndSet(currentThread, null);
        }
    }
    ```

    这个自旋锁的实现使用了`AtomicReference`类来维护锁的状态。当一个线程请求锁时，它会不断地自旋等待锁释放，直到它成功地将`owner`的值从`null`修改为当前线程。当一个线程释放锁时，它会把`owner`的值设置为`null`。

    需要注意的是，自旋锁会一直占用CPU资源，因此在实际使用中需要谨慎考虑它的使用场景，以避免出现性能问题。

4. 读写锁：允许多个线程同时读取共享资源，但是在写入共享资源时必须互斥，只允许一个线程进行写入操作，以保证数据的一致性和线程安全。

5. 分段锁：将共享资源分成多个段，每个段都有自己的锁，可以允许多个线程同时访问不同的段，从而提高并发性能。

6. 偏向锁：假设在大多数情况下，共享资源只会被一个线程访问，因此在第一次获取锁的时候，会将锁标记为偏向锁，并将当前线程的 ID 记录在锁的头部，以后如果再有其他线程来访问该共享资源，只需要判断锁的状态即可，不需要再进行加锁操作，从而提高并发性能。

## 核心篇

### 数据存储

#### MySQL 索引使用的注意事项

数据库索引是一种数据结构，用于提高数据库查询的效率。**在MySQL中，索引分为聚集索引和非聚集索引两种类型。** 聚集索引是按照主键进行排序的索引，而非聚集索引则是按照二级索引的键值进行排序的索引。

创建索引的语法如下：

```sql
CREATE [UNIQUE] INDEX index_name ON table_name (column1, column2, ...);
```

其中，`index_name`为索引名称，`table_name`为表名，`column1`、`column2`等为需要索引的列名。

在创建索引时，需要注意以下几点：

1. 索引不是越多越好，过多的索引会增加维护成本和空间占用。
2. 需要根据实际查询情况来选择需要建立的索引。
3. 需要注意索引的选择性，即索引列的不同取值占比。选择性越高的索引效果越好。
4. 需要避免在查询中对索引列进行函数、计算、类型转换等操作，这会使索引失效。
5. 需要注意索引的大小限制，MySQL中InnoDB引擎的索引大小限制为767字节。

另外，MySQL中还提供了一些用于优化查询效率的技术，如覆盖索引、联合索引、前缀索引等，需要根据具体情况进行选择和使用。

#### 说说反模式设计

#### 说说 SQL 优化之道

#### MySQL 遇到的死锁问题

#### MySQL 存储引擎

MySQL支持多种存储引擎，每种存储引擎都有其特点和适用场景。以下是MySQL常用的几种存储引擎的区别：

1. **InnoDB**：默认的存储引擎，支持ACID事务，提供行级锁定和外键约束，适合于大多数应用程序。

2. **MyISAM**：不支持事务和外键约束，但速度快，适合于读密集型应用。

3. Memory：将数据存储在内存中，速度非常快，但数据不能持久化，适合于缓存表和临时表。

4. CSV：将数据以CSV格式存储在文件中，适合于数据交换和导入导出操作。

5. Archive：压缩数据以减小存储空间，但不支持索引，只适用于存储归档数据。

6. Blackhole：不存储任何数据，只用于复制和分析操作。

7. Federated：允许在多个MySQL服务器之间共享表格数据，但不支持事务和外键约束。

需要注意的是，不同的存储引擎对于并发性、数据完整性、事务支持、索引类型和空间占用等方面的处理方式可能不同，需要根据具体应用场景进行选择。

##### InnoDB

InnoDB是MySQL默认的存储引擎，也是最常用的存储引擎之一。相较于其他存储引擎，InnoDB具有以下特点：

1. 支持ACID事务：InnoDB支持事务的提交和回滚，可以保证数据的完整性和一致性。

2. 支持行级锁：InnoDB采用行级锁来实现并发控制，能够大幅提高并发性能。

3. 支持外键约束：InnoDB支持外键约束，可以保证表与表之间的数据一致性。

4. 支持MVCC：InnoDB采用多版本并发控制（MVCC）机制，可以在读操作和写操作之间实现隔离性。

5. 支持可重复读：InnoDB默认采用可重复读隔离级别，可以保证相同的查询结果在事务执行过程中不会改变。

6. 支持自适应哈希索引：InnoDB可以根据查询模式自动调整哈希索引结构，提高查询性能。

7. 支持热备份：InnoDB支持在线热备份，可以在不停止数据库服务的情况下进行备份。

需要注意的是，InnoDB对于内存和磁盘的使用方式与其他存储引擎不同，需要根据具体应用场景进行配置和优化。同时，InnoDB也存在一些性能问题，如写入性能、锁竞争等，需要进行特殊处理和优化。

##### MyISAM

MyISAM是MySQL数据库的一种存储引擎，它是MySQL早期版本默认的存储引擎。MyISAM的特点是速度快、易于管理、表级锁定等。MyISAM的表在磁盘上以文件形式存储，每个表对应两个文件，一个是MYD文件，用于存储表数据，另一个是MYI文件，用于存储表索引。MyISAM对于读密集型的应用程序具有很好的性能，但在写操作比较频繁的情况下，由于表级锁定会导致并发性能不佳，因此不适合高并发、高负载的应用程序。此外，MyISAM还存在一些其他的限制，例如不支持事务和外键等。因此，**在实际应用中，MyISAM往往被InnoDB等更先进的存储引擎所取代。**

#### 存储引擎的 InnoDB 与 MyISAM

InnoDB 和 MyISAM 都是 MySQL 数据库的存储引擎，它们有以下几个主要的区别：

1. 事务支持：InnoDB 支持事务和外键约束，而 MyISAM 不支持事务和外键约束。

2. 锁粒度：InnoDB 采用行级锁，而 MyISAM 采用表级锁。行级锁可以更好的支持并发操作，减少锁冲突，提高并发性能。

3. 性能：MyISAM 适用于读密集型应用，InnoDB 适用于读写并发的应用。在高并发的情况下，InnoDB 的性能优于 MyISAM，因为 InnoDB 支持行级锁，可以更好地支持并发操作。

4. 索引：InnoDB 的索引是基于聚簇索引（Clustered Index）实现的，而 MyISAM 的索引是基于非聚簇索引（Non-Clustered Index）实现的。聚簇索引可以提高查询效率，因为它将数据和索引存储在一起，减少了 I/O 操作。

5. 空间占用：MyISAM 的表结构比 InnoDB 更简单，因此它的磁盘空间占用更小。而 InnoDB 的表结构相对更复杂，因此它的磁盘空间占用更大。

**总的来说，如果你的应用需要支持事务、外键约束和高并发读写操作，那么选择 InnoDB 更为合适；如果你的应用是读密集型的，可以考虑使用 MyISAM。**

#### 数据库索引的原理

#### 为什么要用 B-tree

#### 聚集索引与非聚集索引的区别

聚集索引和非聚集索引都是MySQL数据库中的索引类型，它们的主要区别在于索引的组织方式和存储结构。

聚集索引是按照索引字段的顺序来组织数据的，也就是说，聚集索引决定了数据在磁盘上的物理存储顺序。在InnoDB存储引擎中，**聚集索引就是主键索引**，也就是说，如果表定义了主键，则主键索引就是聚集索引。**聚集索引的优点是可以提高查询效率，因为所有的数据都按照索引顺序存储，因此可以更快地定位到需要查询的数据。但缺点是更新操作比较慢**，因为每次更新都需要将数据移动到新的位置。

非聚集索引则是将索引字段和数据地址分开存储的，也就是说，非聚集索引不直接决定数据在磁盘上的存储顺序，而是通过指向数据地址的指针来定位数据。在InnoDB存储引擎中，除了主键索引之外的所有索引都是非聚集索引。**非聚集索引的优点是更新操作比较快，因为只需要修改索引，而不需要移动数据。但缺点是查询效率相对较低**，因为需要先从索引中定位到数据地址，再通过数据地址来获取数据。

综上所述，聚集索引和非聚集索引各有优缺点，在实际应用中需要根据具体情况选择适合的索引类型。

#### limit 20000 加载很慢怎么解决

#### 选择合适的分布式主键方案

#### 选择合适的数据存储方案

#### ObjectId 规则

#### elasticsearch 和mongodb

Elasticsearch（以下简称ES）和MongoDB（以下简称Mangodb）都是非关系型数据库，但是它们有着不同的设计理念和应用场景。

ES是一种全文搜索引擎，它基于Lucene搜索引擎构建，具有快速高效的全文搜索和分析能力。ES支持分布式部署和水平扩展，可以处理大规模的数据，并且支持实时数据搜索和分析。ES的应用场景主要是搜索引擎、日志分析、监控和安全等领域。

Mangodb是一种面向文档的数据库，它支持动态模式和丰富的查询语言，可以存储和查询各种类型的数据。Mangodb采用的是分布式的集群架构，可以处理大规模的数据，并且支持高可用性和数据复制等功能。Mangodb的应用场景主要是Web应用、社交网络、物联网和大数据应用等领域。

总的来说，ES适合处理需要快速高效的全文搜索和分析的数据，而Mangodb适合处理各种类型的数据，并且支持动态模式和丰富的查询语言。选择哪种数据库取决于具体的应用场景和需求。

#### 聊聊 MongoDB 使用场景

MongoDB是一种非关系型数据库，它的设计目标是面向文档的存储。MongoDB的使用场景包括但不限于以下几个方面：

1. 大数据量的存储和处理：MongoDB可以存储海量的数据，而且它的性能非常高效，能够快速地进行数据的读写和处理。

2. 分布式存储和处理：MongoDB具有分布式的特点，可以将数据分散存储在不同的服务器上，从而实现分布式存储和处理，提高系统的容错性和可伸缩性。

3. Web应用程序的数据存储：MongoDB可以作为Web应用程序的数据存储，使用MongoDB可以方便地存储和管理Web应用程序所需要的数据，如用户信息、日志数据等。

4. 实时数据处理：MongoDB支持实时的数据处理，能够快速地处理实时数据，如日志数据、传感器数据等。

总之，MongoDB适用于需要高效处理大数据量、分布式存储和处理、实时数据处理等场景，尤其是面向文档的数据存储和处理，比如Web应用程序、物联网等。

#### 聊聊 ElasticSearch 使用场景

Elasticsearch是一个基于Lucene的分布式搜索和分析引擎，它的使用场景包括但不限于以下几个方面：

1. 日志分析：Elasticsearch可以快速地处理大量的日志数据，并提供实时的搜索和分析功能，方便用户快速定位和解决问题。

2. 企业搜索：Elasticsearch可以作为企业内部数据的搜索引擎，包括文档、邮件、数据库、Web等多种数据源，能够快速地搜索和过滤数据。

3. 数据可视化：Elasticsearch可以与Kibana集成，实现数据的可视化展示和分析，方便用户更直观地了解数据的趋势和变化。

4. 地理信息系统：Elasticsearch支持地理信息数据的存储和搜索，可以快速地查找某个地理位置周围的其他地理位置信息。

5. 实时数据处理：Elasticsearch支持实时的数据处理和搜索，能够快速地处理流式数据，如传感器数据、网络数据、移动应用数据等。

总之，Elasticsearch适用于需要高效搜索和分析大量数据、实时数据处理、地理信息系统等场景，尤其是面向文档和数据可视化的应用，比如企业搜索、日志分析、数据可视化等。

#### 倒排索引

倒排索引（Inverted Index）是一种常用的索引结构，用于支持文本检索。相对于传统的索引结构，如B树、哈希等，倒排索引是一种基于文本内容的索引结构，它将文本中出现的每个单词都作为一个索引项，然后将每个索引项所在的文本位置都记录下来，以便于在检索时快速定位到对应的文本位置。

具体来说，倒排索引的数据结构通常由两个部分组成，一个是词典（Dictionary），用于存储所有出现过的单词以及它们对应的索引项；另一个是倒排表（Posting List），用于存储每个单词对应的所有文本位置信息。

例如，如果有一个文本内容为“the quick brown fox jumps over the lazy dog”，那么倒排索引会将其分解成如下的索引项：

```txt
the: 1
quick: 2
brown: 3
fox: 4
jumps: 5
over: 6
lazy: 7
dog: 8
```

其中，每个索引项后面的数字表示该单词出现在文本中的位置。倒排表则将每个单词对应的位置信息记录下来，如下所示：

```txt
the: 1
quick: 2
brown: 3
fox: 4
jumps: 5
over: 6
lazy: 7
dog: 8
```

倒排索引在文本检索中应用广泛，例如搜索引擎、全文检索等都是基于倒排索引实现的。

### 缓存使用

#### Redis 有哪些类型

#### Redis 内部结构

#### 聊聊 Redis 使用场景

#### Redis 持久化机制

#### Redis 如何实现持久化

#### Redis 集群方案与实现

这里提供一个使用 Redis 集群的 Java 示例代码：

```java
import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;

import java.util.HashSet;
import java.util.Set;

public class RedisClusterExample {

    public static void main(String[] args) {
        // 创建节点集合
        Set<HostAndPort> nodes = new HashSet<>();
        nodes.add(new HostAndPort("127.0.0.1", 7000));
        nodes.add(new HostAndPort("127.0.0.1", 7001));
        nodes.add(new HostAndPort("127.0.0.1", 7002));
        nodes.add(new HostAndPort("127.0.0.1", 7003));
        nodes.add(new HostAndPort("127.0.0.1", 7004));
        nodes.add(new HostAndPort("127.0.0.1", 7005));

        // 创建 JedisCluster 对象
        JedisCluster jedisCluster = new JedisCluster(nodes);

        // 执行操作
        jedisCluster.set("key", "value");
        String result = jedisCluster.get("key");
        System.out.println(result);

        // 关闭连接
        jedisCluster.close();
    }
}
```

上面的代码中，首先创建了一个节点集合 `nodes`，其中包含了 Redis 集群的各个节点的地址和端口号。然后使用这个节点集合创建了一个 JedisCluster 对象 `jedisCluster`，通过这个对象可以执行各种 Redis 操作。最后，使用 `close()` 方法关闭连接。

JedisCluster 是 Redis 官方推荐的 Java 集群客户端，它可以自动将数据分片存储到不同的 Redis 节点中，并提供了一些简单易用的 API，方便我们进行 Redis 集群的操作。在使用 JedisCluster 时，我们只需要指定集群中任意一个节点的 IP 和端口号即可，JedisCluster 会自动发现集群中的其他节点，并将数据按照一定规则分配到不同的节点上。下面是 JedisCluster 的一些操作：

1. 获取 JedisCluster 实例：

    ```java
    Set<HostAndPort> nodes = new HashSet<>();
    nodes.add(new HostAndPort("127.0.0.1", 7001));
    nodes.add(new HostAndPort("127.0.0.1", 7002));
    nodes.add(new HostAndPort("127.0.0.1", 7003));
    nodes.add(new HostAndPort("127.0.0.1", 7004));
    nodes.add(new HostAndPort("127.0.0.1", 7005));
    nodes.add(new HostAndPort("127.0.0.1", 7006));
    JedisCluster jedisCluster = new JedisCluster(nodes);
    ```

2. 对键值对进行操作：

    ```java
    jedisCluster.set("key", "value");
    String value = jedisCluster.get("key");
    ```

3. 执行 Lua 脚本：

    ```java
    String script = "return redis.call('get', KEYS[1])";
    List<String> keys = Arrays.asList("key");
    List<String> args = new ArrayList<>();
    args.add("value");
    Object result = jedisCluster.eval(script, keys, args);
    ```

4. 批量操作：

    ```java
    Map<String, String> map = new HashMap<>();
    map.put("key1", "value1");
    map.put("key2", "value2");
    jedisCluster.mset(map);
    List<String> values = jedisCluster.mget("key1", "key2");
    ```

总之，JedisCluster 提供了与单机版 Redis 客户端类似的 API，并且能够自动处理 Redis 集群中的数据分片和故障转移等问题，从而简化了我们使用 Redis 集群的过程。

#### Redis 为什么是单线程的

#### 缓存奔溃

#### 缓存降级

#### 使用缓存的合理性问题

### 消息队列

#### 消息队列的使用场景

#### 消息的重发补偿解决思路

#### 消息的幂等性解决思路

#### 消息的堆积解决思路

#### 自己如何实现消息队列

#### 如何保证消息的有序性

## 框架篇

### Spring

#### Spring优缺点

Spring 的优点：

* 提供了一个全面的开发框架，包括依赖注入、AOP、事务管理、Web框架等，有其实springboot，包含默认配置业务简单时可以达到开箱即用。
* 面向接口编程，解耦合，易于扩展和维护。
* 提供了大量的第三方库和插件，可以快速构建应用，与其他框架集成非常容易。

Spring 的缺点：

* 学习曲线较陡峭，需要掌握大量的知识点才能熟练使用。配置文件变得越来越复杂，需要花费一定的时间和精力。
* 运行时负载较重，可能会影响应用的性能，对于一些小型项目，可能会显得过于臃肿。
* 需要依赖大量的第三方库和插件，有时会出现版本冲突等问题。

#### spring 有哪些启动类

Spring 有多个启动类，这些启动类用于不同的场景和目的，以下是一些常用的启动类：

* `SpringApplication`：用于创建 Spring 应用程序的主类，它可以自动配置 Spring 环境，并支持多种应用程序类型，如 Web 应用、命令行应用等。

* `SpringApplicationBuilder`：用于构建 Spring 应用程序的主类，它可以创建一个嵌套的 Spring 应用程序上下文，支持自定义配置和属性。

* `ServletInitializer`：用于配置 Servlet 应用程序的启动类，它可以将 Spring 应用程序部署到 Web 容器中，例如 Tomcat、Jetty 等。

* `SpringBootServletInitializer`：用于配置 Spring Boot 应用程序的启动类，它

### Spring IoC

#### 什么是 Spring IOC 容器

Spring IOC 容器是 Spring 框架中的一个核心模块，也是 Spring 框架的灵魂所在。它负责管理对象之间的依赖关系，即**通过控制反转 (IOC) 的方式来管理对象的创建、配置和组装，并将这些对象交给应用程序使用。IOC 容器通过读取配置文件或者使用注解来创建对象**，并将这些对象注入到其他对象中，从而实现了对象之间的解耦。

Spring IOC 容器提供了两种类型的 IOC 容器：BeanFactory 和 ApplicationContext。

Spring IOC 容器通过依赖注入的方式来解决对象之间的依赖关系，这种方式使得对象之间的耦合度降低，提高了代码的可维护性和可扩展性。同时，Spring IOC 容器也为企业级应用程序的开发提供了便利，在提高开发效率的同时，也提高了应用程序的可靠性和稳定性。

#### BeanFactory 和 ApplicationContext 有什么区别

BeanFactory和ApplicationContext都是Spring IOC容器的实现，它们之间有一些区别和联系。

##### BeanFactory

首先，**BeanFactory是Spring框架最基本的容器**，它提供了基本的IOC和DI功能，可以加载配置文件并将bean实例化、装配和管理起来。但是，**BeanFactory对bean的实例化是采用延迟初始化的方式，即只有在第一次使用时才会实例化，这样可以提高系统的启动速度和性能**。

##### ApplicationContext

而ApplicationContext是BeanFactory的扩展，它在BeanFactory的基础上添加了更多的功能，如国际化支持、事件传播、资源加载和AOP等。ApplicationContext在启动时就会实例化所有的bean，可以进行预处理和验证，提高了系统的可靠性和稳定性。同时，ApplicationContext还提供了更多的扩展点，可以进行更灵活的配置和扩展。

另外，**ApplicationContext实现了BeanFactory接口，因此它也拥有BeanFactory的所有功能。但是，ApplicationContext相比于BeanFactory，内存占用更大，启动时间更长，因为它在启动时需要实例化所有的bean。**

综上所述，BeanFactory和ApplicationContext都是Spring IOC容器的实现，BeanFactory是最基本的容器，ApplicationContext是在BeanFactory的基础上进行了更多的扩展和增强。

#### Bean 和对象

bean就是对象，被spring ioc 管理的对象就是bean

#### 配置bean的方式

xml 和 注解

* xml配置

    ```xml
    <bean class="com.company.project.CustomClass" id="">
    ```

* 注解配置

    注解配置方法主要是如下配置方法

  * @Component, @Controller, @Service, @Repository: 直接描述在class定义上就行了, 运行过程中会通过反射去创建
  * @Bean: 返回一个对象，可以自己去new
  * @Import: TODO: 没了解过

#### Spring Bean 作用域

在 Spring 中，Bean 的作用域可以通过在 Bean 定义中配置 `scope` 属性来指定。具体可以配置的作用域包括：

* singleton：默认的作用域，每个 Spring 容器中只存在一个 Bean 实例。
* prototype：每次请求或注入时创建一个新的 Bean 实例。
* request：每个 HTTP 请求都会创建一个新的 Bean 实例，仅在 Web 应用中可用。
* session：每个 HTTP 会话都会创建一个新的 Bean 实例，仅在 Web 应用中可用。
* globalSession：每个全局 HTTP 会话都会创建一个新的 Bean 实例，仅在基于 Portlet 的 Web 应用中可用。
* application：每个 ServletContext 上下文中只存在一个 Bean 实例，仅在 Web 应用中可用。

需要注意的是，不同作用域的 Bean 在生命周期和使用方式上有很大的不同，因此需要根据实际需求进行选择和配置。

两种配置方法分别是 xml 和注解配置:

* xml 配置 bean 作用域

    具体的配置方式如下所示：

    ```xml
    <!-- 配置 singleton 作用域的 Bean -->
    <bean id="singletonBean" class="com.example.SingletonBean" scope="singleton"/>
    <!-- 配置 prototype 作用域的 Bean -->
    <bean id="prototypeBean" class="com.example.PrototypeBean" scope="prototype"/>
    <!-- 配置 request 作用域的 Bean -->
    <bean id="requestBean" class="com.example.RequestBean" scope="request"/>
    <!-- 配置 session 作用域的 Bean -->
    <bean id="sessionBean" class="com.example.SessionBean" scope="session"/>
    <!-- 配置 globalSession 作用域的 Bean -->
    <bean id="globalSessionBean" class="com.example.GlobalSessionBean" scope="globalSession"/>
    <!-- 配置 application 作用域的 Bean -->
    <bean id="applicationBean" class="com.example.ApplicationBean" scope="application"/>
    ```

* 在Spring中，我们可以使用`@Scope`注解来配置Bean的作用域。`@Scope`注解可以用在类级别上，也可以用在方法级别上。

    ```java
    @Service
    @Scope("prototype")
    public class MyService {
        // ...
    }
    ```

    在方法级别上，`@Scope`注解可以用来覆盖类级别上的作用域设置，实现更细粒度的控制。举个例子：

    ```java
    @Service
    @Scope("singleton")
    public class MyService {
        // ...

        @Scope("prototype")
        public void doSomething() {
            // ...
        }
    }
    ```

    在上面的例子中，`MyService`类的作用域是`singleton`，但是`doSomething`方法的作用域是`prototype`，也就是每次调用该方法都会创建一个新的实例。

#### Spring 单例 Bean 的优势

减少内存使用，减少反射开支，垃圾回收也少

#### Spring Bean 线程安全么

*省流: 烂不烂问厨房，安全不安全问作用域*
在Spring中，Bean的线程安全性取决于Bean的作用域。**如果一个Bean的作用域是singleton（默认作用域），那么该Bean就是线程不安全的，** 因为它是在整个应用程序上下文中共享的。多个线程可以同时访问和修改它，这可能会导致数据不一致或其他问题。

**tip**: 把成员变量放在单例的方法中会线程安全，单例bean的方法是prototype的所以可以达到线程安全

如果一个Bean的作用域是prototype，则该Bean是线程安全的，因为每个线程都有自己的Bean实例。对于每个请求，Spring都会创建一个新的Bean实例。

除了上述作用域之外，Spring还支持其他一些作用域，例如request、session和globalSession。这些作用域是为Web应用程序设计的，它们可以保证Bean在Web请求的生命周期内是线程安全的。

因此，在使用Spring时，需要注意Bean的作用域，避免因为作用域设置不当而导致线程安全问题。

#### Spring Bean 的生命周期

Spring bean的生命周期可以分为以下几个阶段：

1. **实例化**：在Spring容器中，当一个bean的定义被加载后，容器会实例化该bean。在实例化过程中，Spring会根据bean的定义信息创建bean的实例对象。
2. **属性赋值**：在Spring实例化bean后，会将bean的属性值注入到bean实例中。这些属性值可以来自于XML配置文件、Java注解或者Java代码。
3. **初始化**：在属性赋值后，Spring容器会调用bean的init方法进行初始化。这个阶段可以进行一些预处理或者资源的初始化操作。
4. **使用**：在初始化后，bean可以被容器使用。
5. **销毁**：当一个bean不再需要时，Spring容器会调用bean的destroy方法进行销毁。这个阶段可以进行一些资源的释放或者清理操作。

需要注意的是，在实例化和属性赋值阶段，Spring会使用反射机制创建bean实例和注入属性值。在初始化和销毁阶段，Spring容器会调用bean的初始化方法和销毁方法，这些方法可以在bean的定义中通过init-method和destroy-method指定。同时，还可以通过实现InitializingBean和DisposableBean接口来定义bean的初始化和销毁方法。

#### Spring Bean的回调方法

Spring Bean的回调方法指的是在Bean实例化和装配过程中，Spring容器会自动调用一些方法，以便我们在这些方法中执行一些初始化或清理操作。具体来说，Spring Bean的回调方法包括以下几种：
*常用的就是构造函数(contractor),初始化(init),销毁(destroy), 常用的方法是在类定义的方法上使用 @PostContruct @PreDestroy来标注则这些方法就会在初始化前和销毁前调用了*

* 构造函数：Spring容器会在实例化Bean时调用构造函数进行对象的创建。
* 实现InitializingBean接口的afterPropertiesSet()方法：该方法在Bean属性设置完成后，且Bean已经被实例化后立即调用。
* 使用@Bean注解的initMethod属性：通过在@Bean注解中设置initMethod属性，指定Bean初始化时需要调用的方法。
* 实现DisposableBean接口的destroy()方法：该方法在Bean销毁前调用。
* 使用@Bean注解的destroyMethod属性：通过在@Bean注解中设置destroyMethod属性，指定Bean销毁时需要调用的方法。

另外还有使用xml中init-method方式可以定义

在这些回调方法中，我们可以执行一些初始化或清理操作，比如初始化数据库连接池、清理资源等。注意，在使用@Bean注解指定initMethod和destroyMethod时，需要保证这些方法是无参且公共的方法。

#### spring bean 如何处理并发问题

Spring框架本身不提供处理并发问题的解决方案，但是它提供了一些机制来帮助应用程序开发人员处理并发问题。

* 改变作用域
    首先，可以通过设置Bean的作用域来控制并发访问。如前面所述，对于单例Bean，需要注意多线程并发访问的问题。如果需要多线程访问同一个Bean实例，可以使用线程安全的代码保证数据的一致性。如果需要避免并发访问问题，可以将Bean的作用域设置为prototype，这样每个线程都会获得一个独立的Bean实例。

* `@Synchronized` 和 同步锁
    其次，Spring提供了一个注解`@Synchronized`，它可以用于方法级别，将方法标记为同步方法，以确保多个线程不会同时访问该方法。这个注解的实现方式和Java中的`synchronized` (同步锁) 关键字是类似的，它会在方法上加锁，确保同一时间只有一个线程可以执行该方法。
    [章节链接：synchronized-实现原理](#synchronized-实现原理)

* ThreadLocal *一般情况不推荐*
    是一个Java中的线程局部变量，它提供了一种线程安全的方式来存储每个线程的独立副本。在Spring中，我们可以使用ThreadLocal来存储每个线程中的Bean实例，从而保证线程安全。具体地说，我们可以在Bean定义中使用`@Scope("thread")`注解来声明一个Bean的作用域为线程级别，然后通过ThreadLocal来存储每个线程中的Bean实例。这样，每个线程都有自己的Bean实例，互不干扰，从而实现线程安全。
    [章节链接：threadlocal-原理分析](#threadlocal-原理分析)

* 事务管理机制 *有点杀鸡用牛刀的感觉*
    使用Spring提供的事务管理机制可以帮助我们处理并发问题。事务管理可以确保多个线程之间的数据一致性，并提供了一些机制来确保事务的隔离性和原子性。可以使用Spring提供的声明式事务管理或编程式事务管理来实现事务管理。

总之，Spring框架提供了一些机制来帮助我们处理并发问题，但具体的解决方案还需要根据具体的应用场景和需求来进行选择。

#### spring bean 实例化的方式

* 构造函数注入（**构造器方式**）：通过构造函数实例化Bean，Spring通过**反射**机制，根据xml或者@Component(@Controller,@Component,@Service,@Repository)这类注解的定义找到一个合适的构造函数，然后通过该构造函数实例化Bean。
* 实例工厂方法注入(@Bean)：通过实例工厂方法实例化Bean，需要先实例化工厂类，然后通过工厂类的实例方法来实例化Bean。 *个人觉得小面试到这边就行了*
* 静态工厂方法注入(factory-method)：通过静态工厂方法实例化Bean，Spring通过反射机制，找到一个合适的静态工厂方法，然后通过该静态工厂方法实例化Bean。
* FactoryBean: 通过实现FactoryBean 接口，重写getObject()方法来实例化对象。

#### Bean的装配

Spring Bean的装配是指将Bean实例化并将其成员变量赋值的过程。Spring提供了多种方式来实现Bean的装配。

* XML配置文件装配
    通过在XML配置文件中定义Bean和Bean之间的依赖关系(property节点ref属性)，Spring容器可以根据配置文件中的信息来自动装配Bean。
* 自动装配
    Spring容器可以自动查找Bean定义中的依赖关系(@Autowired)，并自动装配Bean。 *一般只会问到自动装配*
* Spring Boot自动装配
    Spring Boot提供了大量的自动配置类，可以根据classpath、类名、条件等来自动装配Bean。
* 注解装配
    通过在Bean类中使用注解来标识Bean之间的依赖关系，Spring容器可以根据注解信息来自动装配Bean。
* Java配置类装配
    通过在Java配置类中使用@Bean注解来定义Bean和Bean之间的依赖关系，Spring容器可以根据Java配置类中的信息来自动装配Bean。
* XML命名空间装配
    Spring提供了多种XML命名空间，可以通过配置对应的命名空间来实现Bean的装配。

#### Bean自动装配的方式(xml向)

* no: 不使用自动装配，实际上就是手动装配
* byName（常用）：容器会自动将Bean的属性名与容器中的Bean的id进行匹配，如果匹配成功，则自动将该Bean注入到当前Bean中对应的属性中。需要在Bean定义中使用autowire="byName"属性开启该自动装配模式。*检测的是set方法的名称*
* byType（常用）：容器会自动将当前Bean属性的类型与容器中的所有Bean进行匹配，如果匹配成功，则自动将该Bean注入到当前Bean中对应的属性中。需要在Bean定义中使用autowire="byType"属性开启该自动装配模式。*检测的是set方法的类型*
* constructor：与byType自动装配类似，但是是通过构造函数进行自动装配。需要在Bean定义中使用autowire="constructor"属性开启该自动装配模式。*按照构造函数的类型*
* default(autodetect)：自动探索，先检测有无构造方法，没有则使用byType。Spring 3.0之后弃用了

#### Spring Bean 循环依赖

Spring Bean解决循环依赖的方式，主要有两种：构造器注入和属性注入。
Spring容器在处理循环依赖问题时，会优先使用构造器注入，如果无法解决循环依赖问题，才会使用属性注入。在使用属性注入时，需要使用Spring容器的后处理器来完成依赖注入，避免循环依赖问题。

* 构造器注入
构造器注入是指在Bean实例化时，通过构造器将依赖的Bean作为参数传入，从而解决循环依赖问题。这种方式的优点是在Bean实例化时就完成了依赖注入，避免了后续的循环依赖问题。但是，构造器注入需要在Bean定义时就确定依赖关系，因此不适合循环依赖关系较为复杂的情况。

* 属性注入
属性注入是指在Bean实例化后，通过属性的setter方法将依赖的Bean注入。这种方式需要先创建Bean实例，再注入属性，因此可以处理循环依赖关系较为复杂的情况。但是，属性注入存在一个问题，即在注入属性前，必须先完成Bean的实例化，因此需要使用Spring容器的后处理器来完成依赖注入。

#### BeanDefinition是什么

#### IoC 的加载过程

Spring的IoC容器加载过程主要分为三个步骤：

1. 定位 (概念态)：IoC容器会根据配置文件（如XML文件）或注解配置，找到要加载的bean定义。
2. 载入 (定义态)：IoC容器会载入bean定义，并将其注册到容器中。
3. 实例化：当容器需要使用某个bean时，它会根据定义创建实例(纯静态)，并进行依赖注入等初始化操作(成熟态)。

需要注意的是，IoC容器加载过程中还会涉及到一些其他的操作，如根据配置文件中的Bean定义创建Bean实例、Bean的依赖注入、Bean的初始化等。这些操作都是由IoC容器负责完成的，使得开发者可以专注于业务逻辑的实现。

#### Spring IOC 如何实现

Spring IOC（Inversion of Control，控制反转）的实现依赖于Java的反射机制和XML配置文件或注解。在Spring框架中，我们将需要管理的对象称之为Bean。Spring IOC容器负责管理Bean的生命周期，即在需要使用Bean时，通过反射机制创建Bean的实例，并将其注入到需要使用它的地方。

具体而言，Spring IOC容器的实现通过以下步骤实现：

* 读取XML配置文件或注解，解析出需要创建的Bean的类名和属性值。
* 使用反射机制创建Bean的实例，并将其注入到需要使用它的地方。
* 维护Bean的生命周期，包括实例化、属性赋值、初始化、使用和销毁等阶段。
* 提供对Bean的依赖注入（Dependency Injection，DI）功能，即自动将需要的依赖注入到Bean中。
* 提供AOP（Aspect Oriented Programming，面向切面编程）支持，即在Bean的方法执行前或执行后执行特定的操作。

#### IOC 和 DI 的关系

IoC（Inversion of Control，控制反转）和DI（Dependency Injection，依赖注入）是Spring框架中的两个重要概念。

IoC通过反转控制权实现对象的生命周期和依赖关系的管理，DI通过构造函数或属性注入实现对象之间的依赖关系的管理。两者相互配合，可以有效地降低应用程序的耦合度和复杂度，提高应用程序的可维护性和灵活性。

需要注意的是当提到IoC和DI的关系时，可以认为是**通过DI来实现了IoC这一设计理念**

* IoC
IoC指的是通过反转应用程序的控制权，将对象的创建和依赖关系的管理交给Spring IOC容器来完成。在传统的应用程序中，对象的创建和依赖关系是由程序员手动管理的，而在Spring中，我们只需要将需要管理的对象交给Spring IOC容器，让它来管理对象的生命周期和依赖关系，从而实现了应用程序的解耦和灵活性。

* DI
DI指的是将依赖对象通过构造函数或属性注入的方式传递到需要使用它的对象中。通过DI，我们可以将对象之间的依赖关系从应用程序中解耦出来，降低了应用程序的耦合度和复杂度。Spring IOC容器会负责查找需要注入的依赖对象，并将它们注入到需要使用它们的对象中，从而完成依赖注入。

#### 实现DI的方式

Spring中实现依赖注入（DI）的两种方式分别是构造函数注入和属性注入。

1. 构造函数注入：通过Bean的构造函数传入依赖对象。具体而言，我们可以在Bean的构造函数中定义需要注入的依赖对象，当Spring IOC容器创建Bean时，会自动将依赖对象传入构造函数中，完成依赖注入。构造函数注入通常用于强制依赖注入，即必须注入依赖对象才能创建Bean的实例。

2. 属性注入：通过Bean的属性设置依赖对象。具体而言，我们可以在Bean中定义需要注入的依赖对象的属性，并使用@Autowired或@Resource等注解标注，当Spring IOC容器创建Bean时，会自动将依赖对象注入到对应的属性中，完成依赖注入。属性注入通常用于可选依赖注入，即可以不注入依赖对象也能创建Bean的实例。

#### spring ioc 有哪些扩展点

Spring IOC容器提供了多个扩展点，使得开发者可以通过这些扩展点来自定义容器的行为，实现自己的业务逻辑。以下是一些常见的扩展点：

* BeanPostProcessor：容器中所有Bean实例化之后，将会调用BeanPostProcessor接口中的两个方法postProcessBeforeInitialization和postProcessAfterInitialization，开发者可以通过实现这个接口来在Bean初始化前后做一些处理。
* BeanFactoryPostProcessor：容器启动时，会调用实现了BeanFactoryPostProcessor接口的类的postProcessBeanFactory方法，允许开发者对BeanFactory进行自定义修改。
* InstantiationAwareBeanPostProcessor：继承了BeanPostProcessor接口，提供了更加细粒度的控制，例如对Bean的实例化过程进行干预。
* ApplicationListener：监听Spring上下文中的事件，例如ContextRefreshedEvent、ContextClosedEvent等。
* BeanDefinitionRegistryPostProcessor：继承了BeanFactoryPostProcessor接口，可以在BeanFactoryPostProcessor执行之后，再次修改BeanDefinitionRegistry，允许开发者对BeanDefinition进行自定义修改。
* ApplicationContextInitializer：在 ApplicationContext 加载后、refresh() 方法调用前，对 ApplicationContext 进行扩展处理。

这些扩展点提供了非常强大的功能，可以让开发者根据自己的需求来进行自定义扩展，从而更好地适配自己的业务场景。

#### Spring IOC 的优缺点

Spring IOC 的优点：

* 降低了代码的耦合度，提高了代码的可维护性和可扩展性。
* 能够更加方便地进行单元测试，便于进行模块化开发。
* 可以通过配置文件或注解来管理对象之间的依赖关系，避免了硬编码，使代码更加灵活和易于维护。
* 可以实现面向接口编程，降低了代码的依赖性，减少了代码的耦合度。
* 提高了代码的复用性，可以通过配置文件或注解来管理多个对象之间的依赖关系，实现更加灵活的代码复用。

Spring IOC 的缺点：

* 学习成本较高，需要花费一定的时间和精力来学习 Spring IOC 的相关知识。
* 配置文件较为复杂，需要熟悉 Spring IOC 的配置语法。
* IOC 容器在运行时需要加载和管理大量的对象，可能会对系统的性能造成一定的影响。
* IOC 容器会将对象的创建和管理交给 Spring 框架处理，可能会导致一定的性能问题。
* IOC 容器的配置文件较为冗长，可能会影响代码的可读性。

### Spring AOP

#### AOP是什么

面向切面编程

#### 说说 Spring AOP

是一个基于AOP编程的框架, 旨在降低代码重复的同时降低耦合性(主要用于日志, 事务, 权限, 异常处理等方面)
*常用的两个aop编程框架 spring aop, AspectJ*
TODO: 在spring aop 和 aspectJ 中实现aop

| 名称                | 说明                                                               |
| ------------------- | ------------------------------------------------------------------ |
| Joinpoint（连接点） | 指那些被拦截到的点，在 Spring 中，可以被动态代理拦截目标类的方法。 |
| Pointcut（切入点）  | 指要对哪些 Joinpoint 进行拦截，即被拦截的连接点。                  |
| Advice（通知）      | 指拦截到 Joinpoint 之后要做的事情，即对切入点增强的内容。          |
| Target（目标）      | 指代理的目标对象。                                                 |
| Weaving（植入）     | 指把增强代码应用到目标上，生成代理对象的过程。                     |
| Proxy（代理）       | 指生成的代理对象。                                                 |
| Aspect（切面）      | 切入点和通知的结合。                                               |

#### Spring AOP 实现原理

基于代理模式, 并使用JDK(通过java.lang.reflect.Proxy实现), CGLIB(Code Generation Library 一个高性能代码生成包, 被很多主流AOP框架所使用)动态代理来实现
*glib 的底层是asm(小而快的字节码处理框架)*

#### 动态代理（cglib 与 JDK）

这在上面的aop原理中已经包含了, 可以反答aop或者继续深入吧

### Spring 事务

#### Spring 事务支持哪些事务类型,实现方式是怎样的

Spring支持以下几种事务类型：

1. 基于注解的声明性事务：使用@Transactional注解来声明一个方法需要在事务中执行，可以在方法或类级别上使用。*只讲这个好一点*
2. 基于XML的声明性事务：使用XML文件中的`<tx:advice>`和`<tx:attributes>`标签来声明和配置事务。
3. 编程式事务（类似jdbc）：使用TransactionTemplate或TransactionManager等编程式API来控制事务的开始、提交或回滚。

实现方式如下：

1. 基于注解的声明性事务：Spring使用AOP来实现声明性事务。当一个被@Transactional注解的方法被调用时，Spring通过AOP动态地创建一个代理对象来管理事务。在方法执行之前，代理对象会开启一个事务，在方法执行之后，代理对象会根据方法的执行结果来决定是提交事务还是回滚事务。*只讲这个好一点*
2. 基于XML的声明性事务：Spring使用AOP来实现声明性事务，类似于基于注解的声明性事务。在XML配置文件中，可以使用`<tx:advice>`和`<tx:attributes>`标签来声明和配置事务。当一个被配置了事务的方法被调用时，Spring会使用AOP动态地创建一个代理对象来管理事务。
3. 编程式事务（类似jdbc）：Spring使用TransactionTemplate或TransactionManager等编程式API来实现编程式事务。通过TransactionTemplate或TransactionManager等API，可以编写代码来控制事务的开始、提交或回滚。例如，当一个事务需要跨越多个方法或对象时，可以使用编程式事务来控制事务的边界。

#### 描述编程式事务

编程式事务是指在代码中显式地控制事务的开启、提交和回滚，而不是使用Spring框架提供的声明式事务管理方式。下面是一个使用编程式事务的示例：

```java
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private PlatformTransactionManager transactionManager;

    @Override
    public void transferMoney(String fromUser, String toUser, double amount) {
        TransactionDefinition transactionDefinition =
            new DefaultTransactionDefinition();
        TransactionStatus transactionStatus =
            transactionManager.getTransaction(transactionDefinition);
        try {
            userDao.withdrawMoney(fromUser, amount);
            userDao.depositMoney(toUser, amount);
            transactionManager.commit(transactionStatus);
        } catch (Exception e) {
            transactionManager.rollback(transactionStatus);
            throw new RuntimeException("Transaction failed", e);
        }
    }
}
```

在这个示例中，我们使用了`PlatformTransactionManager`接口来管理事务，并在`transferMoney`方法中使用了`TransactionDefinition`和`TransactionStatus`实例来控制事务的开启、提交和回滚。如果在转账过程中发生了任何异常，我们就会回滚事务并抛出一个运行时异常。这个示例中的事务控制是显式的，因为我们在代码中直接调用了事务管理器的方法来控制事务的行为。

#### spring 事务传播

Spring事务传播是指在方法内部调用其他方法时，如何处理事务。Spring框架提供了不同的事务传播级别，可以根据实际情况选择适合的级别。常见的事务传播级别包括：

* REQUIRED（默认）：如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。
* SUPPORTS：支持当前事务，如果当前没有事务，就以非事务方式执行。
* MANDATORY：强制要求当前存在事务，如果不存在事务，就抛出异常。
* REQUIRES_NEW：新建事务，如果当前存在事务，将当前事务挂起。
* NOT_SUPPORTED：以非事务方式执行操作，如果当前存在事务，就将当前事务挂起。
* NEVER：以非事务方式执行，如果当前存在事务，则抛出异常。
* NESTED：如果当前存在事务，则在嵌套事务内执行。如果没有事务，则新建一个事务。嵌套事务是当前事务的一部分，但是可以独立提交或回滚。

#### spring 事务隔离

Spring事务隔离是指多个事务并发执行时，每个事务之间应该相互隔离，不应该互相干扰。Spring框架提供了不同的事务隔离级别，可以根据实际情况选择适合的级别。常见的事务隔离级别包括：

* DEFAULT（默认）：使用数据库默认的事务隔离级别，通常为READ_COMMITTED。
* READ_UNCOMMITTED：最低的隔离级别，允许读取未提交的数据，可能会导致脏读、不可重复读和幻读。
* READ_COMMITTED：保证一个事务提交后才能被另一个事务读取，避免脏读，但可能会导致不可重复读和幻读。
* REPEATABLE_READ：保证在同一个事务中多次读取同一数据时，每次读取的结果都相同，避免不可重复读，但可能会导致幻读。
* SERIALIZABLE：最高的隔离级别，保证事务串行执行，避免脏读、不可重复读和幻读，但性能较低。

需要注意的是，在使用Spring事务时，事务隔离级别的设置与具体的数据库实现有关。不同的数据库实现可能会有不同的事务隔离级别实现方式。

下面是一个使用Spring事务传播和隔离的例子：

```java
@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Transactional(propagation = Propagation.REQUIRED,
        isolation = Isolation.READ_COMMITTED)
    public void transferMoney(int fromUserId, int toUserId, double amount) {
        User fromUser = userDao.getUserById(fromUserId);
        User toUser = userDao.getUserById(toUserId);
        fromUser.setBalance(fromUser.getBalance() - amount);
        toUser.setBalance(toUser.getBalance() + amount);
        userDao.updateUser(fromUser);
        userDao.updateUser(toUser);
    }
}
```

在上面的例子中，`transferMoney`方法使用了`@Transactional`注解，设置了事务的传播级别为REQUIRED，即如果当前没有事务，则新建一个事务，如果已经存在一个事务中，则加入到这个事务中；同时，设置了事务的隔离级别为READ_COMMITTED，即保证一个事务提交后才能被另一个事务读取，避免脏读。该方法实现了转账功能，从一个用户账户扣除一定金额并转入另一个用户账户。使用Spring事务机制，可以保证转账操作的原子性、一致性和持久性。

#### Spring 事务底层原理

#### Spring 事务失效

Spring事务失效可能有以下几个原因：

* 事务注解未被正确配置
    当使用基于注解的事务管理时，必须确保事务注解被正确配置。例如，@Transactional注解可能未被正确添加到需要进行事务管理的方法上。

* 事务传播行为设置错误
    事务传播行为描述了事务如何在方法调用之间传播。如果事务传播行为被错误地设置，可能会导致事务失效。例如，当使用PROPAGATION_REQUIRES_NEW传播行为时，Spring将会为每个方法调用创建一个新的事务，而不是在现有事务上继续执行。如果该设置错误，将导致事务失效。

* 数据库隔离级别设置错误
    当使用Spring事务管理器时，必须确保数据库隔离级别被正确设置。如果隔离级别设置错误，可能会导致事务失效。

* 数据库连接池配置错误
    数据源配置问题也可能导致事务失效。例如，如果连接池配置不正确，可能会导致数据库连接超时或者无法获得连接，从而导致事务失效。

* 异常处理不正确
    当事务中发生异常时，必须确保异常被正确处理。如果异常未被正确处理，可能会导致事务失效。例如，如果未正确捕获并处理异常，事务可能会回滚。如果异常被正确处理，可以避免事务回滚。

总之，Spring事务失效的原因可能有很多种，需要仔细检查配置，并进行适当的调试和排除故障。

#### 如何自定义注解实现功能

#### Spring MVC 运行流程, Spring MVC 启动流程

两个题目差不多意思

#### Spring 的单例实现原理

通过将bean指定为singleton, 具体实现方法也就是单例模式, 需要达到线程安全和懒加载都不复杂

#### Spring 框架中用到了哪些设计模式

* 工厂设计模式 : Spring使用工厂模式通过 BeanFactory、ApplicationContext 创建 bean 对象。
* 代理设计模式 : Spring AOP 功能的实现。
* 单例设计模式 : Spring 中的 Bean 默认都是单例的。
* 模板方法模式 : Spring 中 jdbcTemplate、hibernateTemplate 等以 Template 结尾的对数据库操作的类，它们就使用到了模板模式。
* 包装器设计模式 : 我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源。
* 观察者模式: Spring 事件驱动模型就是观察者模式很经典的一个应用。
* 适配器模式 :Spring AOP 的增强或通知(Advice)使用到了适配器模式、spring MVC 中也是用到了适配器模式适配Controller

#### Spring 其他产品（Srping Boot、Spring Cloud、Spring Secuirity、Spring Data、Spring AMQP 等）

### spring 注解

spring 的配置发展过程
2.5 xml
3.0 javaConfig
3.0+ springboot

#### spring的配置方式

Spring有三种主要的配置方式：

* 基于**XML**文件的配置：使用XML文件来描述Bean之间的关系和属性。
* 基于**注解**的配置：使用注解来描述Bean之间的关系和属性，可以使用Java自带的注解或Spring提供的注解。
* 基于JavaConfig的配置：使用Java类来描述Bean之间的关系和属性，**通常使用@Configuration注解标记Java类，使用@Bean注解来标记Bean的定义方法**。

这三种配置方式可以单独使用，也可以混合使用。*到此为止*每种配置方式都有其优缺点，具体使用哪种方式取决于项目的需求和开发者的个人偏好。

#### javaConfig如何代替spring.xml

Java config是一种基于Java类的配置方式，可以通过Java类来替代XML文件进行Spring配置。

要替代spring.xml，您需要执行以下步骤：

1. 创建一个Java类，使用`@Configuration`注解标记该类。
2. 在Java类中，使用`@Bean`注解定义Bean。
3. 将Bean定义添加到Spring容器中，可以使用`AnnotationConfigApplicationContext`或`ApplicationContext`等类来实现。

例如，以下代码展示了如何使用Java config来替代一个简单的spring.xml文件：

```java
@Configuration
public class AppConfig {
    @Bean
    public HelloWorld helloWorld() {
        return new HelloWorld();
    }
    @Bean
    public HelloWorldService helloWorldService() {
        HelloWorldService service = new HelloWorldService();
        service.setHelloWorld(helloWorld());
        return service;
    }
}

public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        HelloWorldService service = context.getBean(HelloWorldService.class);
        System.out.println(service.getGreeting());
    }
}
```

在上面的代码中，`@Configuration`注解表示该类是一个配置类。`@Bean`注解用于定义Bean。`AppConfig`类定义了一个`HelloWorld` Bean和一个`HelloWorldService` Bean，并将`HelloWorld` Bean注入到`HelloWorldService` Bean中。

在`Main`类中，我们使用`AnnotationConfigApplicationContext`类来加载配置类，并从容器中获取`HelloWorldService` Bean的实例。然后我们调用`getGreeting()`方法来输出“Hello, World!”。

通过Java config，我们可以完全替代XML配置文件，使配置更加简洁、可读性更高。

二者使用的spring 容器不相同

* ClassPathXmlApplicationContext("xml")
* AnnotationConfigApplicationContext(Config.class)

#### @Component, @Controller, @Repository, @Service 的区别

@Controller (控制器), @Repository (数据访问), @Service (业务逻辑) 的原注解就是@Component 主要为了可读性而分成多个

#### @Import有哪些用法

Spring的Import注解可以用于导入一个或多个配置类，以便在当前配置类中使用它们定义的bean。

具体来说，当一个配置类使用了Import注解导入了其他配置类时，Spring会将这些配置类中定义的bean合并到当前配置类中，从而使得在当前配置类中可以使用这些bean。

Import注解可以用于多种情况，例如：

* **在配置类中使用Import注解导入其他配置类**，以便在当前配置类中使用这些配置类中定义的bean。
* 在@Configuration注解的配置类中使用Import注解导入其他@Configuration注解的配置类，以便将其**定义的bean合并到当前配置类中**。
* **在@Configuration注解的配置类中使用Import注解导入普通的Java类**，以便在当前配置类中使用这些Java类中定义的@Bean方法。需要配置类实现一个ImportSelector接口才能实现

总之，Import注解可以帮助我们更好地组织和管理Spring配置，提高代码的可读性和可维护性。

好的，下面我来举个例子，说明一下Spring的Import注解的用法和作用。

假设我们有两个配置类，分别是AppConfig1和AppConfig2，它们分别定义了一些bean：

```java
@Configuration
public class AppConfig1 {
    @Bean
    public UserService userService() {
        return new UserServiceImpl();
    }
    // other beans...
}

@Configuration
public class AppConfig2 {
    @Bean
    public ProductService productService() {
        return new ProductServiceImpl();
    }
    // other beans...
}
```

现在，我们想在一个新的配置类中使用这两个配置类中定义的bean，我们可以使用Import注解将它们导入到新的配置类中：

```java
@Configuration
@Import({AppConfig1.class, AppConfig2.class})
public class AppConfig3 {
    // use beans from AppConfig1 and AppConfig2...
}
```

在上面的代码中，我们使用@Import注解将AppConfig1和AppConfig2导入到AppConfig3中，这样在AppConfig3中就可以使用这两个配置类中定义的bean了。

需要注意的是，如果导入的配置类中有重复定义的bean，那么后面导入的配置类中定义的bean会覆盖前面导入的配置类中定义的同名bean。

是的，使用@Import注解将其他配置类导入到主配置类中，可以将其他配置类中定义的所有bean注册到IOC容器中，从而可以在主配置类中直接使用这些bean。在示例代码中，我们使用了@Import注解将Config1和Config2导入到主配置类Config3中，这样我们可以直接在Config3中使用Config1和Config2中定义的bean。最后，我们只需要将Config3注册到IOC容器中，就可以使用所有三个配置类中定义的bean了。

总之，使用Import注解可以方便地组织和管理Spring配置，提高代码的可读性和可维护性。

#### 如何在自动注入(Autowired)没有找到依赖Bean的时候如何不报错

* @Autowired的属性required设置为false即可 `@Autowired(required = false)`
* @Nullable注解标记依赖项为可选的。

#### 如何在自动注入(Autowired)找到多个依赖Bean的时候如何不报错

* 在想要使用的bean上使用@Primary
* 使用@Qualifier注解指定具体的bean名称

#### @Autowired的作用

@Autowired注解是Spring框架中常用的依赖注入方式之一，它的作用是自动装配一个bean，从而避免手动编写大量的代码来实现依赖注入。

具体来说，@Autowired注解可以用于在Spring管理的bean中自动装配其他bean的依赖关系，通常用在成员变量、构造函数、Setter方法上。在使用@Autowired注解时，Spring会通过IOC容器查找匹配(查找的优先级 类型 > 名称)的bean，并将其注入到目标bean中。

和xml不同@Autowried不需要在注入的类中提供set方法

举个例子，假设我们有一个Service类，其中需要一个Dao类的实例来进行数据访问操作。我们可以在Service类中使用@Autowired注解自动装配Dao类实例，而不需要手动创建Dao类的实例并将其传递给Service类。

```java
@Service
public class UserService {
    
    @Autowired
    private UserDao userDao;
    
    // ...
}
```

在上面的示例中，@Autowired注解被用于自动装配UserService类中的userDao成员变量，Spring会自动查找匹配的UserDao实例，并将其注入到UserService类中。

需要注意的是，如果有多个匹配的bean，Spring会抛出异常，此时需要使用@Qualifier注解指定具体的bean名称。另外，如果没有找到匹配的bean，可以使用@Nullable注解标记依赖项为可选的。

#### @Autowired 和 @Resource的区别

@Autowired和@Resource都是Spring框架中常用的依赖注入方式，它们都可以用来自动装配bean。但是它们之间有一些区别。

* 来源不同

    @Autowired注解是Spring框架提供的，而@Resource注解是Java EE(jdk)提供的。因此，使用@Autowired注解会更加依赖Spring框架，而@Resource注解是Java EE标准，更具通用性。

* 依赖装配方式不同

    @Autowired注解是按照先byType再byName的方式进行依赖装配。而@Resource注解是按照先byName再byType的方式进行依赖装配。如果没有指定name属性，那么默认使用成员变量名作为bean名称进行匹配。
    *答到这边差不多了*

* 支持的范围不同

    @Autowired注解只能用于装配Spring管理的bean，而@Resource注解可以用于装配任意的Java EE组件，如Servlet、EJB和JMS等。

* 用法略有不同

    使用@Autowired注解时，通常需要结合@Qualifier注解使用，以指定具体的bean名称。例如：

    ```java
    @Autowired
    @Qualifier("userDao")
    private UserDao userDao;
    ```

    而@Resource注解提供了name属性，可以直接指定bean名称。例如：

    ```java
    @Resource(name="userDao")
    private UserDao userDao;
    ```

需要注意的是，@Autowired和@Resource注解都可以用于成员变量、构造函数、Setter方法上。但是在构造函数上使用@Autowired注解时，Spring会自动选择合适的构造函数进行注入，而@Resource不支持这种用法。

#### 第三方类配置成Bean

有以下几种方法将第三方类配置成Spring Bean:

1. 使用XML文件配置：在XML文件中使用`<bean>`标签配置第三方类的Bean definition。
2. 使用注解配置：使用@Component、@Service、@Repository或@Controller等注解将第三方类标记为Spring Bean。
3. 使用Java config配置：使用@Configuration和@Bean注解将第三方类的实例化和配置过程定义在Java类中。
4. 使用Import注解：使用Import注解将第三方类定义的@Configuration类导入到当前配置类中，从而将第三方类配置成Spring Bean。

无论使用哪种方法，都需要确保第三方类的构造函数和成员变量都是合理的，并且可以正确地注入依赖关系。同时，建议对第三方类进行单元测试以确保其正常工作。

### spring 多线程

#### 使用@Async时等待所有子线程调用结束

通过主进程循环等待的方式来实现

```java
List<Future<String>> async_task_list = new List<Future<String>>();
boolean async_done = false;
while (!async_done) {
    Thread.sleep(100);
    for(String data : datalist ){
        Future<String> async_task = taskService.task(data);
        async_task_list.add(async_task);
    }

    int task_done = 0;
    for (Future<String> async_task : async_task_list) {
        if (async_task.isDone()) {
            task_done++;
        }
    }
    if (task_done == async_task_list.size()) {
        async_done = true;
    }
}
```

使用@Async注解将方法标记为异步执行，它会在调用该方法时立即返回，并启动一个新的线程来处理该方法的执行。但是，如果需要等待异步方法完成后再继续主线程的执行，可以使用CompletableFuture对象。

首先，在需要等待异步方法完成执行的地方创建一个CompletableFuture对象：

```java
CompletableFuture<Void> future = new CompletableFuture<>();
```

然后，在@Async方法的末尾添加一行代码以通知CompletableFuture对象已经完成：

```java
future.complete(null);
```

接下来，在主线程中使用future.get()方法等待异步方法执行完成，并阻塞主线程的执行：

```java
future.get();
```

完整示例代码如下：

```java
@Component
public class MyService {

    @Async
    public void asyncMethod() {
        // 异步执行的方法体
    }

}

@Service
public class MyOtherService {

    private final MyService myService;

    @Autowired
    public MyOtherService(MyService myService) {
        this.myService = myService;
    }

    public void doSomething() throws InterruptedException, ExecutionException {
        CompletableFuture<Void> future = new CompletableFuture<>();
        myService.asyncMethod();
        future.complete(null);
        future.get(); // 等待异步方法执行完成
        // 继续主线程的执行
    }

}
```

如果有多个异步方法需要等待，可以使用CompletableFuture.allOf()方法来等待它们全部完成。

首先，创建一个`List<CompletableFuture<Void>>`对象，把所有的异步方法返回的CompletableFuture对象都添加到列表中：

```java
List<CompletableFuture<Void>> futures = new ArrayList<>();
futures.add(myService.asyncMethod1());
futures.add(myService.asyncMethod2());
futures.add(myService.asyncMethod3());
```

然后，使用CompletableFuture.allOf()方法等待所有异步方法执行完成：

```java
CompletableFuture<Void> allFutures = CompletableFuture.allOf(
    futures.toArray(new CompletableFuture[futures.size()])
);
allFutures.get(); // 等待所有异步方法执行完成
```

完整示例代码如下：

```java
@Service
public class MyOtherService {

    private final MyService myService;

    @Autowired
    public MyOtherService(MyService myService) {
        this.myService = myService;
    }

    public void doSomething() throws InterruptedException, ExecutionException {
        List<CompletableFuture<Void>> futures = new ArrayList<>();
        futures.add(myService.asyncMethod1());
        futures.add(myService.asyncMethod2());
        futures.add(myService.asyncMethod3());
        CompletableFuture<Void> allFutures = CompletableFuture.allOf(
            futures.toArray(new CompletableFuture[futures.size()])
        );
        allFutures.get(); // 等待所有异步方法执行完成
        // 继续主线程的执行
    }

}
```

注意：如果需要获取每个异步方法的返回值，可以将CompletableFuture<Void>替换为CompletableFuture<T>，其中T是异步方法的返回类型。然后，在异步方法执行完成后，可以使用CompletableFuture.join()方法获取返回值。例如：

```java
List<CompletableFuture<String>> futures = new ArrayList<>();
futures.add(myService.asyncMethod1());
futures.add(myService.asyncMethod2());
futures.add(myService.asyncMethod3());
CompletableFuture<Void> allFutures = CompletableFuture.allOf(
    futures.toArray(new CompletableFuture[futures.size()])
);
allFutures.get(); // 等待所有异步方法执行完成
List<String> results = futures.stream().map(CompletableFuture::join).collect(Collectors.toList());
```

#### spring线程池

Spring框架提供了一个ThreadPoolTaskExecutor类来实现线程池，它实现了Java的Executor接口，可以用于执行异步任务。

使用ThreadPoolTaskExecutor可以在Spring应用程序中创建线程池，可以设置线程池的核心线程数、最大线程数、等待队列、线程的超时时间等参数。线程池中的线程可以执行Runnable或Callable任务。

以下是使用ThreadPoolTaskExecutor创建线程池的示例：

```java
@Configuration
@EnableAsync
public class AppConfig implements AsyncConfigurer {

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(200);
        executor.setThreadNamePrefix("mythreadpool-");
        executor.initialize();
        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new SimpleAsyncUncaughtExceptionHandler();
    }
}
```

使用@EnableAsync注解启用异步任务处理，实现AsyncConfigurer接口并实现getAsyncExecutor方法来创建线程池。

关于线程调度，Spring框架提供了一个TaskScheduler接口，用于定时执行任务。TaskScheduler接口有多个实现类，包括ThreadPoolTaskScheduler（基于线程池的调度器）、ConcurrentTaskScheduler（基于Java并发包的调度器）和CronTaskScheduler（基于cron表达式的调度器）等。

以下是使用ThreadPoolTaskScheduler创建基于线程池的调度器的示例：

```java
@Configuration
@EnableScheduling
public class AppConfig implements SchedulingConfigurer {

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setPoolSize(10);
        taskScheduler.setThreadNamePrefix("myscheduler-");
        taskScheduler.initialize();
        taskRegistrar.setTaskScheduler(taskScheduler);
    }
}
```

使用@EnableScheduling注解启用定时任务处理，实现SchedulingConfigurer接口并实现configureTasks方法来创建基于线程池的调度器。

@Async是Spring框架提供的一种异步执行方法的方式。它可以将一个方法标记为异步执行，这样当这个方法被调用时，Spring框架会自动将其放入一个线程池中执行，而不会阻塞主线程的执行。

使用@Async需要在Spring容器中配置一个TaskExecutor，该TaskExecutor负责管理线程池，可以通过配置不同的TaskExecutor来实现不同的线程池配置，例如线程池大小、队列大小等参数。

使用@SpringAsync的步骤如下：

1. 在Spring配置文件中配置一个TaskExecutor。

2. 在需要异步执行的方法上添加@Async注解。

下面是一个简单的例子：

```java
@Service
public class MyService {

  @Autowired
  private TaskExecutor taskExecutor;

  @Async
  public void asyncMethod() {
    // 异步执行的方法体
  }

  public void normalMethod() {
    // 同步执行的方法体
  }
}
```

在上面的例子中，asyncMethod()方法被标记为异步执行，而normalMethod()方法则是同步执行的。

注意，@Async注解只能用在public方法上，因为Spring需要通过代理来实现异步执行的功能，而只有public方法才能被代理。

当一个使用了@Async注解的方法被调用时，Spring框架会将它封装成一个异步任务，并将这个任务提交给TaskExecutor去执行。TaskExecutor会将任务放入一个线程池中，线程池中的线程会去执行这个任务。

具体来说，TaskExecutor会从线程池中取出一个线程，然后将异步任务交给这个线程去执行。如果线程池中没有可用的线程，那么这个异步任务就会被放入一个等待队列中，等待有空闲的线程时再去执行。

在Spring中，可以使用多种TaskExecutor来实现异步执行功能。例如，可以使用ThreadPoolTaskExecutor来创建一个基于线程池的TaskExecutor，它可以配置线程池大小、队列大小、线程名称前缀等参数，以及使用不同的拒绝策略来处理任务队列已满的情况。

下面是一个简单的ThreadPoolTaskExecutor的配置示例：

```java
@Configuration
@EnableAsync
public class AppConfig implements AsyncConfigurer {

  @Override
  public Executor getAsyncExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(10);
    executor.setMaxPoolSize(50);
    executor.setQueueCapacity(100);
    executor.setThreadNamePrefix("MyExecutor-");
    executor.initialize();
    return executor;
  }
}
```

在上面的配置中，我们创建了一个ThreadPoolTaskExecutor，设置了核心线程数为10，最大线程数为50，队列容量为100，线程名称前缀为"MyExecutor-"。然后，我们实现了AsyncConfigurer接口，将这个ThreadPoolTaskExecutor返回，这样就可以在应用中使用@Async注解来标记异步方法了。

#### spring 线程与锁

Spring框架本身不提供线程锁的实现，但是它可以集成Java中的锁实现，或者提供一些便捷的锁工具类，来简化锁的使用。

例如，Spring提供了一个名为`LockRegistry`的接口，它可以用来管理锁。`LockRegistry`提供了`obtain`方法，可以获取一个锁对象。在获取锁对象之后，可以使用Java中的`synchronized`关键字或者`ReentrantLock`等锁机制来对共享资源进行互斥访问。

另外，Spring还提供了一些基于注解的锁实现，例如`@Lock`注解可以用来在方法或者代码块上加锁，保证同一时刻只有一个线程执行被锁定的代码。`@Lock`注解可以配置锁的名称、锁的超时时间等属性，非常灵活。

除此之外，Spring还提供了一些其他锁相关的工具类，例如`LockTemplate`、`Mutex`等，可以帮助我们方便地管理锁的状态，提高并发性能。

`@Lock`注解是Spring框架提供的一个基于注解的锁实现。该注解可以用于方法或代码块上，用于保护某些共享资源在同一时间只能被一个线程访问。使用`@Lock`注解可以避免在代码中显式地使用锁对象，从而简化代码，并提高可读性和可维护性。

`@Lock`注解的使用方法如下：

```java
@Lock("myLock")
public void myMethod() {
    // do something
}
```

在这个例子中，我们使用了`@Lock`注解来保护`myMethod()`方法的执行。`@Lock`注解的参数是锁的名称，可以是任意字符串。当多个线程尝试执行带有`@Lock`注解的方法时，只有其中一个线程能够获得锁，其他线程需要等待该锁被释放后才能执行。

`@Lock`注解还提供了其他一些可选参数，例如`timeOut`属性可以指定锁的超时时间，`lockType`属性可以指定锁的类型，例如读写锁、公平锁等。在使用`@Lock`注解时，需要根据实际需求选择合适的锁类型和参数。

需要注意的是，使用`@Lock`注解会影响方法的执行效率，因为每个线程都需要等待锁被释放才能继续执行。因此，在使用`@Lock`注解的时候，需要权衡锁的粒度和并发性能，避免出现性能瓶颈。

`myLock`是一个锁的名称，可以是任意字符串，在使用`@Lock`注解时需要指定相应的锁名称。在Spring中，可以使用`LockRegistry`来管理锁，这个接口可以用来获取和释放锁。

下面是一个简单的示例，演示如何在Spring中使用`LockRegistry`来获取和释放锁：

```java
@Autowired
LockRegistry lockRegistry;

public void myMethod() {
    Lock lock = lockRegistry.obtain("myLock");
    try {
        lock.lock();
        // do something
    } finally {
        lock.unlock();
    }
}
```

在这个示例中，我们首先使用`@Autowired`注解注入了一个`LockRegistry`实例。然后在`myMethod()`方法中，我们使用`LockRegistry`实例的`obtain()`方法来获取一个名为`myLock`的锁对象。在`try...finally`语句块中，我们使用锁对象的`lock()`方法来获取锁，在锁保护的代码块中执行相应的共享资源操作，最后使用`unlock()`方法释放锁。

需要注意的是，这个示例中使用的是默认的锁实现，即Java中的重入锁（`ReentrantLock`）。如果需要使用其他类型的锁，例如读写锁、公平锁等，可以使用`LockRegistry`的其他方法来获取相应类型的锁对象。

### Spring MVC

#### Spring MVC中Controller是不是单例(是否线程安全) 如果不是怎么解决

是的，Spring MVC 中的 Controller 默认是单例模式，因此需要注意线程安全问题。

如果 Controller 中存在线程安全问题，可以通过以下方式进行解决：

* 将 Controller 中的成员变量改为方法内部变量，避免多线程同时操作同一个成员变量。
* 使用ThreadLocal来解决线程安全问题。ThreadLocal是线程本地变量，每个线程都有自己的变量副本，互不干扰。
* 如果需要在 Controller 中使用非线程安全的对象，可以使用@Scope注解将其设置为每次请求都创建一个新的对象实例，这样就可以避免多线程同时操作同一个对象。
* 也可以使用synchronized关键字来保证方法的原子性，但是过多的使用synchronized会影响性能。

综上所述，需要在使用 Spring MVC 中的 Controller 时，注意线程安全问题，并根据具体情况采取相应的解决方案。

#### Spring MVC 的拦截器和过滤器

Spring MVC 中的拦截器和 Servlet 中的过滤器都是用来处理请求的，但是它们在功能和使用上存在一些区别。

* 拦截器是 Spring MVC 框架中的一部分(不依赖servlet容器)，它是基于 Java 的反射机制的，可以在请求处理之前和之后进行一些处理操作，比如记录日志、权限检查、字符编码转换等。拦截器只能拦截请求到达 Spring MVC 的控制器(Controller)之前和之后的过程，不能拦截请求到 Servlet 的过程。

* 过滤器是 Servlet 规范中的一部分，它可以在请求到达 Servlet 之前和之后进行一些处理操作，比如记录日志、字符编码转换、压缩响应等。过滤器可以拦截请求到达 Servlet 的过程，并且可以拦截请求到达任何一个 Servlet 的过程，不管是 Spring MVC 的控制器还是其他 Servlet。

因此，如果只需要拦截请求到达 Spring MVC 的控制器之前和之后的过程，并且使用 Spring MVC 框架，可以选择使用拦截器；如果需要拦截请求到达任何一个 Servlet 的过程，或者使用其他框架，可以选择使用过滤器。

在 Spring MVC 中，拦截器和过滤器的执行顺序是不同的。下面是它们的执行顺序：

* 过滤器的执行顺序：
  * 执行过滤器链中的第一个过滤器前，先执行过滤器链中的所有 Filter 的 init() 方法。
  * 执行过滤器链中的每一个过滤器的 doFilter() 方法。
  * 执行过滤器链中的最后一个过滤器后，再执行过滤器链中的所有 Filter 的 destroy() 方法。

* 拦截器的执行顺序：
  * 执行 HandlerMapping 中的拦截器链中的每一个拦截器的 preHandle() 方法。
  * 执行 HandlerAdapter 调用控制器方法。
  * 执行 HandlerMapping 中的拦截器链中的每一个拦截器的 postHandle() 方法。
  * 执行 HandlerMapping 中的拦截器链中的每一个拦截器的 afterCompletion() 方法。

需要注意的是，拦截器是基于 AOP 的，它只能在 Spring MVC 中使用。而过滤器是 Servlet 规范中的一部分，可以在任何 Servlet 环境中使用。

#### spring mvc中 servlet 和 controller

在 Spring MVC 中，Controller 是一个特殊的 Bean，用于处理请求并返回响应。Controller 通常被用来实现 MVC 模式中的控制器，负责处理用户请求、调用业务逻辑并将结果返回给用户。Controller 可以支持多种类型的请求格式，如 JSON、XML、HTML 等，并可以通过视图解析器将结果渲染为用户可读的页面。

而 Servlet 是 Java Web 开发中的一种基础技术，它是一个运行在 Web 服务器上的 Java 类，用于处理客户端请求并返回响应。Servlet 可以接收 HTTP 请求、解析请求参数、调用业务逻辑并将结果返回给客户端。Servlet 通常被用来实现 Web 应用程序中的控制器，但它比 Controller 更底层，需要手动处理请求参数、响应头等细节。

在 Spring MVC 中，Controller 是基于 Servlet 技术实现的，它可以理解为是 Servlet 的一种扩展。与传统的 Servlet 相比，Spring MVC 的 Controller 更加注重分离关注点，将业务逻辑和请求处理分别处理，从而使得代码更加清晰、可读和可维护。同时，Spring MVC 也支持与传统的 Servlet 技术共存，可以在同一个 Web 应用程序中同时使用 Controller 和 Servlet。

#### Spring Boot 配置类来设置 Spring MVC

在 Spring Boot 中，你可以通过配置类来设置 Spring MVC。一般情况下，这个配置类需要包含以下内容：

* WebMvcConfigurer 接口：配置 Spring MVC 的属性和行为。
* ResourceHandlerRegistry：配置静态资源的处理器。
* ViewResolver：配置视图解析器。
* InterceptorRegistry：配置拦截器。
* MessageConverter：配置消息转换器。
* ExceptionHandler：配置异常处理器。
* CorsRegistry：配置跨域访问。

需要注意的是，在 Spring Boot 中，你可以通过 Application 类来设置 Spring MVC 的配置类，也可以在配置类中使用 @ComponentScan 注解来扫描所有的控制器类。

### SpringBoot核心注解

Spring Boot 中有很多核心注解，以下是一些常用的注解：

* `@SpringBootApplication`: 这个注解是Spring Boot应用程序的主要注解，它可以用来替代`@Configuration`、`@EnableAutoConfiguration`和`@ComponentScan`三个注解。
* `@RestController`: 这个注解用来标识一个类是Spring MVC中的Controller，它会自动将返回的数据转换为json格式。
* `@RequestMapping`: 这个注解用来映射请求的URL和方法，可以用来定义接口的访问路径。
* `@Autowired`: 这个注解用来自动装配Spring容器中的Bean，可以省略 `setter/getter` 方法。
* `@Service`: 这个注解用于标注业务层组件，与`@Component`注解功能相同。
* `@Repository`: 这个注解用于标注数据访问层组件，与`@Component`注解功能相同。
* `@Component`: 这个注解用于标注一个组件，可以被自动扫描并装配到Spring容器中。

#### spring boot 热部署

Spring Boot 支持热部署，可以在不重启应用程序的情况下进行代码的修改和更新。下面是一些常见的实现方式：

* Spring Boot DevTools：使用 Spring Boot DevTools 可以实现热部署。DevTools 提供了一个开发者工具，可以在开发阶段自动重启应用程序，以便让应用程序更快地更新和部署。只需在 pom.xml 文件中添加以下依赖即可：

    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
    </dependency>
    ```

* JRebel：JRebel 是一款商业软件，可以实现热部署和快速重新加载 Java 应用程序的代码和资源。JRebel 可以在应用程序运行时重新加载类，并且不需要重启应用程序。可以在 JRebel 官网上了解更多信息。

* 使用插件：可以使用一些插件，如 Spring Loaded、DCEVM 和 Javassist 等，来实现热部署。这些插件可以在应用程序运行时动态地替换和重新加载类。但是这些插件并不是 Spring Boot 官方支持的方式，使用插件可能会带来一些不稳定性和安全性问题，需要自行权衡利弊。

总之，Spring Boot 支持多种方式实现热部署，开发人员可以根据自己的需求选择适合自己的方式。

### MyBatis

#### MyBatis是如何管理Mapper接口的

Mybatis通过接口映射的方式来管理mapper接口。

在Mybatis中，mapper接口被映射为一个MapperProxy对象。当调用mapper接口的方法时，Mybatis会通过MapperProxy对象来代理实现对应的SQL操作。

MapperProxy对象中包含了一个SqlSession对象，它是Mybatis中用于执行SQL操作的核心对象。MapperProxy对象会将mapper接口的方法名和参数传递给SqlSession对象，并根据XML映射文件中的SQL语句执行相应的操作。

在XML映射文件中，Mybatis会将mapper接口的方法名和参数与SQL语句进行映射。通过这种方式，Mybatis能够根据mapper接口的方法名和参数自动生成SQL语句，并执行相应的操作。

例如，假设有一个UserMapper接口，其中包含一个selectUserById方法。Mybatis会将selectUserById方法映射为一个SQL语句，该SQL语句会根据传入的参数查询相应的用户信息。当调用selectUserById方法时，Mybatis会根据该方法的参数自动生成相应的SQL语句，并通过SqlSession对象执行该SQL语句，最终返回查询结果。

总之，Mybatis通过接口映射的方式来管理mapper接口，将mapper接口的方法名和参数与XML映射文件中的SQL语句进行映射，并通过SqlSession对象执行相应的操作。

### Netty

Netty是一个开源的、高性能的、异步的、事件驱动的网络应用程序框架，用于快速开发可维护的高性能协议服务器和客户端。Netty基于Java NIO技术，提供了简单易用的API，支持多种传输协议（如TCP、UDP和HTTP）以及多种编解码器（如Protobuf、Json和XML），可以很方便地实现网络通信和协议处理。Netty的优势在于其高度的可定制性、灵活性和扩展性，适用于各种网络应用开发场景。

#### 为什么选择 Netty

#### 说说业务中，Netty 的使用场景

#### 什么是NIO

NIO（New I/O）是Java NIO（New Input/Output）包的缩写，是Java SE 1.4版本中引入的一种新的I/O API。相比于传统的Java I/O API，NIO提供了更高效、更灵活的I/O操作方式，支持非阻塞I/O操作、缓冲区操作、选择器等特性，可以大大提高网络通信和文件I/O操作的性能和可扩展性。NIO的主要特点包括：

1. 支持非阻塞I/O操作，可以在单线程中处理多个连接；
2. 缓冲区操作，可以减少I/O操作次数，提高性能；
3. 选择器，可以实现单线程监控多个通道的I/O事件，提高效率；
4. 支持分散/聚集I/O操作，可以将多个缓冲区的数据集中在一起进行传输。

总之，NIO是Java中一种高效的I/O操作方式，可以用于高性能的网络编程和文件I/O操作。

#### 原生的 NIO 在 JDK 1.7 版本存在 epoll bug

#### 什么是TCP 粘包/拆包

#### TCP粘包/拆包的解决办法

#### Netty 线程模型

#### 说说 Netty 的零拷贝

#### Netty 内部执行流程

#### Netty 重连实现

## 微服务篇

### 微服务

#### 前后端分离是如何做的

#### 微服务哪些框架

Spring Cloud Alibaba是Spring Cloud的一个拓展，是阿里巴巴提供的开源微服务解决方案，包含以下组件：

1. Nacos：一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

2. Sentinel：一个面向分布式服务架构的高可用性流量控制、熔断降级系统。

3. RocketMQ：一个分布式消息中间件，具有低延迟、高可靠、高吞吐量、可扩展等特点。

4. Alibaba Cloud OSS：阿里云对象存储服务，提供海量、安全、低成本、高可靠的云存储服务。

5. Alibaba Cloud ACM：阿里云应用配置管理服务，提供应用配置的集中式管理、分环境管理和版本管理等功能。

6. Alibaba Cloud SMS：阿里云短信服务，提供全球覆盖的短信发送服务，支持短信验证码、推广短信等场景。

Spring Cloud Alibaba提供了一系列的starter，可以快速集成这些组件到Spring Cloud应用中，使得开发者可以更加便捷地构建微服务应用。

#### 你怎么理解 RPC 框架

RPC（Remote Procedure Call）是一种远程过程调用协议，可以让不同的进程或者不同的机器之间进行通信和调用。RPC框架则是对RPC协议的一种具体实现，可以让开发者更方便地进行RPC调用。

常见的RPC框架有：

1. Dubbo：阿里巴巴开源的高性能RPC框架，支持多协议、多注册中心、多负载均衡等特性，被广泛应用于大型分布式系统中。

2. gRPC：由Google开源的高性能RPC框架，基于HTTP/2协议，支持多种编程语言和平台，可以在移动设备和浏览器上使用。

3. Thrift：由Facebook开源的RPC框架，支持多种编程语言和平台，可以自动生成客户端和服务器端的代码，简化开发流程。

4. Spring Cloud：基于Spring Boot的微服务框架，支持多种RPC协议，如gRPC、Rest、WebSocket等，提供了服务注册、服务发现、负载均衡等功能。

这些RPC框架各有特色和适用场景，开发者可以根据项目的需求进行选择。

#### 说说 RPC 的实现原理

#### 说说 Dubbo 的实现原理

#### 说说MQ

RocketMQ是一款开源的分布式消息中间件，它由阿里巴巴集团自主研发并开源。RocketMQ采用了类似于Kafka的架构，具有高吞吐量、高可靠性、低延迟等特点，适用于大规模分布式系统的消息通信。RocketMQ支持多种消息模式，包括点对点（P2P）和发布订阅（Pub/Sub），同时还提供了丰富的消息过滤、消息顺序、消息事务等特性，使得应用程序可以更加方便、可靠地进行消息通信和处理。RocketMQ还支持水平扩展和自动负载均衡，可以满足各种规模的应用场景需求。

RocketMQ适用于各种场景，例如：

1. 分布式系统之间的消息通信：由于RocketMQ具有高吞吐量、高可靠性和低延迟等特点，因此可以作为分布式系统之间的消息通信中间件，用于处理异步通信和解耦应用程序之间的依赖关系。

2. 流式数据处理：RocketMQ支持实时数据处理和流式计算，可以用于数据采集、分析和处理，例如日志收集、实时监控、数据可视化等应用场景。

3. 事务消息处理：RocketMQ提供了事务消息处理机制，可以保证消息发送和消息处理之间的事务一致性，避免数据丢失和数据不一致等问题。

4. 异步通知和消息推送：RocketMQ支持短信、邮件、APP推送等多种通知方式，可以用于异步通知和消息推送，例如订单状态变更、用户行为统计等应用场景。

5. 实时流媒体处理：RocketMQ支持实时流媒体处理，可以用于音视频流处理、实时广播和实时直播等应用场景。

总之，RocketMQ是一款功能强大的消息中间件，可以广泛应用于各种分布式系统和应用场景中，提供高效、可靠、稳定的消息通信和处理能力。

好的，下面是一个使用Java语言和RocketMQ的示例代码：

首先，需要引入RocketMQ的Java客户端依赖：

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>4.7.1</version>
</dependency>
```

然后，创建一个生产者示例：

```java
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;

public class RocketMQProducer {
    public static void main(String[] args) throws Exception {
        // 创建生产者实例
        DefaultMQProducer producer = new DefaultMQProducer("producer_group");
        // 设置NameServer地址
        producer.setNamesrvAddr("localhost:9876");
        // 启动生产者实例
        producer.start();
        
        // 创建消息实例，指定主题、标签和消息内容
        Message message = new Message("test_topic", "test_tag", "Hello, RocketMQ!".getBytes());
        // 发送消息
        producer.send(message);
        
        // 关闭生产者实例
        producer.shutdown();
    }
}
```

接下来，创建一个消费者示例：

```java
import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.message.MessageExt;

public class RocketMQConsumer {
    public static void main(String[] args) throws Exception {
        // 创建消费者实例
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer_group");
        // 设置NameServer地址
        consumer.setNamesrvAddr("localhost:9876");
        // 订阅主题和标签
        consumer.subscribe("test_topic", "test_tag");
        // 注册消息监听器
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> messages, ConsumeConcurrentlyContext context) {
                // 处理消息
                for (MessageExt message : messages) {
                    System.out.printf("Received message: %s %n", new String(message.getBody()));
                }
                // 返回消费状态
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            }
        });
        // 启动消费者实例
        consumer.start();
        
        // 持续运行，等待接收消息
        Thread.sleep(Long.MAX_VALUE);
        
        // 关闭消费者实例
        consumer.shutdown();
    }
}
```

以上示例中，生产者发送了一条消息到名为 `test_topic`、标签为 `test_tag` 的主题中，消费者订阅了该主题和标签，并在消息到达时打印消息内容。注意，消费者需要持续运行以等待接收消息，因此在示例中使用了 `Thread.sleep(Long.MAX_VALUE)` 进行等待。

希望这个例子能对你有所帮助。

#### 你怎么理解 RESTful

#### 说说如何设计一个良好的 API

#### 如何理解 RESTful API 的幂等性

#### 如何保证接口的幂等性

#### 说说 CAP 定理、 BASE 理论

#### 怎么考虑数据一致性问题

#### 说说最终一致性的实现方案

#### 你怎么看待微服务

#### 微服务与 SOA 的区别

#### 如何拆分服务

#### 微服务如何进行数据库管理

#### 如何应对微服务的链式调用异常

#### 对于快速追踪与定位问题

#### 微服务的安全

### 分布式

#### 谈谈业务中使用分布式的场景

#### Session 分布式方案

Session分布式方案主要是为了解决单个应用服务器无法承载大量Session数据带来的问题，例如单点故障、性能瓶颈等。常见的Session分布式方案有以下几种：

1. 数据库存储方案：将Session数据存储到共享数据库中，所有应用服务器都可以访问该数据库，实现Session的共享。这种方案实现简单，但是对于高并发和大量Session数据的应用来说，数据库的性能可能成为瓶颈。

2. 缓存存储方案：将Session数据存储到共享缓存中，所有应用服务器都可以访问该缓存，实现Session的共享。这种方案相比数据库存储方案性能更好，但是缓存的容量和性能也是限制因素。

3. 分布式存储方案：将Session数据存储到分布式存储系统中，例如Redis Cluster、Hazelcast等，所有应用服务器都可以访问该分布式存储系统，实现Session的共享。这种方案相比前两种方案性能更好，同时也可以支持更大规模的Session数据。

需要注意的是，在使用Session分布式方案时，应该注意Session数据的一致性和容错性问题，例如负载均衡器的Session粘滞策略、Session数据的备份和恢复等。

#### 分布式锁的场景

#### 分布式锁的实现方案

#### 分布式事务

分布式事务是指在分布式系统中，跨越多个节点的事务操作，保证所有节点的操作要么全部成功，要么全部失败。在分布式系统中，由于存在网络延迟、节点故障等因素，分布式事务的实现比本地事务更加困难。

目前常见的分布式事务实现方式有两种：

1. **两阶段提交**（Two-Phase Commit，2PC）：2PC是一种基于协调者-参与者模型的分布式事务协议，事务的提交分为两个阶段：准备阶段和提交阶段。在准备阶段，协调者向所有参与者发送事务准备请求，并等待所有参与者的响应。在所有参与者都准备就绪后，协调者向所有参与者发送事务提交请求，参与者执行事务操作并向协调者发送操作结果。在协调者接收到所有参与者的操作结果后，如果所有参与者都成功执行了事务操作，则协调者向所有参与者发送事务提交通知，否则协调者向所有参与者发送事务回滚通知。2PC的优点是实现简单、可靠性高，但是存在单点故障和阻塞问题。

2. **补偿事务**（Compensating Transaction）：补偿事务是一种基于本地事务的分布式事务实现方式，每个分布式事务被视为一系列本地事务的集合，每个本地事务都有对应的回滚操作。当分布式事务出现异常时，可以执行回滚操作以保证数据的一致性。补偿事务的优点是实现灵活，可以避免2PC的阻塞问题，但是实现复杂度较高，需要保证每个本地事务的回滚操作正确执行。

需要注意的是，在使用分布式事务时，应该选择适合自己场景的实现方式，同时注意事务的性能和可靠性问题，尽可能避免数据的不一致性。

Spring Cloud分布式事务是一种在分布式架构下保证数据一致性的解决方案。在分布式系统中，由于各个节点的独立性和并发性，可能会导致数据不一致的问题。为了解决这个问题，Spring Cloud提供了一些解决方案，如分布式事务管理框架、消息中间件等。

其中，分布式事务管理框架主要包括两种实现方式：XA和TCC。**XA协议是一种两阶段提交的协议**，它能够保证分布式事务的原子性和一致性，但是由于需要协调多个节点的状态，性能较差。而**TCC机制则是一种基于补偿的事务机制**，它通过在分布式系统中定义“Try-Confirm-Cancel”三个阶段，实现分布式事务管理。

在Spring Cloud中，常用的分布式事务管理框架包括**Seata**和Hmily。Seata是一个开源的分布式事务解决方案，它支持XA和TCC两种事务模式，并提供了高可用、高性能的分布式事务管理功能。Hmily则是一种轻量级的分布式事务解决方案，它采用TCC机制实现分布式事务管理，具有性能高、可扩展性好等优点。

总之，Spring Cloud分布式事务是一种保证分布式系统数据一致性的重要解决方案，它可以帮助开发者快速解决分布式事务管理问题，提高系统的可靠性和稳定性。

#### 集群与负载均衡的算法与实现

Spring Cloud Alibaba提供了一种基于Nacos的服务注册与发现功能，同时也提供了一种自动化的负载均衡解决方案——Spring Cloud LoadBalancer。

Spring Cloud LoadBalancer是一个基于Ribbon实现的客户端负载均衡器，它可以自动从Nacos Server中获取服务列表，并根据一定的负载均衡策略，将请求分发到不同的服务实例中。在使用Spring Cloud LoadBalancer时，我们只需要在应用程序中添加相应的依赖和配置，就可以实现自动化的负载均衡功能。

具体来说，使用Spring Cloud LoadBalancer可以分为以下几个步骤：

1. 在项目中添加相应的依赖，如spring-cloud-starter-alibaba-nacos-discovery和spring-cloud-starter-alibaba-loadbalancer等。

2. 配置服务注册和发现功能，包括注册中心地址、服务名称等。

3. 配置负载均衡策略，如随机算法、轮询算法等。

4. 在代码中使用@LoadBalanced注解，开启负载均衡功能。

例如，以下代码演示了如何使用Spring Cloud LoadBalancer实现负载均衡功能：

```java
@RestController
public class TestController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/test")
    public String test() {
        String result = restTemplate.getForObject("http://service-provider/test", String.class);
        return result;
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

在上述代码中，我们通过配置@LoadBalanced注解，开启了RestTemplate的负载均衡功能。当我们调用"http://service-provider/test"时，Spring Cloud LoadBalancer会自动从Nacos Server中获取服务列表，并根据负载均衡策略，将请求分配到不同的服务实例中。

总之，Spring Cloud Alibaba提供了一种自动化的负载均衡解决方案——Spring Cloud LoadBalancer，它可以帮助我们快速实现负载均衡功能，提高系统的可用性和性能。

#### 说说分库与分表设计

分库与分表是一种常见的数据库水平扩展的方式，可以在处理大量数据和高并发访问的情况下提高数据库的性能和可扩展性。

在设计分库与分表时，需要考虑以下几个因素：

1. 数据库设计：在分库与分表之前，需要先设计好数据库结构和数据模型。这包括表的字段设计、索引设计、数据类型选择等。

2. 分库策略：分库策略是指将数据按照某种规则分布到不同的数据库中。常见的分库策略有按照用户ID、按照日期、按照地理位置等。需要根据实际情况选择合适的分库策略。

3. 分表策略：分表策略是指将同一张表的数据按照某种规则分散到不同的物理表中。常见的分表策略有按照日期、按照数据类型、按照数据量等。需要根据实际情况选择合适的分表策略。

4. 业务逻辑：在分库与分表之后，需要重新设计业务逻辑，确保在多个数据库和表之间的数据一致性和正确性。

5. 性能优化：在实际应用中，需要根据实际情况对分库和分表进行性能优化。例如，可以使用缓存技术、分片技术、读写分离等方式提高数据库的性能和可扩展性。

总的来说，分库与分表是一种有效的数据库水平扩展方式，但需要根据实际情况进行设计和优化。需要考虑数据模型、分库分表策略、业务逻辑和性能优化等方面的因素。

#### 分库与分表带来的分布式困境与应对之策

### 安全问题

#### 安全要素与 STRIDE 威胁

#### 防范常见的 Web 攻击

#### 服务端通信安全攻防

#### HTTPS 原理剖析

HTTPS全称是Hyper Text Transfer Protocol Secure，是HTTP的安全版本。HTTPS是一种通过加密和认证方式保护在网络上进行数据传输的协议。它使用 SSL/TLS 协议来加密数据，使得数据传输过程中的信息无法被窃听、篡改或伪造。 HTTPS通常用于安全敏感的网站，如网上银行、电子商务等网站。与HTTP相比，HTTPS的安全性更高，但会稍微降低一些传输速度。

##### https配置方法

实现HTTPS需要经过以下步骤：

1. 申请SSL证书：SSL证书是用来加密和认证网站身份的，可以通过第三方机构（如Symantec、Comodo、Let's Encrypt等）或自建证书颁发机构（CA）来获得SSL证书。

2. 配置Web服务器：需要在Web服务器上进行配置，以支持HTTPS。具体操作方式会因所用的Web服务器而异，例如在Apache上可以通过配置文件修改。

3. 修改网站代码：需要将网站代码中所有HTTP链接修改为HTTPS链接，以确保网站的所有资源都可以通过HTTPS访问。

4. 测试：经过以上步骤后，需要对HTTPS进行测试，以确保所有的HTTP请求都被正确地重定向到HTTPS，并且所有的资源都可以通过HTTPS访问。

要注意的是，HTTPS的实现需要一定的技术和资源，对于小型网站或个人网站可能不太实用，但对于安全性要求较高的商业网站或政府机构等，使用HTTPS是非常必要的。

##### https原理

HTTPS的原理是通过 SSL/TLS 协议来实现数据加密和身份认证。SSL/TLS 协议是一种在传输层提供安全性的协议，它利用公钥和私钥对数据进行加密和解密，从而保证数据在传输过程中的安全性。具体来说，HTTPS的原理可以分为以下几个步骤：

1. 客户端向服务器发送请求：客户端（浏览器）向服务器发送HTTPS请求，请求中包含HTTPS协议版本号、加密算法列表、随机数等信息。

2. 服务器返回证书：服务器返回数字证书，证书中包含服务器的公钥，以及证书颁发机构（CA）等信息。客户端通过证书验证服务器的身份信息。

3. 协商加密算法：客户端和服务器协商选择一种加密算法，用于对数据进行加密和解密。在 SSL/TLS 中，常用的加密算法有 RSA、AES、DES、RC4 等。

4. 建立安全连接：客户端使用服务器的公钥对随机数进行加密，然后将加密后的密文发送给服务器。服务器使用自己的私钥对密文进行解密，得到随机数。客户端和服务器使用这个随机数生成对称密钥，用于对数据进行加密和解密。此时，客户端和服务器之间的通信已经是加密的。

5. 客户端向服务器发送请求：客户端使用建立好的安全连接向服务器发送HTTP请求，请求中包含HTTP报文和加密后的数据。

6. 服务器返回响应：服务器使用对称密钥对响应数据进行加密，然后将加密后的密文发送给客户端。

7. 客户端解密响应：客户端使用对称密钥对密文进行解密，得到原始的响应数据。客户端和服务器之间的通信结束。

通过以上步骤，HTTPS可以确保数据在传输过程中的安全性和完整性，同时也可以防止中间人攻击等安全问题。

#### HTTPS 降级攻击

HTTPS 降级攻击是一种网络攻击，攻击者试图使得一个HTTPS连接降级为HTTP连接，从而窃取敏感信息或者进行其他恶意行为。攻击者通常会使用中间人攻击的手段，劫持HTTPS通信，然后向客户端和服务器发送伪造的信息，导致HTTPS连接降级为HTTP连接。这样的话，攻击者就可以窃取用户的敏感信息，例如登录凭证、信用卡号等。

为了防止HTTPS降级攻击，可以采取以下措施：

1. 使用HSTS：HSTS（HTTP Strict Transport Security）是一种安全协议，可以强制客户端在与网站通信时始终使用HTTPS协议，从而防止降级攻击。网站可以通过在HTTP响应头中添加HSTS指令来启用HSTS。

2. 禁用旧版协议：网站可以禁用TLS 1.0/1.1等旧版协议，只使用TLS 1.2及以上的协议，从而防止降级攻击。

3. 监测网络流量：可以使用网络流量监测工具，及时发现和阻止降级攻击。

4. 加强认证：网站可以采用双因素认证或其他认证措施，增强用户的身份认证，从而防止攻击者窃取用户的敏感信息。

总之，防止HTTPS降级攻击需要不断加强安全措施，保护用户的数据安全。

#### 授权与认证

#### 基于角色的访问控制

rbac

#### 基于数据的访问控制

### 性能优化

#### 性能指标有哪些

#### 如何发现性能瓶颈

#### 性能调优的常见手段

#### 说说你在项目中如何进行性能调优

## 工程篇

### 需求分析

#### 你如何对需求原型进行理解和拆分

#### 说说你对功能性需求的理解

#### 说说你对非功能性需求的理解

#### 你针对产品提出哪些交互和改进意见

#### 你如何理解用户痛点

### 设计能力

#### 说说你在项目中使用过的 UML 图

#### 你如何考虑组件化

#### 你如何考虑服务化

#### 你如何进行领域建模

#### 你如何划分领域边界

#### 说说你项目中的领域建模

#### 说说概要设计

### 设计模式

#### 你项目中有使用哪些设计模式

#### 说说常用开源框架中设计模式使用分析

#### 说说你对设计原则的理解

#### 23种设计模式的设计理念

#### 设计模式之间的异同，例如策略模式与状态模式的区别

#### 设计模式之间的结合，例如策略模式+简单工厂模式的实践

#### 设计模式的性能，例如单例模式哪种性能更好

### 业务工程

#### 你系统中的前后端分离是如何做的

#### 说说你的开发流程

#### 你和团队是如何沟通的

#### 你如何进行代码评审

#### 说说你对技术与业务的理解

#### 说说你在项目中经常遇到的 Exception

#### 说说你在项目中遇到感觉最难Bug，怎么解决的

#### 说说你在项目中遇到印象最深困难，怎么解决的

#### 你觉得你们项目还有哪些不足的地方

#### 排查工具

Java常见排查工具有：

1. jstack：用于生成Java虚拟机线程的快照，可以用来查看线程状态、死锁等问题。

2. jmap：用于生成Java虚拟机堆转储快照，可以用来查看内存占用情况、对象分布等信息。

3. jstat：用于监视Java虚拟机的各种运行时状态，如垃圾回收、类加载、线程状态等。

4. jconsole：一个Java虚拟机监视和管理控制台，可以用来查看Java虚拟机的性能指标、线程状态、内存使用情况等。

5. VisualVM：一个功能强大的Java虚拟机监视和性能分析工具，支持多种插件和扩展，可以用来分析内存泄漏、性能瓶颈等问题。

6. Java Flight Recorder（JFR）：一个Java虚拟机的事件记录器，可以用来记录和分析Java虚拟机在运行过程中的各种事件和性能指标。

7. GC日志分析工具：如G1LogViewer、GCEasy等，用于分析Java虚拟机的垃圾回收日志，可以帮助定位内存泄漏、GC瓶颈等问题。

8. jps是Java Virtual Machine Process Status Tool的缩写，是JDK自带的命令行工具，可以列出当前系统中所有正在运行的Java进程的进程ID和主类名。可以使用jps命令来确定Java进程的进程ID，然后再使用其他工具来进行排查。

    例如，可以使用以下命令列出当前系统中所有正在运行的Java进程的进程ID和主类名：

    ```sh
    jps -l
    ```

    也可以只列出进程ID：

    ```sh
    jps -v
    ```

    其中，-v选项可以列出JVM参数，-l选项可以列出完整的主类名。

除了上述工具，还有一些第三方工具，如AppDynamics、New Relic等，可以提供更全面的应用程序性能监控和分析。

#### 你是否遇到过 CPU 100% ，如何排查与解决

#### 你是否遇到过 内存 OOM ，如何排查与解决

#### 说说你对敏捷开发的实践

#### 说说你对开发运维的实践

#### 介绍下工作中的一个对自己最有价值的项目，以及在这个过程中的角色

### 系统篇

#### k8s 和 docker compose

Kubernetes和Docker Compose都是用于容器编排的工具，但它们之间有很大的差异。

Docker Compose是一个简单的工具，用于定义和运行多个Docker容器的应用程序。它通过一个YAML文件定义应用程序的服务、网络和存储等组件，然后使用docker-compose命令来启动、停止和管理这些组件。Docker Compose适用于单机场景，不支持高可用和动态扩容等特性。

Kubernetes是一个开源容器编排平台，用于自动化部署、扩展和管理容器化应用程序。它将容器组织成逻辑单元，称为Pod，可以自动处理容器的运行、复制、网络和存储等方面的问题。Kubernetes支持多节点和多集群的部署，具有高可用、自动扩容和自动恢复等特性。

虽然Kubernetes比Docker Compose更复杂，但它更适合于生产环境中的容器编排和管理。如果你只是在本地测试或开发应用程序，那么Docker Compose可能是更好的选择。
