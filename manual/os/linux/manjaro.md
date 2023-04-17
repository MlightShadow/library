# manjaro 更新时签名异常

在安装软件包时出现 "manjaro-keyring" 的签名 "unknown trust" 错误是因为 pacman 不认可 manjaro-keyring 包的签名。一般情况下，这个问题可能是由于长时间没有更新 pacman 导致的。

你可以尝试通过以下步骤来解决 "manjaro-keyring" 未知信任的问题：

首先，更新你的 pacman 数据库和密钥环。执行以下命令：

sudo pacman -Syy manjaro-keyring

这将使 pacman 获取最新的软件包信息和更新 manjaro-keyring 密钥环。

现在清除其已下载的软件包缓存，以避免旧包引起的问题。执行以下命令：

sudo pacman -Scc

这将会清除 pacman 的软件包缓存，但是会保留已安装的软件包。

重新安装 manjaro-keyring 包以获得新的签名。执行以下命令：

sudo pacman -S manjaro-keyring

这将会安装最新的 manjaro-keyring 包。在重新安装后，你的系统应该已经信任这个包的签名，你可以愉快地安装任何你需要的软件包了。

如果上述步骤仍然无法解决问题，则请确保你的系统的时间和日期设置正确，因为时间设置不正确可能导致签名验证失败。此外，你也可以尝试更新 Arch 本身的密钥环，这可以通过运行以下命令来完成：

sudo pacman-key --refresh-keys

如果还有问题，你可以考虑更换软件源或与社区寻求帮助。
