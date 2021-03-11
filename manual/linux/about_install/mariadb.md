# mariadb install

在manjaro上安装好mariadb但是实际上并没有直接给生成实例, 需要使用mysql_install_db进行生成

`
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
`

安装完成后我们需要使用mysql_secure_installation对数据库进行设置
