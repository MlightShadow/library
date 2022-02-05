# spring boot

[toc]

## 背景
### 关于版本

起源于spring4，spring4开始有了纯注解配置
springboot2基于spring5

### 关于SpringCloud

springboot 是 springcloud 基础

## 快速开始

### pom.xml

使用[https://start.spring.io/](https://start.spring.io/) 创建初始化项目

例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.3</version>
    <relativePath/> <!-- lookup parent from repository -->
  </parent>
  <groupId>com.example</groupId>
  <artifactId>demo</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>demo</name>
  <description>Demo project for Spring Boot</description>
  <properties>
    <java.version>1.8</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter</artifactId>
    </dependency>

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>

</project>
```

### 入口方法

```java
/*
@SpringBootApplicaiton 默认配置扫描当前启动类所在的包
*/
@SpringBootApplication //标识启动类
public class Application{
    public static main(String[] args){
        SpringApplication.run(Application.class, args);
    }
}
```

## 配置

### module

### 配置文件

#### 优先级

resource文件会被编译到根目录下即`classpath`

resource下默认命名:
* application.properties
* application.yml
* application.yaml

以优先级高的为主，在优先级高的文件中没有提及的配置则由优先级低的文件进行补充

配置文件在resource根目录中加载顺序（高->低）：
1. `**/application*.yml`
2. `**/application*.yaml`
3. `**/application*.properties`

其他外部加载顺序(低->高)：
1. resource下（根目录）配置文件
2. 根目录config(放置在resource中编译后在根目录下)
3. 项目根目录下(多module时parent中)，单项目发布后的父级目录
4. 项目根目录下config
5. 运行时cli命令使用--spring.config.location=./config/ 进行指定 **注意：这种指定的情况下，不会进行互补** 该方法也可以通过设置环境变量的方式实现
6. 运行时cli命令参数

使用spring.profiles.active来指定当前生效的配置文件 

```properties
# application.properties设置dev, 名称自定义
spring.profiles.active=dev

# 这样就会优先使用application-dev.properties，其他配置文件则为其补充
```

代码中注解@Profile("dev")只会在spring.profiles.active=dev时生效

可以通过一些方法设置更低优先级(低于application.properties)的一些配置文件(优先级低->高)
1. @PropertySouurce, 注意只能指定.properties文件, 只能用在配置类上
2. SpringApplication.setDefaultProperties()

```java
// 可以通过这个app对象来对应用进行设置
SpringApplication app = new SpringApplication(Application.class);
app.setDefaultProperties("");
```

其他还有些外部配置的方式基本是基于在操作系统环境，java参数，容器环境等方式设置spring.config.location参数

#### 属性注入

application.properties
```properties
test.string=string
test.int=1
test.date=2022-02-05
```

application.yaml
```yaml
test:
    string: string
    int: 1
    date: 2022-02-05
    list: [ a, b ]
    map: { 1: a, 2: b }
    object: {name: tom}
    refint: ${test.int} #属性应用
    random: ${random.Int[1,100]} #随机数
    uuid: ${random.uuid} #随机数
    
```

* @Value
    * String: `@Value("${string}")`,另外 yaml可以使用`@ConfigurationProperties(prefix="test")` 直接对应属性名进行注入(Relaxed Binding), 对应方式相对松散, 多种命名方式都可以依照赋值上去
    * Integer: `@Value("${int}")`
    * Date
    * List
    * Map
    * Object

使用spring-boot-configuration-processor依赖 可以使yaml文件拥有被@ConfigurationProperties的注解类的提示, 其原理是编译时生成了spring-configuration-metadata.json文件从而可以让yaml知晓哪些属性可以被配置, 不过现在我只看到IDEA中有用 不知道code中是否可以使用毕竟是通过依赖来进行支持

@Validated用来对@ConfigurationProperties注解进行数据校验, 需要使用jsr303数据校验的注解
> jsr 是 java specification requests java规范化提案的缩写

### 自动配置原理

## starter

## 日志

日志框架早期百花齐放 log4j, jul(java.util.logging), ...  后来逐渐出现了日志门面（一组日志定义的统一接口）其中有：
* jcl(jakarta commons logging)
* slf4j (推荐)

后来 log4j -> log4j2 -> logback

在依赖中添加slf4j和对应日志框架的桥接器 例如 slf4j-log4j 桥接器

```java
public class Apple {
    public void function(){
        Logger logger = LoggerFactory.getLogger(Apple.class);
        logger.info("");
    }
}
```

如果使用了其他日志门面，例如jcl+jul 可以添加转换依赖，转换为slf4j

### spring-boot-starter-logging
springboot 推荐 slf4j + logback

默认的info级别的输出

```java
public class Apple {
    private Logger logger = LoggerFactory.getLogger(Apple.class);
    public void function(){
        logger.trace("追踪");
        logger.debug("调试");
        logger.info("信息");
        logger.warn("警告");
        logger.error("错误");
    }
}
```
 
默认的日志输出格式为
`日期 级别 进程ID --- [线程名] 内容`

```yaml
logging: 
    level:
        com:
            company: trace #控制某个包下面才进行trace级别的输出
    pattern:
        console: ... # 日志配置的字符串,用于自定义日志输出格式
    file:
        name: /var/log/custom-name.log # 设置文件名称
        path: /var/log/ # 指定输出文件夹，不能指定名字

```


### 背景

## 整合框架

## 开发杂项
### 热部署

依赖spring-boot-devtools

在vscode里好像插件本身就有热部署
