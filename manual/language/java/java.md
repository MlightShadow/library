# Java

[TOC]

## 基础

### 基础数据类型

Java有8种基础数据类型：

* **整数类型**: `byte`(1字节)、`short`(2字节)、`int`(4字节)、`long`(8字节)
* **浮点类型**: `float`(4字节)、`double`(8字节)
* **字符类型**: `char`(2字节)
* **布尔类型**: `boolean`

### 变量与常量

* **变量**: 存储数据的容器，值可变
* **常量**: 固定不变的值，使用`final`关键字声明
* **变量命名**: 必须以字母、$、_开头，区分大小写

### 运算符

#### 赋值运算符

赋值运算符在 Java 中只有一个 `=`

#### 算术运算符

进行数值运算的运算符，自增、自减运算符作为语法糖亦在此列。

同数学语言一样，通过 `()` 可以改变其优先级：

* `+`  : 加
* `-`  : 减
* `*`  : 乘
* `/`  : 除
* `%`  : 求余

#### 逻辑运算符

通常我喜欢称之为逻辑运算符，无论是进行比较或者做一些与、或运算，这类运算符的结果一般用于反馈真假的判断：

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

#### 其他运算符

* 移位 `>>` `<<`
* 三元运算 `?:`
* Lambda 表达式 `->`

### 控制流

Java控制流语句包括：

* 条件语句：`if-else`, `switch-case`
* 循环语句：`for`, `while`, `do-while`
* 跳转语句：`break`, `continue`, `return`

## 对象

### 面向对象基础

Java是面向对象编程语言，核心概念包括：

* **类(Class)**: 对象的模板或蓝图
* **对象(Object)**: 类的实例
* **封装(Encapsulation)**: 通过访问修饰符控制类成员的可见性
* **继承(Inheritance)**: 子类继承父类的属性和方法
* **多态(Polymorphism)**: 同一接口的不同实现形式

**示例1 - 类和对象**:

```java
class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }
    
    public void greet() {
        System.out.println("Hello, I'm " + name);
    }
}

Person person = new Person("Alice");
person.greet();
```

**示例2 - 封装**:

```java
public class BankAccount {
    private double balance;  // 私有字段
    
    public double getBalance() {  // 公共getter
        return balance;
    }
    
    public void deposit(double amount) {  // 公共方法
        balance += amount;
    }
}
```

**示例3 - 继承**:

```java
class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    public void bark() {
        System.out.println(name + " is barking");
    }
}
```

**示例4 - 多态**:

```java
Animal animal = new Dog("Rex");  // 父类引用指向子类对象
animal.eat();  // 调用Dog类的eat方法
```

### 封装

封装是面向对象编程的基本特征之一，通过访问修饰符(`private`, `protected`, `public`, `default`)控制类成员的可见性，隐藏内部实现细节，只暴露必要的接口。

**封装示例**:

```java
public class Student {
    private String name;     // 私有字段，外部不可直接访问
    private int age;         // 私有字段
    
    public String getName() {  // 公共getter方法
        return name;
    }
    
    public void setName(String name) {  // 公共setter方法，可加入验证逻辑
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age > 0 && age < 150) {  // 验证逻辑
            this.age = age;
        }
    }
}
```

### 接口

接口(`interface`)定义了一组方法规范，不提供具体实现（Java 8后可以有默认方法）。类通过实现接口来获得相应的能力，支持多重继承。

**接口示例**:

```java
// 定义接口
interface Drawable {
    void draw();                    // 抽象方法
    default void display() {        // 默认方法 (Java 8+)
        System.out.println("Displaying object");
    }
    
    static void info() {            // 静态方法 (Java 8+)
        System.out.println("This is a drawable interface");
    }
}

// 实现接口
class Circle implements Drawable {
    private String color;
    
    public Circle(String color) {
        this.color = color;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " circle");
    }
}

// 使用
Circle circle = new Circle("red");
circle.draw();      // 输出: Drawing a red circle
circle.display();   // 输出: Displaying object
Drawable.info();    // 输出: This is a drawable interface
```

### 代码复用

代码复用是面向对象编程的重要原则，主要包括：

* **继承**: 子类继承父类的属性和方法
* **组合**: 在一个类中包含另一个类的对象
* **接口实现**: 通过实现接口来获得特定能力

**继承示例**:

```java
class Vehicle {
    protected String brand;
    
    public Vehicle(String brand) {
        this.brand = brand;
    }
    
    public void start() {
        System.out.println(brand + " is starting...");
    }
}

class Car extends Vehicle {
    private int doors;
    
    public Car(String brand, int doors) {
        super(brand);  // 调用父类构造器
        this.doors = doors;
    }
    
    public void openTrunk() {
        System.out.println("Trunk opened.");
    }
}
```

**组合示例**:

```java
class Engine {
    private String type;
    
    public Engine(String type) {
        this.type = type;
    }
    
    public void start() {
        System.out.println(type + " engine started.");
    }
}

class Computer {
    private String cpu;
    private int memory;
    
    public Computer(String cpu, int memory) {
        this.cpu = cpu;
        this.memory = memory;
    }
    
    public void boot() {
        System.out.println("Computer booted.");
    }
}

class Laptop {
    private Engine engine;      // 组合关系
    private Computer computer;  // 组合关系
    
    public Laptop(String engineType, String cpu, int memory) {
        this.engine = new Engine(engineType);
        this.computer = new Computer(cpu, memory);
    }
    
    public void start() {
        engine.start();
        computer.boot();
    }
}
```

### 多态

多态是指同一个接口或方法可以有不同的实现形式。包括编译时多态(方法重载)和运行时多态(方法重写)。通过多态可以提高代码的灵活性和可扩展性。

**多态示例**:

```java
abstract class Shape {
    abstract void draw();
}

class Rectangle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing Rectangle");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing Circle");
    }
}

// 使用多态
Shape rectangle = new Rectangle();  // 父类引用指向子类对象
Shape circle = new Circle();        // 父类引用指向子类对象
rectangle.draw();  // 输出: Drawing Rectangle
circle.draw();     // 输出: Drawing Circle
```

### 内部类

内部类是在另一个类内部定义的类，包括：

* **成员内部类**: 作为外部类的成员
* **静态内部类**: 使用static修饰的内部类
* **局部内部类**: 在方法中定义的内部类
* **匿名内部类**: 没有名字的内部类

**内部类示例**:

```java
class OuterClass {
    private String outerField = "Outer";
    
    // 成员内部类
    class InnerClass {
        private String innerField = "Inner";
        
        public void accessOuter() {
            System.out.println("Accessing: " + outerField);  // 访问外部类成员
        }
    }
    
    // 静态内部类
    static class StaticNestedClass {
        public void display() {
            // 不能直接访问外部类实例成员
            System.out.println("Static nested class");
        }
    }
    
    // 方法
    public void createInner() {
        // 局部内部类
        class LocalInnerClass {
            public void show() {
                System.out.println("Local inner class");
            }
        }
        
        LocalInnerClass local = new LocalInnerClass();
        local.show();
    }
    
    // 返回匿名内部类
    public Runnable getAnonymous() {
        return new Runnable() {
            @Override
            public void run() {
                System.out.println("Running from anonymous class");
            }
        };
    }
}

// 使用内部类
OuterClass outer = new OuterClass();
OuterClass.InnerClass inner = outer.new InnerClass();
inner.accessOuter();
```

## 函数式

### Lambda表达式

Lambda表达式是Java 8引入的新特性，提供了一种简洁的方式来表示匿名函数。格式为 `(参数) -> { 方法体 }`，主要用于简化函数式接口的实现。

**Lambda表达式示例**:

```java
// 传统匿名类写法
Runnable runnable1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello from anonymous class");
    }
};

// Lambda表达式写法
Runnable runnable2 = () -> System.out.println("Hello from lambda");

// 带参数的Lambda表达式
BinaryOperator<Integer> sum = (a, b) -> a + b;
Function<String, Integer> strLength = s -> s.length();

// 使用示例
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(name -> System.out.println(name));  // Lambda表达式
```

### 方法引用

方法引用是Lambda表达式的简化写法，通过双冒号(`::`)操作符来直接引用已有的方法或构造器。主要有四种形式：

* 静态方法引用：`Class::staticMethod`
* 实例方法引用：`instance::method`
* 特定类型的方法引用：`Class::method`
* 构造器引用：`Class::new`

**方法引用示例**:

```java
// 静态方法引用
List<String> strings = Arrays.asList("hello", "world", "java");
strings.sort(String::compareTo);

// 实例方法引用
List<String> list = Arrays.asList("apple", "banana", "cherry");
Consumer<String> printer = System.out::println;
list.forEach(printer);

// 构造器引用
Supplier<List<String>> supplier = ArrayList::new;
Function<String, Integer> strToInt = Integer::new;
```

## 流式

Stream是Java 8引入的API，用于处理集合数据的流水线操作。它提供了一种高效、声明式的方式来处理数据集合。

Stream操作分为两类：

* **中间操作**: 返回Stream的操作，如`filter`, `map`, `flatMap`, `sorted`, `distinct`, `limit`, `skip`, `peek`等
* **终端操作**: 返回非Stream类型的操作，如`collect`, `forEach`, `count`, `reduce`, `min`, `max`, `findAny`, `findFirst`, `anyMatch`, `allMatch`, `noneMatch`等

**Stream示例**:

```java
import java.util.*;
import java.util.stream.*;

// 基本流操作
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 过滤偶数并求平方
List<Integer> squaredEvens = numbers.stream()
                                   .filter(n -> n % 2 == 0)      // 中间操作
                                   .map(n -> n * n)              // 中间操作
                                   .collect(Collectors.toList()); // 终端操作

// 字符串处理
List<String> words = Arrays.asList("hello", "world", "java", "stream");
List<String> upperWords = words.stream()
                               .filter(s -> s.length() > 4)      // 过滤长度大于4的单词
                               .map(String::toUpperCase)         // 转换为大写
                               .sorted()                         // 排序
                               .collect(Collectors.toList());

// 统计操作
long count = numbers.stream()
                    .filter(n -> n > 5)
                    .count();

// 分组操作
Map<Integer, List<String>> groupedByLength = words.stream()
                                                 .collect(Collectors.groupingBy(String::length));
```

## 集合

Java集合框架提供了一系列接口和类来处理对象集合。主要分为两大类：

* **Collection接口**: 用于存放单一元素，Collection还继承了Iterable接口
* **Map接口**: 存放键值对

### Collection接口层次结构

Collection接口主要有三个子接口：

#### List接口 - 有序集合，允许重复元素

* `ArrayList`: 动态数组实现，随机访问效率高，插入删除效率低
* `LinkedList`: 双向链表实现，插入删除效率高，随机访问效率低
* `Vector`: 线程安全的动态数组（已较少使用）
* `Stack`: 继承Vector，实现栈结构

**List示例**:

```java
// ArrayList
List<String> arrayList = new ArrayList<>();
arrayList.add("Apple");
arrayList.add("Banana");
System.out.println(arrayList.get(0));  // Apple

// LinkedList
List<String> linkedList = new LinkedList<>();
linkedList.add("First");
((LinkedList<String>) linkedList).addFirst("New First");  // LinkedList特有方法

// 遍历List
for(String item : arrayList) {
    System.out.println(item);
}
```

#### Set接口 - 不允许重复元素的集合

* `HashSet`: 基于哈希表实现，无序，允许null元素
* `TreeSet`: 基于红黑树实现，自然排序或自定义排序
* `LinkedHashSet`: 维护插入顺序的HashSet

**Set示例**:

```java
// HashSet
Set<String> hashSet = new HashSet<>();
hashSet.add("Apple");
hashSet.add("Banana");
hashSet.add("Apple");  // 重复元素，不会被添加
System.out.println(hashSet.size());  // 2

// TreeSet - 自动排序
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(3);
treeSet.add(1);
treeSet.add(2);
System.out.println(treeSet);  // [1, 2, 3]

// 遍历Set
for(String item : hashSet) {
    System.out.println(item);
}
```

#### Queue接口 - 队列，用于存储和处理待处理元素

* `LinkedList`: 实现了Queue接口
* `ArrayDeque`: 双端队列，推荐使用
* `PriorityQueue`: 优先队列，按优先级排序

**Queue示例**:

```java
// ArrayDeque - 推荐的双端队列实现
Deque<String> deque = new ArrayDeque<>();
deque.offer("First");   // 队尾添加
deque.push("NewFirst"); // 队首添加
System.out.println(deque.pop());    // NewFirst
System.out.println(deque.poll());   // First

// PriorityQueue - 按自然顺序排序
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3);
pq.offer(1);
pq.offer(2);
System.out.println(pq.poll());  // 1 (最小值)
```

### Map接口层次结构

Map用于存储键值对(key-value pairs)：

* `HashMap`: 基于哈希表实现，允许null键和null值，非线程安全
* `TreeMap`: 基于红黑树实现，按键排序
* `LinkedHashMap`: 维护插入顺序的HashMap
* `Hashtable`: 线程安全的Map实现（已较少使用）
* `ConcurrentHashMap`: 线程安全的HashMap，性能优于Hashtable

**Map示例**:

```java
// HashMap
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("Apple", 5);
hashMap.put("Banana", 3);
Integer count = hashMap.get("Apple");  // 5
hashMap.put(null, 10);  // 允许null键

// TreeMap - 按键排序
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.put("Zebra", 1);
treeMap.put("Apple", 2);
treeMap.put("Banana", 3);
System.out.println(treeMap);  // {Apple=2, Banana=3, Zebra=1}

// LinkedHashMap - 按插入顺序
Map<String, Integer> linkedMap = new LinkedHashMap<>();
linkedMap.put("Third", 3);
linkedMap.put("First", 1);
linkedMap.put("Second", 2);
System.out.println(linkedMap);  // {Third=3, First=1, Second=2}

// ConcurrentHashMap - 线程安全
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("Key1", 1);
concurrentMap.putIfAbsent("Key2", 2);  // 如果不存在才添加

// 遍历Map
for(Map.Entry<String, Integer> entry : hashMap.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Java 8+ 遍历方式
hashMap.forEach((key, value) -> System.out.println(key + ": " + value));
```

### 集合选择指南

* **List**: 需要保持插入顺序且经常按索引访问 → ArrayList
* **List**: 频繁在两端添加/删除元素 → LinkedList
* **Set**: 不允许重复且不需要排序 → HashSet
* **Set**: 不允许重复且需要排序 → TreeSet
* **Map**: 需要键值对映射且不需要排序 → HashMap
* **Map**: 需要按键排序 → TreeMap
* **并发环境**: 需要线程安全的Map → ConcurrentHashMap

## 异常

Java异常处理机制是处理程序运行时错误的重要手段。异常层次结构如下：

* `Throwable`: 异常的根类
  * `Error`: 系统错误，应用程序通常无法处理，如`OutOfMemoryError`、`StackOverflowError`
  * `Exception`: 应用程序可以处理的异常
    * `RuntimeException`: 运行时异常（非检查异常），如`NullPointerException`、`IndexOutOfBoundsException`
    * 其他Exception: 检查异常（受检异常），如`IOException`、`SQLException`，必须显式处理

### 异常处理关键字

**try-catch-finally**:

```java
try {
    // 可能抛出异常的代码
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 处理特定异常
    System.out.println("除零错误: " + e.getMessage());
} finally {
    // 无论是否发生异常都会执行
    System.out.println("清理资源");
}
```

**throws/throw**:

```java
// 在方法声明中指定可能抛出的异常
public void readFile(String fileName) throws IOException {
    if (fileName == null) {
        throw new IllegalArgumentException("文件名不能为空");
    }
    // 可能抛出IOException的代码
}
```

### 异常处理最佳实践

**多重catch块**:

```java
try {
    // 可能抛出多种异常的代码
    String str = null;
    str.length();
    int[] arr = new int[5];
    arr[10] = 100;
} catch (NullPointerException e) {
    System.out.println("空指针异常: " + e.getMessage());
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("数组越界: " + e.getMessage());
} catch (Exception e) {
    // 捕获其他所有异常
    System.out.println("其他异常: " + e.getMessage());
}
```

**Java 7+ 多异常捕获**:

```java
try {
    // 代码
} catch (IOException | SQLException e) {
    // 同样处理IOException和SQLException
    System.out.println("发生异常: " + e.getMessage());
}
```

**try-with-resources** (Java 7+):

```java
// 自动关闭资源，实现AutoCloseable接口的资源
try (FileInputStream fis = new FileInputStream("file.txt");
     BufferedReader reader = new BufferedReader(new InputStreamReader(fis))) {
    
    String line = reader.readLine();
    System.out.println(line);
    
} catch (IOException e) {
    System.out.println("IO异常: " + e.getMessage());
}
// fis和reader会自动关闭，即使发生异常
```

### 自定义异常

```java
// 检查异常
class ValidationException extends Exception {
    public ValidationException(String message) {
        super(message);
    }
    
    public ValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}

// 运行时异常
class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}

// 使用自定义异常
public void validateAge(int age) throws ValidationException {
    if (age < 0 || age > 150) {
        throw new ValidationException("年龄不在有效范围内");
    }
}
```

### 异常处理原则

1. **优先处理检查异常**：必须显式处理
2. **合理使用运行时异常**：用于程序错误
3. **不要忽略异常**：避免空的catch块
4. **使用finally或try-with-resources**：确保资源释放
5. **记录异常信息**：便于调试和维护

## IO

Java IO（输入/输出）系统提供了处理数据流的API。主要包括传统的IO和NIO（New IO）。

### 传统IO

传统IO基于流的概念，分为字节流和字符流：

#### 字节流

以字节为单位处理数据，适用于处理二进制数据。

* **输入流**: `InputStream`及其子类
  * `FileInputStream`: 文件输入流
  * `ByteArrayInputStream`: 字节数组输入流
  * `BufferedInputStream`: 缓冲输入流
  * `ObjectInputStream`: 对象输入流

* **输出流**: `OutputStream`及其子类
  * `FileOutputStream`: 文件输出流
  * `ByteArrayOutputStream`: 字节数组输出流
  * `BufferedOutputStream`: 缓冲输出流
  * `ObjectOutputStream`: 对象输出流

**字节流示例**:

```java
// 读取文件
try (FileInputStream fis = new FileInputStream("input.txt")) {
    int data;
    while ((data = fis.read()) != -1) {
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 写入文件
try (FileOutputStream fos = new FileOutputStream("output.txt")) {
    String content = "Hello World!";
    fos.write(content.getBytes());
} catch (IOException e) {
    e.printStackTrace();
}

// 使用缓冲流提高性能
try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream("large_file.txt"))) {
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = bis.read(buffer)) != -1) {
        // 处理数据
        System.out.write(buffer, 0, bytesRead);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 字符流

以字符为单位处理数据，专门用于文本数据处理，支持字符编码转换。

* **输入流**: `Reader`及其子类
  * `FileReader`: 文件字符输入流
  * `StringReader`: 字符串输入流
  * `BufferedReader`: 缓冲字符输入流
  * `InputStreamReader`: 字节到字符的桥梁

* **输出流**: `Writer`及其子类
  * `FileWriter`: 文件字符输出流
  * `StringWriter`: 字符串输出流
  * `BufferedWriter`: 缓冲字符输出流
  * `OutputStreamWriter`: 字符到字节的桥梁

**字符流示例**:

```java
// 读取文件
try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 写入文件
try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    bw.write("Hello");
    bw.newLine();  // 换行
    bw.write("World!");
    bw.flush();    // 刷新缓冲区
} catch (IOException e) {
    e.printStackTrace();
}

// 指定字符编码
try (BufferedReader br = new BufferedReader(
        new InputStreamReader(
            new FileInputStream("file.txt"), "UTF-8"))) {
    String content = br.lines()
                      .reduce("", (a, b) -> a + "\n" + b);
    System.out.println(content);
} catch (IOException e) {
    e.printStackTrace();
}
```

#### RandomAccessFile

允许随机访问文件内容，既可以读也可以写。

```java
// 读写文件
try (RandomAccessFile raf = new RandomAccessFile("data.txt", "rw")) {
    // 写入数据
    raf.writeUTF("Hello");
    raf.writeInt(123);
    
    // 获取当前位置
    long pos = raf.getFilePointer();
    System.out.println("Current position: " + pos);
    
    // 跳转到开始位置
    raf.seek(0);
    
    // 读取数据
    String str = raf.readUTF();
    int num = raf.readInt();
    
    System.out.println(str + ", " + num);
} catch (IOException e) {
    e.printStackTrace();
}
```

### NIO (New IO)

NIO是Java 1.4引入的非阻塞IO API，基于缓冲区(Buffer)、通道(Channel)和选择器(Selector)的概念。

#### Buffer（缓冲区）

Buffer是NIO中用于存储数据的容器，常用类型包括：

* `ByteBuffer`: 存储字节
* `CharBuffer`: 存储字符
* `IntBuffer`: 存储整数
* `FloatBuffer`: 存储浮点数

**Buffer操作示例**:

```java
// 创建和使用缓冲区
ByteBuffer buffer = ByteBuffer.allocate(1024);  // 分配缓冲区

// 写入模式
buffer.put((byte) 'H');
buffer.put((byte) 'e');
buffer.put((byte) 'l');
buffer.put((byte) 'l');
buffer.put((byte) 'o');

// 翻转缓冲区，准备读取
buffer.flip();

// 读取模式
while (buffer.hasRemaining()) {
    System.out.print((char) buffer.get());
}
// 输出: Hello

// 清空缓冲区
buffer.clear();
```

#### Channel（通道）

Channel表示到实体（如文件、硬件设备或套接字）的开放连接。

**FileChannel示例**:

```java
// 文件复制
try (RandomAccessFile sourceFile = new RandomAccessFile("source.txt", "r");
     RandomAccessFile targetFile = new RandomAccessFile("target.txt", "rw")) {
    
    FileChannel sourceChannel = sourceFile.getChannel();
    FileChannel targetChannel = targetFile.getChannel();
    
    // 从源通道复制到目标通道
    targetChannel.transferFrom(sourceChannel, 0, sourceChannel.size());
    
    // 或者使用缓冲区
    ByteBuffer buffer = ByteBuffer.allocate(1024);
    int bytesRead;
    while ((bytesRead = sourceChannel.read(buffer)) != -1) {
        buffer.flip();
        targetChannel.write(buffer);
        buffer.clear();
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### NIO.2 (Java 7)

NIO.2引入了Path接口、Files工具类和异步IO等新特性。

**NIO.2示例**:

```java
import java.nio.file.*;
import java.nio.charset.StandardCharsets;

// Path操作
Path path = Paths.get("folder", "subfolder", "file.txt");
System.out.println("Absolute path: " + path.toAbsolutePath());
System.out.println("Parent: " + path.getParent());
System.out.println("Filename: " + path.getFileName());

// 文件操作
try {
    // 读取文件内容
    String content = Files.readString(path, StandardCharsets.UTF_8);
    
    // 写入文件内容
    Files.writeString(path, "New content", StandardCharsets.UTF_8);
    
    // 复制文件
    Path source = Paths.get("source.txt");
    Path target = Paths.get("target.txt");
    Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
    
    // 遍历目录
    try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get("."))) {
        for (Path file : stream) {
            System.out.println(file.getFileName());
        }
    }
    
    // 创建目录
    Path newDir = Paths.get("new_directory");
    Files.createDirectories(newDir);
    
} catch (IOException e) {
    e.printStackTrace();
}
```

### IO最佳实践

1. **使用try-with-resources语句**：确保资源正确关闭
2. **使用缓冲流**：提高IO性能
3. **正确处理字符编码**：避免乱码问题
4. **选择合适的流类型**：根据数据类型选择字节流或字符流
5. **使用NIO.2**：现代Java应用推荐使用NIO.2 API

## 字符串
Java中字符串相关的类包括：

* `String`: 不可变字符串类
* `StringBuilder`: 可变字符串类，非线程安全
* `StringBuffer`: 可变字符串类，线程安全

## 类型信息
Java反射机制允许在运行时获取类的信息，主要包括：

* `Class`类：代表运行时的类信息
* `Field`类：代表类的字段
* `Method`类：代表类的方法
* `Constructor`类：代表类的构造器

## 泛型
泛型是Java 5引入的特性，允许在定义类、接口和方法时使用类型参数。泛型提供编译时类型安全检测，避免了类型转换错误。

## 数组
数组是相同类型数据的集合，具有固定长度。Java中数组是对象，可以通过索引访问元素。

## 枚举
枚举(`enum`)是一种特殊的类，限制变量只能是预定义值之一。枚举可以有构造器、方法和字段，还可以实现接口。

## 注解
注解(Annotation)提供关于程序元素的元数据，而不直接影响程序执行。常见的内置注解包括`@Override`, `@Deprecated`, `@SuppressWarnings`等。

### 元注解
元注解是用于注解其他注解的注解，主要包括：

* `@Retention`: 定义注解的生命周期
* `@Target`: 定义注解适用的程序元素类型
* `@Documented`: 指示注解应被包含在JavaDoc中
* `@Inherited`: 指示注解可以被子类继承

## 反射
反射机制允许程序在运行时检查类、接口、字段和方法等信息。通过反射可以动态创建对象、调用方法、访问字段等。

## 网络编程

Java网络编程提供了在网络中传输数据的功能，主要使用`java.net`和`java.nio.channels`包中的类。

### Socket编程

Socket是网络通信的端点，Java提供了多种方式进行网络通信。

#### TCP Socket编程

**服务器端示例**:

```java
import java.io.*;
import java.net.*;

public class TCPServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(8080)) {
            System.out.println("服务器启动，监听端口 8080");
            
            while (true) {
                // 接受客户端连接
                Socket clientSocket = serverSocket.accept();
                System.out.println("客户端连接: " + clientSocket.getInetAddress());
                
                // 创建处理线程
                new Thread(() -> handleClient(clientSocket)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private static void handleClient(Socket clientSocket) {
        try (BufferedReader in = new BufferedReader(
                 new InputStreamReader(clientSocket.getInputStream()));
             PrintWriter out = new PrintWriter(
                 clientSocket.getOutputStream(), true)) {
            
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("收到: " + inputLine);
                
                if ("bye".equalsIgnoreCase(inputLine)) {
                    break;
                }
                
                // 回应客户端
                out.println("Echo: " + inputLine);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

**客户端示例**:

```java
import java.io.*;
import java.net.*;

public class TCPClient {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 8080);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(
                 new InputStreamReader(socket.getInputStream()))) {
            
            // 发送消息到服务器
            out.println("Hello Server!");
            
            // 接收服务器响应
            String response = in.readLine();
            System.out.println("服务器响应: " + response);
            
            // 发送结束信号
            out.println("bye");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### UDP Socket编程

**UDP服务器示例**:

```java
import java.io.IOException;
import java.net.*;

public class UDPServer {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket(9876)) {
            byte[] receiveData = new byte[1024];
            byte[] sendData = new byte[1024];
            
            while (true) {
                // 接收数据包
                DatagramPacket receivePacket = 
                    new DatagramPacket(receiveData, receiveData.length);
                socket.receive(receivePacket);
                
                String sentence = new String(receivePacket.getData(), 0, 
                                           receivePacket.getLength());
                InetAddress IPAddress = receivePacket.getAddress();
                int port = receivePacket.getPort();
                
                System.out.println("收到: " + sentence + " from " + 
                                 IPAddress.getHostAddress() + ":" + port);
                
                // 回应客户端
                String response = "Echo: " + sentence;
                sendData = response.getBytes();
                
                DatagramPacket sendPacket = new DatagramPacket(
                    sendData, sendData.length, IPAddress, port);
                socket.send(sendPacket);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**UDP客户端示例**:

```java
import java.io.IOException;
import java.net.*;

public class UDPClient {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket()) {
            InetAddress IPAddress = InetAddress.getByName("localhost");
            byte[] sendData = "Hello UDP Server!".getBytes();
            byte[] receiveData = new byte[1024];
            
            // 发送数据包
            DatagramPacket sendPacket = new DatagramPacket(
                sendData, sendData.length, IPAddress, 9876);
            socket.send(sendPacket);
            
            // 接收响应
            DatagramPacket receivePacket = 
                new DatagramPacket(receiveData, receiveData.length);
            socket.receive(receivePacket);
            
            String response = new String(receivePacket.getData(), 0, 
                                       receivePacket.getLength());
            System.out.println("服务器响应: " + response);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### HTTP客户端

Java 11引入了现代化的HttpClient类，用于发送HTTP请求。

**HttpClient示例**:

```java
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class HttpClientExample {
    public static void main(String[] args) {
        try {
            // 创建HttpClient实例
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
            
            // GET请求
            HttpRequest getRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://jsonplaceholder.typicode.com/posts/1"))
                .header("Accept", "application/json")
                .GET()
                .build();
            
            HttpResponse<String> getResponse = client.send(getRequest, 
                HttpResponse.BodyHandlers.ofString());
            
            System.out.println("状态码: " + getResponse.statusCode());
            System.out.println("响应体: " + getResponse.body());
            
            // POST请求
            String jsonBody = "{\"title\":\"Test\",\"body\":\"Content\",\"userId\":1}";
            HttpRequest postRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://jsonplaceholder.typicode.com/posts"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
            
            HttpResponse<String> postResponse = client.send(postRequest, 
                HttpResponse.BodyHandlers.ofString());
            
            System.out.println("POST响应: " + postResponse.body());
            
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            Thread.currentThread().interrupt(); // 重要：恢复中断状态
        }
    }
}
```

**异步HTTP请求**:

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

public class AsyncHttpClient {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://jsonplaceholder.typicode.com/posts/1"))
            .build();
        
        // 异步发送请求
        CompletableFuture<HttpResponse<String>> futureResponse = 
            client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
        
        futureResponse
            .thenApply(HttpResponse::body)
            .thenAccept(System.out::println)
            .join(); // 等待完成
    }
}
```

### URL处理

**URL操作示例**:

```java
import java.io.*;
import java.net.*;

public class URLOperations {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://www.example.com:8080/path?param=value#anchor");
            
            System.out.println("协议: " + url.getProtocol());
            System.out.println("主机: " + url.getHost());
            System.out.println("端口: " + url.getPort());
            System.out.println("路径: " + url.getPath());
            System.out.println("查询: " + url.getQuery());
            System.out.println("锚点: " + url.getRef());
            
            // 读取URL内容
            try (BufferedReader reader = new BufferedReader(
                     new InputStreamReader(url.openStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 网络编程最佳实践

1. **资源管理**: 始终使用try-with-resources或finally块关闭网络连接
2. **异常处理**: 正确处理网络异常，如连接超时、网络中断等
3. **线程安全**: 在多线程环境中正确处理共享资源
4. **性能优化**: 使用连接池、合理的缓冲区大小
5. **安全性**: 验证输入数据，防止注入攻击
6. **超时设置**: 设置合理的连接和读取超时时间

## 安全

Java安全体系包括：

* 访问控制器：限制代码权限
* 密钥库：管理密钥和证书
* 加密解密：密码学算法实现
* 数字签名：验证数据完整性

### 加密解密

Java加密体系(JCA)提供了各种加密算法实现，包括对称加密(AES, DES)、非对称加密(RSA)、哈希算法(SHA, MD5)等。

## 性能优化

Java性能优化包括多个方面：

* 代码层面：算法优化、减少不必要的对象创建
* 内存层面：合理使用内存，避免内存泄漏
* GC层面：选择合适的垃圾收集器

### 垃圾回收机制

Java自动内存管理通过垃圾回收器定期清理不再使用的对象。不同版本的JVM提供了多种GC算法，如G1、ZGC、Shenandoah等。

### 内存模型

Java内存模型(JMM)定义了线程之间的内存可见性规则，包括happens-before关系、volatile关键字的作用等。

## 新特性

Java持续发展，每个版本都引入新特性。

### Java 8+

Java 8最重要的特性是Lambda表达式和Stream API，还包括接口默认方法、Optional类、新的日期时间API等。

### Java 11+

Java 11是LTS版本，包括HTTP Client、String API增强、var关键字(局部变量类型推断)等。

### Java 17+

Java 17是LTS版本，引入了密封类、Switch表达式增强、Pattern Matching等特性。

### Java 21+

Java 21是最新的LTS版本，重点是虚拟线程、结构化并发、Record模式等。

## 调试与测试

软件质量保障的关键环节。

### 单元测试

JUnit是最流行的Java单元测试框架，用于验证代码单元的正确性。

### 集成测试

集成测试验证多个组件协同工作的正确性。

### 调试技巧

包括IDE调试工具使用、日志记录、性能分析工具等。

## 构建工具

现代Java开发离不开自动化构建工具。

### Maven

Maven是基于项目对象模型(POM)的构建工具，提供依赖管理和项目标准化。

### Gradle

Gradle结合了Maven和Ant的优点，使用Groovy或Kotlin DSL编写构建脚本，更加灵活。

## 框架生态

Java拥有丰富的框架生态。

### Spring

Spring框架提供了IoC容器、AOP、事务管理等企业级应用开发的核心功能。

### Spring Boot

Spring Boot简化了Spring应用的开发，提供自动配置、起步依赖等特性。

### MyBatis

MyBatis是持久层框架，提供了SQL与对象映射的功能。

## 数据库访问

Java提供了多种数据库访问方式。

### JDBC

JDBC(Java Database Connectivity)是Java访问数据库的标准API。

### 连接池

数据库连接池如HikariCP、Druid等，提高数据库连接的复用效率。

## 日志系统

日志是系统监控和问题排查的重要手段。

### Logback

Logback是流行的日志框架，由log4j的创始人开发，性能更好。

### Log4j

Log4j是Apache提供的日志框架，功能强大但存在安全性问题。

## 设计模式

设计模式是解决常见软件设计问题的经验总结。

### 创建型模式

包括单例模式、工厂模式、建造者模式、原型模式等。

### 结构型模式

包括适配器模式、装饰器模式、代理模式、外观模式等。

### 行为型模式

包括观察者模式、策略模式、命令模式、迭代器模式等。

## 并发

> 高性能，高扩展，高可用

实现高性能就需要两个方面：

* 低延时 (提升延时相对困难，Amdahl定律)
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

``java
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

* `wait()`
* `notify()`
* `notifyAll()`

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

* StampReference （记录版本号）
* MarkableReference（记录布尔类型）

CAS原子性问题: CAS的过程即比较和设置的过程必须是原子性
CAS原子性解决办法: 由虚拟机底层C/C++/ASM完成 通过CPU指令(cmpxchg)完成 但是cmpxchg多处理器的时候其实也不能完全保证原子性, lock cmpxchg 可以保证多处理器时的原子性, lock 可以锁定总线

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

### 内存区域
JVM内存分为几个区域：

* 方法区(Method Area)：存储类信息、常量、静态变量等
* 堆(Heap)：对象实例和数组
* 虚拟机栈(Stack)：存储局部变量表、操作数栈等
* 本地方法栈(Native Method Stack)：为Native方法服务
* 程序计数器(Program Counter Register)：记录当前线程执行位置

### 垃圾收集器
JVM提供了多种垃圾收集器：

* Serial GC：单线程标记-复制收集器
* Parallel GC：多线程标记-复制收集器
* CMS GC：以最短停顿时间为目标的收集器
* G1 GC：面向服务端应用的收集器
* ZGC/Shenandoah：低延迟收集器

### JVM参数调优
JVM调优涉及内存大小、垃圾收集器选择、GC参数调整等方面，需要根据应用特点进行配置。

## 企业应用开发

### 微服务
微服务架构将大型应用拆分成一组小的服务，每个服务独立运行，通过轻量级通信机制协作。

### 分布式系统
分布式系统涉及多个网络连接的节点协同工作，需要处理一致性、可用性、分区容错性等问题。

### 容器化部署
使用Docker、Kubernetes等技术进行应用的容器化部署和管理，提高部署效率和可伸缩性。

## JDK常见问题

### 驱动程序无法通过使用安全套接字层(SSL)加密与 SQL Server 建立安全连接

> JDK 1.8；
JDBC 驱动版本mssql-jdbc-6.4.0.jre8.jar
在Eclipse下使用JDBC驱动程序连接SQL Server 2012数据库，报错信息如下：
驱动程序无法通过使用安全套接字层(SSL)加密与 SQL Server 建立安全连接。
错误:"The server selected protocol version TLS10 is not accepted by client preferences [TLS12]"。 ClientConnectionId:12d300ee-beb1-4677-80da-8936f5f80aac
com.microsoft.sqlserver.jdbc.SQLServerException: 驱动程序无法通过使用安全套接字层(SSL)加密与 SQL Server 建立安全连接。
错误:"The server selected protocol version TLS10 is not accepted by client preferences [TLS12]"。
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