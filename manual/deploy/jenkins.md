# jenkins

## 部署

### 在manjaro上搭建jenkins

在Manjaro上搭建Jenkins可以按照以下步骤进行：

安装Java：Jenkins需要Java环境才能运行。您可以使用以下命令安装Java：

```shell
sudo pacman -S jre-openjdk
```

安装Jenkins：您可以使用以下命令安装Jenkins：

```shell
sudo pacman -S jenkins
```

启动Jenkins：使用以下命令启动Jenkins服务：

```shell
sudo systemctl start jenkins
```

配置Jenkins：在浏览器中访问`http://localhost:8080`，进入Jenkins的Web界面。您需要完成以下配置：

在页面上输入初始密码，该密码可以在`/var/lib/jenkins/secrets/initialAdminPassword`中找到。
创建Jenkins管理员帐户。
安装必要的插件和工具，例如`Git`和`Maven`。

配置Jenkins代理：如果您的Manjaro系统使用了代理服务器，您需要在Jenkins中配置代理。在Jenkins UI中，转到Manage Jenkins > Manage Plugins > Advanced，然后在HTTP代理服务器一栏中配置代理。

启用Jenkins服务：使用以下命令启用Jenkins服务，以便在系统启动时自动启动Jenkins：

```shell
sudo systemctl enable jenkins
```

使用Jenkins：现在，您可以使用Jenkins来构建、测试和部署软件项目了。您可以在Jenkins UI中创建和管理项目，并使用Jenkins提供的各种插件和工具来完成自动化构建和部署。

总之，搭建Jenkins需要一些技术基础和系统管理知识。但是，Jenkins是一个非常流行和强大的持续集成和交付工具，可以帮助开发者提高工作效率和软件质量。如果您在使用Jenkins过程中遇到了问题，可以查阅官方文档或在开源社区中寻求帮助。

### 使用docker搭建jenkins

使用Docker搭建Jenkins可以让您更加方便地管理Jenkins服务和相关的依赖项。以下是使用Docker搭建Jenkins的步骤：

安装Docker：首先，您需要在您的计算机上安装Docker。您可以根据您的操作系统和版本安装Docker，可以在Docker官方网站上找到详细的安装指南。

下载Jenkins Docker镜像：您可以使用以下命令从Docker Hub上下载Jenkins Docker镜像：

```shell
docker pull jenkins/jenkins:lts
```

启动Jenkins容器：使用以下命令启动Jenkins容器：

```shell
docker run -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

其中，-p 8080:8080参数将容器内的8080端口映射到主机的8080端口，-p 50000:50000参数将容器内的50000端口映射到主机的50000端口，-v jenkins_home:/var/jenkins_home参数将主机上的jenkins_home目录映射到容器内的/var/jenkins_home目录。

访问Jenkins：在浏览器中访问`http://localhost:8080`，进入Jenkins的Web界面。您需要输入初始密码，该密码可以在`/var/jenkins_home/secrets/initialAdminPassword`文件中找到。根据提示完成Jenkins的配置。

安装插件：一旦Jenkins配置完成，您可以安装必要的插件和工具，例如Git和Maven。在Jenkins UI中，转到Manage Jenkins > Manage Plugins，然后选择需要安装的插件。

通过使用Docker搭建Jenkins，您可以更加方便地管理Jenkins服务和相关的依赖项，并且可以快速创建和销毁Jenkins容器，以适应不同的开发和测试环境。

### 使用docker compose 部署jenkins

使用Docker Compose可以更加方便地管理Jenkins服务和相关的依赖项。以下是使用Docker Compose部署Jenkins的步骤：

安装Docker Compose：首先，您需要在您的计算机上安装Docker Compose。您可以根据您的操作系统和版本安装Docker Compose，可以在Docker官方网站上找到详细的安装指南。

创建docker-compose.yml文件：在您的项目目录下创建一个名为docker-compose.yml的文件，并添加以下内容：

```yaml
version: '3'

services:
  jenkins:
    image: jenkins/jenkins:lts
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home

volumes:
  jenkins_home:
```

以上配置文件定义了一个Jenkins服务，使用Jenkins官方的LTS版本镜像，将主机的8080和50000端口映射到容器内的8080和50000端口，将主机上的jenkins_home目录映射到容器内的/var/jenkins_home目录。

启动Jenkins服务：在项目目录下运行以下命令启动Jenkins服务：

```shell
docker-compose up -d
```

其中，-d参数将Docker Compose运行在后台模式。

访问Jenkins：在浏览器中访问`http://localhost:8080`，进入Jenkins的Web界面。您需要输入初始密码，该密码可以在主机上的`jenkins_home/secrets/initialAdminPassword`文件中找到。根据提示完成Jenkins的配置。

安装插件：一旦Jenkins配置完成，您可以安装必要的插件和
