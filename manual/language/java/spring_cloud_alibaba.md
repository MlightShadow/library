# SPRING CLOUD ALIBABA

## 概览

### 版本和历史问题

#### 应该如何选择版本

[官方版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

通过官方版本说明可以查询到相关的内容，同时在dependencyManagement引用spring cloud alibaba的依赖也可以通过它自身的版本仲裁功能解决

同样当需要使用对应版本的nacos, rocketmq等组件时也需要在版本说明中对应查找

#### 为什么后来不支持dubbo了

Dubbo 和 Spring Cloud 的设计理念有所不同，因此它们不完全相符。以下是一些主要的不同之处：

* 服务注册中心：Dubbo 使用 Zookeeper 作为服务注册中心，而 Spring Cloud 支持多种注册中心，包括 Eureka、Consul、Zookeeper 等。
* 服务治理：Dubbo 通过基于接口的服务治理来实现服务的调用和管理，而 Spring Cloud 使用基于 HTTP 的 RESTful API 进行服务治理。
* 服务调用方式：Dubbo 使用 RPC 进行服务调用，而 Spring Cloud 支持多种调用方式，包括 RESTful API、Feign、Ribbon 等。
* 配置中心：Dubbo 本身不提供配置中心，而 Spring Cloud 支持多种配置中心，包括 Config Server、Consul、Zookeeper 等。
* 服务网关：Dubbo 本身不提供服务网关，而 Spring Cloud 支持多种服务网关，包括 Zuul、Spring Cloud Gateway 等。

因此，Dubbo 和 Spring Cloud 的设计理念有所不同，虽然它们可以一起使用，但需要进行一些额外的配置和适配。

spring cloud alibaba 使用哪些组件就可以实现

Spring Cloud Alibaba 是 Spring Cloud 的一个子项目，提供了一系列组件来支持微服务架构。使用 Spring Cloud Alibaba，可以使用以下组件来实现微服务架构：

* Nacos：注册中心和配置中心，用于服务的注册和发现、配置的管理等。
* Sentinel：流量控制和熔断降级，用于保护服务的稳定性。
* RocketMQ：消息中间件，用于实现分布式异步通信。
* Dubbo：RPC 框架，用于实现分布式服务调用。
* Seata：分布式事务解决方案，用于保证分布式事务的一致性。

阿里云

* Alibaba Cloud SDK：阿里云服务 SDK，用于在 Spring Cloud Alibaba 中使用阿里云服务。
* Alibaba Cloud OSS：阿里云对象存储服务，用于存储和管理对象数据。

使用这些组件，可以实现服务注册、服务发现、负载均衡、服务调用、熔断降级、分布式事务、消息中间件等功能，从而构建一个完整的微服务架构。

spring cloud alibaba 网关是由什么组件提供的

Spring Cloud Alibaba 网关是由 Alibaba 的一个开源项目 Spring Cloud Gateway 提供的。Spring Cloud Gateway 是 Spring Cloud 的一个子项目，提供了一种简单的方式来构建 API 网关，它基于 Spring Framework 5、Spring Boot 2 和 Project Reactor 等开源技术构建。

Spring Cloud Gateway 提供了以下特性：

* 基于路由进行转发
* 支持多种协议，如 HTTP、WebSocket、TCP 等
* 支持动态路由配置
* 支持限流、熔断、重试等功能
* 支持 JWT 鉴权、OAuth2 等安全机制
* 支持自定义过滤器

Spring Cloud Alibaba 网关是在 Spring Cloud Gateway 的基础上进行扩展，提供了更多的功能和特性，如：

* 支持 Nacos 作为注册中心和配置中心
* 支持动态路由和服务发现
* 支持流量控制和熔断降级
* 支持阿里云的服务网关 ACL 等功能。

因此，Spring Cloud Alibaba 网关是由 Spring Cloud Gateway 提供的，但在其基础上进行了扩展，提供了更多的功能和特性，使其更适合于在阿里云环境下构建微服务架构。

## 工程创建

### 项目创建

#### 创建maven项目

使用 Maven 的 CLI 命令创建 Spring Cloud Alibaba 项目可以按照以下步骤进行：
打开命令行工具，进入到项目的目录。执行以下命令，创建一个新的 Maven 项目

```sh
mvn archetype:generate -DgroupId=com.example -DartifactId=demo -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

这里创建的 Maven 项目的 groupId 为 com.example，artifactId 为 demo，使用的 Archetype 是 maven-archetype-quickstart。

在 pom.xml 文件中添加 Spring Cloud Alibaba 的依赖。可以添加以下依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <version>2.2.3.RELEASE</version>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    <version>2.2.3.RELEASE</version>
</dependency>
```

这里添加了 Nacos Discovery 和 Sentinel 的依赖，用于服务的注册和发现、流量控制和熔断降级。

在 src/main/resources 目录下创建 application.properties 或 application.yml 文件，配置 Nacos 的地址和 Sentinel 的配置。例如：

```conf
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
spring.cloud.sentinel.transport.dashboard=localhost:8080
```

在 src/main/java 目录下创建启动类，添加 @SpringBootApplication、@EnableDiscoveryClient 和 @EnableCircuitBreaker 注解，启用服务发现和熔断降级功能。例如：

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;

@SpringBootApplication
@EnableDiscoveryClient
@EnableCircuitBreaker
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

编写业务代码，使用 Spring Cloud Alibaba 提供的组件进行调用，如使用 @SentinelResource 注解来定义资源的限流和熔断规则，使用 @LoadBalanced 注解来实现负载均衡等。

以上是使用 Maven 的 CLI 命令创建 Spring Cloud Alibaba 项目的基本步骤，具体的实现过程需要根据项目的实际情况进行调整和优化。

编写业务代码，使用 Spring Cloud Alibaba 提供的组件进行调用，如使用 @SentinelResource 注解来定义资源的限流和熔断规则，使用 @LoadBalanced 注解来实现负载均衡等。

以上是 Spring Cloud Alibaba 初始化项目的基本步骤，具体的实现过程需要根据项目的实际情况进行调整和优化。

## 注册中心

## 部署

## 附录

### nacos下载安装

可以使用 Docker Compose 启动 Nacos，具体步骤如下：

创建一个目录，用于存放 Docker Compose 文件和 Nacos 的配置文件。

在该目录下创建一个 docker-compose.yml 文件，添加以下内容：

```yml
version: '3'
services:
  nacos:
    image: nacos/nacos-server:latest
    container_name: nacos
    ports:
      - "8848:8848"
    volumes:
      - ./data:/home/nacos/data
      - ./logs:/home/nacos/logs
      - ./conf:/home/nacos/conf
    environment:
      - PREFER_HOST_MODE=hostname
```

这里使用 nacos/nacos-server:latest 镜像，将 Nacos 的数据、日志和配置文件挂载到本地目录，将容器的 8848 端口映射到主机的 8848 端口。

在该目录下创建一个 conf 目录，用于存放 Nacos 的配置文件。可以从 Nacos 的官方仓库中下载样例配置文件，将其复制到 conf 目录下，例如：

```sh
mkdir conf
cd conf
wget https://github.com/nacos-group/nacos-docker/raw/main/nacos-server-1.4.1/nacos-config-example.yaml
wget https://github.com/nacos-group/nacos-docker/raw/main/nacos-server-1.4.1/nacos-standalone-mysql.yaml
```

这里下载了 Nacos 的 MySQL 单机模式配置文件和示例配置文件。

在该目录下创建一个 data 目录和一个 logs 目录，用于存放 Nacos 的数据和日志。

```sh
mkdir data
mkdir logs
```

运行以下命令启动 Nacos：

```sh
docker-compose up -d
```

这里使用 -d 参数将 Nacos 以后台 daemon 模式运行。

使用浏览器访问 <http://localhost:8848/nacos>，即可进入 Nacos 的管理控制台。

以上是使用 Docker Compose 启动 Nacos 的基本步骤，具体的实现过程需要根据项目的实际情况进行调整和优化。

### pom.xml 参考

以下是一个 Spring Cloud Alibaba 的 pom.xml 文件示例，其中包含了一些常见的依赖和插件，可供参考：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>spring-cloud-alibaba-example</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <spring-cloud.version>2021.0.0</spring-cloud.version>
    </properties>

    <dependencies>
        <!-- Spring Cloud Alibaba -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>

        <!-- Spring Cloud -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Spring Boot Maven Plugin -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

这个 pom.xml 文件中主要包括了 Spring Cloud Alibaba 和 Spring Cloud 的常用依赖，以及 Spring Boot 的常用插件。该 pom.xml 文件设置的 Spring Cloud 版本为 2021.0.0，你需要根据自己的需求进行修改。
