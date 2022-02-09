# spring

[toc]

## IOC

### 目的和原理

进行对象创建及管理调用
* 创建对象
* 注入属性(DI) 对ioc的具体实现
* 装配调用

实现的原理主要包含：
* 工厂模式
* 配置解析
* 反射

使用工厂模式创建对象，通过配置获取需要创建对象的类，使用反射创建对象。


### 以XML方式配置

#### XML方式创建对象

```java
class User {
    public String name;
    public User user;

    public User(String argname){
        this.name = name;
    }

    private void setName(String argname){
        this.name = name;
    }

    private void setUser(User user){
        this.user = user;
    }

    private User getUser(){
        return user;
    }
}
```

```xml
<!--创建对象-->
<bean id="user" class"com.company.User"></bean>
```

id：唯一标识
name：现在不用了 以前struts用的
class：类名（包含包名）

创建时默认是无参构造函数调用创建

```java
ApplicationContext context =
    new ClassPathXmlApplicationContext("xml.xml");
User user = context.getBean("user",User.class);
```

* BeanFactory：框架内部使用，加载配置时并不会创建对象；
* ApplcationContext：框架实际的对外接口，加载配置是就会创建对象，方便启动时先进行加载，节省运行中创建对象的消耗；

ApplicationContext 有多个实现

#### XML方式注入属性

##### 手动装配

* 通过set注入
* 通过构造函数进行注入

还可以通过spring xml p命名空间进行简化xml通过set注入的配置书写

```xml
<!--通过set注入-->
<bean id="user" class="com.company.User">
    <property name="name" value="小明"></property>

    <!--级联赋值，但要注意生成内部user的get方法-->
    <property name="user.name" value="小明"></property>
    <!--注入bean对象 外部bean-->
    <property name="user" ref="user"></property>
    <property name="name"><value>
    <!--内部bean-->
        <bean id="user" class="com.company.User"> 
            <property name="name" value="xiaoming"></property>
        </bean>
    </value>
    </property>
     <!--设置空值-->
    <property name="name"><null/></property>
     <!--特殊符号-->
    <property name="name"><value><![CDATA[<<>>]]></value></property>
     <!--数组-->
    <property name="name">
        <array>
            <value></value>
            <value></value>
        </array>
    </property>
     <!--list-->
    <property name="name">
        <list>
            <value></value>
            <value></value>
        </list>
    </property>
     <!--set-->
    <property name="name">
        <set>
            <value></value>
            <value></value>
        </set>
    </property>
     <!--map-->
    <property name="name">
        <map>
            <entry key="" value=""></entry>
            <entry key="" value=""></entry>
            <entry key="" value=""></entry>
        </map>
    </property>
     <!--对象集合类-->
    <property name="name">
        <list>
            <ref bean="id"></ref>
        </list>
    </property>
</bean>

<!--通过构造函数注入-->
<bean id="user" class"com.company.User">
    <!--通过名称注入-->
    <constructor-arg name="argname" value=""></constructor-arg> 
    <!--通过索引位置-->
    <constructor-arg index="0" value=""></constructor-arg>
</bean>
```

使用spring xml util命名空间可以提取集合类的数据内容方便重用

##### 自动装配

通过设置autowire属性通过某种方式自动装配
* byName:bean的id属性与注入属性的属性名相同
* byType:bean的class与注入属性的类型相同

```xml
<bean id="user" class"com.company.User" autowire=""></bean>
```

#### bean的作用域，及其生命周期

* bean (返回的是自身对象)
* factory bean (返回工厂创建的对象) : 实现FactoryBean接口

可以设置bean对象为单实例或者多实例

默认是单实例对象

bean标签的scope属性：
* singleton: 单例, spring启动时创建对象
* prototype: 多例, 调用getbean时创建对象
* request
* session

```xml
<bean id="user" class"com.company.User" scope=""></bean>
```

bean生命周期
1. 创建实例（无参构造方法）
2. 属性注入(xml设置:bean标签中各种注入方法)
3. 当实现bean后置处理器(实现BeanPostProcesser接口postProcessBeforeInitialization)时会将bean实例传递给后置处理器
4. 调用配置的初始化方法(xml设置:bean标签中init-method属性) 
5. 当实现bean后置处理器(实现BeanPostProcesser接口postProcessAfterInitialization)时会将bean实例传递给后置处理器
6. 创建完成可以正常使用
7. 容器关闭，调用配置的销毁方法(xml设置: bean标签中destroy-method属性)

```xml
<bean id="user" class"com.company.User" init-method="" destroy-method=""></bean>
```

#### XML方式引入外部配置文件

需要使用spring xml context 命名空间

```properties
#配置文件
type.name=xiaoming
```

```xml
<context:property-placeholder location="classpath:xxx.properties">
<bean id="user" class"com.company.User">
    <property name="" value="${type.name}"></property>
</bean>
```

### 以注解方式配置
注解：`@注解名称(属性=属性值,属性=属性值,...)`

注解可以用在类,方法,属性上

spring的注解引入spring-aop
并且在xml中引入context命名空间,启动组件扫描

```xml
<!-- 多个包扫描 -->
<context:component-scan 
    base-package="com.company.dao, com.company.controller">
</context:component-scan>
<!-- 上层目录 -->
<context:component-scan base-package="com.company">
</context:component-scan>
```
#### 组件扫描相关配置

```xml
<!-- 配置自定义的filter -->
<context:component-scan 
    base-package="com.company.controller"
    use-default-filter="false" >
    <!--包含-->
    <context:include-filter
        type="annotation"
        expression="com.company.controller" />
    <!--排除-->
    <context:exclude-filter
        type="annotation"
        expression="com.company.controller" />
</context:component-scan>
```


#### 注解创建对象

* @Component
* @Service
* @Controller
* @Repository

功能相同，通过名称方便区分所创建的bean的作用

```java
// 可以不写value默认为类名但首字母小写，就如同这里的value的值一样
@Component(value="userService")
public class UserService{ ... }
```

```java
ApplicationContext context = new ClassPathXmlApplicationContext("xml.xml");
UserService userService = context.getBean("userService", User.class);
```

#### 注解方式注入属性

* @AutoWired: 根据属性类型进行自动装配
* @Qualifier: 根据属性名称进行注入, 主要用于@AutoWired出现歧义时补充说明的作用
* @Resource: 根据类型或者名称进行注入,属于javax包并非spring提供
* @Value: 内置类型属性注入

与xml不同, 不需要添加set方法进行注入

```java
@AutoWired
private User user;

// 依照bean创建的注解名称进行注入例如：@Repository(value="adminUser")
@AutoWired
@Qualifier(value="adminUser")k
private User user;

// @Resource 通过类型进行注入
@Resource
private User user;

// @Resource 通过名称进行注入
@Resource(name="adminUser")
private User user;

@Value(value="xiaoming")
private String name;
```

#### 完全注解开发

创建配置类

```java
@Configuration
@ComponentScan(basePackage="com.company")
public class SpringConfig {
...
}
```

测试调用方法

```java
ApplicationContext context =
    new AnnotationConfigApplicationContext(SpringConfig.class);
User user = context.getBean("user",User.class);
```

## AOP

面向切面编程

AOP的底层使用的是动态代理

* 有接口的情况下使用JDK动态代理: 通过创建接口实现的代理对象从而对方法进行增强
* 没有接口的情况下使用CGLIB动态代理: 通过创建其子类的代理对象从而对方法进行增强

### JDK动态代理

todo

### AOP术语

* 连接点：可以被增强的方法就称为连接点
* 切入点：当前被增强的方法就称为切入点
* 通知（增强, advice）：新增加的部分逻辑代码
    * 前置通知@Before
    * 后置通知(返回通知)@AfterReturning
    * 环绕通知@Around
    * 异常通知@AfterThrowing
    * 最终通知@After
* 切面：通知应用到切入点的过程就称为切面

### Spring 使用 AOP

spring 通过 AspectJ实现AOP的操作

* 基于xml配置实现
* 基于注解方式实现(推荐)

#### 切入点表达式

```java
```

#### 注解方式实现AOP

```java
@Component
class User{
    public void login(){}
}

@Component
@Aspect
class UserProxy{

    //共通切入点
    @Pointcut(value="execution()")
    public void point(){}

    //调用共通切入点 这样调用的就是同样的切入点了
    @After(value="point()")
    @Order(1)
    public void after(){}

    @Before(value="execution()") // 里面属性值是增强表达式
    public void before(){}

    @Around()
    public void around(ProceedingJoinPoint pjp)
        throws Throwable{
        // before
        // 被增强的方法
        pjp.proceed();
        // after
    }
}
```

通过@Order(整型数值)来设置对同一方法增强的优先级，数值小优先级高

如果使用xml开启注解则在xml中添加如下启用aspectJ生成代理对象
```xml
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
```

完全注解方式使用 `@EnableAspectJAutoProxy(proxyTargetClass=true)` 开启

#### XML方式实现AOP

```xml
<aop:config>
    <!--切入点-->
    <aop:pointcut id="" expression="execution()" />
    <aop:aspect ref="bean_id">
        <aop:before method="before" pointcut-ref="method_name"/>
    </aop:aspect>
</aop:config>
```

## jdbc_template

通过之前的方式创建需要使用jdbcTemplate的bean和注入dataSource属性

创建对应数据库的实体类

使用jdbcTemplate对实体进操作即可

```java
jdbcTemplate.update(sql, Object ...args);
```

增删改查
批量增删改查

### 事务

@Transcational 常见属性功能

* propagation:传播行为，调用方法时的事务行为, 例如：`@Transactional(propagation=Propagation.REQUIRED)`
    * REQUIRED: 有事务就直接用当前的事务，没有事务启动新事务 
    * REQUIRED_NEW: 无论是否有事务都启动新事务
    * SUPPORTS: 
    * NOT_SUPPORTS:
    * MANDATORY:
    * NEVER:
    * NESTED:
* ioslation:隔离级别, 多个事务之间的影响，涉及脏读，不可重复读，幻（虚）读 这类数据库问题
    * READ UNCOMMITTED: 读未提交 有脏读，有不可重复读， 有幻读
    * READ COMMITTED: 读已提交 无脏读
    * REPEATABLE READ: 可重复读 无脏读，无不可重复读
    * SERIALIZABLE: 串行化 无脏读，无重复读，无幻读
* timeout:超时, 提交的超时时间，超时后回滚, 默认不超时: -1
* readOnly:只读
* 设置某些异常进行或不进行回滚
    * rollbackFor:回滚
    * noRollbackFor:不回滚

#### XML进行事务管理

```xml
<bean id="transactionManager"
    class="org.springfromwork.jdbc.datasource.DataSourceTranscationManager" >
    <property name="dataSource" ref="dataSource"></property>
</bean>

<tx:advice id="txadvice">
    <tx:attributes>
        <tx:method name="methodname" propagation="REQUIRED"/>
        <tx:method name="methodname*"/>
    </tx:attributes>
</tx:advice>

<aop:config>
    <aop:pointcut id="" expression=""/>
    <aop:advisor ref="" />
</aop:confing>
```


#### 注解方式进行事务管理

## Spring5 的一些新特点

* 基于java8
* 内置了log4j2日志
* @Nullable
* 支持函数式编程通过GenericApplicationContext托管对象到spring
* 支持整合junit5
* SpringWebFlux