# mysql 死锁

提示: Lock wait timeout exceeded; try restarting transaction

原因:

1. 在同一事务内先后对同一条数据进行插入和更新操作
2. 多台服务器操作同一数据库
3. 在高并发的情况下, Spring事物造成数据库死锁, 后续操作超时抛出异常
4. Mysql数据库采用InnoDB模式, 默认参数: innodb_lock_wait_timeout设置锁等待的时间是50s, 一旦数据库锁超过这个时间就会报错

排查sql

```sql
show processlist;
```

```sql
SELECT * FROM information_schema.INNODB_TRX;
```

```sql
SELECT * FROM information_schema.INNODB_LOCKs;
```

```sql
SELECT * FROM information_schema.INNODB_LOCK_waits;
```

执行以下语句将生成的kill语句执行即可

```sql
select concat('KILL ',id,';') from information_schema.processlist;
```
