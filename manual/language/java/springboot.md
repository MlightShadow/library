# spring boot

[toc]

## 背景
### 关于版本

起源于spring4，spring4开始有了纯注解配置
springboot2基于spring5

### 关于SpringCloud

springboot 是 springcloud 基础

## 快速开始

新建 Spring Boot 项目的方法有很多，以下是其中几种常见的方法：


* 使用 Spring Initializr：Spring Initializr 是 Spring 官方提供的一个 Web 工具，可以帮助用户快速创建 Spring Boot 项目。具体操作步骤如下：
  * 打开 https://start.spring.io/ 页面；
  选择项目的相关配置，包括项目类型、语言、依赖、版本等；
  * 点击 Generate 按钮，下载生成的项目压缩包；
  * 解压项目压缩包，使用 IDE（如 IntelliJ IDEA、Eclipse）导入项目即可。

* 使用 IDE 创建项目：常见的 Java 开发工具如 IntelliJ IDEA、Eclipse 等都提供了创建 Spring Boot 项目的模板。通常只需要在 IDE 中选择相应的模板，填写项目的相关信息，即可生成 Spring Boot 项目。

* 使用 Maven 或 Gradle 手动创建项目：可以使用 Maven 或 Gradle 构建工具手动创建 Spring Boot 项目。具体操作步骤如下：

  * 在命令行或终端中执行 mvn archetype:generate -DgroupId=com.example -DartifactId=demo -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false 命令，生成 Maven 项目；

  * 在 pom.xml 文件中添加 Spring Boot 相关的依赖，例如：

    ```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
    ```

  * 在 src/main/java 目录下创建 Spring Boot 应用程序的入口类，并在该类中添加 @SpringBootApplication 注解；
  * 在入口类中添加 main 方法，并在该方法中使用 SpringApplication.run() 方法启动 Spring Boot 应用程序。

* 使用 Spring Boot CLI：Spring Boot CLI 是 Spring 官方提供的一个命令行工具，可以帮助用户快速创建 Spring Boot 项目。具体操作步骤如下：
安装 Spring Boot CLI；
  * 在命令行或终端中执行 spring init --dependencies=web my-project 命令，生成 Spring Boot 项目；
  * 进入生成的项目目录，执行 ./gradlew bootRun 或 ./mvnw spring-boot:run 命令启动 Spring Boot 应用程序。

无论使用哪种方法，创建 Spring Boot 项目的关键是要确定项目的类型、依赖和配置等信息。


### pom.xml

使用[https://start.spring.io/](https://start.spring.io/) 创建初始化项目

例如：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project
  xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
    http://maven.apache.org/POM/4.0.0 
    https://maven.apache.org/xsd/maven-4.0.0.xsd">
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

TODO

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

TODO

## 整合框架

### slf4j

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

#### spring-boot-starter-logging
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

TODO 其他日志的配置...

自定义日志文件可以更好的配置日志功能, 但如果使用自定义日志配置文件则springboot中的日志配置就会失效

可以根据不同的环境配置不同的日志输出格式

当需要切换日志框架到其他框架，只需要手动排除springboot默认依赖，然后添加新的以来框架并且修改配置文件即可


### Springboot Web

#### 接口服务测试或者调用

* RestTemplate
* WebClient (依赖webflux)
* MockMvc (无需启动服务， 单元测试)

可以用于restful接口的测试和访问

#### 配置

#### 

#### 

## 开发杂项
### 热部署

依赖spring-boot-devtools

在vscode里好像插件本身就有热部署


## 其他

nvim 如何启动spring boot项目

启动 Spring Boot 项目有多种方式，以下是其中一种使用 nvim 启动 Spring Boot 项目的方法：

打开 nvim 编辑器，并进入到 Spring Boot 项目的根目录。

在 nvim 编辑器中输入 :!./mvnw spring-boot:run 命令，其中 mvnw 是 Spring Boot 项目自带的 Maven Wrapper，可以在不需要安装 Maven 的情况下运行 Maven 命令。

按下回车键执行命令，Spring Boot 项目将会启动。在控制台中可以看到项目启动的日志信息。

打开浏览器，访问 http://localhost:8080/，可以看到 Spring Boot 项目的首页。

注意：在执行 :!./mvnw spring-boot:run 命令前，需要确保项目的依赖已经下载完毕。可以在项目根目录下执行 ./mvnw clean install 命令来下载依赖并编译项目。

nvim 启动项目中的 tk.mybatis 的generator

tk.mybatis 是一个 MyBatis 通用 Mapper 的扩展工具包，可以简化 MyBatis 的开发流程。如果要在 nvim 中启动 tk.mybatis 的 generator，可以按照以下步骤进行：

在项目根目录下创建 generatorConfig.xml 文件，该文件是 tk.mybatis generator 的配置文件，用于生成 MyBatis 的 Mapper、Model 和 Example 等文件。

在 generatorConfig.xml 文件中配置数据库连接信息、生成的文件路径、表名和字段映射关系等信息。具体的配置方式可以参考 tk.mybatis generator 的官方文档。

在 nvim 编辑器中输入 :!java -jar generator.jar -configfile generatorConfig.xml 命令，其中 generator.jar 是 tk.mybatis generator 工具包的 jar 包文件，可以从 Maven 仓库中下载。执行该命令后，tk.mybatis generator 将会根据 generatorConfig.xml 文件中的配置信息生成相应的文件。

在生成的文件中查看生成的 Mapper、Model 和 Example 等文件，确认生成是否成功。

注意：在执行 :!java -jar generator.jar -configfile generatorConfig.xml 命令前，需要确保已经安装了 Java 运行环境，并且已经将 generator.jar 文件下载到了项目目录中。

nvim 启动spring boot项目中的其他main函数

在 Spring Boot 项目中，可能会存在多个 main 函数，如果要在 nvim 中启动其中一个 main 函数，可以按照以下步骤进行：

打开 nvim 编辑器，并进入到 Spring Boot 项目的根目录。

在 nvim 编辑器中输入 :!./mvnw spring-boot:run -Dspring-boot.run.main=<main-class> 命令，其中 <main-class> 是要启动的 main 函数所在的类的全限定名（包括包名和类名）。例如，如果要启动 com.example.demo.Main 类中的 main 函数，��么 <main-class> 就应该是 com.example.demo.Main。

按下回车键执行命令，Spring Boot 项目将会启动。在控制台中可以看到项目启动的日志信息。

打开浏览器，访问 http://localhost:8080/，可以看到 Spring Boot 项目的首页。

注意：在执行 :!./mvnw spring-boot:run -Dspring-boot.run.main=<main-class> 命令前，需要确保项目的依赖已经下载完毕。可以在项目根目录下执行 ./mvnw clean install 命令来下载依赖并编译项目。同时，需要确保 <main-class> 参数是正确的，否则启动可能会失败。
