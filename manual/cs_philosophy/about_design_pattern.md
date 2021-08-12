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

#### 桥接

#### 组合

#### 装饰

#### 外观

#### 享元

#### 代理

### 行为型

#### 责任链

#### 命令

#### 迭代器

#### 中介者

#### 备忘录

#### 观察者

#### 状态

#### 策略

#### 模板方法

#### 访问者

