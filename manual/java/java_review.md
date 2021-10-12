# java面试复习手册

[toc]

[题目-参考资料](https://juejin.im/post/5a94a8ca6fb9a0635c049e67)

## 基础篇

### 基本功

* 面向对象的特征
    > 封装, 继承(基类和接口的方式分别对应泛化和聚合的继承方式), 多态(重写, 重载)
    >
    > *简单说说毕竟这个概念能写一章呢*

* final, finally, finalize 的区别
    > final: 修饰符(可以修饰类, 变量, 方法)
    >
    > 1. 修饰类: 不能够再派生子类
    > 2. 修饰变量: 无法修改变量内容
    > 3. 修饰方法: 无法重写
    >
    > finally: 处理异常时最后执行操作的代码块
    >
    > finalize: Object的方法, 在被垃圾回收前进行调用
    >
    > 名字类似但是实际上完全作用在不同概念下的关键字, *烂俗的概念混淆*

* int 和 Integer 有什么区别

    > Integer是int的包装器类
    >
    > 类似的还有 byte与Byte, short与Short, long与Long, float与Float, double与Double, char与Char, boolean与Boolean
    > 初始值和判断相等这些操作都需要注意一下

* 重载和覆盖(重写)的区别

    > 重载: 是相同方法名参数数量不同, 根据不同的参数调用不同的方法
    > 覆盖(重写): 是将继承的方法进行重新实现, 参数数量必须相同
    >
    > 名字相似概念中都包含参数数量的问题, 其实没啥可比性, *都是烂俗的混淆概念*

* 抽象类和接口有什么区别

    > 首先, 类和接口的区别, 构造方法, 成员变量, 静态方法都是接口所不具备的
    >
    > 其次, 可以实现多个接口, 但是只能继承于一个父类
    >
    > 一个非常特殊的点, 当抽象类实现接口时不需要像普通类(继承于抽象类或者接口时)实现所有的方法, 只需要作为抽象方法即可, 这些将由子类去实现
    >
    > 另外, 还有抽象类继承抽象类的问题, 只能添加新的抽象方法, 成员变量等, 无法覆盖父类的抽象方法

* 说说反射的用途及实现

    > 动态的创建, 修改, 使用对象, 做一些骚操作
    >
    > 大部分反射需要用到的类都在java.lang.relfect下
    >
    > 容易导致安全问题, 破坏封装, 而且会消耗额外的资源, 需要按照实际需求使用

* 说说自定义注解的场景及实现

    > 可以用于实现一些AOP例如权限控制, 日志记录, 数据库切换, 事务处理等工作
    > 实现 TODO: 我还不知道怎么说这个

* HTTP 请求的 GET 与 POST 方式的区别

    > POST 和 GET 本质上都是 TCP 连接, 在参数传递, 请求结构上有所区别
    > 其中要注意 POST 方法在大部分浏览器上会发送两次请求而 GET 只有一次

* session 与 cookie 区别

    > session 是服务器端保存的一个数据结构用来追踪用户的状态, 可以落地到数据库或者文件中
    > cookie 是客户端保存用户信息的机制, 可以用来记录用户的信息, 是session的一种实现方式
    >
    > 当cookie被禁用时需要通过url重写添加sid的到url后进行识别完成session判断, 或者使用jwt等方式实现
    >
    > 部分大厂浏览器开始迫于隐私要求禁用cookie

* session 分布式处理 (集群部署下的session处理)

    > 一般用5种处理方式
    > 粘性session
    > 服务器seesion复制
    > session共享(包含两种方式粘性和非粘性)
    > session持久到数据库
    > 利用terracotta实现session复制

* JDBC 流程

    > 第一步：加载Driver类，注册数据库驱动；
    > 第二步：通过DriverManager,使用url，用户名和密码建立连接(Connection)；
    > 第三步：通过Connection，使用sql语句打开Statement对象；
    > 第四步：执行语句，将结果返回resultSet；
    > 第五步：对结果resultSet进行处理；
    > 第六步：倒叙释放资源resultSet-》preparedStatement-》connection。

* MVC 设计思想(MVC是什么)

    > *就答MVC是什么就行了, 有时候出题的就是看着面大答的少*
    > model, view, controller 对应三种职责, 模型, 视图, 控制器
    > model: 主要包含数据获取, 逻辑处理, 设计为单一职责的处理单元
    > view: 前端展现的视图单元, 可以通过cotroller指定渲染
    > controller: 相当于view与model的胶水层, 主要将多个model和view结合起来

* equals 与 == 的区别

    > `equals` 是对象值相等, `==` 是指针地址相等
    > 栈区中的`int, float...`等基础类型是可以使用`==`的
    > 有一个特殊情况, `""` 是可以使用==的 `""` 是在堆区的 比如 `"" == ""` 是true
    > 另外, `String str = ""; str == ""` 也是true
    > 以上的String 虽然是String 但是指向的是常量, 这是jvm优化的产物, 所以相同字符串指向同一对象, 只有 `new String("")` 时才会产生新的对象, 同时注意如果 `new` 的时候常量不存在也会向常量池中添加该对象的字符串常量但是地址并不相等是两个对象

    ```java
    String str1 = "";
    String str2 = "";
    String str3 = new String("");

    out.println(str1 == str2); // true
    out.println("" == ""); // true
    out.println(str1 == ""); // true
    out.println(str1 == str3); // false
    ```

### 集合

* List, Set 和 Map 区别
    > Set 是不能有重复的, 其本质是数组, 可以通过equals()方法对比, 可以通过contaians()方法获取set是否包含某一对象
    > List 包含有arraylist(可变数组访问快但是插入删除慢)和linkedlist(链表插入删除快但是访问慢)
    > Map 键值对, 不允许重复, 底层由数组和链表实现, 通过hash值来确定在数组中的某个链表中, hash值由Object的hashCode()方法产生, 可以重写这一方法获得自己独特的hash规则防止hash碰撞(大量的数据对应有限的集合, 势必会出现重复, 如果被利用会出现可用性问题)
    > 不同的场合需要以不同的判断使用

* Arraylist 与 LinkedList 区别

    > `ArrayList` 基于索引, 查询速度和尾部删除插入较快, 而`LinkedList` 通过链表实现,所以插入删除较快

* ArrayList 与 Vector 区别

    > 都是List, 都是通过数组实现, Vector相比ArrayList具有线程同步

* HashMap 和 Hashtable 的区别

    > hashMap: 是由数组和链表组成的, 谈到哈希碰撞的问题: 通过精心安排可以使某数组下的链表查询时间大大加长,从而破坏其访问速度, 解决办法是改写其`hashCode()`的方法
    >

* HashSet 和 HashMap 区别

    > 是set和map的典型实现, 一个是无序集合, 一个是kv对集合

* HashMap 和 ConcurrentHashMap 的区别

* HashMap 的工作原理及代码实现

* ConcurrentHashMap 的工作原理及代码实现

### 线程

* 创建线程的方式及实现
* sleep() 、join（）、yield（）有什么区别
* 说说 CountDownLatch 原理
* 说说 CyclicBarrier 原理
* 说说 Semaphore 原理
* 说说 Exchanger 原理
* 说说 CountDownLatch 与 CyclicBarrier 区别
* ThreadLocal 原理分析
* 讲讲线程池的实现原理
* 线程池的几种方式
* 线程的生命周期

### 锁机制

* 说说线程安全问题
* volatile 实现原理
* synchronize 实现原理
* synchronized 与 lock 的区别
* CAS 乐观锁
* ABA 问题
* 乐观锁的业务场景及实现方式

## 核心篇

### 数据存储

* MySQL 索引使用的注意事项
* 说说反模式设计
* 说说分库与分表设计
* 分库与分表带来的分布式困境与应对之策
* 说说 SQL 优化之道
* MySQL 遇到的死锁问题
* 存储引擎的 InnoDB 与 MyISAM
* 数据库索引的原理
* 为什么要用 B-tree
* 聚集索引与非聚集索引的区别
* limit 20000 加载很慢怎么解决
* 选择合适的分布式主键方案
* 选择合适的数据存储方案
* ObjectId 规则
* 聊聊 MongoDB 使用场景
* 倒排索引
* 聊聊 ElasticSearch 使用场景

### 缓存使用

* Redis 有哪些类型
* Redis 内部结构
* 聊聊 Redis 使用场景
* Redis 持久化机制
* Redis 如何实现持久化
* Redis 集群方案与实现
* Redis 为什么是单线程的
* 缓存奔溃
* 缓存降级
* 使用缓存的合理性问题

### 消息队列

* 消息队列的使用场景
* 消息的重发补偿解决思路
* 消息的幂等性解决思路
* 消息的堆积解决思路
* 自己如何实现消息队列
* 如何保证消息的有序性

## 框架篇

### Spring

* BeanFactory 和 ApplicationContext 有什么区别
* Spring Bean 的生命周期

* Spring IOC 如何实现

    > 通过反射产生对象, 通过DI注入对象(DI是实现IOC的最常见方式)
    > *两种注入方式 `setter注入` 和 `构造方法注入`*

* 说说 Spring AOP

    > 是一个基于AOP编程的框架, 旨在降低代码重复的同时降低耦合性(主要用于日志, 事务, 权限, 异常处理等方面)
    > *常用的两个aop编程框架 spring aop, AspectJ*
    > TODO 在spring aop 和 aspectJ 中实现aop

    |名称|说明|
    |---|---|
    |Joinpoint（连接点）|指那些被拦截到的点，在 Spring 中，可以被动态代理拦截目标类的方法。|
    |Pointcut（切入点）|指要对哪些 Joinpoint 进行拦截，即被拦截的连接点。|
    |Advice（通知）|指拦截到 Joinpoint 之后要做的事情，即对切入点增强的内容。|
    |Target（目标）|指代理的目标对象。|
    |Weaving（植入）|指把增强代码应用到目标上，生成代理对象的过程。|
    |Proxy（代理）|指生成的代理对象。|
    |Aspect（切面）|切入点和通知的结合。|

* Spring AOP 实现原理

    > 基于代理模式, 并使用JDK(通过java.lang.reflect.Proxy实现), CGLIB(Code Generation Library 一个高性能代码生成包, 被很多主流AOP框架所使用)动态代理来实现
    >*cglib 的底层是asm(小而快的字节码处理框架)*

* 动态代理（cglib 与 JDK）

    > 这在上面的aop原理中已经包含了, 可以反答aop或者继续深入吧

* Spring 事务实现方式

    > xml方式声明管理和annotation注解方式声明管理

* Spring 事务底层原理

    > 基于aop

* 如何自定义注解实现功能

* Spring MVC 运行流程, Spring MVC 启动流程

    > 两个题目差不多意思

* Spring 的单例实现原理

    > 通过将bean指定为singleton, 具体实现方法也就是单例模式, 需要达到线程安全和懒加载都不复杂

* Spring 框架中用到了哪些设计模式

    > * 工厂设计模式 : Spring使用工厂模式通过 BeanFactory、ApplicationContext 创建 bean 对象。
    > * 代理设计模式 : Spring AOP 功能的实现。
    > * 单例设计模式 : Spring 中的 Bean 默认都是单例的。
    > * 模板方法模式 : Spring 中 jdbcTemplate、hibernateTemplate 等以 Template 结尾的对数据库操作的类，它们就使用到了模板模式。
    > * 包装器设计模式 : 我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源。
    > * 观察者模式: Spring 事件驱动模型就是观察者模式很经典的一个应用。
    > * 适配器模式 :Spring AOP 的增强或通知(Advice)使用到了适配器模式、spring MVC 中也是用到了适配器模式适配Controller

* Spring 其他产品（Srping Boot、Spring Cloud、Spring Secuirity、Spring Data、Spring AMQP 等）

### Netty

* 为什么选择 Netty
* 说说业务中，Netty 的使用场景
* 原生的 NIO 在 JDK 1.7 版本存在 epoll bug
* 什么是TCP 粘包/拆包
* TCP粘包/拆包的解决办法
* Netty 线程模型
* 说说 Netty 的零拷贝
* Netty 内部执行流程
* Netty 重连实现

## 微服务篇

### 微服务

* 前后端分离是如何做的
* 微服务哪些框架
* 你怎么理解 RPC 框架
* 说说 RPC 的实现原理
* 说说 Dubbo 的实现原理
* 你怎么理解 RESTful
* 说说如何设计一个良好的 API
* 如何理解 RESTful API 的幂等性
* 如何保证接口的幂等性
* 说说 CAP 定理、 BASE 理论
* 怎么考虑数据一致性问题
* 说说最终一致性的实现方案
* 你怎么看待微服务
* 微服务与 SOA 的区别
* 如何拆分服务
* 微服务如何进行数据库管理
* 如何应对微服务的链式调用异常
* 对于快速追踪与定位问题
* 微服务的安全

### 分布式

* 谈谈业务中使用分布式的场景
* Session 分布式方案
* 分布式锁的场景
* 分布式锁的实现方案
* 分布式事务
* 集群与负载均衡的算法与实现
* 说说分库与分表设计
* 分库与分表带来的分布式困境与应对之策

### 安全问题

* 安全要素与 STRIDE 威胁
* 防范常见的 Web 攻击
* 服务端通信安全攻防
* HTTPS 原理剖析
* HTTPS 降级攻击
* 授权与认证
* 基于角色的访问控制
* 基于数据的访问控制

### 性能优化

* 性能指标有哪些
* 如何发现性能瓶颈
* 性能调优的常见手段
* 说说你在项目中如何进行性能调优

## 工程篇

### 需求分析

* 你如何对需求原型进行理解和拆分
* 说说你对功能性需求的理解
* 说说你对非功能性需求的理解
* 你针对产品提出哪些交互和改进意见
* 你如何理解用户痛点

### 设计能力

* 说说你在项目中使用过的 UML 图
* 你如何考虑组件化
* 你如何考虑服务化
* 你如何进行领域建模
* 你如何划分领域边界
* 说说你项目中的领域建模
* 说说概要设计

### 设计模式

* 你项目中有使用哪些设计模式
* 说说常用开源框架中设计模式使用分析
* 说说你对设计原则的理解
* 23种设计模式的设计理念
* 设计模式之间的异同，例如策略模式与状态模式的区别
* 设计模式之间的结合，例如策略模式+简单工厂模式的实践
* 设计模式的性能，例如单例模式哪种性能更好。

### 业务工程

* 你系统中的前后端分离是如何做的
* 说说你的开发流程
* 你和团队是如何沟通的
* 你如何进行代码评审
* 说说你对技术与业务的理解
* 说说你在项目中经常遇到的 Exception
* 说说你在项目中遇到感觉最难Bug，怎么解决的
* 说说你在项目中遇到印象最深困难，怎么解决的
* 你觉得你们项目还有哪些不足的地方
* 你是否遇到过 CPU 100% ，如何排查与解决
* 你是否遇到过 内存 OOM ，如何排查与解决
* 说说你对敏捷开发的实践
* 说说你对开发运维的实践
* 介绍下工作中的一个对自己最有价值的项目，以及在这个过程中的角色
