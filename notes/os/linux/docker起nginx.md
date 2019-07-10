# docker起nginx(挂载配置)

```bash
mkdir -p /home/pi/docker_conf/nginx/{conf,conf.d,html,logs}
```

```bash
nano /home/pi/docker_conf/nginx/conf/nginx.conf
```

`nginx.conf`配置

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

```bash
nano /home/pi/docker_conf/nginx/conf.d/default.conf
```

`default.conf`配置

```conf
server {  
    listen       80;  
    server_name  localhost;  
  
    #charset koi8-r;  
    #access_log  /var/log/nginx/log/host.access.log  main;  
  
    location / {  
        root   /usr/share/nginx/html;  
       # root   /usr/nginx/html;  
        index  index.html index.htm;  
        autoindex  on;  
    try_files $uri /index/index/page.html;  
        #try_files $uri /index/map/page.html;  
    }  
  
    #error_page  404              /404.html;  
  
    # redirect server error pages to the static page /50x.html  
    #  
    error_page   500 502 503 504  /50x.html;  
    location = /50x.html {  
        root   /usr/share/nginx/html;  
    }  
  
    # proxy the PHP scripts to Apache listening on 127.0.0.1:80  
    #  
    #location ~ \.php$ {  
    #    proxy_pass   http://127.0.0.1;  
    #}  
  
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000  
    #  
    #location ~ \.php$ {  
    #    root           html;  
    #    fastcgi_pass   127.0.0.1:9000;  
    #    fastcgi_index  index.php;  
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;  
    #    include        fastcgi_params;  
    #}  
  
    # deny access to .htaccess files, if Apache's document root  
    # concurs with nginx's one  
    #  
    #location ~ /\.ht {  
    #    deny  all;  
    #}  
}
```

启动

```bash
docker run -itd \
-p 8080:80 \
-v /home/pi/docker_conf/nginx/html:/usr/share/nginx/html \
-v /home/pi/docker_conf/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/pi/docker_conf/nginx/logs:/var/log/nginx \
-v /home/pi/docker_conf/nginx/conf.d:/etc/nginx/conf.d \
nginx:latest
```
