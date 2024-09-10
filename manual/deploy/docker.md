如果`docker.com`网站无法访问，但你仍然需要在Ubuntu系统上安装Docker，你可以通过其他途径来下载安装所需的软件包。在Ubuntu上安装Docker一般分为几个步骤：添加Docker的GPG密钥、设置Docker仓库、更新包索引，然后安装Docker引擎。如果网络问题影响了这些步骤，你可以尝试以下方法：

### 1. 添加Docker GPG Key

通常，你会从Docker官网获取GPG密钥，但既然`docker.com`无法访问，你可以使用一个可靠的镜像源来下载GPG密钥。例如，阿里云提供了Docker的镜像服务，你可以从那里获取GPG密钥：

```bash
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 2. 设置Docker仓库

编辑`/etc/apt/sources.list.d/docker.list`文件，添加Docker仓库信息。由于`docker.com`不可达，你可以使用阿里云或其他镜像站点：

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 3. 更新包索引

```bash
sudo apt-get update
```

### 4. 安装Docker

现在，你可以安装Docker引擎了：

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 5. 验证安装

安装完成后，验证Docker是否成功安装：

```bash
sudo systemctl status docker
```

如果Docker服务正在运行，那么恭喜你，你已经成功在没有直接访问`docker.com`的情况下安装了Docker！

### 注意事项

- 以上命令使用了阿里云的Docker镜像站，你可以根据你的地理位置选择更近的镜像站，以获得更快的下载速度。
- 确保你的Ubuntu系统已经更新到最新，以便避免潜在的兼容性问题。
- 如果你使用的是企业级防火墙或代理服务器，可能还需要额外配置才能使Docker正常工作。