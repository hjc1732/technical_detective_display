# Logback

## Logback简介

Logback 是由 log4j 创始人设计的又一个开源日志组件。

Logback 当前分成三个模块： logback-core,logback-classic和logback-access。

logback-core 是其它两个模块的基础模块。

logback-classic 是 log4j的一个改良版本。此外 logback-classic 完整实现SLF4J API。使你可以很方便地更换成其它日志系统如 log4j或JDK14 Logging。

logback-access 访问模块与 Servlet 容器集成提供通过 Http 来访问日志的功能。



## Logback中的组件

- Logger:日志的记录器，主要用于存放日志对象，也可以定义日志类型、级别。

- Appender:用于指定日志输出的目的地，目的地可以是控制台、文件、数据库等等。
- Layout:负责把事件转换成字符串，格式化的日志信息的输出。在Logback 中Layout 对象被封装在**encoder**中.也就是说我们未来使用的 encoder 其实就是 Layout

## Logback配置文件

Logback提供了3种配置文件。

- logback.groovy 
- logback-test.xml
- logback.xml

如果都不存在则采用默认的配置。



## 日志输出格式

| 标识符及占位符              | 描述                       |
| --------------------------- | -------------------------- |
| %-10level                   | 级别，设置10个这符，左对齐 |
| %d{yyyy-MM-dd HH:mm:ss.SSS} | 日期时间                   |
| %c                          | 当前类全限定名             |
| %M                          | 当前执行日志的方法         |
| %L                          | 行号                       |
| %thread                     | 线程名称                   |
| %m或者%msg                  | 输出的日志信息             |
| %n                          | 换行                       |



## 案例

### 引入依赖

我们已经学习了如何使用slf4j,那么我们就使用slf4j+logback的方式

```xml
		<dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>

        <!--slf4j日志门面 核心依赖-->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>

        <!--
           logback-core是logback-classic的基础模块
           logback-classic已经涵盖了 logback-core，
           Maven有依赖传递性，会自动依赖logback-core
        -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.10</version>
        </dependency> 			
```

### 日志级别

logback有5种级别的日志输出，分别是
trace < debug < info < warn < error
 默认级别：debug

```java
	@Test
    public void testLogback(){

        Logger logger = LoggerFactory.getLogger(LogbackTest.class);
        logger.error("========= ERROR信息 test Logback =========");
        logger.warn("========= WARN信息 test Logback =========");
        logger.info("========= INFO信息 test Logback =========");
        logger.debug("========= DEBUG信息 test Logback =========");
        logger.trace("========= TRACE信息 test Logback =========");

        /**
         *通过控制台信息，可以看到默认级别是debug。 trace级别的信息没有输出
         
         * 17:18:06.755 [main] ERROR cn.giteasy.logback.test.LogbackTest - ========= ERROR信息 test Logback =========
         * 17:18:06.757 [main] WARN cn.giteasy.logback.test.LogbackTest - ========= WARN信息 test Logback =========
         * 17:18:06.757 [main] INFO cn.giteasy.logback.test.LogbackTest - ========= INFO信息 test Logback =========
         * 17:18:06.757 [main] DEBUG cn.giteasy.logback.test.LogbackTest - ========= DEBUG信息 test Logback =========
         */

    }
```

### 使用配置文件



logback.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

    <!--
        <property name="" value=""></property>
        配置文件通用属性,通过${name}的形式取值
    -->
    
    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %c %M %L %m%n"></property>


    <!-- 控制台Appender -->
    <appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender">
        <!--
            输出目标的配置，
            System.out：以黑色字体（默认）
            System.err：红色字体
        -->
        <target>
            System.err
        </target>
        <!-- 日志输出格式 -->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>


    
    <!--
        日志记录器配置，可以配置多个Appender，进行多方向的日志输出
        root => rootLogger
        level:  表示日志级别
    -->
    <root level="ALL">
        <appender-ref ref="consoleAppender"/>
    </root>
 
</configuration>


@Test
public void testLogbackConfigFile(){

    Logger logger = LoggerFactory.getLogger(LogbackTest.class);
    logger.error("========= ERROR信息 test Logback =========");
    logger.warn("========= WARN信息 test Logback =========");
    logger.info("========= INFO信息 test Logback =========");
    logger.debug("========= DEBUG信息 test Logback =========");
    logger.trace("========= TRACE信息 test Logback =========");
}
```

### 输出日志到文件中



在实际生产环境中，我们更希望将日志信息保存到文件中

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

   
    <property name="logDir" value="D://logback_log"></property>
    <property name="fileName" value="logback.log"></property>
    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %c %M %L %m%n"></property>


    <!--文件appender，默认是以追加日志的形式进行输出的-->
    <appender name="fileAppender" class="ch.qos.logback.core.FileAppender">
        <!--输出文件位置-->
        <file>${logDir}//${fileName}</file>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>

    
    <root level="ALL">
        <appender-ref ref="fileAppender"/>
    </root>

</configuration>
```

### 输出日志为HTML文件格式

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

   
    <property name="logDir" value="D://logback_log"></property>
    <property name="htmlFileName" value="logback.html"></property>
		<property name="htmlPattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS}%thread%-5level%c%M%L%m"></property>

    <!--HTML文件appender-->
    <appender name="htmlFileAppender" class="ch.qos.logback.core.FileAppender">
        <!--输出文件位置-->
        <file>${logDir}//${htmlFileName}</file>
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="ch.qos.logback.classic.html.HTMLLayout">
                <pattern>${htmlPattern}</pattern>
            </layout>
        </encoder>
    </appender>

    
    <root level="ALL">
        <!-- <appender-ref ref="fileAppender"/> -->
        <appender-ref ref="htmlFileAppender"/>
    </root>

</configuration>
```

### 日志文件拆分和归档压缩

重要标签来源：
查看源码
     RollingFileAppender类中找到rollingPolicy属性
     SizeAndTimeBasedRollingPolicy类中找到maxFilesize属性
这些属性在类中都是以set方法的形式进行的赋值
我们在配置文件中配置的信息，其实找到的都是这些属性的set方法
在TimeBasedRollingPolicy找到

```xml
   static final string FNP_NOT_SET =
         "The FileNamePattern option must be set before using TimeBasedRollingPolicy."
```


只要我们要使用到日志的拆分
FileNamePattern属性是必须要使用到了



**logback.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

   	<property name="logDir" value="D://logback_log"></property>
    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %c %M %L %m%n"></property>
    
  
    <!--可拆分归档的appender-->
    <appender name="rollFileAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
        <file>${logDir}/roll_logback.log</file>
        <!--指定拆分规则-->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--按照时间和压缩格式声明文件名，压缩格式gz-->
            <fileNamePattern>${logDir}/roll_logback.%d{yyyy-MM-dd}.log%i.gz</fileNamePattern>
            <!--按照文件大小进行拆分-->
            <maxFileSize>2KB</maxFileSize>
        </rollingPolicy>
    </appender>

    
    <root level="ALL">
        <!-- <appender-ref ref="fileAppender"/> -->
        <!-- <appender-ref ref="htmlFileAppender"/>  -->
      	<appender-ref ref="rollFileAppender"/>
    </root>

</configuration>
```

为了看到拆分的效果，我们使用循环测试日志输出

```java
	@Test
    public void testFileSplit(){
        Logger logger = LoggerFactory.getLogger(LogbackTest.class);
        for (int i = 0; i < 100; i++) {

            logger.error("========= ERROR信息 test Logback =========");
            logger.warn("========= WARN信息 test Logback =========");
            logger.info("========= INFO信息 test Logback =========");
            logger.debug("========= DEBUG信息 test Logback =========");
            logger.trace("========= TRACE信息 test Logback =========");
        }

    }
```

### 使用过滤器

使用过滤器，对日志进行更细粒度的控制



**logback.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

   	<property name="logDir" value="D://logback_log"></property>
    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %c %M %L %m%n"></property>
    
   <!--使用过滤器,进行细粒度控制-->
    <appender name="consoleFilterAppender" class="ch.qos.logback.core.ConsoleAppender">
        <target>
            System.err
        </target>
        <!-- 日志输出格式 -->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>

        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <!--高于level中设置的级别，则打印日志-->
            <onMatch>ACCEPT</onMatch>
            <!--低于level中设置的级别，则屏蔽-->
            <onMismatch>DENY</onMismatch>
        </filter>

    </appender>
   
    
    <root level="ALL">
      	<appender-ref ref="consoleFilterAppender"/>
    </root>

</configuration>
 	@Test
    public void test06(){
        Logger logger = LoggerFactory.getLogger(LogbackTest.class);
        logger.error("========= ERROR信息 test Logback =========");
        logger.warn("========= WARN信息 test Logback =========");
        logger.info("========= INFO信息 test Logback =========");
        logger.debug("========= DEBUG信息 test Logback =========");
        logger.trace("========= TRACE信息 test Logback =========");


        /**
         * 2022-01-28 21:27:30.784 [main] ERROR cn.giteasy.logback.test.LogbackTest test06 128 ========= ERROR信息 test Logback =========
         */

    }
```

### 异步日志





```java
 	@Test
    public void test07(){
        Logger logger = LoggerFactory.getLogger(LogbackTest.class);

        //日志输出
        for (int i = 0; i < 100; i++) {

            logger.error("========= ERROR信息 test Logback =========");
            logger.warn("========= WARN信息 test Logback =========");
            logger.info("========= INFO信息 test Logback =========");
            logger.debug("========= DEBUG信息 test Logback =========");
            logger.trace("========= TRACE信息 test Logback =========");
        }

        //业务逻辑操作
        for (int i = 0; i < 100; i++) {
            System.out.println(i);
        }

    }
```

按照我们当前的代码执行顺序，
代码肯定是按照从上向下的顺序执行，上面的代码完全执行完毕后，才会执行下面的业务逻辑
由此得出会出现的问题：
 只要是在记录日志，那么系统本身的功能就处于一种停滞的状态，当日志记录完毕后，才会执行其他代码
  如果日志记录量非常庞大的话，那么系统本身业务代码的执行效率会非常低
 所以logback为我们提供了异步日志的功能



#### 配置方式

1. 配置异步日志

在异步日志中引入我们真正需要输出的appender

```xml
    <appender name="asyncAppender" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="consoleAppender"/>
    </appender>
```

1. 在rootLogger中引入导步日志

```xml
	<root level="ALL">
       <appender-ref ref="asyncAppender"/>
 </root>
```

**完整配置文件logback.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>


    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %c %M %L %m%n"></property>


    <!-- 控制台Appender -->
    <appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender">
        <target>
            System.err
        </target>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>

    <!--异步日志Appender-->
    <appender name="asyncAppender" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="consoleAppender"/>
    </appender>
    

    <root level="ALL">
        <appender-ref ref="asyncAppender"/>
    </root>
 
</configuration>
```

#### 输出效果

```java
2022-02-12 19:10:25.437 [main] WARN  cn.giteasy.logback.test.LogbackTest test07 191 ========= WARN信息 test Logback =========
0
2022-02-12 19:10:25.437 [main] ERROR cn.giteasy.logback.test.LogbackTest test07 190 ========= ERROR信息 test Logback =========
1
2022-02-12 19:10:25.437 [main] WARN  cn.giteasy.logback.test.LogbackTest test07 191 ========= WARN信息 test Logback =========
2
```

所谓异步日志的原理是：
系统会为日志操作单独的分配出来一个线程，主线程会继续向下执行
 线程1：系统业务代码执行
 线程2：打印日志
 两个线程争夺CPU的使用权
在实际项目开发中，越大的项目对于日志的记录就越庞大，为了保证系统的执行效率，异步日志是不错的选择。





### 自定义Logger

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration>

   
    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %c %M %L %m%n"></property>


    <!-- 控制台Appender -->
    <appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender">
        <target>
            System.err
        </target>
        <!-- 日志输出格式 -->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>

 
    <!--
        自定义Logger
        additivity="false" 表示不继承rootLogger
      -->
    <logger name="cn.giteasy" level="warn" additivity="false">
        <appender-ref ref="consoleAppender"></appender-ref>
    </logger>

</configuration>
```

### 关于Logback的补充

1.  异步日志
      可配置属性:

```xml
 <discardingThreshold>0</discardingThreshold>
```

​     当队列的剩余容量小于这个阈值的时候，当前日志的级别 trace、debug、info这3个级别的日志将被丢弃
​     设置为0，说明永远都不会丢弃trace、debug、info这3个级

```xml
  <queueSize>256</queueSize>
```

​      配置队列的深度，这个值会影响记录日志的性能，默认值256
​           
​     关于这两个属性，一般情况下，我们使用默认值即可，不要乱配置，会影响系统性能，了解其功能即可



1. 配置文件转换
        关于不同的日志实现，配置文件也是不同的：
            log4j一般使用的是properties属性文件
            logback使用的是xml配置文件
        如果我们遇到了一种需求，需要将正在使用的log4j，替换为logback，应该如何处理？
        使用转换工具：
            访问logback官网
                找到log4j.properties转换器  (https://logback.qos.ch/translator/)
            只有是二者兼容的配置，才会被翻译
            如果是log4j独立的技术，logback没有，或者是有这个技术但是并不兼容转义
            那么这个工具则不会为我们进行转换，如果是遇到简单的配置，我们可以使用工具。如果是配置比较繁多，复杂，建议手动进行配置。