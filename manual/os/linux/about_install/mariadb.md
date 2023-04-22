# mariadb install

在manjaro上安装好mariadb但是实际上并没有直接给生成实例, 需要使用mysql_install_db进行生成

`
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
`

安装完成后我们需要使用mysql_secure_installation对数据库进行设置

## mysql 修改用户密码

在 MySQL 中，修改用户密码可以使用 SET PASSWORD 或 ALTER USER 语句。具体操作步骤如下：

连接到 MySQL 数据库服务器，可以使用以下命令：

mysql -u root -p

其中，“-u” 表示指定要连接的用户名，“-p” 表示指定要连接的用户密码。

选择要更改密码的数据库帐户，可以使用以下命令：

use mysql;

使用 SET PASSWORD 语句来更改用户密码，例如：

SET PASSWORD FOR 'username'@'host' = PASSWORD('new_password');

其中，“username” 是要更改密码的用户名，“host” 是主机名或 IP 地址，“new_password” 是新密码。请注意，使用 SET PASSWORD 语句只能更改当前连接的用户密码。

或者，您可以使用 ALTER USER 语句来更改用户密码，例如：

ALTER USER 'username'@'host' IDENTIFIED BY 'new_password';

其中，“username”、“host” 和 “new_password” 的含义与 SET PASSWORD 语句相同。请注意，使用 ALTER USER 语句可以更改其他用户的密码。

如果您想同时更改多个用户的密码，可以使用以下命令：

UPDATE mysql.user SET authentication_string=PASSWORD('new_password') WHERE user='username' AND host='host';

其中，“username”、“host” 和 “new_password” 的含义与前面的示例相同。请注意，在这种方法中，您需要使用 UPDATE 语句将新的密码写入 mysql.user 表中。

完成以上操作后，您就可以使用新的密码来登录 MySQL 数据库了。

在 MySQL 中，可以使用 GRANT 和 REVOKE 语句来修改用户的登录限制。具体操作步骤如下：

连接到 MySQL 数据库服务器，可以使用以下命令：

mysql -u root -p

其中，“-u” 表示指定要连接的用户名，“-p” 表示指定要连接的用户密码。

选择要更改用户权限的数据库，可以使用以下命令：

use mysql;

使用 GRANT 语句为用户授权或更改其访问权限，例如：

GRANT ALL PRIVILEGES ON database.* TO 'username'@'host' IDENTIFIED BY 'password' WITH MAX_QUERIES_PER_HOUR xx MAX_CONNECTIONS_PER_HOUR xx MAX_UPDATES_PER_HOUR xx MAX_USER_CONNECTIONS xx;

其中，“database” 是要授予用户访问权限的数据库名，“username” 是要更改权限的用户名，“host” 是主机名或 IP 地址，“password” 是用户的密码，“xx” 是要更改的限制值。在这里，如下列出了一些可用的限制：

MAX_QUERIES_PER_HOUR: 每小时允许的查询次数。
MAX_CONNECTIONS_PER_HOUR: 每小时允许的连接次数。
MAX_UPDATES_PER_HOUR: 每小时允许的更新数。
MAX_USER_CONNECTIONS: 允许一个用户同时打开的最大连接数。

取消授权或删除用户的访问权限，可以使用以下命令：

REVOKE ALL PRIVILEGES ON database.* FROM 'username'@'host';

其中，“database”、“username” 和 “host” 的含义与上面的示例相同。请注意，使用 REVOKE 命令将删除用户的所有权限，而不是仅更改限制值。

完成以上操作后，您就可以修改用户的登录限制了。
