# nginx conf

## nginx转发数据库链接

``` json
#mysql
stream {
    upstream mysql {
        server 2.2.2.2:3306 weight=1 max_fails=3 fail_timeout=10s;
    }

    server {
        listen 3307；
        proxy_pass mysql;
        proxy_timeout=600s;
        proxy_connect_timeout=30s;
    }
 }

http {
    ...
)
```
