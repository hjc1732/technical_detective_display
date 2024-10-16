# Log4j

官方网站：

https://logging.apache.org/log4j/1.2/

## Log4j简介

Log4j是Apache的一个开源项目，通过使用Log4j，我们可以控制日志信息输送的目的地是控制台、文件、GUI组件，甚至是套接口服务器、NT的事件记录器、UNIX Syslog 守护进程等；我们也可以控制每一条日志的输出格式；通过定义每一条日志信息的级别，我们能够更加细致地控制日志的生成过程。最令人感兴趣的就是，这些可以通过一个配置文件来灵活地进行配置，而不需要修改应用的代码。



Log4j->JUL

## Log4j组件介绍

Log4j主要由 Loggers(日志记录器)、Appenders（输出控制器）和 Layout（日志格式化器）组成。其中 Loggers 控制日志的输出以及输出级别；Appenders 指定日志的输出方式（输出到控制台、文件等）；Layout 控制日志信息的输出格式。



- **Loggers**

日志记录器，负责收集处理日志记录，实例的命名就是类的全限定名，如cn.giteasy.log4j.XX，Logger的名字大小写敏感，

其命名有继承机制：例如：

name为 top.tec.log4j 的 logger 会继承 name 为 top.tec。



**Root Logger 根Logger**

**top**  

**top.tec.log4j**

**top.tec.log4j.test**

**top.tec.log4j.test.xxx**

父Logger所做的日志属性设置，会直接影响到子Logger



Log4J 中有一个特殊的 logger 叫做“root”，他是所有 logger 的根，也就意味着其他所有的 logger 都会直接 或者间接地继承自root。root logger可以用 Logger.getRootLogger()方法获取。



自 log4j 1.2 版以来，Logger 类已经取代了 Category 类。对于熟悉早期版本的 log4j的人来说， Logger类可以被视为 Category 类的别名。





关于日志级别信息，例如 DEBUG、INFO、WARN、ERROR…级别是分大小的

DEBUG< INFO< WARN < ERROR，分别用来指定这条日志信息的重要程度，Log4j 输出日志的规则是：只输出级别不低于设定级别的日志信息，假设Loggers级别设定为INFO，则INFO、WARN、ERROR级别的日志信息都会输出，而级别比 INFO 低的 DEBUG 则不会输出。



- **AppendersL**

记录日志以及定义日志的级别仅仅是 Log4j的基本功能,Log4j日志系统还提供许多强大的功能，比如允许把日志输出到不同的地方，如控制台（Console）、文件（Files）等，可以根据天数或者文件大小产生新的文件，可以以流的形式发送到其它地方等等。



常用Appenders：





| **Appender**             | **说明**                                                     |
| ------------------------ | ------------------------------------------------------------ |
| ConsoleAppender          | 将日志输出到控制台                                           |
| FileAppender             | 将日志输出到文件中                                           |
| DailyRollingFileAppender | 将日志输出到一个日志文件，并且每天输出到一个新的文件         |
| RollingFileAppender      | 将日志信息输出到一个日志文件，并且指定文件的尺寸，当文件大小达到指定尺寸时，会自动把文件改名，同时产生一个新的文件 |
| JDBCAppender             | 把日志信息保存到数据库中                                     |





- **Layouts**

有时用户希望根据自己的喜好格式化自己的日志输出,Log4j可以在Appenders的后面附加 Layouts 来完成这个功能。Layouts 提供四种日志输出样式，如根据 HTML 样式、自由指定样式、包含日志级别与信息的样式和包含日志时间、线程、类别等信息的样式。



常用 Layouts：

| **Layout**    | **说明**                                                     |
| ------------- | ------------------------------------------------------------ |
| HTMLLayout    | 格式化日志输出为HTML表格形式。                               |
| SimpleLayout  | 简单的日志输出格式化，打印的日志格式如默认INFO级别的消息。   |
| PatternLayout | 最强大的格式化组件，可以根据自定义格式输出日志，如果没有指定转换格式，就是用默认的转换格式e |



## 日志输出格式说明

使用PatternLayout可以自定义格式输出，是我们最常用的方式。

这种格式化输出采用类似于 C 语言的 printf 函数的打印格式格式化日志信息，具体的占位符及其含义如下：

| **占位符** | **说明**                                                     |
| ---------- | ------------------------------------------------------------ |
| %m         | 输出代码中指定的日志信息。                                   |
| %p         | 输出优先级， DEBUG、INFO等                                   |
| %n         | 换行符                                                       |
| %r         | 输出自应用启动到输出该 log 信息耗费的毫秒数e                 |
| %c         | 输出打印语句所属的类的全名                                   |
| %t         | 输出产生该日志的线程全名。                                   |
| %d         | 输出服务器当前时间，默认为 ISO8601，也可以指定格式，如：%d{yyyy年MM月dd日 HH:mm:ss.SSS} |
| %l         | 输出日志时间发生的位置，包括类名、线程、及在代码中的行数。如：Test.main(Test.java:10) |
| %F         | 输出日志消息产生时所在的文件名称。                           |
| %L         | 输出代码中的行号                                             |
| %%         | 输出一个 "%" 字符                                            |

可以在%与字符之间加上修饰符来控制最小宽度、最大宽度、和文本的对齐方式，如：



%5c 	输出类全名称，最小宽度是5，类全名称长度<5，默认的情况下右对齐； 

%-5c 	输出类全名称，最小宽度是5，类全名称长度<5，"-"号指定左对齐,会有空格； 

%.5c 	输出类全名称，最大宽度是 5，类全名称长度>5，就会将左边多出的字符截掉，<5不会有空格；

%20.30c  输出类全名称<20 补空格，并且右对齐，>30 字符，就从左边将超出的字符截掉



## 案例

### 引入依赖

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>

<!--这是log4j1.0版本的最后一个版本，后面都使用的是log4j2-->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

### 入门案例

```java
    @Test
    public void testLog4j(){

        //配置初始化信息：
        BasicConfigurator.configure();

        Logger logger = Logger.getLogger(this.getClass());

        logger.info("INFO信息 =========testLog4j========= ");


    }
```

如果不进行配置上面的第5行代码，你将会得到如下提示：

```java
log4j:WARN No appenders could be found for logger (cn.giteasy.log4j.test.TestLog4jv1
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
```

查看源码可知， 默认情况下：

```java
BasicConfigurator.configure()
//1. 创建了根节点的对象，Logger root = Logger.getRootLogger();
//2. 根节点添加了ConsoleAppender对象，（表示默认打印到控制台，自定义的格式化输出）
```

源码org.apache.log4j.BasicConfigurator#configure()

```java
   public static void configure() {
         Logger root = Logger.getRootLogger();
         root.addAppender(new ConsoleAppender(new PatternLayout("%r [%t] %p %c %x - %m%n")));
     }
```

### 日志级别

Log4j提供了8个日志输出级别：

| **级别** | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| ALL      | 最低级别，用于打开所有级别的日志记录                         |
| TRACE    | 程序推进下的追踪信息，这个追踪信息的日志级别非常低，一般情况下是不会使用的 |
| DEBUG    | 消息的细粒度信息输出，对调试应用程序是非常有帮助的，主要是配合开发，在开发过程中打印一些重要的运行信息 |
| INFO     | 消息的粗粒度级别运行信息                                     |
| WARN     | 表示警告，程序在运行过程中会出现的有可能会发生的隐形错误  注意：有些信息不是错误，但是这个级别的输出目的是为了给程序员以提示 |
| ERROR    | 系统的错误信息，发生的错误不影响系统的运行，  一般情况下，如果不想输出太多的日志，则使用该级别即可。 |
| FATAL    | 表示严重错误，一旦发生系统就不可能继续运行的严重错误， 如果这种级别的错误出现了，表示程序可以停止运行了 |
| OFF      | 最高等级的级别，用于关闭所有的日志记录                       |

其中DEBUG是在我们没有进行设置的情况下，为Log4j默认的日志级别

```java
	@Test
    public void testLog4j(){
        //加载初始化
        BasicConfigurator.configure();

        Logger logger = Logger.getLogger(Log4jTest.class);
        logger.fatal("fatal信息");
        logger.error("error信息");
        logger.warn("warning信息");
        logger.info("info信息");
          //默认级别为debug, 所以trace打印未输出
        logger.debug("debug信息");
        logger.trace("trace信息");
    
    }

//打印结果
0 [main] FATAL top.tec.Log4jTest  - fatal信息
0 [main] ERROR top.tec.Log4jTest  - error信息
0 [main] WARN top.tec.Log4jTest  - warning信息
0 [main] INFO top.tec.Log4jTest  - info信息
0 [main] DEBUG top.tec.Log4jTest  - debug信息
```

### Log4j的正确打开方式

在正常项目开始中一船都是使用配置文件的方式进行Log4j的配置，而不是使用*BasicConfigurator.configure();*进行初始化。

通过对BasicConfigurator.configure();源码的分析，我们的配置文件需要提供Logger、Appender、Layout这3个组件信息





![img](.\pic\1643441650486-0b5ad266-0e5d-49dc-ac47-7d6434f0da91.png)

分析Logger.getLogger(this.getClass());

![img](.\pic\1643441593606-d4b78519-d9d7-4bfa-b04b-1b1d3cfcdd3d.png)

进入LogManager类

![img](.\pic\1643441712314-d4dcb610-a9e0-4c9a-a124-90c06bee3345.png)


可以看到有多个常量信息，配置文件的格式
  log4j.properties
  log4j.xml
  log4j.configuration
  ...
  ...



继续查看LogManager类，可以看到有个static代码块，其中

![img](.\pic\1643441888446-4d4006ed-dfa0-46c6-9260-176f16ef7357.png)

表示，Log4j会在类路径下查找log4j.properties, 对于当前演示项目，会在resources目录下



在LogManager类中继续往下看，看到

![img](.\pic\1643442026986-f07d6baa-70df-4602-90b7-b6f39e74f36d.png)

进入selectAndConfigure方法

![img](.\pic\1643442112192-7053cb47-15cc-4ab4-b576-08a6a5a79d9d.png)



进入PropertyConfigurator类，有很多常量信息
其中以下是必须配置的：

```java
    static final String ROOT_LOGGER_PREFIX = "log4j.rootLogger";
    static final String APPENDER_PREFIX = "log4j.appender.";
```

 通过源码：

```java
  String prefix = "log4j.appender." + appenderName;
```


 可知我们需要配置一个appenderName（起名要见名知意，我们起名为console,在控制台输出打印日志）

```java
 log4j.appender.console
```


 它的取值为log4j为我们提供的appender类     例如:



```java
 log4j.appender.console = org.apache.log4j.ConsoleAppender
```

  我们同时指定输出的格式：
  通过源码：

```java
  String layoutPrefix = prefix + ".layout";
```


​        
  配置：

```java
  log4j.appender.console.layout=org.apache.log4j.SimpleLayout
```


 通过log4j.rootLogger继续在类中搜索

 找到void configureRootCategory方法
 在这个方法中执行了this.parsecategory方法,观察该方法以下代码：

```java
   stringTokenizer st = new StringTokenizer(value,",");
```

表示要以逗号的方式来切割字符串，证明了log4j.rootLogger的取值，其中可以有多个值，使用逗号进行分隔
 通过代码：



```java
  String levelstr = st.nextToken();
```


 表示切割后的第一个值是日志的级别
 通过代码：
​      

```java
   while(st.hasMoreTokens())
```


 表示接下来的值，是可以通过while循环遍历得到的
 第2~第n个值，就是我们配置的其他的信息，这个信息就是appenderName
所以我们的配置的方式应是如下样式的：



```java
 log4j.rootLogger=日志级别,appenderName1,appenderName2,appenderName3,...
```


表示可以同时在根节点上配置多个日志输出的途径

log4j.properties

```java
log4j.rootLogger = trace,consoleAppender

#*********************************************************************************************
#配置appender输出方式为控制台输出

log4j.appender.consoleAppender = org.apache.log4j.ConsoleAppender
    
#配置appender控制台输出的格式
#log4j.appender.consoleAppender.layout = org.apache.log4j.SimpleLayout
    
#以html格式输出
#log4j.appender.consoleAppender.layout = org.apache.log4j.HTMLLayout
    
#自定义格式
log4j.appender.consoleAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.consoleAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
```

### 打印log4j本身的详细信息



 查看源码LogManager类中的方法

```java
 getLoggerRepository()
```

找到代码

```java
LogLog.debug(msg, ex);
```

 LogLog会使用debug级别的输出为我们展现日志输出详细信息

 LogLog是什么？
  	Logger是记录系统的日志，那么LogLog是用来记录Logger的日志信息的


 进入到LogLog.debug(msg，ex);方法中

![img](.\pic\1643442776008-13bd04d4-95a3-4428-b365-c5dded1bfee5.png)
 通过代码：if（debugEnabled && !quietMode){
 观察到if判断中的这两个开关都必须开启才行
  !quietMode是已经启动的状态，不需要我们去管
  debugEnabled默认是关闭的
 所以我们只需要设置debugEnabled为true就可以了

```java
LogLog.setInternalDebugging(true);
```



```java
 @Test
    public void test03(){

        //打开Logger日志的开关
        LogLog.setInternalDebugging(true);
        
        
        Logger logger = Logger.getLogger(Log4jTest.class);

        logger.fatal("fatal信息");
        logger.error("error信息");
        logger.warn("warning信息");
        logger.info("info信息");
        logger.debug("debug信息");
        logger.trace("trace信息");


        /**
         * 可以看到控制台，输出我们输出的日志信息外，多出以下信息：
         * 以下信息记录了Log4j从初始化到配置完成的日志
         */
        
//结果
log4j: Trying to find [log4j.xml] using context classloader sun.misc.Launcher$AppClassLoader@18b4aac2.
log4j: Trying to find [log4j.xml] using sun.misc.Launcher$AppClassLoader@18b4aac2 class loader.
log4j: Trying to find [log4j.xml] using ClassLoader.getSystemResource().
log4j: Trying to find [log4j.properties] using context classloader sun.misc.Launcher$AppClassLoader@18b4aac2.
log4j: Using URL [file:/D:/project/study_code_collection/learn-log/target/classes/log4j.properties] for automatic log4j configuration.
log4j: Reading configuration from URL file:/D:/project/study_code_collection/learn-log/target/classes/log4j.properties
log4j: Parsing for [root] with value=[trace,consoleAppender].
log4j: Level token is [trace].
log4j: Category root set to TRACE
log4j: Parsing appender named "consoleAppender".
log4j: Parsing layout options for "consoleAppender".
log4j: End of parsing for "consoleAppender".
log4j: Parsed "consoleAppender" options.
log4j: Finished configuring.
FATAL - fatal信息
ERROR - error信息
WARN - warning信息
INFO - info信息
DEBUG - debug信息
TRACE - trace信息

        
        
    }
```

### log4j.properties配置祥解



HTMLLayout
SimpleLayout
PatternLayout

 其中PatternLayout是我们最常使用的格式, 查看源码 PatternLayout 类
	setConversionPattern这个方法就是该PatternLayout的核心方法
 根据方法名可知，我们需要在配置文件中将我们的layout配置一个conversionPattern属性

```javascript
log4j.appender.consoleAppender = org.apache.log4j.ConsoleAppender

#配置appender控制台输出的格式
#log4j.appender.consoleAppender.layout = org.apache.log4j.SimpleLayout

#以html格式输出
#log4j.appender.consoleAppender.layout = org.apache.log4j.HTMLLayout

log4j.appender.consoleAppender.layout = org.apache.log4j.PatternLayout

log4j.appender.consoleAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
```

![image-20240708220215477](.\pic\image-20240708220215477.png)

![image-20240708220306129](.\pic\image-20240708220306129.png)





### 输出日志到文件中

实际项目中一般都是输出到文件中，在此之前我们在配置文件中的配置是输出到控制台，我们也可能将日志输出到文件，在输出到控制台的基础上，保留原先的配置，添加输出到文件的配置，做多方向的输出。



 *日志文件要保存到磁盘的什么位置？*

查看FileAppender的源码，看到属性信息

```java
protected boolean fileAppend；//表示是否追加信息，通过构造方法赋值为true
protected int buffersize；//缓冲区的大小，通过构造方法赋值为8192
```

继续观察，找到setFile方法，这个方法就是用来指定文件位置的方法
通过ognl，可以推断setFile方法操作的属性就是file, 由此可知配置*

```java
    log4j.appender.fileAppender.file = D:\\log4j_test.log
```

如果有输出中文的需求，需要设置编码？
观察FileAppender的父类
找到protected String encoding;属性
由此可知配置：



```java
  log4j.appender.fileAppender.encoding = UTF-8
```

完整配置文件log4j.properties

```javascript
log4j.rootLogger = trace,consoleAppender,fileAppender


#*********************************************************************************************
#配置appender输出方式为控制台输出

log4j.appender.consoleAppender = org.apache.log4j.ConsoleAppender
log4j.appender.consoleAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.consoleAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n

#*********************************************************************************************
#配置appender输出到文件中
log4j.appender.fileAppender = org.apache.log4j.FileAppender
log4j.appender.fileAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.fileAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
log4j.appender.fileAppender.file = D:\\log4j_test.log
log4j.appender.fileAppender.encoding = UTF-8
```



### 按文件大小拆分日志文件

FileAppender为我们提供了好用的子类来进一步的对于文件输出进行处理
 **RollingFileAppender**
 **DailyRollingFileAppender**

其中RollingFileAppender为按照文件大小进行拆分.


如何进行RollingFileAppender相关配置？

观察RollingFileAppender的源码



```java
protected long maxFilesize = 10485760L；//表示拆分文件的大小
protected int maxBackupIndex = 1；//表示拆分文件的数量
```



   完整配置文件log4j.properties

```javascript
log4j.rootLogger = trace,rollingFileAppender


#配置appender输出到文件中,按文件大小进行拆分
log4j.appender.rollingFileAppender = org.apache.log4j.RollingFileAppender
log4j.appender.rollingFileAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.rollingFileAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
log4j.appender.rollingFileAppender.file = D:\\log4j_test.log
log4j.appender.rollingFileAppender.encoding = UTF-8
#指定日志文件大小，只要超过1MB，那么则生成另外一个文件
log4j.appender.rollingFileAppender.maxFileSize = 1MB
#指定文件数量，文件最多生成5个，超过5个，会覆盖时间最早的那个文件
log4j.appender.rollingFileAppender.maxBackupIndex = 5
```



### 按时间拆分日志文件

DailyRollingFileAppender

查看DailyRollingFileAppender类源码：

```javascript
private String datePattern = " "yyyy-MM-dd"；//默认是按照天来进行拆分的
```

完整配置文件log4j.properties

```javascript
log4j.rootLogger = trace,dailyRollingFileAppender


#*********************************************************************************************
#配置appender输出到文件中,按时间进行拆分
log4j.appender.dailyRollingFileAppender = org.apache.log4j.DailyRollingFileAppender
log4j.appender.dailyRollingFileAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.dailyRollingFileAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
log4j.appender.dailyRollingFileAppender.file = D:\\log4j_test.log
log4j.appender.dailyRollingFileAppender.encoding = UTF-8
#按照秒进行拆分  '.'yyyy-MM-dd HH-mm-ss
#按照天进行拆分  '.'yyyy-MM-dd
#按照月进行拆分  '.'yyyy-MM
log4j.appender.dailyRollingFileAppender.datePattern = '.'yyyy-MM-dd
```



### 将日志持久化到数据库



创建表结构

```sql
	-- 字段的制定可以根据需求进行调整
     CREATE TABLE my_log(
             id int(11) NOT NULL AUTO_INCREMENT,
             name varchar(255) DEFAULT NULL COMMENT '项目名称',
             create_time varchar(255) DEFAULT NULL COMMENT '创建时间',
             thread varchar(255) DEFAULT NULL COMMENT '线程名称',
             level varchar(255) DEFAULT NULL COMMENT '日志级别',
             category varchar(255) DEFAULT NULL COMMENT '所在类的全路径',
             message varchar(255) DEFAULT NULL COMMENT '日志消息',
             PRIMARY KEY(id)
     )
```

导入数据库驱动

```xml
 <!-- 将日志持久化到数据库 -->
 <dependency>
     <groupId>mysql</groupId>
     <artifactId>mysql-connector-java</artifactId>
     <version>5.1.32</version>
 </dependency>
```

配置log4j.properties



```javascript
log4j.rootLogger = trace,dbAppender

#*********************************************************************************************
#配置appender输出到数据库
log4j.appender.dbAppender = org.apache.log4j.jdbc.JDBCAppender
log4j.appender.dbAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.dbAppender.encoding = UTF-8
log4j.appender.dbAppender.Driver = com.mysql.jdbc.Driver
log4j.appender.dbAppender.URL = jdbc:mysql://localhost:3306/test
log4j.appender.dbAppender.User = root
log4j.appender.dbAppender.Password = 123456
log4j.appender.dbAppender.sql = INSERT INTO my_log(name,create_time,thread,level,category,message) values ('myapp','%d{yyyy-MM-dd HH:mm:ss.SSS}','%t','%p','%l','%m')
```

### 自定义Logger



 目前为止我们所创建的Logger对象，默认都是继承rootLogger，配置文件中是这样配置的：

```javascript
 log4j.rootLogger = trace,consoleAppender,dbAppender
```


​     
 我们也可以自定义logger，让其他logger来继承这个logger，这种继承关系就是按照包结构的关系来进行指定的
 例如我们一直使用的

```javascript
Logger logger = Logger.getLogger(this.getClass());
```


 路径就是：
    

```javascript
top.tec.log4j.test.Log4jTest
```


 它的父logger就是上层的路径或者是更上层的路径,例如：
     

```javascript
top.tec.log4j.test
top.tec.log4j
top.tec
top
```


 参照Log4j源码是如何加载配置文件的。
 在源码Propertyconfigurator类中，我们看到常量：log4j.logger.

![img](.\pic\1643444348223-039c4cc2-1f1d-4e2b-b298-2900415c8135.png)
 这个属性值log4j.logger., 就是我们在配置文件中自定义logger时使用的前缀
 例如我们自定义的Logger为：

```javascript
log4j.logger.top.tec.log4j.test = error,fileAppender
```



如果自定义Logger与RootLogger都进行了配置，会使用哪个？
 \1. **如果自定义Logger与RootLogger配置的输出位置是不同的 则取二者的并集，配置的位置都会进行输出操作**
 \2. **如果自定义Logger与RootLogger配置的日志级别不同，以自定的父logger的级别进行输出**



完整配置文件log4j.properties

```javascript
#配置根节点
log4j.rootLogger = trace,consoleAppender

#自定义Logger(父节点输出到控制台)(这里是根节点的父节点)
log4j.logger.top.tec.log4j.test = info,consoleAppender


#*********************************************************************************************
#配置appender输出方式为控制台输出

log4j.appender.consoleAppender = org.apache.log4j.ConsoleAppender
log4j.appender.consoleAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.consoleAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
```

### 自定义logger的应用场景

之所以要自定义logger，就是为了针对不同系统、不同包路径下的输出信息做更加灵活的输出操作,



*例如：
\*     我们，需要对org.apache包下的日志单独进行配置
\*     *log4j.logger.org.apache=error,consoleAppender*



完整配置文件log4j.properties

```javascript
#根节点
log4j.rootLogger = trace,consoleAppender

#配置apache的Logger(这里就是根节点的父节点)
log4j.logger.org.apache = error,consoleAppender

#也可以这样,只配置级别，打印org.apache下的日志，就不会根节点打印一次，父节点打印一次了
# log4j.logger.org.apache = error

#*********************************************************************************************
#配置appender输出方式为控制台输出

log4j.appender.consoleAppender = org.apache.log4j.ConsoleAppender
log4j.appender.consoleAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.consoleAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
```



测试类

```java
	@Test
    public void testCustomApply(){
        //模拟当前是在org.apache包下进行输出
        //Logger logger = Logger.getLogger("org.apache");
        
        //Logger类本身就是org.apache.log4j包下的类
        Logger logger = Logger.getLogger(Logger.class);
        
        logger.fatal("apache FATAL信息 =========apache testLog4j========= ");
        logger.error("apache ERROR信息 =========apache testLog4j========= ");
        logger.warn("apache WARN信息 =========apache testLog4j========= ");
        logger.info("apache INFO信息 =========apache testLog4j========= ");
        logger.debug("apache DEBUG信息 =========apache testLog4j========= ");
        logger.trace("apache TRACE信息 =========apache testLog4j========= ");


        /**
         * 输出结果：
         * 2022-01-22 15:05:51.027 [main] FATAL cn.giteasy.log4j.test.TestLog4jv1.testCustomApply(TestLog4jv1.java:475) apache FATAL信息 =========apache testLog4j=========
         * 2022-01-22 15:05:51.027 [main] FATAL cn.giteasy.log4j.test.TestLog4jv1.testCustomApply(TestLog4jv1.java:475) apache FATAL信息 =========apache testLog4j=========
         * 2022-01-22 15:05:51.393 [main] ERROR cn.giteasy.log4j.test.TestLog4jv1.testCustomApply(TestLog4jv1.java:476) apache ERROR信息 =========apache testLog4j=========
         * 2022-01-22 15:05:51.393 [main] ERROR cn.giteasy.log4j.test.TestLog4jv1.testCustomApply(TestLog4jv1.java:476) apache ERROR信息 =========apache testLog4j=========
         *
         *
         * 观查输出结果，发现每条日志各输出了2次，因为我们在配置文件中，consoleAppender配置了2次，由于输出的位置appender取的是并集，所以输出2次
         *
         *      log4j.rootLogger = trace,consoleAppender
         *
         *      #配置apache的Logger
         *      log4j.logger.org.apache = error,consoleAppender
         *
         * 为了防止输出2次，我们可以将自定义log4j.logger.org.apache日志的consoleAppender日志去掉
         * 
         * 		log4j.logger.org.apache = error
         *
         */

    }
```