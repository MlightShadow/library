# 常用SQL(sql server)

[toc]

## TRAN

```SQL
ALTER PROCEDURE [dbo].[Proc_Test_commit1]
    @result int output, --成功 1; 失败 0
    @message nvarchar(20) output
AS
BEGIN
    --设置无返回影响行数,以提高执行效率
    SET NOCOUNT ON
    --开启全部事务回滚
    --SET XACT_ABORT ON
BEGIN TRY
    BEGIN TRAN yy --开始事务
    INSERT INTO Test_Commit (b) VALUES (3)
    INSERT INTO Test_Commit (a,b) VALUES (1,3)
    SET @result=1
    RAISERROR ('异常', 16, 1 ) -- 产生异常到catch统一回滚
    COMMIT TRAN yy --提交事务
END TRY
BEGIN CATCH
    SET @message= ERROR_MESSAGE()
    SET @result=0
    ROLLBACK TRAN yy

    PRINT ERROR_MESSAGE()
END CATCH
    SET NOCOUNT OFF; --恢复设置
    --SET XACT_ABORT OFF
END
```

## 锁表

```SQL
--读锁
SELECT * FROM table WITH (HOLDLOCK)

--X锁
SELECT * FROM table WITH (TABLOCKX)

```

## 日期格式化

```SQL
Select CONVERT(varchar(100), GETDATE(), 0) -- 05 16 2006 10:57AM
Select CONVERT(varchar(100), GETDATE(), 1) -- 05/16/06
Select CONVERT(varchar(100), GETDATE(), 2) -- 06.05.16
Select CONVERT(varchar(100), GETDATE(), 3) -- 16/05/06
Select CONVERT(varchar(100), GETDATE(), 4) -- 16.05.06
Select CONVERT(varchar(100), GETDATE(), 5) -- 16-05-06
Select CONVERT(varchar(100), GETDATE(), 6) -- 16 05 06
Select CONVERT(varchar(100), GETDATE(), 7) -- 05 16, 06
Select CONVERT(varchar(100), GETDATE(), 8) -- 10:57:46
Select CONVERT(varchar(100), GETDATE(), 9) -- 05 16 2006 10:57:46:827AM
Select CONVERT(varchar(100), GETDATE(), 10) -- 05-16-06
Select CONVERT(varchar(100), GETDATE(), 11) -- 06/05/16
Select CONVERT(varchar(100), GETDATE(), 12) -- 060516
Select CONVERT(varchar(100), GETDATE(), 13) -- 16 05 2006 10:57:46:937
Select CONVERT(varchar(100), GETDATE(), 14) -- 10:57:46:967
Select CONVERT(varchar(100), GETDATE(), 20) -- 2006-05-16 10:57:47
Select CONVERT(varchar(100), GETDATE(), 21) -- 2006-05-16 10:57:47.157
Select CONVERT(varchar(100), GETDATE(), 22) -- 05/16/06 10:57:47 AM
Select CONVERT(varchar(100), GETDATE(), 23) -- 2006-05-16
Select CONVERT(varchar(100), GETDATE(), 24) -- 10:57:47
Select CONVERT(varchar(100), GETDATE(), 25) -- 2006-05-16 10:57:47.250
Select CONVERT(varchar(100), GETDATE(), 100) -- 05 16 2006 10:57AM
Select CONVERT(varchar(100), GETDATE(), 101) -- 05/16/2006
Select CONVERT(varchar(100), GETDATE(), 102) -- 2006.05.16
Select CONVERT(varchar(100), GETDATE(), 103) -- 16/05/2006
Select CONVERT(varchar(100), GETDATE(), 104) -- 16.05.2006
Select CONVERT(varchar(100), GETDATE(), 105) -- 16-05-2006
Select CONVERT(varchar(100), GETDATE(), 106) -- 16 05 2006
Select CONVERT(varchar(100), GETDATE(), 107) -- 05 16, 2006
Select CONVERT(varchar(100), GETDATE(), 108) -- 10:57:49
Select CONVERT(varchar(100), GETDATE(), 109) -- 05 16 2006 10:57:49:437AM
Select CONVERT(varchar(100), GETDATE(), 110) -- 05-16-2006
Select CONVERT(varchar(100), GETDATE(), 111) -- 2006/05/16
Select CONVERT(varchar(100), GETDATE(), 112) -- 20060516
Select CONVERT(varchar(100), GETDATE(), 113) -- 16 05 2006 10:57:49:513
Select CONVERT(varchar(100), GETDATE(), 114) -- 10:57:49:547
Select CONVERT(varchar(100), GETDATE(), 120) -- 2006-05-16 10:57:49
Select CONVERT(varchar(100), GETDATE(), 121) -- 2006-05-16 10:57:49.700
Select CONVERT(varchar(100), GETDATE(), 126) -- 2006-05-16T10:57:49.827
Select CONVERT(varchar(100), GETDATE(), 130) -- 18 ???? ?????? 1427 10:57:49:907AM
Select CONVERT(varchar(100), GETDATE(), 131) -- 18/04/1427 10:57:49:920AM
```

## 利用游标遍历表

```SQL
DECLARE  @tablename varchar(100),
         @columnsname varchar(100),
         @sql varchar(300)
--建立游标
DECLARE curTable CURSOR fast_forward|readonly
        FOR
SELECT
        objects.name AS tablename,
        columns.name AS columnsname
    FROM sys.objects
    LEFT JOIN sys.columns
        ON columns.object_id = objects.object_id
    LEFT JOIN sys.types
            ON types.system_type_id = columns.system_type_id
    WHERE types.name = 'int'
    ORDER BY objects.name ASC

--初始化游标
OPEN curTable

FETCH NEXT FROM curTable INTO @tablename, @columnsname

--游标循环
WHILE @@FETCH_STATUS = 0
BEGIN

    SET @sql = 'SELECT
        *
    FROM ' + @tablename + '
    WHERE ' + @columnsname + ' = ' + '2'

    EXEC (@sql)
    IF @@rowcount > 0
    BEGIN
        PRINT @sql
        PRINT @tablename
    END

    FETCH NEXT FROM curTable INTO @tablename, @columnsname
END

--关闭游标
CLOSE curTable
--销毁游标
DEALLOCATE curTable
```

## 查询数据库中表结构

```SQL
SELECT 表名 = CASE
        WHEN A.colorder = 1 THEN D.name
        ELSE ''
    END, 表说明 = CASE
        WHEN A.colorder = 1 THEN ISNULL(F.value, '')
        ELSE ''
    END
    , 字段序号 = A.colorder, 字段名 = A.name
    , 字段说明 = ISNULL(G.[value], '')
    , 标识 = CASE
        WHEN COLUMNPROPERTY(A.id, A.name, 'IsIdentity') = 1 THEN '√'
        ELSE ''
    END, 主键 = CASE
        WHEN EXISTS (
            SELECT 1
            FROM sysobjects
            WHERE xtype = 'PK'
                AND parent_obj = A.id
                AND name IN (
                    SELECT name
                    FROM sysindexes
                    WHERE indid IN (
                        SELECT indid
                        FROM sysindexkeys
                        WHERE id = A.id
                            AND colid = A.colid
                    )
                )
        ) THEN '√'
        ELSE ''
    END
    , 类型 = B.name, 占用字节数 = A.Length
    , 长度 = COLUMNPROPERTY(A.id, A.name, 'PRECISION')
    , 小数位数 = ISNULL(COLUMNPROPERTY(A.id, A.name, 'Scale'), 0)
    , 允许空 = CASE
        WHEN A.isnullable = 1 THEN '√'
        ELSE ''
    END
    , 默认值 = ISNULL(E.Text, '')
FROM syscolumns A
    LEFT JOIN systypes B ON A.xusertype = B.xusertype
    INNER JOIN sysobjects D
    ON A.id = D.id
        AND D.xtype = 'U'
        AND D.name <> 'dtproperties'
    LEFT JOIN syscomments E ON A.cdefault = E.id
    LEFT JOIN sys.extended_properties G
    ON A.id = G.major_id
        AND A.colid = G.minor_id
    LEFT JOIN sys.extended_properties F
    ON D.id = F.major_id
        AND F.minor_id = 0
ORDER BY A.id, A.colorder
```

## 循环切割字符串

```SQL
CREATE FUNCTION [dbo].[fn_getForgeJSONInfo]
(
    @str VARCHAR(8000), @subStr varchar(50), @index INT
)
returns varchar(50)

BEGIN
    DECLARE @N INT
    SET @N = -1
    WHILE @N <> @index
    BEGIN
        SET @N += 1
        IF @N = @index
        BEGIN
            IF(CHARINDEX(@subStr, @str) > 0)
            BEGIN
                SET @str = LEFT(@str, CHARINDEX(@subStr, @str) - 1)
            END
        END
        ELSE
        BEGIN
            SET @str = RIGHT(@str, LEN(@str) - CHARINDEX(@subStr, @str))
        END
    END

    RETURN @str
END
```

## OPENXML

```SQL
DECLARE @xmlDoc xml
DECLARE @idoc int

SET @xmlDoc = '<books>
                <book id="0001">
                   <title>book1</title>
                   <author>author1</author>
                   <price>21</price>
                </book>
                <book id="0002">
                   <title>book2</title>
                   <author>author2</author>
                   <price>79</price>
                </book>
          </books>'
--准备句柄
EXEC sp_xml_preparedocument @idoc OUTPUT, @xmlDoc;
print @idoc
SELECT
    *
FROM OPENXML(@idoc, '/books/book', 1)
WITH (title varchar(20) 'title',
author varchar(11) 'author',
price varchar(40) 'price')
--清除句柄
EXEC sp_xml_removedocument @idoc  

```

## 聚合分组

排序开窗

* `row_number() over(partition by col1 order by col2)`: 相等的值对应的排名相同，序号从1到n连续。
* `rank() over(partition by col1 order by col2)`: 但若有并列的名称，会占用下一名次的，则序号从1到n不连续。如果有两个人都排在第3名，则没有第4名
* `dense_rank() over(partition by col1 order by col2)`: 但若有并列的名称，不会占用下一名次的，则序号从1到n连续。如果有两个人都排在第3名，则下一名还是第4名
* `ntile( n ) over(partition by col1 order by col2)`: 将每个分区内排序后的结果均分成N个桶，排序对应的数字为桶号。如果不能平均分配，则较小桶号的桶分配额外的行，并且各个桶中能放的数据条数最多相差1

## 当希望改变null在排序中的顺序

默认情况下 sqlserver 中 null 参与排序时是最小值。

升序排列：null 值默认排在最前。 要想排后面，则：

```sql
ORDER BY CASE WHEN col IS NULL THEN 1 ELSE 0 END, col
```

降序排列：null 值默认排在最后。 要想排在前面，则：

```sql
ORDER BY CASE WHEN col IS NULL THEN 0 ELSE 1 END, col DESC
```
