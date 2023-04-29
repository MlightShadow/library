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
  * 打开 <https://start.spring.io/> 页面；
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

其他还有些外部配置的方式基本是基于在操作系统环境，java参数，容器环境等方式设置spring.config.location参数, 优先级从高到低：

1. jvm环境变量
2. 操作系统环境变量
3. application.* 配置文件

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

## 自动配置原理

### spring.factories

resources/META-INF/spring.factories可以进行配置类的添加，springboot默认的很多配置类之所以可以被当前项目使用，也是使用的这种方式

### @SpringBootApplication

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

### 数据库相关

#### datasource

在Spring Boot中，DataSource是一个数据源对象，用于管理数据库连接。
你可以根据自己的需求对DataSource进行自定义。
以下是一些可以配置的属性：

* spring.datasource.url：数据库的URL地址。
* spring.datasource.username：数据库的用户名。
* spring.datasource.password：数据库的密码。
* spring.datasource.driver-class-name：数据库驱动的完整类名。
* spring.datasource.type：DataSource的类型，可以是com.zaxxer.hikari.HikariDataSource、org.apache.tomcat.jdbc.pool.DataSource、org.apache.commons.dbcp2.BasicDataSource等。

如果你想自定义数据源，可以使用@ConfigurationProperties注解将自定义的属性与数据源绑定在一起：

```java
@Configuration
@ConfigurationProperties(prefix = "my.datasource")
public class MyDataSourceProperties {
    private String url;
    private String username;
    private String password;
    // ...
    @Bean
    public DataSource dataSource() {
       return DataSourceBuilder.create()
            .url(url)
            .username(username)
            .password(password)
            // ...
            .build();
   }
    // getter和setter方法
}
```

以上示例中，使用@ConfigurationProperties注解绑定了配置文件中以my.datasource作为前缀的属性，并在dataSource()方法中创建了自定义数据源。
除此之外，还可以使用@Primary注解将自定义的数据源设置为默认的数据源，使用@Qualifier注解指定某个数据源。例如：

```java
@Configuration
public class MyConfig {
    @Primary
    @Bean("myDataSource")
    public DataSource myDataSource(
        MyDataSourceProperties properties) {
        return properties.dataSource();
    }
    @Bean("otherDataSource")
    public DataSource otherDataSource(
        OtherDataSourceProperties properties) {
        return properties.dataSource();
    }
}
```

以上示例中，myDataSource被设置为默认的数据源，可以直接使用@Autowired注解注入。如果需要使用otherDataSource，可以使用@Qualifier("otherDataSource")注解指定。

#### jdbcTemplate

首先要在项目中添加spring-jdbc和mysql-connector-java依赖：

```xml
<!-- jdbcTemplate -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
 
<!-- MySQL连接 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

使用JdbcTemplate需要在配置文件中配置数据源，可以使用内置数据源，也可以自定义数据源，以下是使用内置数据源的示例：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
```

然后创建一个JdbcTemplate Bean：

```java

@Configuration
public class JdbcTemplateConfig {
    @Autowired
    private DataSource dataSource;

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource);
    }
}
```

**tips：** 当然如果是默认使用jdbcTemplate的情况, 例如：使用默认数据源，可以缺省这步配置类

可以在需要使用JdbcTemplate的地方注入：

```java

@Autowired
private JdbcTemplate jdbcTemplate;
```

然后就可以使用JdbcTemplate进行数据操作了，例如：

```java

public void save(User user) {
    String sql = "INSERT INTO user (name, age) VALUES (?, ?)";
    jdbcTemplate.update(sql, user.getName(), user.getAge());
}

public void update(User user) {
    String sql = "UPDATE user SET name=?, age=? WHERE id=?";
    jdbcTemplate.update(sql, user.getName(), user.getAge(), user.getId());
}

public void delete(long id) {
    String sql = "DELETE FROM user WHERE id=?";
    jdbcTemplate.update(sql, id);
}

public List<User> findAll() {
    String sql = "SELECT * FROM user";
    return jdbcTemplate.query(sql, new BeanPropertyRowMapper<User>(User.class));
}

public User findById(long id) {
    String sql = "SELECT * FROM user WHERE id=?";
    return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<User>(User.class));
}
```

以上是使用JdbcTemplate操作MySQL数据库的示例，其中User是一个POJO类，对应数据库中的user表。

#### druid

DataSource是一个接口，标准化了访问数据库的方法，而Druid是一个Java应用程序，提供了数据库连接池的实现。

具体来说，Druid内部实现了DataSource接口，可以通过实现此接口直接创建连接池对象。同时，Druid还提供了很多连接池的监控工具、性能统计和SQL防火墙等功能，可以有效提高应用程序的性能和安全性。

在Spring Boot中，我们可以非常方便地集成Druid连接池。只需要添加相关的依赖和配置文件，就可以轻松地使用Druid。

以下是在Spring Boot中使用Druid连接池的主要步骤：

添加Druid的依赖。

```xml

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.6</version>
</dependency>
```

在配置文件中配置数据源相关信息。

```properties

# 数据源
spring.datasource.url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2b8&useSSL=false
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# 连接池
spring.datasource.initialSize=5
spring.datasource.minIdle=5
spring.datasource.maxActive=20
spring.datasource.maxWait=60000
spring.datasource.timeBetweenEvictionRunsMillis=60000
spring.datasource.minEvictableIdleTimeMillis=300000
spring.datasource.validationQuery=SELECT 1
spring.datasource.testWhileIdle=true
spring.datasource.testOnBorrow=false
spring.datasource.testOnReturn=false
# 监控
spring.datasource.filter.stat.logSlowSql=true
spring.datasource.filter.stat.slowSqlMillis=1000
spring.datasource.filter.stat.showSql=true
spring.datasource.filter.stat.mergeSql=true
spring.datasource.filter.stat.format=true
spring.datasource.filter.stat.exclusion=*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*
spring.datasource.web-stat-filter.enabled=true
spring.datasource.web-stat-filter.url-pattern=/*
spring.datasource.web-stat-filter.exclude-patterns=*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*
spring.datasource.timeBetweenLogStatsMillis=60000
spring.datasource.stat-view-servlet.login-username=admin
spring.datasource.stat-view-servlet.login-password=admin
```

以上是一些常用的连接池和监控属性，你可以根据自己的需求进行自定义配置。

注册Druid的Servlet和Filter以及处理器。

```java

@Configuration
public class DruidConfig {
 
    /**
     * 注册Druid的Servlet。
     */
    @Bean
    public ServletRegistrationBean<Servlet> druidServlet() {
        ServletRegistrationBean<Servlet> registrationBean = new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");
        // IP白名单
        registrationBean.addInitParameter("allow", "127.0.0.1");
        // IP黑名单(优先级高于白名单)
        registrationBean.addInitParameter("deny", "192.168.0.100");
        // 控制台管理用户
        registrationBean.addInitParameter("loginUsername", "admin");
        registrationBean.addInitParameter("loginPassword", "admin");
        // 是否能够重置数据
        registrationBean.addInitParameter("resetEnable", "false");
        return registrationBean;
    }
 
    /**
     * 注册Druid的Filter。
     */
    @Bean
    public FilterRegistrationBean<Filter> druidFilter() {
        FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<>(new WebStatFilter());
        // 过滤规则
        bean.addUrlPatterns("/*");
        // 不需要过滤的请求或静态资源
        bean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        return bean;
    }
    
}
```

以上是注册Druid的Servlet和Filter的代码，还需要使用@EnableWebMvc注解开启Spring MVC的支持。此时，就可以在浏览器中通过访问localhost:8080/druid来查看数据库连接池的使用情况了。

综上所述，DataSource是一个标准化的接口，而Druid则是一个实现了此接口的连接池框架。Druid不仅提供了连接池功能，还提供了很多监控工具和安全性控制。在Spring Boot中使用Druid非常简单，只需要添加相关的依赖和配置文件，并注册Servlet和Filter即可。

#### mybatis

##### 基础整合-mybatis

在Spring Boot中，整合MyBatis使用起来非常简单。以下是整合MyBatis的基本步骤：

添加MyBatis和MyBatis-Spring的相关依赖。可以在pom.xml文件中添加以下相关依赖：

```xml

<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
  <version>2.2.0</version>
</dependency>
```

在application.properties或application.yml中添加相关配置，例如：

```properties

# 数据库配置
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Shanghai&characterEncoding=UTF-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=123456

# MyBatis配置
mybatis.mapper-locations=classpath:mapper/*.xml
mybatis.type-aliases-package=com.example.demo.model
```

创建一个Mapper接口，利用注解或XML配置SQL查询语句。例如：

```java

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM user WHERE id = #{id}")
    User findById(Long id);

    @Insert("INSERT INTO user(username, password) VALUES(#{username}, #{password})")
    int addUser(User user);

    @Update("UPDATE user SET password = #{password} WHERE id = #{id}")
    int updatePassword(User user);

    @Delete("DELETE FROM user WHERE id = #{id}")
    int deleteById(Long id);
}
```

在Spring Boot应用程序中使用这个Mapper接口。例如：

```java

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User findById(Long id) {
        return userMapper.findById(id);
    }

    public int addUser(User user) {
        return userMapper.addUser(user);
    }

    public int updatePassword(User user) {
        return userMapper.updatePassword(user);
    }

    public int deleteById(Long id) {
        return userMapper.deleteById(id);
    }
}
```

整合MyBatis到Spring Boot应用程序中实际上就是这样。MyBatis-Spring-Boot-Starter会自动配置MyBatis与Spring Boot的整合，因此您无需编写额外的配置代码。

##### mapper.xml配置sql

当然我们也可以通过书写xml来实现查询，一般建议将mapper XML单独放在一个目录中，例如src/main/resources/mapper目录下，然后在application.properties或application.yml中配置mybatis.mapper-locations属性来指定mapper XML文件的位置。

例如，在application.properties中添加以下配置：

```properties
mybatis.mapper-locations=classpath*:mapper/*.xml
```

这样，在类路径下mapper目录下的所有XML文件都将被自动扫描到，并且可以在Java代码中通过@Mapper注解访问这些XML文件定义的SQL语句。

创建mapper XML文件时，需要定义一个命名空间(namespace)，然后在该命名空间下定义SQL语句。例如：

```xml

<!-- 定义命名空间 -->
<mapper namespace="com.example.demo.mapper.UserMapper">

    <!-- 查询语句 -->
    <select id="findById" parameterType="java.lang.Long" resultType="com.example.demo.model.User">
        SELECT * FROM user WHERE id = #{id}
    </select>

    <!-- 插入语句 -->
    <insert id="addUser" parameterType="com.example.demo.model.User" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO user(username, password) VALUES(#{username}, #{password})
    </insert>

    <!-- 更新语句 -->
    <update id="updatePassword" parameterType="com.example.demo.model.User">
        UPDATE user SET password = #{password} WHERE id = #{id}
    </update>

    <!-- 删除语句 -->
    <delete id="deleteById" parameterType="java.lang.Long">
        DELETE FROM user WHERE id = #{id}
    </delete>
</mapper>
```

注意，mapper XML文件中的id必须与对应的Mapper接口中的方法名一致，parameterType为方法的参数类型，resultType为SQL查询结果的返回类型。使用useGeneratedKeys和keyProperty可以将主键值自动注入到实体类中。

MyBatis中提供了以下的查询语句：

* select：用于查询操作，并返回结果集。
* insert：用于插入操作，并返回受影响的行数。
* update：用于更新操作，并返回受影响的行数。
* delete：用于删除操作，并返回受影响的行数。

在查询结果中，MyBatis支持使用resultType和resultMap两种方式来指定返回结果的类型，并且可以在XML文件中通过if、where、foreach等语句来控制SQL的生成逻辑，从而满足各种查询需求。

此外，MyBatis还支持使用动态SQL语句，即可以根据不同的情况生成不同的SQL语句，从而实现更灵活的查询。其中，动态SQL语句包括以下几种：

* 动态条件：使用if标签实现根据条件查询。
* foreach：使用foreach标签在集合或数组中循环生成SQL语句。
* choose、when、otherwise：使用choose标签结合when和otherwise标签实现根据情况生成不同的SQL语句。
* set：使用set标签来动态更新。

总之，MyBatis提供了很多查询方法，并且支持动态SQL语句，可以满足各种复杂的数据查询需求。

##### Mapper接口直接书写sql

比较实用且方便的是在Mapper接口中，可以使用@Select、@Insert、@Update、@Delete等注解来映射XML文件中的SQL语句。例如：

```java

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM user WHERE id = #{id}")
    User findById(Long id);

    @Insert("INSERT INTO user(username, password) VALUES(#{username}, #{password})")
    int addUser(User user);

    @Update("UPDATE user SET password = #{password} WHERE id = #{id}")
    int updatePassword(User user);

    @Delete("DELETE FROM user WHERE id = #{id}")
    int deleteById(Long id);
}
```

MyBatis提供了丰富的注解，其中包含了大量的SQL操作注解，下面列出了常用的注解：

* @Select：用于查询操作，可以使用SQL语句或者Mapper XML文件中定义的SQL语句，支持动态SQL语句，查询结果可以使用ResultMap或者ResultType属性指定实体类或者Map类型。
* @Update：用于修改操作，可以使用SQL语句或者Mapper XML文件中定义的SQL语句，支持动态SQL语句，修改的行数可以通过返回值或者使用@ResultType注解指定Integer类型的值。
* @Insert：用于插入操作，可以使用SQL语句或者Mapper XML文件中定义的SQL语句，支持动态SQL语句，插入的行数可以通过返回值或者使用@ResultType注解指定Integer类型的值。
* @Delete：用于删除操作，可以使用SQL语句或者Mapper XML文件中定义的SQL语句，支持动态SQL语句，删除的行数可以通过返回值或者使用@ResultType注解指定Integer类型的值。
* @Param：用于指定SQL中需要传递的参数的名称，使用该注解可以解决多个参数的传递问题，该注解可以放在方法参数列表前面的任意位置。
* @ResultMap：指定查询结果的映射关系，可以使用该注解将查询结果映射成实体类或者Map对象，需要提前在XML文件中定义ResultMap。
* @ResultType：指定查询结果的类型，可以使用该注解将查询结果映射成实体类或者Map对象，需要提前在XML文件中定义ResultMap。

除了以上注解之外，MyBatis还提供了@InsertProvider、 @UpdateProvider、 @DeleteProvider等注解，用于提供动态SQL语句的支持。同时，MyBatis也支持自定义注解，开发者可以根据实际情况自行定义。

##### Mybatis内置查询方法

另外，MyBatis提供了一些内置的查询方法，可以直接在Mapper接口中使用，不需要写SQL语句，这些查询方法有：

* selectByPrimaryKey：根据主键查询一条数据，返回实体类对象。
* selectAll：查询所有数据，返回实体类对象列表。
* selectOne：根据条件查询一条数据，返回实体类对象。如果查询结果有多条，会抛出异常。
* selectList：根据条件查询多条数据，返回实体类对象列表。
* selectMaps：根据条件查询多条数据，返回Map类型的结果集。
* selectMap：根据条件查询一条数据，返回Map类型的结果。

以上查询方法都是在实体类中设置了@Table注解，表名和字段名与实体类属性名相同的情况下可以直接使用。

在整个Spring Boot应用程序中，所有的SQL语句都只需要定义一次，通过mapper XML文件和Mapper接口来管理和调用，可以大大提高代码的可读性和可维护性。

#### Mybatis Plus

##### 基础配置-mybatis-plus

Mybatis-Plus是一个Mybatis的增强工具，极大地简化了数据操作的流程，提供了代码自动生成、分页插件、性能分析插件等功能。下面简要介绍一下Spring Boot整合Mybatis-Plus的步骤：

在pom.xml文件中添加以下两个依赖：

```xml

<!-- Mybatis-Plus -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.1</version>
</dependency>
<!-- MySql驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.19</version>
</dependency>
```

在application.properties中配置数据源，默认情况下，Mybatis-Plus会自动读取application.properties配置文件。

```properties
# 数据源配置
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/mybatis_plus?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull
spring.datasource.username=root
spring.datasource.password=root
```

配置Mybatis-Plus，在配置类中添加以下两个Bean：

```java

@Configuration
@MapperScan("com.example.mapper")
public class MybatisPlusConfig {

  // 分页插件
  @Bean
  public PaginationInterceptor paginationInterceptor() {
      return new PaginationInterceptor();
  }

  // 性能分析插件
  @Bean
  public PerformanceInterceptor performanceInterceptor() {
      return new PerformanceInterceptor();
  }

}
```

Mapper和实体类的定义需要参考Mybatis-Plus的规范，可以参考官方文档进行编写。

编写Service层和Controller层进行测试，具体操作与原生的Mybatis基本相同，只是添加了Mybatis-Plus提供的一些扩展功能，例如分页插件、代码自动生成等。

以上是Spring Boot整合Mybatis-Plus的基本步骤，具体操作可以参考官方文档或者样例代码。

##### 更多配置-mybatis-plus

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.2.0</version>
</dependency>
<!-- mybatis plus 代码生成器 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.2.0</version>
</dependency>
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.28</version>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
</dependency>
```

```yml
spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:3306/demo?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true
        username: root
        password: lyja
    jackson:
        date-format: yyyy-MM-dd HH:mm:ss
        time-zone: GMT+8
        serialization:
        write-dates-as-timestamps: false
mybatis-plus:
    configuration:
        map-underscore-to-camel-case: true
        auto-mapping-behavior: full
        log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    mapper-locations: classpath*:mapper/**/*Mapper.xml
    global-config:
        # 逻辑删除配置
        db-config:
        # 删除前
        logic-not-delete-value: 1
        # 删除后
        logic-delete-value: 0
```

##### 分页-mybatis-plus

```java
package com.example.conf;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisPlusConfig {

    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
```

##### 生成器-mybatis-plus

以下代码只是演示存在冲突配置，无法直接运行，请自行修改

```java
package com.example.conf;

import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.Scanner;

/**
 * 自动生成mybatisplus的相关代码
 */
public class GeneratorCodeConfig {

    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入" + tip + "：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotEmpty(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }

    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("astupidcoder");
        gc.setOpen(false);
        //实体属性 Swagger2 注解
        gc.setSwagger2(false);
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://127.0.0.1:3306/demo?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("lyja");
        mpg.setDataSource(dsc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("模块名"));
        pc.setParent("com.example");
        pc.setEntity("model.auto");
        pc.setMapper("mapper.auto");
        pc.setService("service");
        pc.setServiceImpl("service.impl");
        mpg.setPackageInfo(pc);

        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };

        //如果模板引擎是 freemarker
        String templatePath = "/templates/mapper.xml.ftl";
        //如果模板引擎是 velocity
        String templatePath = "/templates/mapper.xml.vm";

        //自定义输出配置
        List<FileOutConfig> focList = new ArrayList<>();
        //自定义配置会被优先输出
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });
        
        cfg.setFileCreate(new IFileCreate() {
            @Override
            public boolean isCreate(ConfigBuilder configBuilder, FileType fileType, String filePath) {
                // 判断自定义文件夹是否需要创建
                checkDir("调用默认方法创建的目录");
                return false;
            }
        });
       cfg.setFileOutConfigList(focList);
       mpg.setCfg(cfg);

        // 配置模板
        TemplateConfig templateConfig = new TemplateConfig();

        // 配置自定义输出模板
        //指定自定义模板路径，注意不要带上.ftl/.vm, 会根据使用的模板引擎自动识别
        templateConfig.setEntity("templates/entity2.java");
        templateConfig.setService();
        templateConfig.setController();

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("com.baomidou.mybatisplus.extension.activerecord.Model");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);

        strategy.setEntityLombokModel(true);
        // 公共父类
        strategy.setSuperControllerClass("com.baomidou.ant.common.BaseController");
        // 写于父类中的公共字段
        strategy.setSuperEntityColumns("id");
        strategy.setInclude(scanner("表名，多个英文逗号分割").split(","));
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }
}
```

##### 其他事项-mybatis-plus

###### mapper扫描注解问题(mybatis, mybatis-plus)

#### tk.mybatis

tk.mybatis是基于MyBatis实现的方便快捷的ORM框架。它是MyBatis的一个扩展，旨在简化MyBatis的开发，提高开发效率。

tk.mybatis的主要功能包括：

* 支持通用CRUD操作：提供常见的CRUD方法，例如：select、insert、update、delete等。
* 自动映射表和实体类：tk.mybatis可以根据给定的实体类和数据库表字段自动完成映射关系，无需手动编写映射文件。
* 支持分页：tk.mybatis提供了分页插件，可以轻松实现基于MyBatis的分页功能，避免手动编写复杂的SQL语句。
* 支持自定义SQL：如果tk.mybatis提供的方法无法满足需求，可以手动编写SQL语句并实现自定义方法。
* 支持单表查询关联查询：tk.mybatis提供了一个Provider的接口，可以根据需要来构建自动化SQL串。

tk.mybatis和MyBatis-Plus都是基于MyBatis的ORM框架。

下面是它们的优缺点：
tk.mybatis的优缺点
优点:

* 提供通用的Mapper实现
* 自动映射表和实体类
* 支持分页
* 支持自定义SQL
* 支持单表查询关联查询
* 功能相对简单，易于上手
* 对MyBatis的深度集成

缺点:

* 不支持自动分表分库
* 对复杂业务支持相对较弱
* 使用需手动编写XML映射文件

MyBatis-Plus的优缺点
优点:

* 提供通用的Mapper实现
* 自动映射表和实体类
* 支持分页
* 支持自定义SQL
* 支持单表查询关联查询
* 支持自动生成代码和CRUD操作
* 支持自动分表和分库
* 丰富的扩展接口和插件，易于扩展

缺点:

* 对MyBatis的封装不如tk.mybatis
* 功能较多，有一定的学习曲线

综上所述，tk.mybatis和MyBatis-Plus都是优秀的ORM框架，各有优缺点。选择哪一个，在实际项目中，需要根据具体需求来决定。如果项目需要分库分表，选用Mybatis-Plus会更加合适，而如果项目比较简单，使用tk.myabtis可能会更加好用。

#### jpa

PA（Java Persistence API）是为Java EE和Java SE环境下的对象关系映射提供的一套API标准。它是Sun官方提供的Java持久化规范，定义了标准的POJO实体类与关系数据库之间的映射规则和操作方式，方便开发人员使用Java API操作数据库。

JPA提供了一系列API，用来操作数据库对象、查询数据库信息和管理持久化上下文等相关功能，避免了Java程序员需要花费大量时间编写SQL语句，从而提升了Java开发效率和代码可读性。

其他一些ORM框架，比如Hibernate、Mybatis等，也提供了类似的功能。但是，JPA作为一套Java EE的标准规范，提供了更为简单、明确的API，具有更广泛的应用场景。

JPA的优势主要有以下几点：

* 简单易学：JPA的API非常简单，入门门槛较低，跟JavaBean的使用十分相似。

* 数据库无关性：JPA抽象了底层的数据库，可以让开发者在不改变逻辑情况下，轻松地切换底层的数据库。

* 提高开发效率： JPA自带了各种基本的CURD方法，无需手写SQL语句，大大提升了开发效率和代码可读性。

* 透明的事务管理： JPA通过EntityManager接口提供了一套完整的事务管理机制，对开发者是完全透明的。

* 易于维护： JPA提供了多种查询方式，而且查询是类型安全的，可以避免手写SQL时出现的一些语法或数据类型错误，从而提高了代码的可维护性。

* 高度可测试： JPA的大部分API都是非常普通的Java方法，这使得测试变得非常容易。因此，使用JPA开发应用程序很容易进行单元测试和集成测试。

综上所述，JPA是一套优秀的Java持久化框架，通过抽象化数据库操作，主动简化编程人员的工作，提高了开发效率和代码可读性，从而得到开发者的广泛使用和好评。

Spring Boot提供了非常简单的方法来整合JPA。下面是一些基本的步骤：

Step 1. 添加JPA依赖

在pom.xml文件中，添加JPA依赖。

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

Step 2. 配置数据库

在application.properties或application.yml文件中，配置数据库的相关信息，例如数据库url、用户名、密码等。

```properties

spring.datasource.url=jdbc:mysql://localhost:3306/mydatabase
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

# hibernate settings
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=create-drop
```

Step 3. 创建实体类

创建实体类，并使用JPA注解标识属性和关系。

```java

@Entity
@Table(name = "tb_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // ... getters and setters
}
```

Step 4. 创建JPA repository

创建JPA repository接口，它继承自JpaRepository接口，并声明自定义的查询方法。

```java

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
```

Step 5. 注入JPA repository

将JPA repository注入到Service或Controller中，进行数据操作。

```java

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
```

以上是整合JPA的基本步骤，需要注意的是，JPA实际上是一种规范，Hibernate是其中一种实现。在Spring Boot中，使用的是Hibernate实现JPA规范。

当然，在实际项目中，我们还可以使用其他的JPA实现，例如EclipseLink等。

#### redis

### 表现层相关

### 定时任务相关

## 附录

### 常见注解

#### 基础

* `@SpringBootApplication`: 默认扫描标注类所在包
* `@Configuration`
  * proxyBeanMethods
* `@PropertySource`
* `@ConfigurationProperties`
* `@EnableConfigurationProperties`

#### 创建bean

* `@Bean`
* `@Component`
* `@Import`

#### 条件

`@ConditionalOnBean`：是否存在某个某类或某个名字的Bean
`@ConditionalOnMissingBean`：是否缺失某个某类或某个名字的Bean
`@ConditionalOnSingleCandidate`：是否符合指定类型的Bean只有一个
`@ConditionalOnClass`：是否存在某个类
`@ConditionalOnMissingClass`：是否缺失某个类
`@ConditionalOnExpression`：指定的表达式返回的是true还是false
`@ConditionalOnJava`：判断Java版本
`@ConditionalOnJndi`：JNDI指定的资源是否存在
`@ConditionalOnWebApplication`：当前应用是一个Web应用
`@ConditionalOnNotWebApplication`：当前应用不是一个Web应用
`@ConditionalOnProperty`：Environment中是否存在某个属性
`@ConditionalOnResource`：指定的资源是否存在
`@ConditionalOnWarDeployment`：当前项目是不是以War包部署的方式运行
`@ConditionalOnCloudPlatform`：是不是在某个云平台上

### 热部署

依赖spring-boot-devtools

在vscode里好像插件本身就有热部署

### 命令行开发

#### nvim 如何启动spring boot项目

启动 Spring Boot 项目有多种方式，以下是其中一种使用 nvim 启动 Spring Boot 项目的方法：

打开 nvim 编辑器，并进入到 Spring Boot 项目的根目录。

在 nvim 编辑器中输入 :!./mvnw spring-boot:run 命令，其中 mvnw 是 Spring Boot 项目自带的 Maven Wrapper，可以在不需要安装 Maven 的情况下运行 Maven 命令。

按下回车键执行命令，Spring Boot 项目将会启动。在控制台中可以看到项目启动的日志信息。

打开浏览器，访问 <http://localhost:8080/，可以看到> Spring Boot 项目的首页。

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

在 nvim 编辑器中输入 `:!./mvnw spring-boot:run -Dspring-boot.run.main=<main-class>` 命令，其中 `<main-class>` 是要启动的 main 函数所在的类的全限定名（包括包名和类名）。例如，如果要启动 com.example.demo.Main 类中的 main 函数，那么 `<main-class>` 就应该是 com.example.demo.Main。

按下回车键执行命令，Spring Boot 项目将会启动。在控制台中可以看到项目启动的日志信息。

打开浏览器，访问 <http://localhost:8080/，可以看到> Spring Boot 项目的首页。

注意：在执行 `:!./mvnw spring-boot:run -Dspring-boot.run.main=<main-class>` 命令前，需要确保项目的依赖已经下载完毕。可以在项目根目录下执行 ./mvnw clean install 命令来下载依赖并编译项目。同时，需要确保 `<main-class>` 参数是正确的，否则启动可能会失败。
