# redis

## 非关系型数据库

关系型数据库（RDBMS）和非关系型数据库（NoSQL）是两种不同的数据存储方式。

关系型数据库（RDBMS）：

- 存储数据的结构是关系型的，使用表格来表示数据。
- 需要遵守严格的数据模型，如模式、关系、约束等。
- 使用 SQL (Structured Query Language)对数据进行查询和管理。
- 高度可靠和持久化，使用事务来保证数据一致性。
- 适用于需要有结构化数据和高度一致性操作的业务场景，比如金融和电子商务。

常见的关系型数据库软件有 MySQL, Oracle, SQL Server 等。

非关系型数据库（NoSQL）：

- 存储数据的结构是非结构化或半结构化的，使用键值对、文档、图形或列族等方式来存储数据。
- 数据模型灵活，没有严格的模式和约束，可以根据需要快速扩展和更改模型。
- 查询语言较灵活，通常支持查询 API 或使用类似 JSON 文件的查询语言。
- 可伸缩性非常好，适合海量数据存储和分布式计算。
- 适用于需要高并发以及对数据格式变化要求较高的应用场景，比如社交媒体和物联网。

常见的非关系型数据库软件有 MongoDB, Cassandra, Hbase 等。

总之，关系型数据库和非关系型数据库各有其优点和适用场景。在选择使用哪种数据库类型时，需要根据业务需求来进行选择，权衡数据一致性、可靠性、速度和可扩展性等因素。

常见的非关系型数据库软件有以下几种：

1. 文档型数据库（Document-Oriented Databases）文档型数据库以文档为单位来存储数据。文档通常采用 BSON 或 JSON 格式存储，可以看作是键值对的集合。文档 型数据库通常用于存储半结构化数据。典型的代表有 MongoDB, Couchbase, Elasticsearch 等。
2. 列式数据库（Columnar Databases）列式数据库以列为单位来存储数据。它区别于关系型数据库的行式存储，适用于查询和分析大量数据。典型的代表有 Hbase, Cassandra, Vertica 等。
3. 键值型数据库（Key-Value Databases）键值型数据库以键值对的形式进行数据存储，其中键是惟一的标识符，值可以是任何类型的数据。键值型数据库通常用于快速存储和检索大量数据。典型的代表有 Redis, Memcached, Riak 等。
4. 图形数据库（Graph Databases）图形数据库是为存储节点和边的复杂数据而优化的，通常用于社交网络、推荐系统、搜索引擎等。它能够表达节点之间的复杂关系，支持高效的路径查询。典型的代表有 Neo4j, OrientDB, ArangoDB 等。

总之，非关系型数据库的分类多种多样，每一种都有其优势和局限。在选择非关系型数据库时，需要结合具体业务场景和需求进行选择。

redis的两个主要特点：

- 对数据高并发读写
- 单线程操作

Redis 的基础知识包括以下几个方面：

1. Redis 的数据结构：Redis 支持多种数据结构，包括字符串、哈希、列表、集合和有序集合。了解这些数据结构的使用方法和内部原理，能够更好地利用 Redis 解决实际问题。
2. Redis 的命令和操作：Redis 提供了丰富的命令和操作，包括读写操作、过期设置、事务控制、持久化等。熟悉这些命令和操作，能够方便快捷地操作 Redis 数据库。
3. Redis 的持久化：Redis 支持两种持久化方式，即 RDB 和 AOF。了解这两种持久化方式的原理和使用方法，能够更好地保障 Redis 数据的易恢复性。
4. Redis 的事务控制：Redis 支持事务控制，能够保证一组命令的原子性执行。熟悉 Redis 事务原理和使用方法，能够保障 Redis 的数据完整性。
5. Redis 的高可用：Redis 提供了多种高可用方案，包括主从复制、哨兵和集群等。了解这些高可用方案的原理和使用方法，能够更好地保障 Redis 的可用性和稳定性。

总之，Redis 的基础知识包括数据结构、命令和操作、持久化、事务控制和高可用等方面。学习 Redis 基础知识是深入了解 Redis，充分发挥 Redis 的优势，提高 Redis 的使用效率和质量的关键。

## 命令

Redis的命令非常丰富，以下是一些常用的命令：

- 通用命令：
  - SETEX：设置键值对并且设定存活时间seconds单位（秒）`set key seconds value`，超时后 get 返回 nil
  - TTL：查看key的存活时间 `ttl key` 返回整数为剩余存活时间
  - DEL：删除key `del key`
  - SETNX：存在key则不做操作，不存在则添加 `setnx key value`
  - MSET：批量添加 `mset key1 value1 key2 value2 ...`
  - MGET：批量获取 `mget key1 key2 ...`
  - SETRANGE：修改key的value根据offset指定索引位置开始 `setrange key offset value`
- 字符串操作命令：
  - SET：设置一个键值对 `set key value`
  - GET：获取一个键的值 `get key`
  - INCR：将键的值增加1，只能对数值操作 `incr age`
  - DECR：将键的值减少1，只能对数值操作 `decr age`
  - INCRBY：对key的值添加increment `incrby key increment`
  - APPEND：向键的值末尾追加字符串 ``
- 列表操作命令：
  - LPUSH key value1 [value2]：在列表的左侧插入一个或多个值。
  - RPUSH key value1 [value2]：在列表的右侧插入一个或多个值。
  - LPOP key：移除并返回列表左侧的第一个元素。
  - RPOP key：移除并返回列表右侧的第一个元素。
  - LINDEX key index：返回列表中指定位置的元素。
  - LLEN key：返回列表长度。
  - LRANGE key start stop：返回列表中指定区间内的元素。
  - LREM key count value：移除列表中指定值的元素。
  - LSET key index value：设置指定位置的元素值。
  - LTRIM key start stop：截取列表指定区间内的元素。
- 集合操作命令：
  - SADD：向集合中添加元素
  - SREM：从集合中删除元素
  - SMEMBERS：获取集合中的所有元素
  - SISMEMBER：判断元素是否在集合中
- 哈希操作命令：
  - HSET key field value：给指定的哈希表中设置一个字段的值，如果该字段已经存在，那么它的值将被覆盖。
  - HGET key field：获取指定哈希表中给定字段的值。
  - HGETALL key：获取指定哈希表中所有字段和值。
  - HMSET key field1 value1 field2 value2 ...：同时将多个字段设置为它们各自的值。
  - HMGET key field1 field2 ...：获取所有给定字段的值。
  - HDEL key field1 field2 ...：删除一个或多个哈希表字段。
  - HEXISTS key field：检查给定字段是否存在于哈希表中。
  - HINCRBY key field increment：将哈希表中指定字段的值增加给定的数字。
  - HKEYS key：获取哈希表中所有的字段。
  - HVALS key：获取哈希表中所有的值。
- 有序集合操作命令：
  - ZADD：向有序集合中添加元素
  - ZREM：从有序集合中删除元素
  - ZRANGE：获取有序集合中指定分数范围内的元素
  - ZSCORE：获取有序集合中指定元素的分数

还有很多其他的命令，包括事务、发布订阅、管道等，可以根据具体需求选择使用。

## 数据结构

Redis支持以下五种主要的数据类型：

1. 字符串（string）：Redis的最基础数据类型，可以存储任何形式的字符串，包括二进制数据。

2. 列表（list）：由一系列按照插入顺序排序的元素组成，可以在列表的两端进行操作，支持各种常见的列表操作，如推入、弹出、修剪、范围获取等。

3. 集合（set）：由一系列无序、唯一的元素组成，支持判断元素是否存在、添加、删除等操作，还支持集合间的交、并、差等操作。

4. 哈希（hash）：由多个键值对组成的无序散列表，支持添加、删除、获取单个或多个键值对等操作。

5. 有序集合（sorted set）：由一系列唯一的元素及其对应的分数组成，支持添加、删除、获取单个或多个元素、根据分数获取元素等操作，还支持有序集合的交、并、差等操作。

### 字符串 string

### 哈希 hash

### 列表 list

### 集合 set

### 有序集合 zset(sorted set)

## 特性

## 附录

### 安装

这里简述Windows上的两种方法，以及使用docker-compose的部署方法

#### Windows

Windows 中可以通过两种方式安装 Redis：使用官方提供的 Redis MSI 安装程序或使用 Chocolatey 工具进行安装。

##### 方法1 使用 Redis MSI 安装程序

Redis 官方网站上提供了一个 MSI 安装程序，该程序可以在 Windows 上安装 Redis。

1. 首先下载 Redis MSI 安装程序，可以从 Redis 官方网站上下载<https://redis.io/download>。

2. 双击打开下载好的 MSI 安装程序，按照向导进行安装。

3. 安装完成之后，可以使用 `redis-cli` 命令来启动 Redis 客户端 CLI，也可以使用 `redis-server` 命令来启动 Redis 服务器。默认情况下，Redis 服务器会在本地监听 6379 端口。

##### 方法2 使用 Chocolatey 工具进行安装

Chocolatey 是 Windows 平台上的一个包管理工具，可以使用它来安装 Redis。

1. 首先安装 Chocolatey，可以在 PowerShell 终端中运行以下命令：

   ```sh
   Set-ExecutionPolicy Bypass -Scope Process -Force; `
   iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
   ```

2. 安装 Redis，可以在 PowerShell 终端中运行以下命令：

   ```sh
   choco install redis-64 -version 5.0.7
   ```

这会安装 Redis 5.0.7 版本并启动 Redis 服务器。默认情况下，Redis 服务器会在本地监听 6379 端口。

总之，Windows 中可以使用 MSI 安装程序或 Chocolatey 工具来安装 Redis，轻松实现在 Windows 平台上运行 Redis 服务器和客户端。

#### docker-compose

在 docker-compose.yml 文件中配置 Redis 服务。示例如下：

```yml
version: '3'
services:
    redis:
    image: redis
    restart: always
    ports:
        - "6379:6379"
```

这段配置将启动 Redis 容器，使用 Redis 官方镜像（image: redis），容器将在启动时自动重启（restart: always），将 Redis 的默认端口 6379 映射到宿主机上（ports: - "6379:6379"）。

在终端中进入项目根目录，运行以下命令启动 Redis 服务：

```sh
docker-compose up -d
```

这个命令将在后台启动 Redis 服务。

Redis 客户端 CLI 是 Redis 自带的命令行工具，可以用于与 Redis 服务器进行交互。可以通过 CLI 执行 Redis 命令、操作 Redis 数据库，以及进行性能调优和故障排查。

启动 Redis CLI 非常简单，只需在终端中输入以下命令：

```sh
redis-cli
```

这将启动默认设置下的 Redis CLI，并连接到本地默认端口 6379 上运行的 Redis 服务器。

CLI 提供了一个 REPL（Read-Eval-Print Loop）交互式环境，可以使用其中的多条命令来操作 Redis 服务器。以下是一些常用的命令：

- `set key value`：设置指定 key 的 value。
- `get key`：获取指定 key 的 value。
- `incr key`：将指定 key 的 value 加 1。
- `decr key`：将指定 key 的 value 减 1。
- `keys pattern`：按 key 的通配符模式匹配取出所有 key。
- `del key1 key2 ...`：删除指定的 key。
- `info`：获取 Redis 服务器的信息。
- `ping`：测试 Redis 服务器是否可用。

另外，CLI 提供了一些高级功能，比如可以使用 `-h` 选项来指定要连接的 Redis 服务器的主机名或 IP 地址：

```sh
redis-cli -h my_redis_server
```

还可以使用 `-p` 选项来指定 Redis 服务器的端口：

```sh
redis-cli -p 6380
```

这些选项可以根据需要进行组合使用，以连接到远程 Redis 服务器或进行其他操作。

总之，Redis CLI 是一个非常有用的工具，提供了一个简单而强大的方法来与 Redis 进行交互，并帮助进行调试和故障排查。

### 配置

### springboot中使用redis

Spring Boot中使用Redis可以通过Jedis或Lettuce等客户端来操作。以下是几个常用的操作方法：

1. 设置key-value：redisTemplate.opsForValue().set(key, value)

2. 获取value：redisTemplate.opsForValue().get(key)

3. 设置过期时间：redisTemplate.expire(key, seconds, TimeUnit.SECONDS)

4. 删除key：redisTemplate.delete(key)

5. 判断key是否存在：redisTemplate.hasKey(key)

6. 设置hash值：redisTemplate.opsForHash().put(key, hashKey, value)

7. 获取hash值：redisTemplate.opsForHash().get(key, hashKey)

8. 删除hash值：redisTemplate.opsForHash().delete(key, hashKey)

9. 设置list值：redisTemplate.opsForList().rightPush(key, value)

10. 获取list值：redisTemplate.opsForList().range(key, start, end)

11. 删除list值：redisTemplate.opsForList().remove(key, count, value)

还有很多其他的操作方法，具体可以参考Spring Boot官方文档或Redis官方文档。

RedisTemplate是Spring封装的一个Redis操作类，它提供了一系列可用的方法来操作Redis数据库。主要的方法有：

1. opsForValue()：操作字符串类型的数据，包括set、get、increment、decrement等方法。

2. opsForList()：操作列表类型的数据，包括leftPush、leftPushAll、rightPush、rightPushAll等方法。

3. opsForSet()：操作集合类型的数据，包括add、remove、pop、move等方法。

4. opsForZSet()：操作有序集合类型的数据，包括add、remove、incrementScore、rank等方法。

5. opsForHash()：操作哈希类型的数据，包括put、get、delete等方法。

6. execute()：通过自定义的RedisCallback、SessionCallback等接口可以操作更加复杂的操作，如事务、流水线等。

7. delete()：删除指定的key。

8. hasKey()：判断指定的key是否存在。

9. expire()：设置key的过期时间。

10. keys()：获取指定正则表达式匹配的key集合。

11. watch()：在事务执行之前监控指定的key，如果在事务执行期间有其他客户端对这些key进行了修改，事务会被回滚。

还有很多其他的方法，具体可以参考Spring官方文档或Redis官方文档。
