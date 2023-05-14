# ZOOKEEPER

## 简介

Zookeeper是一个分布式的开源协调服务，它主要用于分布式系统中的数据管理、同步和协调。它提供了一个简单的分层命名空间和一组API，使分布式应用程序能够相互协作。Zookeeper可以被看作是一个分布式的文件系统，但其目的更多地是为了协调分布式系统中的各个节点之间的通信。

Zookeeper集群由多个服务器组成，这些服务器之间彼此知道，并通过投票选举出一个Leader作为控制者。客户端可以连接任何一个Zookeeper服务器，并从该服务器接收到整个Zookeeper集群的信息。Zookeeper使用ZAB (Zookeeper Atomic Broadcast) 协议保证集群中所有节点的一致性，当有更新发生时，只有Leader才能进行写操作。

Zookeeper广泛应用于大规模分布式系统中，如Hadoop、Kafka等，以及其他需要高度可靠和高性能的分布式系统中。

### zookeeper 和 nacos

Zookeeper和Nacos都是分布式服务治理框架，它们都可以用于服务注册发现、配置管理和命名服务。它们都具有高可用性、一致性和容错性等特点，并且在大规模分布式系统中得到了广泛应用。

然而，它们之间也存在一些差异：

* 功能：Nacos比Zookeeper提供更多的功能，例如动态配置、服务治理和流量管理等。相对而言，Zookeeper更专注于提供基本的协调服务，如分布式锁和队列等。

* 数据存储方式：Zookeeper使用文件系统来存储数据，而Nacos则使用数据库来存储数据。这使得Nacos能够更高效地处理大量数据，而Zookeeper则更适合小型集群的使用。

* 语言支持：Nacos支持Java、Go、Python和.NET等各种编程语言，而Zookeeper主要面向Java开发。

综上所述，选择Zookeeper还是Nacos主要取决于具体的业务需求和技术场景。如果需要更多的功能和更好的性能，可以考虑使用Nacos；如果只需要基本的协调服务，可以选择Zookeeper。

### 功能及场景

ZooKeeper是一个分布式协调服务，它可以提供高性能、高可用性的服务，为分布式系统环境下的应用程序提供了一致性和可靠性。具体来说，ZooKeeper具有以下几个功能和场景：

* 分布式锁：ZooKeeper可以提供可重入锁和排它锁等多种类型的锁机制，用于保护共享资源并实现分布式同步。
* 配置管理：ZooKeeper可以存储和管理应用程序的配置信息，并通知应用程序有关配置更改的消息，以便及时更新应用程序的配置。
* 命名服务：ZooKeeper可以作为命名服务，提供节点的注册、发现和查找功能。例如，Hadoop就使用ZooKeeper来管理集群中各个节点的状态和位置信息。
* 分布式协调：ZooKeeper可以协调分布式应用程序中的各个节点之间的任务分配、状态转换等操作，从而简化分布式应用程序的实现。
* 选举与领导者选举：ZooKeeper可以用于选举算法的实现，例如Leader-Follower模型，用于选出集群中的领导者节点，并确保所有节点在领导者的指导下工作。
* 分布式队列：ZooKeeper可以提供分布式队列服务，用于支持基于事件驱动的应用程序。例如，可以使用ZooKeeper实现一个基于事件的任务调度系统。

总之，ZooKeeper作为分布式协调服务，在分布式环境下具有重要的功能和优势。它能够简化分布式应用程序的开发和管理，并提供高可用性和高性能的服务。因此，ZooKeeper被广泛应用于各种分布式系统中，例如Hadoop、Kafka等。

## 内存数据模型

**ZooKeeper的内存数据模型可以看作是一个树形结构，每个节点(`znode`)都有一个路径、一组数据和一些元数据。** 其中，路径表示节点在树中的位置，数据表示节点存储的信息，元数据则包括节点的状态、版本号、ACL(Access Control List)等。

```txt
- /
| - /app1
| - /app2
    | - /app2/p_1
    | - /app2/p_2
```

### 节点特点

* `znode`通过路径具有唯一标识 例如：`/app2/p_1`
* 每个`znode`都可以存储数据，且存储的数据具有版本，每个`znode`可以存储多个版本，即每个访问路径中存在多份数据
* `znode`可以被监控，节点及子节点数据被修改可以通知到设置监控的客户端

### 节点分类

在ZooKeeper中，节点可以分为以下几种类型：

* 持久节点（Persistent Node）简称P：这种节点一旦创建，就会一直存在于ZooKeeper中，除非显式删除。当客户端与ZooKeeper断开连接后，持久节点的状态仍然会被保留。
* 临时节点（Ephemeral Node）简称E：这种节点与客户端的会话相关联，如果客户端与ZooKeeper失去连接，则它们将自动被删除。临时节点通常用于表示临时状态或瞬时资源，例如通知其他节点某个操作已完成。
* 序列化节点 (持久顺序节点)（(Persistent) Sequential Node）简称PS：这种节点会自动为其名称编号，并将其序列号附加到原始路径上，以确保每个节点都具有唯一的名称。序列节点通常用于实现FIFO队列、任务分配等功能。
* 临时序列化节点 (临时顺序节点)（Ephemeral Sequential Node）简称ES：这种节点是临时节点和序列化节点的结合体，它们与客户端的会话相关联，同时也具有自动编号的功能。临时序列化节点通常用于实现可重入锁等功能。

总之，在ZooKeeper中，节点的分类和用途各不相同，开发者可以根据自己的需求选择合适的节点类型来实现分布式协调和管理。

**ZooKeeper的内存数据模型通过ZooKeeper服务器来维护，并通过ZooKeeper客户端进行访问和操作。** 在内存中，ZooKeeper将所有节点和数据存储在一个分层命名空间中，并使用ZXID(ZooKeeper Transaction ID)来跟踪各种更改。当客户端执行对节点的创建、更新、删除等操作时，ZooKeeper会将这些操作转换为事务，并将其记录到磁盘上。这样，即使ZooKeeper服务器发生故障或重启，它也可以从磁盘日志中恢复数据，并保持数据一致性。

总之，ZooKeeper内存数据模型是一个高度可靠、分布式的数据存储模型，能够提供高效的读写操作，并确保数据的一致性和可靠性。**由于ZooKeeper的数据模型是基于内存的，因此它可以快速地响应客户端请求，支持高并发和大规模的分布式应用场景。**

## 客户端指令

ZooKeeper提供了一组命令行客户端工具，可以用于管理和监控ZooKeeper服务。以下是一些常见的ZooKeeper客户端指令：

* help：显示所有可用的客户端命令。
* ls [path]：显示指定路径下的所有子节点。
* create path data：创建一个新节点，并将数据写入该节点中。
* get path：获取指定节点的数据内容。
* set path data：更新指定节点的数据内容。
* delete path [version]：删除指定节点及其所有子节点。
* stat path：查看指定节点的状态，包括版本号、数据长度、子节点数量等。
* sync path：刷新ZooKeeper服务器缓存，以便读取最新数据。
* close：关闭当前会话。
* quit/exit：退出ZooKeeper客户端。

以上是一些常见的ZooKeeper客户端指令，可以通过在终端输入zookeeper-client命令来进入ZooKeeper客户端模式，并使用这些指令来管理ZooKeeper服务。需要注意的是，在实际应用中，还需要考虑到ZooKeeper集群的安全性和稳定性等问题。

## java客户端指令

Java中可以使用ZooKeeper API来实现对ZooKeeper服务的管理和监控。ZooKeeper API提供了一组类和方法，可以与ZooKeeper服务器进行交互，并执行各种操作，例如创建、读取、更新和删除节点等。

以下是一个使用Java ZooKeeper API的示例代码，用于连接到ZooKeeper服务器，并输出指定节点的数据内容：

```java
import java.io.IOException;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.Stat;

public class ZooKeeperExample implements Watcher {

    private static final String ZK_ADDRESS = "localhost:2181";
    private static final int TIMEOUT = 5000;

    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
        ZooKeeper zk = new ZooKeeper(ZK_ADDRESS, TIMEOUT, new ZooKeeperExample());
        Stat stat = new Stat();
        byte[] data = zk.getData("/test", false, stat);
        System.out.println(new String(data));
        zk.close();
    }

    @Override
    public void process(WatchedEvent event) {
        System.out.println(event);
    }
}
```

这段代码使用ZooKeeper API连接到本地的ZooKeeper服务器，并读取名为“/test”的节点的数据内容。其中，我们还实现了Watcher接口，用于处理ZooKeeper服务器发出的事件通知。

需要注意的是，在实际应用中，还需要考虑到ZooKeeper集群的安全性、稳定性和容错性等问题。因此，建议在使用ZooKeeper API时，应遵循最佳实践和安全规范，并看官方文档。

## 节点监听

## 配置管理

## 集群架构

## 附录

### 安装

#### 在Windows系统上部署ZooKeeper

1. 安装Java环境：ZooKeeper是基于Java开发的分布式应用程序，因此需要先安装Java运行时环境。可以从Oracle官网（<https://www.oracle.com/java/technologies/javase-downloads.html>）下载并安装适合的JRE或JDK版本。

2. 下载ZooKeeper二进制文件：从ZooKeeper官网（<http://zookeeper.apache.org/>）上下载ZooKeeper的最新二进制文件，并解压到指定目录。例如，可以将其解压到C:\zookeeper目录下。

3. 配置ZooKeeper环境变量：将ZooKeeper的bin目录添加到PATH环境变量中，以方便在命令行中执行ZooKeeper命令。可以通过以下步骤实现：

    * 在桌面上右键单击“此电脑”，选择“属性”菜单。
    * 点击“高级系统设置”链接，然后点击“环境变量”按钮。
    * 在系统变量中找到Path变量，双击进行编辑。
    * 在变量值末尾添加“;C:\zookeeper\bin”（注意，这里的路径要根据实际情况而定）。
    * 点击“确定”保存设置。

4. 创建ZooKeeper配置文件：创建一个名为zoo.cfg的文件（注意，不要使用Windows默认的txt文件格式），并添加以下内容：

    ```ini
    tickTime=2000 
    dataDir=C:\zookeeper\data 
    clientPort=2181
    ```

    其中，tickTime表示ZooKeeper内部时间的基本单位，dataDir表示数据存储目录，clientPort表示客户端连接到ZooKeeper的端口号。这里将数据存储目录设置为C:\zookeeper\data，可以根据实际情况而定。

5. 创建数据存储目录：在上一步中指定的数据存储目录下创建一个名为myid的文件，并写入一个唯一的数字，表示ZooKeeper节点的ID。例如：

    ```cmd
    echo 1 > C:\zookeeper\data\myid
    ```

    这里将节点ID设置为1，可以根据实际情况而定。

6. 启动ZooKeeper服务：在命令行中进入C:\zookeeper目录，并执行以下命令启动ZooKeeper服务：

    ```cmd
    zkServer.cmd
    ```

    如果一切正常，应该会看到类似于“ZooKeeper JMX enabled by default”和“Start server ok.”等信息，表示ZooKeeper服务已经成功启动。

在实际应用中，还需要考虑到ZooKeeper集群的安全性、稳定性和容错性等问题。因此，建议参考官方文档和最佳实践来进行配置和管理。

#### 在Ubuntu系统中安装ZooKeeper

1. 安装Java环境：ZooKeeper是基于Java开发的分布式应用程序，因此需要先安装Java运行时环境。可以使用以下命令来安装OpenJDK 8：

    ```sh
    sudo apt update
    sudo apt install openjdk-8-jdk
    ```

2. 下载ZooKeeper二进制文件：从ZooKeeper官网（<http://zookeeper.apache.org/>）上下载ZooKeeper的最新二进制文件，并解压到指定目录：

    ```sh
    wget https://downloads.apache.org/zookeeper/zookeeper-3.6.3/apache-zookeeper-3.6.3-bin.tar.gz
    tar -zxvf apache-zookeeper-3.6.3-bin.tar.gz
    sudo mv apache-zookeeper-3.6.3-bin /opt/zookeeper
    ```

    这里使用的是ZooKeeper 3.6.3版本，具体版本号可以根据实际情况而定。

3. 配置ZooKeeper环境变量：将ZooKeeper的bin目录添加到PATH环境变量中，以方便在终端中执行命令：

    ```sh
    echo 'export PATH=$PATH:/opt/zookeeper/bin' >> ~/.bashrc
    source ~/.bashrc
    ```

4. 创建ZooKeeper配置文件：通过zoo_sample.cfg文件cp一个名为zoo.cfg的文件，修改以下内容：

    ```ini
    tickTime=2000 
    dataDir=/var/lib/zookeeper 
    clientPort=2181
    ```

    其中，tickTime表示ZooKeeper内部时间的基本单位，dataDir表示数据存储目录，clientPort表示客户端连接到ZooKeeper的端口号。这里将数据存储目录设置为/var/lib/zookeeper，可以根据实际情况而定。

5. 创建数据存储目录：在上一步中指定的数据存储目录下创建一个名为myid的文件，并写入一个唯一的数字，表示ZooKeeper节点的ID。例如：

    ```sh
    sudo mkdir -p /var/lib/zookeeper
    echo 1 | sudo tee /var/lib/zookeeper/myid
    ```

    这里将节点ID设置为1，可以根据实际情况而定。

6. 启动ZooKeeper服务：运行以下命令启动ZooKeeper服务：

    ```sh
    sudo zkServer.sh start
    ```

    如果一切正常，应该会看到类似于“ZooKeeper JMX enabled by default”和“Start server ok.”等信息，表示ZooKeeper服务已经成功启动。

需要注意的是，在实际应用中，还需要考虑到ZooKeeper集群的安全性、稳定性和容错性等问题。因此，建议参考官方文档和最佳实践来进行配置和管理。

#### 使用Docker Compose启动ZooKeeper

1. 创建docker-compose.yml文件：在项目根目录下，创建一个名为docker-compose.yml的文件，并添加以下内容：

    ```yaml
    version: '3'
    services:
    zookeeper:
        image: zookeeper
        ports:
        - "2181:2181"
    ```

    这段代码定义了一个名为zookeeper的服务，并使用zookeeper镜像作为容器。同时，将主机的2181端口映射到容器内的2181端口，以便外部客户端能够访问ZooKeeper服务。

2. 启动ZooKeeper服务：在终端中进入项目根目录，并运行以下命令：

    ```sh
    docker-compose up -d
    ```

    这条命令将启动Docker Compose，并在后台运行ZooKeeper服务。

3. 测试ZooKeeper服务：可以通过ZooKeeper客户端工具来测试ZooKeeper服务是否正常运行。例如，可以使用以下命令连接到ZooKeeper服务并列出根节点：

    ```sh
    zkCli.sh -server localhost:2181
    ls /
    ```

    如果一切正常，应该会显示ZooKeeper根节点下的所有子节点信息。

### 配置文件说明

在ZooKeeper中，主要的配置文件是zoo.cfg，它包含了一些关键的参数和选项，用于控制ZooKeeper服务的行为和性能。下面是一些常见的配置参数和意义：

* tickTime：ZooKeeper内部时间的基本单位，以毫秒为单位。默认值为2000毫秒。
* initLimit：在启动过程中，ZooKeeper节点与集群之间进行初始化连接的最长时间。默认值为10。
* syncLimit：在正常运行期间，ZooKeeper节点与集群之间同步的最长时间。默认值为5。
* dataDir：ZooKeeper数据存储目录的位置。默认值为/tmp/zookeeper。
* clientPort：客户端连接到ZooKeeper的端口号。默认值为2181。
* maxClientCnxns：每个客户端可以同时打开的最大连接数。默认值为60。
* server.X：定义服务器节点X（1, 2, ...）的地址和端口号。例如：

    ```ini
    server.1=192.168.0.1:2888:3888
    ```

    其中，192.168.0.1表示服务器节点的IP地址，2888表示Quorum通讯端口，3888表示Leader选举端口。

除了以上参数外，还有一些高级选项可以进行进一步的优化和调整。例如：

* autopurge.purgeInterval：自动清理临时节点和事务日志的时间间隔，默认值为0，表示禁用自动清理。
* clientPortAddress：客户端连接的IP地址，默认值为0.0.0.0，表示所有IP地址都可以连接。
* globalOutstandingLimit：全局最大请求限制，用于控制ZooKeeper服务器处理的请求数量。默认值为1000。

总之，在配置ZooKeeper时需要谨慎考虑各个参数的意义和影响，以达到最佳的性能和可靠性。同时，也需要根据实际情况进行调整和优化，以适应不同的应用场景。

### 集群搭建

### 集群实战

### spring cloud 中使用zookeeper 进行服务注册和发现

在Spring Cloud项目中，ZooKeeper通常用于实现服务注册和发现功能。具体来说，可以通过以下步骤来使用ZooKeeper：

1. 添加依赖：在pom.xml文件中添加ZooKeeper相关的依赖项。例如，可以添加以下内容：

    ```xml
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
    </dependency>
    ```

    这里使用了Spring Cloud ZooKeeper Discovery Starter，它提供了自动化配置和集成ZooKeeper的功能。

2. 配置ZooKeeper连接参数：在application.properties或application.yml中添加ZooKeeper连接参数。例如：

    ```properties
    spring.application.name=my-service
    spring.cloud.zookeeper.connect-string=localhost:2181
    spring.cloud.zookeeper.discovery.register=true
    spring.cloud.zookeeper.discovery.prefer-ip-address=true
    ```

    其中，connect-string表示ZooKeeper服务器的地址和端口号，register和prefer-ip-address表示是否启用服务注册和IP地址优先等选项。

3. 创建服务：使用Spring Boot框架创建一个可运行的应用程序，并在服务类上添加@EnableDiscoveryClient注释。例如：

    ```java
    @SpringBootApplication
    @EnableDiscoveryClient
    public class MyServiceApplication {
        public static void main(String[] args) {
            SpringApplication.run(MyServiceApplication.class, args);
        }
    }
    ```

4. 注册服务：在服务启动时，会自动将服务注册到ZooKeeper中，以便其他客户端可以发现和调用该服务。例如：

    ```java
    @RestController
    @RequestMapping("/api")
    public class MyController {
        @GetMapping("/hello")
        public String hello() {
            return "Hello World!";
        }
    }
    ```

5. 发现服务：在其他客户端中，可以通过Spring Cloud提供的DiscoveryClient类来发现和调用已注册的服务。例如：

    ```java
    @Service
    public class MyService {
        @Autowired
        private DiscoveryClient discoveryClient;

        public String callHelloService() {
            List<ServiceInstance> instances = discoveryClient.getInstances("my-service");
            if (instances != null && !instances.isEmpty()) {
                ServiceInstance instance = instances.get(0);
                RestTemplate restTemplate = new RestTemplate();
                String url = "http://" + instance.getHost() + ":" + instance.getPort() + "/api/hello";
                return restTemplate.getForObject(url, String.class);
            }
            return null;
        }
    }
    ```

    这里使用了RestTemplate来调用已注册的服务，以获取返回的结果。

总之，在Spring Cloud项目中，使用ZooKeeper实现服务注册和发现非常简单，只需要进行简单的配置和编码即可。同时，也提供了其他的服务发现和调用模式，如Consul、Eureka等。根据实际情况选择合适的方案可以获得更好的性能和可靠性。
