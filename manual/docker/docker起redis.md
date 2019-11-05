# docker起redis

## 拉取redis镜像

```bash
docker pull arm32v7/redis
```

## run

```bash
docker run -p 6379:6379 --name redis \
-v /docker_conf/redis/redis.conf:/etc/redis/redis.conf \
-v /docker_conf/redis/data:/data \
-d redis redis-server /etc/redis/redis.conf --appendonly yes
```

## 配置文件

[redis.conf](https://github.com/antirez/redis/blob/3.2/redis.conf)