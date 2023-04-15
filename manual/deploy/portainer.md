# portainer

## 部署

### image直接部署

Portainer 可以通过 Docker 部署，下面是具体步骤：

安装 Docker：首先需要在部署 Portainer 的机器上安装 Docker，可以通过以下命令安装 Docker：

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

创建 Portainer 数据卷：为了保存 Portainer 的数据，需要创建一个数据卷。可以通过以下命令创建数据卷：

```shell
docker volume create portainer_data
```

启动 Portainer：可以通过以下命令启动 Portainer 容器：

```shell
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

这个命令会启动一个名为 portainer 的容器，并将容器的 8000 端口映射到主机的 8000 端口，9000 端口映射到主机的 9000 端口。容器会自动重启，并且会将主机的 Docker socket 和数据卷挂载到容器内部，这样 Portainer 就可以访问 Docker API 和保存数据。

访问 Portainer：在浏览器中输入 `http://host:9000`，即可访问 Portainer 的 Web 界面。在第一次访问时，需要设置管理员账号和密码。

以上是部署 Portainer 的基本步骤，可以根据需要进行调整。需要注意的是，部署 Portainer 之前需要确保主机上已经安装了 Docker。

### 使用docker compose 部署

使用 Docker Compose 部署 Portainer 可以更方便地管理容器，下面是具体步骤：

安装 Docker Compose：首先需要在部署 Portainer 的机器上安装 Docker Compose，可以通过以下命令安装：

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/<版本号>/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

其中，<版本号> 需要替换为 Docker Compose 的版本。

创建 Docker Compose 文件：在部署目录下创建一个名为 docker-compose.yml 的文件，并在文件中添加以下内容：

```yaml
version: '3'

services:
  portainer:
    image: portainer/portainer
    restart: always
    ports:
      - "8000:8000"
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data

volumes:
  portainer_data:
```

这个文件定义了一个名为 portainer 的服务，使用 Portainer 的官方镜像，将容器的 8000 端口映射到主机的 8000 端口，9000 端口映射到主机的 9000 端口。同时将主机的 Docker socket 和数据卷挂载到容器内部。

启动 Portainer：在部署目录下执行以下命令启动 Portainer 容器：

```shell
docker-compose up -d
```

这个命令会在后台启动 Portainer 容器，如果需要停止容器，可以执行以下命令：

```shell
docker-compose down
```

访问 Portainer：在浏览器中输入 `http://host:9000`，即可访问 Portainer 的 Web 界面。在第一次访问时，需要设置管理员账号和密码。

以上是使用 Docker Compose 部署 Portainer 的基本步骤，可以根据需要进行调整。需要注意的是，部署 Portainer 之前需要确保主机上已经安装了 Docker 和 Docker Compose。
