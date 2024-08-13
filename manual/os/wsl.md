# wsl

安装之后启动异常应该先对wsl 进行 update

然后 unregister 再重新 install

```powershell
wsl --update
wsl --unregister Ubuntu-24.04
wsl --install -d Ubuntu-24.04
```