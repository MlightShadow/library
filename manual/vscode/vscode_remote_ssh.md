# vscode remote ssh

安装插件之后无法使用提示需要安装 ssh client, 可以使用git的ssh.exe来
作为插件客户端, 添加ssh路径到vscode的 `setting.json`

```json
"remote.SSH.path": "path\\to\\ssh.exe"
```

配置remote的config的时候注意, `HostName` 是IP, 而 `Host` 是连接名

```yml
Host myhost
    HostName 192.168.1.2
    Port 22
    User root
```
