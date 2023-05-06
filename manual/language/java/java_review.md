# java面试复习手册

[toc]

[题目-参考资料](https://juejin.im/post/5a94a8ca6fb9a0635c049e67)

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

### 集合

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

### 线程

#### 创建线程的方式及实现

#### sleep() 、join（）、yield（）有什么区别

#### 说说 CountDownLatch 原理

#### 说说 CyclicBarrier 原理

#### 说说 Semaphore 原理

#### 说说 Exchanger 原理

#### 说说 CountDownLatch 与 CyclicBarrier 区别

#### ThreadLocal 原理分析

#### 讲讲线程池的实现原理

#### 线程池的几种方式

#### 线程的生命周期

### 锁机制

#### 说说线程安全问题

#### volatile 实现原理

#### synchronize 实现原理

#### synchronized 与 lock 的区别

#### CAS 乐观锁

#### ABA 问题

#### 乐观锁的业务场景及实现方式

## 核心篇

### 数据存储

#### MySQL 索引使用的注意事项

#### 说说反模式设计

#### 说说 SQL 优化之道

#### MySQL 遇到的死锁问题

#### 存储引擎的 InnoDB 与 MyISAM

#### 数据库索引的原理

#### 为什么要用 B-tree

#### 聚集索引与非聚集索引的区别

#### limit 20000 加载很慢怎么解决

#### 选择合适的分布式主键方案

#### 选择合适的数据存储方案

#### ObjectId 规则

#### 聊聊 MongoDB 使用场景

#### 倒排索引

#### 聊聊 ElasticSearch 使用场景

### 缓存使用

#### Redis 有哪些类型

#### Redis 内部结构

#### 聊聊 Redis 使用场景

#### Redis 持久化机制

#### Redis 如何实现持久化

#### Redis 集群方案与实现

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

##### xml方式配置bean

```xml
<bean class="com.company.project.CustomClass" id="">
```

##### 主要的注解配置方式

* @Component, @Controller, @Service, @Repository: 直接描述在class定义上就行了, 运行过程中会通过反射去创建
* @Bean: 返回一个对象，可以自己去new
* @Import: TODO

#### Spring Bean 作用域

在 Spring 中，Bean 的作用域可以通过在 Bean 定义中配置 `scope` 属性来指定。具体可以配置的作用域包括：

* singleton：默认的作用域，每个 Spring 容器中只存在一个 Bean 实例。
* prototype：每次请求或注入时创建一个新的 Bean 实例。
* request：每个 HTTP 请求都会创建一个新的 Bean 实例，仅在 Web 应用中可用。
* session：每个 HTTP 会话都会创建一个新的 Bean 实例，仅在 Web 应用中可用。
* globalSession：每个全局 HTTP 会话都会创建一个新的 Bean 实例，仅在基于 Portlet 的 Web 应用中可用。
* application：每个 ServletContext 上下文中只存在一个 Bean 实例，仅在 Web 应用中可用。

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

需要注意的是，不同作用域的 Bean 在生命周期和使用方式上有很大的不同，因此需要根据实际需求进行选择和配置。

在Spring中，我们可以使用`@Scope`注解来配置Bean的作用域。`@Scope`注解可以用在类级别上，也可以用在方法级别上。

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

#### bean 线程安全么

省流: *烂不烂问厨房，安全不安全问作用域*

在Spring中，Bean的线程安全性取决于Bean的作用域。如果一个Bean的作用域是singleton（默认作用域），那么该Bean就是线程不安全的，因为它是在整个应用程序上下文中共享的。多个线程可以同时访问和修改它，这可能会导致数据不一致或其他问题。

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

#### spring bean 如何处理并发问题

Spring框架本身不提供处理并发问题的解决方案，但是它提供了一些机制来帮助应用程序开发人员处理并发问题。

##### 作用域

首先，可以通过设置Bean的作用域来控制并发访问。如前面所述，对于单例Bean，需要注意多线程并发访问的问题。如果需要多线程访问同一个Bean实例，可以使用线程安全的代码保证数据的一致性。如果需要避免并发访问问题，可以将Bean的作用域设置为prototype，这样每个线程都会获得一个独立的Bean实例。

##### @Synchronized 和 同步锁

其次，Spring提供了一个注解`@Synchronized`，它可以用于方法级别，将方法标记为同步方法，以确保多个线程不会同时访问该方法。这个注解的实现方式和Java中的`synchronized` (同步锁) 关键字是类似的，它会在方法上加锁，确保同一时间只有一个线程可以执行该方法。

##### ThreadLocal

是一个Java中的线程局部变量，它提供了一种线程安全的方式来存储每个线程的独立副本。在Spring中，我们可以使用ThreadLocal来存储每个线程中的Bean实例，从而保证线程安全。具体地说，我们可以在Bean定义中使用`@Scope("thread")`注解来声明一个Bean的作用域为线程级别，然后通过ThreadLocal来存储每个线程中的Bean实例。这样，每个线程都有自己的Bean实例，互不干扰，从而实现线程安全。

最后，使用Spring提供的事务管理机制可以帮助我们处理并发问题。事务管理可以确保多个线程之间的数据一致性，并提供了一些机制来确保事务的隔离性和原子性。可以使用Spring提供的声明式事务管理或编程式事务管理来实现事务管理。

总之，Spring框架提供了一些机制来帮助我们处理并发问题，但具体的解决方案还需要根据具体的应用场景和需求来进行选择。

#### spring bean 实例化的方式

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

##### IoC

IoC指的是通过反转应用程序的控制权，将对象的创建和依赖关系的管理交给Spring IOC容器来完成。在传统的应用程序中，对象的创建和依赖关系是由程序员手动管理的，而在Spring中，我们只需要将需要管理的对象交给Spring IOC容器，让它来管理对象的生命周期和依赖关系，从而实现了应用程序的解耦和灵活性。

##### DI

DI指的是将依赖对象通过构造函数或属性注入的方式传递到需要使用它的对象中。通过DI，我们可以将对象之间的依赖关系从应用程序中解耦出来，降低了应用程序的耦合度和复杂度。Spring IOC容器会负责查找需要注入的依赖对象，并将它们注入到需要使用它们的对象中，从而完成依赖注入。

需要注意的是当提到ioc和di的关系时，可以认为是**通过di来实现了ioc这一设计理念**

总之，IoC和DI都是Spring框架中的重要概念，IoC通过反转控制权实现对象的生命周期和依赖关系的管理，DI通过构造函数或属性注入实现对象之间的依赖关系的管理。两者相互配合，可以有效地降低应用程序的耦合度和复杂度，提高应用程序的可维护性和灵活性。

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

#### 说说 Spring AOP

是一个基于AOP编程的框架, 旨在降低代码重复的同时降低耦合性(主要用于日志, 事务, 权限, 异常处理等方面)
*常用的两个aop编程框架 spring aop, AspectJ*
TODO 在spring aop 和 aspectJ 中实现aop

|名称|说明|
|---|---|
|Joinpoint（连接点）|指那些被拦截到的点，在 Spring 中，可以被动态代理拦截目标类的方法。|
|Pointcut（切入点）|指要对哪些 Joinpoint 进行拦截，即被拦截的连接点。|
|Advice（通知）|指拦截到 Joinpoint 之后要做的事情，即对切入点增强的内容。|
|Target（目标）|指代理的目标对象。|
|Weaving（植入）|指把增强代码应用到目标上，生成代理对象的过程。|
|Proxy（代理）|指生成的代理对象。|
|Aspect（切面）|切入点和通知的结合。|

#### Spring AOP 实现原理

基于代理模式, 并使用JDK(通过java.lang.reflect.Proxy实现), CGLIB(Code Generation Library 一个高性能代码生成包, 被很多主流AOP框架所使用)动态代理来实现
*glib 的底层是asm(小而快的字节码处理框架)*

#### 动态代理（cglib 与 JDK）

这在上面的aop原理中已经包含了, 可以反答aop或者继续深入吧

#### Spring 事务实现方式

xml方式声明管理和annotation注解方式声明管理

#### Spring 事务底层原理

基于aop

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

### Netty

#### 为什么选择 Netty

#### 说说业务中，Netty 的使用场景

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

#### 你怎么理解 RPC 框架

#### 说说 RPC 的实现原理

#### 说说 Dubbo 的实现原理

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

#### 分布式锁的场景

#### 分布式锁的实现方案

#### 分布式事务

#### 集群与负载均衡的算法与实现

#### 说说分库与分表设计

#### 分库与分表带来的分布式困境与应对之策

### 安全问题

#### 安全要素与 STRIDE 威胁

#### 防范常见的 Web 攻击

#### 服务端通信安全攻防

#### HTTPS 原理剖析

#### HTTPS 降级攻击

#### 授权与认证

#### 基于角色的访问控制

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

#### 你是否遇到过 CPU 100% ，如何排查与解决

#### 你是否遇到过 内存 OOM ，如何排查与解决

#### 说说你对敏捷开发的实践

#### 说说你对开发运维的实践

#### 介绍下工作中的一个对自己最有价值的项目，以及在这个过程中的角色
