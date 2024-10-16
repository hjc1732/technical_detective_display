# SQL概述
## 一、关于SQL

### 1.1、SQL概述

>SQL：Structured Query Language（结构化查询语言），客户端使用SQL来操作数据库，可以应用到所有关系型数据库中。
>
>SQL语言标准由ISO（国际标准化组织）发布，ISO定义了很多SQL标准（例如SQL99）对RDBMS进行统一的操作，相同的语句可以操作Oracle，MySQL。**各个数据库厂商有自己的标准，类似于方言，MySQL中的limit。**         
>
>SQL语法：
>
>* SQL语句可以在单行或多行书写，以分号结尾；
>* 可使用空格和缩进来增强语句的可读性；
>* MySQL不区分大小写，建议大写。
>
>经验：通常执行对数据库的“增删改查”，简称C（Create）R（Read）U（Update）D（Delete）。

### 1.2、SQL分类

> DDL(Data Definition Language)数据定义语言：创建、删除、修改库与表结构；
>
> **DML(Data Manipulation Language)数据操作语言：增、删、改表记录；**
>
> TPL(Transaction Process Language)事务处理语言：用于对事务进行处理；
>
> **DQL(Data Query Language)数据查询语言：用来查询记录；**
>
> DCL(Data Control Language)数据控制语言：用来定义访问权限和安全级别。

## 二、数据库操作

### 2.1、查看数据库

```sql
# 查看所有的数据库
mysql> SHOW DATABASES; 
```

| 数据库名称         | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| information_schema | 信息数据库，其中保存着关于所有数据库的信息（元数据），元数据是关于数据的数据，如数据库名或表名，列的数据类型，或访问权限等。 |
| mysql              | 核心数据库，主要负责存储数据库的用户、权限设置、关键字等，以及需要使用的控制和管理信息，不可以删除。 |
| performance_schema | 性能优化的数据库，MySQL 5.5版本中新增的一个性能优化的引擎。  |
| sys                | 系统数据库，MySQL5.7版本中新增的可以快速的了解元数据信息的系统库，便于发现数据库的多样信息，解决性能瓶颈问题。 |

慢查询  >10S,SQL

### 2.2、切换数据库

```sql
# 切换到想要操作的数据库
mysql> USE sys;
```

### 2.3、查询当前使用的数据库

```sql
mysql>  select database();
```

### 2.4、创建数据库

```sql
#创建名字为mydb1数据库
mysql> CREATE DATABASE mydb1; 
#创建数据库并设置编码格式为utf8
mysql> CREATE DATABASE mydb2 CHARACTER SET utf8;
#如果mydb3数据库不存在，则创建；如果存在，则不创建。
mysql> CREATE DATABASE IF NOT EXISTS mydb3; 
```

### 2.5、查看数据库创建信息

```sql
 mysql> SHOW CREATE DATABASE mydb1;
```

### 2.6、修改数据库

```sql
#修改数据库的字符集
mysql> ALTER DATABASE mydb1 CHARACTER SET gbk; 
```

### 2.7、删除数据库

```sql
#删除数据库mydb1
mysql> DROP DATABASE mydb1; 
#如果存在数据库mydb2就删除
mysql> DROP DATABASE IF EXISTS mydb2; 
```

## 三、表的操作

### 3.1、数据类型

> MySQL支持多种类型，大致可以分为三类：
>
> * 数值；    int  bigint  double decimal
> * 字符串(字符)类型；  char varchar 
> * 日期时间。 datetime
>
> 数据类型对于我们约束数据的类型有很大的帮助。

#### 3.1.1、数值类型

| 类型             | 大小                              | 范围（有符号）                                  | 范围（无符号）              | 用途                                     |
| ---------------- | --------------------------------- | ----------------------------------------------- | --------------------------- | ---------------------------------------- |
| **INT**          | 4 字节                            | (-2 147 483 648，2 147 483 647)                 | (0，4 294 967 295)          | 大整数值                                 |
| **DOUBLE**       | 8 字节                            | （-1.797E+308,-2.22E-308）                      | (0,2.22E-308,1.797E+308)    | 双精度浮点数值                           |
| DOUBLE(M,D)      | 8个字节，M表示长度，D表示小数位数 | 同上，受M和D的约束   DOUBLE(5,2) -999.99-999.99 | 同上，受M和D的约束          | 双精度浮点数值                           |
| **DECIMAL**(M,D) | DECIMAL(M,D)                      | 依赖于M和D的值，M最大值为65                     | 依赖于M和D的值，M最大值为65 | 小数值，和钱相关，不会出现精度缺失的问题 |

#### 3.1.2、字符串类型

| 类型                        | 大小         | 用途                          |
| --------------------------- | ------------ | ----------------------------- |
| **CHAR**                    | 0-255字符    | 定长字符串CHAR(10)10个字符    |
| **VARCHAR**                 | 0-65535 字节 | 变长字符串VARCHAR(10)10个字符 |
| BLOB（binary large object） | 0-65535字节  | 二进制形式的长文本数据        |
| TEXT                        | 0-65535字节  | 长文本数据                    |

> 关于CHAR和VARCHAR：
>
> * CHAR(255) 数据长度不足指定长度，补足到指定长度，用于身份证号，手机号，时间固定长度的内容；
> * VARCHAR(65535)  数据长度不足指定长度，不补足到指定长度，用于用户名，备注不固定长度的内容；
> * VARCHAR单独至少花一个字节保存数据长度，如果长度超过一个字节，就要花费两个字节。

慢查询  >10  BLOB   

#### 3.1.3、日期时间类型

| 类型         | 大小 | 范围                                                         | 格式                | 用途                     |
| ------------ | :--- | ------------------------------------------------------------ | ------------------- | ------------------------ |
| DATE         | 3    | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME         | 3    | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR         | 1    | 1901/2155                                                    | YYYY                | 年份值                   |
| **DATETIME** | 8    | 1000-01-01 00:00:00/9999-12-31 23:59:59                      | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP    | 4    | 1970-01-01 00:00:00/2038 结束时间是第 **2147483647** 秒北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |

### 3.2、创建表

> 语法：

```sql
CREATE TABLE [IF NOT EXISTS] 表名（
	列名 数据类型 [约束],
	列名 数据类型 [约束],
	列名 数据类型 [约束]       //最后一列的末尾不加逗号
）[CHARSET=utf8];			//可根据需要指定表的字符编码集
```

> 关于约束后面会讲到，这里可以暂时不关注。
>
> 举例：

学生表（student）

| 列名     | 数据类型    | 说明   |
| -------- | ----------- | ------ |
| id       | INT         | 编号   |
| name     | VARCHAR(20) | 姓名   |
| age      | INT         | 年龄   |
| birthday | TIMESTAMP   | 生日   |
| phonenum | CHAR(11)    | 手机号 |
| address  | VARCHAR(20) | 住址   |

```sql
CREATE TABLE student (
	id INT,
    name VARCHAR(20),
    age INT,
    birthday TIMESTAMP,
    phonenum CHAR(11),
    address VARCHAR(20)
);
```

### 3.3、查看表

```sql
# 查看当前数据库中所有表名称
SHOW TABLES;
# 查看指定表的创建语句
SHOW CRqEATE TABLE 表名;
# 查看表结构
DESC 表名;
```

### 3.4、修改表

```sql
# 添加列
ALTER TABLE 表名 ADD (
    列名 列类型,
    列名 列类型
)

# 修改列类型(如果被修改的列已存在数据，那么新的类型可能会影响到已存在数据), 修改表中的某列时，也要写全列的名字，数据类型，约束
ALTER TABLE 表名 MODIFY 列名 列类型;   

# 修改列名, 在给定列新名称时，要指定列的类型和约束
ALTER TABLE 表名 CHANGE 原列名 新列名 列类型;

# 删除列, 删除列时，每次只能删除一列
ALTER TABLE 表名 DROP 列名;

# 修改表名称
ALTER TABLE 原表名 RENAME TO 新表名;
ALTER TABLE 原表名 RENAME 新表名; 
```

### 3.5、删除表

```sql
DROP TABLE 表名;
```
