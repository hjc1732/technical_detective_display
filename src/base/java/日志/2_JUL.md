# JUL

## JUL简介

JUL 全称 Java Util Logging，它是java原生的日志框架，在java.util.logging包下，使用时不需要另外引用第三方的类库，相对其他的框架使用方便，学习简单，主要是使用在小型应用中。



## JUL组件介绍

![img](.\pic\1640616257932-490af409-a6f0-4ccf-8026-91f7fd8394c0.jpeg)

- **Logger：**

被称为记录器，应用程序通过获取 Logger 对象，调用其 API 来发布日志信息。Logger通常被认为是访问日志系统的入口程序。

- **Handler：**

处理器，每个 Logger 都会关联一个或者是一组 Handler，Logger 会将日志交给关联的Handler 去做处理，由 Handler 负责将日志做记录。Handler 具体实现了日志的输出位置，比如可以输出到控制台或者是文件中等等。

- **Filter：**

过滤器，根据需要定制哪些信息会被记录，哪些信息会被略过。

- **Formatter：**格式化组件，它负责对日志中的数据和信息进行转换和格式化，所以它决定了我们输出日志最终的形式。。
- **Level：**日志的输出级别，每条日志消息都有一个关联的级别。我们根据输出级别的设置，用来展现最终所呈现的日志信息。根据不同的需求，设置不同的级别。

## 案例

## 引入依赖

```xml
<!-- 使用Junit进行测试 -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```



### 入门

```java
@Test
public void testJUL(){
    //日志入口：java.util.logging.Logger
    //Logger对象的创建方式，不能直接new对象
    //取得对象的方法参数，需要引入当前类的全路径字符串（Logger是有父子关系的，根据包的结构（后面有介绍））
    Logger logger = Logger.getLogger("top.tec.AppTest");

    /* 
     * 对于日志的输出，有两种方式
     *
     * 方式一：
     * 直调用日志级别相关的方法，方法中传递日志输出的信息
     */
    logger.info("INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");

    System.out.println("=====================================================");
        
    /*
     * 方式二：
     * 调用log方法，然后通过传入Level类型的的级别来定义日志的级别，并传入日志输出的信息参数
     * JUL默认级别是INFO
     */
    logger.log(Level.OFF,"OFF>>>>>>>>>>>>>>>>>>>>>>>>>>");  		// 可用来关闭日志记录
    logger.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");  	//最高级别,错误级别
    logger.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>"); 	//警告
    logger.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>"); 		//默认级别，消息级别
    logger.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>"); 	//配置
    logger.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");		//详细信息(少)
    logger.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");		//详细信息(中)
    logger.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");	//详细信息(多)
    logger.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");			//启用所有消息的日志记录

    System.out.println("=====================================================");

    /*
     * 输出日志时，传入系统运行中的数据
     */
    logger.log(Level.INFO,"Hello World!");
    logger.log(Level.INFO,"姓名: {0} 年龄: {1}", new Object[]{"张三", "23"});

    /**
      * 输出结果：
      *
      *   七月 08, 2024 10:57:11 上午 top.tec.AppTest test01
      *   信息: Hello World!
      *   七月 08, 2024 10:57:11 上午 top.tec.AppTest test01
      *   信息: 姓名: 张三 年龄: 23
      */

}
```



### JUL日志级别

日志的级别（可通过源码查看）java.util.logging.Level

| OFF     |                  | Integer.MAX_VALUE |                  |
| ------- | ---------------- | ----------------- | :--------------- |
| SEVERE  | 错误             | 1000              | 最高级的日志级别 |
| WARNING | 警告             | 900               |                  |
| INFO    | （默认级别）消息 | 800               |                  |
| CONFIG  | 配置             | 700               |                  |
| FINE    | 详细信息（少）   | 500               |                  |
| FINER   | 详细信息（中）   | 400               |                  |
| FINEST  | 详细信息（多）   | 300               | 最低级的日志级别 |
| ALL     |                  | Integer.MIN_VALUE |                  |

两个特殊的级别
    OFF 可用来关闭日志记录        Integer.MAX_VALUE   整型最大值
    ALL 启用所有消息的日志记录     Integer.MIN_VALUE   整型最小值



假如我们设定的日志级别是INFO（800），那么在打印的时候，我们在应用中打印的日志的时候以下的日志都会输出

```java
SEVERE  1000
WARNING 900
INFO    800
这是因为他们的值，比我们设定的值INFO（800）大或相等。

例如：			
logger.info("我是 SEVERE 信息");
logger.info("我是 WARNING 信息");
logger.info("我是 INFO 信息");
logger.info("我是 CONFIG 信息"); //不打印，因为比我们设定的默认的日志级别 INFO级别小。

//打印结果
七月 08, 2024 11:06:11 上午 top.tec.AppTest test01
严重: 我是 SEVERE 信息
七月 08, 2024 11:06:11 上午 top.tec.AppTest test01
警告: 我是 WARNING 信息
七月 08, 2024 11:06:11 上午 top.tec.AppTest test01
信息: 我是 INFO 信息
    
```

如果你想要自定义级别，仅仅只是通过setLevel（）设置日志级别，是不起作用的，需要搭配处理器handler共同设置才可以

```java
Logger logger = Logger.getLogger("top.tec.AppTest");

//是不起作用的，需要搭配处理器handler共同设置才可以，查看下节
//logger.setLevel(Level.FINE);

logger.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");
logger.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>");
logger.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");
logger.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>");
logger.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");
logger.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");
logger.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");
logger.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");



```

### 自定义日志级别

```java
/**
  * 自定义日志级别演示
  */
@Test
public void testSetDefaultLevel(){
    //日志记录器
    Logger logger = Logger.getLogger("top.tec.AppTest");

    //将默认的日志打印方式关掉
    //参数设置为false ，打印日志时就不会按照父logger默认的方式去打印了
    logger.setUseParentHandlers(false);

    //日志处理器：日志处理器有控制台处理器、文件日志处理器等等，这里演示控制台日志处理器
    ConsoleHandler consoleHandler = new ConsoleHandler();
    //设置输出格式
    SimpleFormatter simpleFormatter = new SimpleFormatter();
    consoleHandler.setFormatter(simpleFormatter);

    //将处理器添加到日志记录器
    logger.addHandler(consoleHandler);

    //设置日志的打印级别
    //日志记录器和处理器的级别均需要进行统一的设置，才可以达到日志级别自定义设置的需求
    logger.setLevel(Level.FINE);
    consoleHandler.setLevel(Level.FINE);

    logger.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");


    /**
      * 控制台打印结果
      *
      *   七月 08, 2024 11:20:24 上午 top.tec.AppTest test01
      *   严重: SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>
      *   七月 08, 2024 11:20:24 上午 top.tec.AppTest test01
      *   警告: WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>
      *   七月 08, 2024 11:20:24 上午 top.tec.AppTest test01
      *   信息: INFO>>>>>>>>>>>>>>>>>>>>>>>>>>
      *   七月 08, 2024 11:20:24 上午 top.tec.AppTest test01      
      *   配置: CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>
      *   七月 08, 2024 11:20:24 上午 top.tec.AppTest test01
      *   详细: FINE>>>>>>>>>>>>>>>>>>>>>>>>>>
      */


    
    
    
    
    
        logger.setLevel(Level.ALL);
        consoleHandler.setLevel(Level.ALL);

        logger.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");
		
    
    	 /**
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 严重: SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 警告: WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 信息: INFO>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 配置: CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 详细: FINE>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 较详细: FINER>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 非常详细: FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 11:21:53 上午 top.tec.AppTest test01
         * 全部: ALL>>>>>>>>>>>>>>>>>>>>>>>>>>
         */
    
    
}
```

### 将日志输出到文件中

```java
	@Test
    public void testFileLog() throws IOException {
        //日志记录器
       Logger logger = Logger.getLogger("top.tec.AppTest");
        logger.setUseParentHandlers(false);

        //文件日志处理器
        FileHandler fileHandler = new FileHandler("d:\\jul_test.log");
        SimpleFormatter simpleFormatter = new SimpleFormatter();
        fileHandler.setFormatter(simpleFormatter);
        //将处理器添加到日志记录器
        logger.addHandler(fileHandler);

        logger.setLevel(Level.ALL);
        fileHandler.setLevel(Level.ALL);

        logger.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }
```



### 将文件同时输出到控制台与文件中

```java
/**
     *文件日志与控制台日志同时打印
     */
    @Test
    public void testConsoleAndFileLog() throws IOException {
        //日志记录器
       Logger logger = Logger.getLogger("top.tec.AppTest");
        logger.setUseParentHandlers(false);

        //文件日志处理器
        FileHandler fileHandler = new FileHandler("d:\\a.log");

        //控制台日志处理器
        ConsoleHandler consoleHandler = new ConsoleHandler();

        SimpleFormatter simpleFormatter = new SimpleFormatter();
        fileHandler.setFormatter(simpleFormatter);
        consoleHandler.setFormatter(simpleFormatter);

        //将处理器添加到日志记录器
        logger.addHandler(fileHandler);
        logger.addHandler(consoleHandler);

        logger.setLevel(Level.ALL);
        fileHandler.setLevel(Level.ALL);//文件打印日志级别

        consoleHandler.setLevel(Level.CONFIG);//控制台日志打印级别

        logger.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");


        
    }
```

​         

​         用户使用Logger来进行日志的记录，Logger可以持有多个处理器Handler

​         （日志的记录使用的是Logger，日志的输出使用的是Handler）

​         添加了哪些handler对象，就相当于需要根据所添加的handler将日志输出到指定的位置上，例如控制台、文件．



### Logger之间的父子关系



```java
   		/**
         * 根据包的结构
         * logger是logger2 的父logger
         * logger2是logger3是父logger
         */
        Logger logger = Logger.getLogger("top");
        Logger logger1 = Logger.getLogger("top.tec");
        Logger logger2 = Logger.getLogger("top.tec.AppTest");


        //获取logger2的父logger
        Logger parentLogger = logger2.getParent();
        System.out.println(parentLogger == logger1); //true

        Logger parentLogger = logger2.getParent();
        System.out.println(parentLogger == logger); //true
		//只要是上级都是父

			
        Logger parentLogger = logger.getParent();
        System.out.println(parentLogger); //java.util.logging.LogManager$RootLogger@61e717c2

```


JUL中Logger之间是存在"父子"关系的

注意：这种父子关系不是我们普遍认为的类之间的继承关系

关系是通过树状结构存储的（目录、包结构）
JUL在初始化时会创建一个顶层RootLogger作为所有的Logger的父Logger
源码：

```java
 	java.util.logging.LogManager#ensureLogManagerInitialized()；
      // Create and retain Logger for the root of the namespace.
      owner.rootLogger = owner.new RootLogger();
      //RootLogger是LogManager的内部类
      //owner：就是RootLogger的实例
    // java.util.logging.LogManager$RootLogger //默认的名称为 空串
```

​     以上的RootLogger对象作为树状结构的根节点存在的
​     将来自定义的父子关系通过路径来进行关联父子关系，同时也是节点之间的挂载关系



父Logger所做的设置，也同样作用于子Logger

```java
 		// 对logger1做打印设置
        logger1.setUseParentHandlers(false);
        //控制台日志处理器
        ConsoleHandler consoleHandler = new ConsoleHandler();
        SimpleFormatter simpleFormatter = new SimpleFormatter();
        consoleHandler.setFormatter(simpleFormatter);
        logger1.addHandler(consoleHandler);

        consoleHandler.setLevel(Level.ALL);
        logger1.setLevel(Level.ALL);

        //使用logger2打印
        logger2.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger2.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger2.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger2.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger2.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger2.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger2.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger2.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");

        /**
         *  查看控制台打印结果，可知对父logger设置的打印参数，也会作用于子Logger
         *
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 严重: SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 警告: WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 信息: INFO>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 配置: CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 详细: FINE>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 较详细: FINER>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 非常详细: FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>
         * 七月 08, 2024 1:40:27 下午 top.tec.AppTest test01
         * 全部: ALL>>>>>>>>>>>>>>>>>>>>>>>>>>
         */
		
```

### JUL配置文件

前面所有配置相关的操作，都是以java硬编码的形式进行的，更加专业的一种做法，就是使用配置文件，如果我们没有自己添加配置文件，则会使用系统默认的配置文件
查看源码可知，配置文件的位置

```java
 	owner.readPrimordialConfiguration();
     readConfiguration();
```

 java.home --> 找到jre文件夹 --> lib --> logging.properties

```java
$JAVA_HOME\jre\lib\logging.properties
```

### 配置文件详解logging.properties

```javascript
# JUL 日志配置文件祥解
# 默认配置文件位置：$JAVA_HOME\jre\lib\logging.properties


#RootLogger使用的处理器，在获取RootLogger对象时进行的设置
#默认的情况下，下述配置的是控制台的处理器，只能往控制台上进行输出操作
#如果想要添加其他的处理器，在当前处理器类后面通过以逗号的形式进行分隔，可以添加多个处理器
handlers= java.util.logging.ConsoleHandler
#RootLogger的日志级别
#默认的情况下，这是全局的日志级别，如果不手动配置其他的日志级别
#则默认输出下述配置的级别以及更高的级别
.level= INFO

# 输出日志文件的路径
# %h:用户目录
# %u:序号，从0开始
java.util.logging.FileHandler.pattern = %h/java%u.log
#输出日志文件的限制（50000字节）
java.util.logging.FileHandler.limit = 50000
#设置日志文件的数量
java.util.logging.FileHandler.count = 1

#输出日志的格式
#默认是以XML的方式进行的输出
java.util.logging.FileHandler.formatter = java.util.logging.XMLFormatter
#控制台处理器属性设置
#控制台输出默认的级别
java.util.logging.ConsoleHandler.level = INFO
#控制台默认输出的格式
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter
#也可以将日志级别设定到具体的某个包下
#com.xyz.foo.level = SEVERE
```

### 自定义配置文件及自定义Logger

mylogger.properties

```javascript
# mylogger.properties

handlers = java.util.logging.ConsoleHandler

.level = CONFIG

# 将日志输出到文件中
# %h:用户目录
# %u:序号，从0开始
java.util.logging.FileHandler.pattern = %h/java%u.log
java.util.logging.FileHandler.limit = 50000
java.util.logging.FileHandler.count = 1
#使用SimpleFormatter格式
java.util.logging.FileHandler.formatter = java.util.logging.SimpleFormatter
#以追加的方式输出日志，否则会覆盖掉以前的日志
java.util.logging.FileHandler.append = true


java.util.logging.ConsoleHandler.level = CONFIG
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter


#自定义Logger
top.tec.handlers = java.util.logging.FileHandler
#自定义logger级别
top.tec.level = CONFIG
#屏蔽父logger的日志设置
top.tec.useParentHandlers = false


@Test
public void testMyLoggerForConfigFile() throws IOException {
    //读取自定义配置文件
    String path = JULTest.class.getClass().getResource("/mylogger.properties").getFile().toString();
    InputStream is = new FileInputStream(path);
    LogManager logManager = LogManager.getLogManager();
    logManager.readConfiguration(is);

    Logger logger = Logger.getLogger("top.tec.ApiTest");


    //使用logger2打印
    logger.log(Level.SEVERE,"SEVERE>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.WARNING,"WARNING>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.INFO,"INFO>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.CONFIG,"CONFIG>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.FINE,"FINE>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.FINER,"FINER>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.FINEST,"FINEST>>>>>>>>>>>>>>>>>>>>>>>>>>");
    logger.log(Level.ALL,"ALL>>>>>>>>>>>>>>>>>>>>>>>>>>");
}
```

### JUL日志使用总结（原理解析）



1. 初始化LogManager

​			LogManager加载logging-properties配置文件

​			添加Logger到LogManager

1. 从单例的LogManager获取Logger
2. 设置日志级别Level，在打印的过程中使用到了日志记录的LogRecord类
3. Filter作为过滤器提供了日志级别之外更细粒度的控制
4. Handler日志处理器，决定日志的输出位置，例如控制台、文件...
5. Formatter是用来格式化输出的，例如 xml格式、普通文本格式...