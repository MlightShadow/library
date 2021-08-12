# 关于设计模式

[toc]

## UML

### 可见性

* public +
* private -
* protected #
* friendly ~

### 属性与操作

1. 属性(成员变量): `[可见性]属性名:类型[=默认值]` 例如: -name:String
2. 操作(方法, 函数): `[可见性]名称(参数列表)[:返回类型]` 例如: +display():void

### 类之间的关系

1. 依赖: 通过局部变量, 方法参数或者静态方法的方式调用访问另一个类. 使用虚线箭头从使用类指向被依赖的类
2. 一般关联: 对象间的引用关系, 双向表示为有两个箭头的实线或者无箭头的实线, 单向表示为单箭头实线(箭头指向被关联的类)
3. 聚合: 成员对象可以脱离整体而存在, 使用空心菱形实线表示, 菱形指向整体
4. 组合: 成员对象不可以脱离整体而存在, 使用实心菱形实线表示, 菱形指向整体
5. 泛化: 继承关系, 使用空心箭头实线, 箭头指向父类
6. 实现: 接口与实现类的关系, 使用空心箭头虚线, 箭头指向接口

## SOLID

### 1988年: 开闭

通过接口和抽象类, 构建一个较为稳定的抽象层, 将可变的因素封装在具体的实现类中

### 1987年: 里氏替换

子类可以扩展父类的功能, 但不尽量不要改变父类原有的功能

### 1996年: 依赖倒置

### 2002年: 单一职责

### 2002年: 接口隔离

### 1987年: 迪米特法则

### 合成复用

### 创建型

#### 工厂

##### 简述

用于隐藏创建实例的设计模式，简单工厂以及更加符合开闭原则的工厂模式

##### 简单工厂

简单工厂就是一个极其简单的工厂方法，
只需要使用不同传入值判断创建返回不同的类实例即可

```java 
class Factory {
    public Object getProduct(String type){
        if(type.equals("A"){
            return new ProductA();
        }else{
            return new ProductOthers();
        }
    }
}
```

##### 工厂模式

生产的产品需要属于同一类


#### 抽象工厂 

##### 简介

抽象工厂借鉴了简单工厂的一些思路
通过创建一个可以创建多个工厂的超级工厂类，从而可以从超级工厂生产出若干工厂类实现不同产品线的生产
我们可以结合简单工厂， 工厂， 抽象工厂想像为一个套娃组合

1. 通过多元化实现简单工厂
2. 通过对产品线的统一实现工厂类
3. 通过多元化加多个产品的统一实现抽象工厂类

#### 生成器

#### 原型

#### 单例

##### 简述

为了节省资源在整个jvm中只加载生成一个实例，
其最佳实践为无状态工具类

##### 懒汉式

```java
class Singleton {
    private static Singleton singleton = null;
    private Singleton(){}

    public synchronized static Singleton getInstance () {
        if(this.singleton == null){
            this.singleton = new Singleton();
        }

        return this.singleton;
    }
}

```

##### 饿汉式
```java
class Singleton {
    private static Singleton singleton = new Singleton();
    private Singleton(){}

    public static Singleton getInstance () {
        return this.singleton;
    }
}
```

##### 双重检查锁
通过减小锁的范围防止实例null判断需要进行锁操作，
可以使用双重检查锁，
这样同时实现了初始化时锁操作检查null初始化对象，也防止了对象实例化之后需要锁操作之后才能够判断对象实例

第二层锁， 如果当时一个线程判断实例为null
但是另一个线程已经加锁正在创建实例，
这样就会出现异常所以双重锁是必须的

双层判断锁的两点好处：
1. 防止实例创建后每次依然进行加锁判断
2. 依然保留了线程安全

```java
class Singleton {
    private static Singleton singleton = null;
    private Singleton(){}

    public  static Singleton getInstance () {
        if(this.singleton == null){
            synchronized (Singleton.class){
                if(this.singleton == null) {
                    this.singleton = new Singleton();
                }
            }
        }
        return this.singleton;
    }
}

```

##### volatile
产生对象时为了保证唯一需要规避cpu指令重排，要使用volatile修饰实例

以下代码为懒汉式的最佳实现

```java
class Singleton {
    private volatile static Singleton singleton = null;
    private Singleton(){}

    public  static Singleton getInstance () {
        if(this.singleton == null){
            synchronized (Singleton.class){
                if(this.singleton == null) {
                    this.singleton = new Singleton();
                }
            }
        }
        return this.singleton;
    }
}

```

### 结构型

#### 适配器

##### 简介

对调用接口进行一定程度上的修改为适合当前系统调用的接口方法,
例如系统中使用某种第三方库时, 利用适配器进行解耦方便将来进行替换

##### 实现

```java
    class OtherService {
        public void dosomething(){

        }
    }
    class Adapter {
        private OtherService service = new OtherService();
        public void local_service () {
            this.service.dosomething();
        }
    } 
```

#### 桥接

#### 组合

#### 装饰

##### 简介
通过对具体实例的调用实现实例原有的功能
同时可以通过添加新的方法实现原实例没有的功能

装饰模式与适配器模式相比 装饰模式改变的是具体实现的功能
而适配器则是改变的调用的方式

装饰模式与代理模式也十分相似, 装饰模式更加专注于为调用对象添加新的功能, 而代理模式则专注于对调用对象的访问控制

##### 实现

```java
interface IRobot {
    void dosomething();
}

class RobotI implements IRobot {
    @Override
    void dosomething(){
        hit();
    }
}

abstract class RobotII implements IRobot {
    private IRobot robot;
    public RobotII(IRobot robot) {
        this.robot = robot;
    }

    @Override
    void dosomething(){
        this.robot.dosomething();
    }
```

#### 外观

##### 简介

对用户隐藏具体的实现细节，简化客户端调用

###### 实现

```java 
class OpA{
    public void dosomething(){}
}
class OpB{
    public void dosomething(){}
}

class Facade {
    private OpA a = new OpA ();
    private OpB b = new OpB ();
    public void dowell(){
        a.dosomething();
        b.dosomething();
    }
}
```

#### 享元

#### 代理

##### 简介

代理模式专注于代理对象的访问控制, 客户端无需知晓被代理对象的相关信息, 同时代理类也可以使用类似装饰模式的设计方法, 提供被代理对象所没有的功能和方法

### 行为型

#### 责任链



#### 命令

#### 迭代器

#### 中介者

#### 备忘录

#### 观察者 (发布订阅)

##### 简介

发布方将订阅方添加到订阅列表，
当进行消息发布时则调用订阅方的相关方法

##### 实现 

```java 
interface IPublisher {
    void addSubscriber ();
    void notify();
}
interface ISubscriber {
    void update(); 
}

class Publisher{
    private List<ISubscriber> list = new ArrayList<>();
    public void addSubscriber(ISubscriber subscriber) {
        this.list.add(subscriber);    
    }
    public void notify() {
        list.forEach(subscriber -> subscriber.update());
    }
}

```

#### 状态

##### 简介

将在状态的判断由ifelse这样的分支语句改为使用不同的类实现来实现

##### 实现

```java 
interface IState {
    void dosomething ();
}

class Context implements IState {
    private IState state;
    public state_change (IState state){
        this.state = state;
    }

    public dosomething () {
        this.state.dosomething();
    }
} 

class StateA implements IState{
    @Override
    public void dosomething(){}
}

class StateB implements IState{
    @Override
    public void dosomething(){}
}
```

#### 策略

##### 简介

状态模式是策略模式从扩展, 策略模式需要使得各个策略之间完全独立, 而状态则没有这一要求

这句话我也不太理解, 其实这两者几乎就是同一种模式, 并且我们使用的时候并不会完全依照一种模式进行设计, 必然会根据实际情况进行调整, 所以这边看成一种模式也完全没有问题

#### 模板方法

#### 访问者

