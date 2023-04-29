# nextcloud

## 部署

以下是使用 Docker Compose 搭建 Nextcloud 的步骤：

创建一个新的目录，在其中创建一个名为 docker-compose.yml 的文件。

在 docker-compose.yml 中添加以下内容：

```yaml

version: '3'

services:
  db:
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_PASSWORD: example
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
    volumes:
      - db:/var/lib/mysql

  app:
    image: nextcloud:fpm
    restart: always
    environment:
      POSTGRES_DB: nextcloud
      POSTGRES_USER: nextcloud
      POSTGRES_PASSWORD: example
      POSTGRES_HOST: db
    volumes:
      - nextcloud:/var/www/html
    ports:
       - "8080:80"

volumes:
  nextcloud:
  db:
```

这个 docker-compose.yml 文件定义了两个服务：一个 MySQL 数据库和一个 Nextcloud 应用程序。两个服务都定义了一个 volumes 属性，用于在本地创建 Volume 并将其映射到 Docker 容器中的 Volume 中。同时，app 服务会将容器端口 80 映射到 Docker 宿主机的端口 8080。

在终端进入该目录中并执行以下命令运行 Nextcloud：

```sh

docker-compose up -d
```

这个命令将会下载 Nextcloud 和 MySQL 的 Docker 镜像，并拉起 Nextcloud 容器和 MySQL 容器。

打开浏览器，访问 <http://localhost:8080，会出现> Nextcloud 的安装向导。按照向导提示设置用户名、密码、数据库等即可。

这样，就成功的使用 Docker Compose 搭建了 Nextcloud。可以在 docker-compose.yml 中添加各种设置和插件，以定制自己的 Nextcloud 服务。同时可以使用 docker-compose down 命令停止服务，使用 docker-compose up 重新启动。

## 转发配置

在 Nextcloud 管理员页面中，点击左上角的菜单按钮，然后点击 “设置”。

在 “一般” 选项卡下，找到 “URL 前缀” 配置项，将其设置为需要的 URL 前缀，如 /nc。

点击 “保存”。

另外，您可以使用 Docker 容器参数来直接指定 Nextcloud 的 URL 前缀（也称为 SCRIPT_NAME）。

在运行 Nextcloud 容器时，可以使用 -e 参数设置环境变量，如下所示：

```sh

docker run -d -e NEXTCLOUD_SUB_URL=/nc \
  --name nextcloud \
  -p 8080:80 \
  nextcloud
```

这个命令中，-e NEXTCLOUD_SUB_URL=/nc 将 NEXTCLOUD_SUB_URL 环境变量设置为 /nc，从而指定了 Nextcloud 的 URL 前缀为 /nc。

设置了 URL 前缀后，可以在 Nginx 配置文件中将其添加到代理规则中，如前面所示。

在 Docker Compose 文件中，可以使用 environment 字段来设置环境变量，从而指定 Nextcloud 的 URL 前缀。以下是示例的 docker-compose.yml 文件：

```yaml

version: '3'
services:
  nextcloud:
    image: nextcloud
    environment:
      - NEXTCLOUD_SUB_URL=/nc
    ports:
      - "8080:80"
```

在这个文件中，NEXTCLOUD_SUB_URL 环境变量设置为 /nc，从而指定了 Nextcloud 的 URL 前缀为 /nc。

然后在 Nginx 的配置文件中，将 /nc 前缀添加到 Nextcloud 的代理规则里。例如，在转发到 Nextcloud 的 Nginx 配置文件中添加以下配置：

```bash

location /nc {
    proxy_pass <http://localhost:8080/>; # 对应 Nextcloud 容器的映射端口
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # 需要添加以下配置，以支持 Nextcloud 的 URL 前缀
    proxy_set_header SCRIPT_NAME /nc;
    proxy_set_header REQUEST_URI /nc$request_uri;
}

```

重新加载 Nginx 配置文件，使配置生效。

现在，您可以使用 <http://server/nc> 进行访问 Nextcloud 了。

## 其他
