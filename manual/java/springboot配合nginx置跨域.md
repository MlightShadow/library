# springboot配合nginx置跨域

这边配置要与nginx转发的路径一致

```java
registry.addMapping("/apis/**")
    .allowedOrigins("*")
        .allowCredentials(true)
            .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS");
```

```none
server.context-path=/apis
```

nginx添加相关header

```config
    add_header Access-Control-Allow-Origin '*';
    add_header Access-Control-Allow-Methods '*';
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Headers 'token,Content-Type';
```
