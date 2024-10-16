# Log4j2

<span style="color:red">异步记录日志最好使用slf4j+log4j2</span>

log4j官网： https://logging.apache.org/log4j/2.x/

log4j官网配置示例：https://logging.apache.org/log4j/2.x/manual/configuration.html

## Log4j2简介

Apache Log4j 2 是对 Log4j 的升级，它比其前身 Log4j 1.x 提供了重大改进，并提供了Logback 中可用的许多改进，同时修复了 Logback 架构中的一些问题。被誉为是目前最优秀的Java日志框架。

## Log4j2特征

### 性能提升。

Log4j2包含基于LMAX Disruptor 库的下一代异步记录器。在多线程场景中，异步记录器的吞吐量比 Log4j 1.x 和 Logback 高 18 倍，延迟低。



### 自动重新加载配置

与Logback一样，Log4j2可以在修改时自动重新加载其配置。与 Logback 不同，它会在重新配置发生时不会丢失日志事件。。



### 高级过滤

与 Logback 一样，Log4j2 支持基于 Log 事件中的上下文数据，标记，正则表达式和其他组件进行过滤。

此外，过滤器还可以与记录器关联。与 Logback 不同，Log4j2 可以在任何这些情况下使用通用的 Filter类。

### 插件架构

Log4j使用插件模式配置组件。因此，您无需编写代码来创建和配置Appender，Layout，Pattern Converter等。在配置了的情况下，Log4j自动识别插件并使用它们。



### 无垃圾机制

在稳定日志记录期间，Log4j2 在独立应用程序中是无垃圾的，在 Web 应用程序中是低垃圾。这减少了垃圾收集器的压力，并且可以提供更好的响应性能。



目前市面上最主流的日志门面就是 SLF4J，虽然 Log4j2 也是日志门面，因为它的日志实现功能非常强大，性能优越。所以我们一般情况下还是将 Log4j2 看作是日志的实现。

**SLF4j+ Log4j2 的组合，是市场上最强大的日志功能实现方式，绝对是未来的主流趋势。**



## 案例

### 使用Log4j的门面+实现

#### 引入依赖

```xml
 	<!--log4j2日志门面-->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>2.17.0</version>
        </dependency>

        <!--log4j2日志实现-->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.17.0</version>
        </dependency>


        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>
```

#### 默认日志级别

Log4j2和Log4j提供了相同的日志级别输出
**默认的日志级别是 error**

```java
		@Test
    public void test01(){


        Logger logger = LogManager.getLogger(this.getClass());
        logger.fatal("fatal>>>>>>>>>>>>>>>>>");
        logger.error("error>>>>>>>>>>>>>>>>>");
        logger.warn("warn>>>>>>>>>>>>>>>>>");
        logger.info("info>>>>>>>>>>>>>>>>>");
        logger.debug("debug>>>>>>>>>>>>>>>>>");
        logger.trace("trace>>>>>>>>>>>>>>>>>");

        /**
         * 在没有进行任何配置时，使用的是默认配置文件， 默认级别是error
         * 12:29:52.003 [main] FATAL cn.giteasy.log4j2.Log4j2Test01 - fatal>>>>>>>>>>>>>>>>>
         * 12:29:52.019 [main] ERROR cn.giteasy.log4j2.Log4j2Test01 - error>>>>>>>>>>>>>>>>>
         */
    }
```

#### 配置文件

log4j2是参考logback创作出来的，所以配置文件也是xml
log4j2同样是默认加载类路径（resources）下的文件
文件名一般配置为log4j2.xml

**log4j2.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--
log4j2配置标签首字母一般为大写
logback有些配置是使用的子文本的配置，而在log4j2中使用的是属性的方式进行配置

SYSTEM_ERR: 红色字体输出
SYSTEM_OUT: 黑色字体输出

Configuration 标签添加属性
    status=“debug” 日志框架本身的日志输出级别
    monitorInterval="5" 自动加载日志配置文件的间隔时间， 单位 秒，
-->
<Configuration xmlns="http://logging.apache.org/log4j/2.0/config"   status="off">


    <Appenders>
        <Console name="consoleAppender" target="SYSTEM_ERR">

        </Console>
    </Appenders>

    <!-- 可以配置N多个Logger，包括Root和自定义Logger-->
    <Loggers>
        <Root level="trace">
            <AppenderRef ref="consoleAppender"/>
        </Root>

    </Loggers>
</Configuration>
```



### 使用slf4j+log4j2

虽然log4j2也是日志门面，但是现在主流趋势仍然是slf4j，
故我们扔需要使用slf4j作为日志门面，搭配log4j2强大的日志实现，进行日志的相关操作
slf4j+log4j2也最主流的日志框架搭配方式。

#### 引入依赖

1.导入slf4j日志门面 slf4j-api
2.导入log4j2适配器 log4j-slf4j-impl
3.导入log4j2日志门面 log4j-api
4.导入log4j2日志实现 log4j-core

```xml
 		<!--slf4j日志门面-->
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>


        <!--log4j适配器，因为log4j在slf4j之前就出现了，所以需要引入一个适配器-->
        <!-- 注意这是log4j的适配器，不是log4j2 的适配器，注意版本-->
        <!--https://mvnrepository.com/artifact/org.slf4j/slf4j-log4j12 -->
  <!--        <dependency>																-->
  <!--            <groupId>org.slf4j</groupId>						-->
  <!--            <artifactId>slf4j-log4j12</artifactId>	-->
  <!--            <version>1.7.32</version>								-->
  <!--        </dependency>																-->


        <!--log4j2适配器，虽然log4j2自己也有门面实现，但是主流都是使用slf4j的日志门面-->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-slf4j-impl</artifactId>
            <version>2.17.0</version>
            <scope>test</scope>
        </dependency>

        <!--log4j2日志门面-->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>2.17.0</version>
        </dependency>

        <!--log4j2日志实现-->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.17.0</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>
```

Q：即然我们使用了slf4j的日志门面，为什么还要导入log4j2的日志门面？
 A：slf4j门面调用的是log4j2的门面，再由log4j2的门面调用log4j2的实现



#### 配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Configuration xmlns="http://logging.apache.org/log4j/2.0/config"   status="off">

    <Properties>
        <Property name="logDir">D://log4j2log</Property>
        <Property name="fileName">log4j2.log</Property>
        <Property name="pattern">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %m%n</Property>
      
      	<Property name="rollLogName">roll_log.log</Property>
        <!--
            文件拆分时 存放的位置
            $${date:yyyy-MM-dd} : 根据日期当天，创建一个文件夹，例如：2021-12-26，记录当前的所有日志信息（拆分出来的日志放在这个文件夹中）
            %i:序号 从0开始
         -->
        <Property name="rollFilePattern">$${date:yyyy-MM-dd}//roll_log_%d{yyyy-MM-dd-mm}_%i.log</Property>
    </Properties>

    <Appenders>
        <!-- 控制台appender-->
        <Console name="consoleAppender" target="SYSTEM_OUT">
            <PatternLayout pattern="${pattern}"/>
        </Console>
        <!-- 文件appender-->
        <File name="fileAppender" fileName="${logDir}//${fileName}">
            <PatternLayout pattern="${pattern}"/>
        </File>

					<!--
						滚动文件appender
            按照指定规则来扮日志文件
            fileName: 日志文件的名字
            filePattern: 日志文件拆分后文件的命名规则
					-->
        <RollingFile name="rollingFileAppender"
                     fileName="${logDir}//${rollLogName}"
                     filePattern="${logDir}//${rollFilePattern}">
            <PatternLayout pattern="${pattern}"/>

            <Policies>
                <!--在系统启动时，触发拆分规则，产生一个日志文件-->
                <OnStartupTriggeringPolicy/>
                <!--按照文件大小拆分,当fileName属性指定的文件超过该大小时，触发拆分事件-->
                <SizeBasedTriggeringPolicy size="10KB"/>
                <!--按照时间节点拆分，拆分规则就是filePattern-->
                <!--<TimeBasedTriggeringPolicy interval="1" modulate="true"/>-->
            </Policies>
            <!--在同一目录下，文件的个数限制30个，如果超出了设置的规则，则根据时间进行覆盖，新的覆盖旧的-->
            <DefaultRolloverStrategy max="30" />
        </RollingFile>

    </Appenders>

    <!-- 可以配置N多个Logger，包括Root和自定义Logger-->
    <Loggers>
        <Root level="trace">
            <AppenderRef ref="consoleAppender"/>
             <!-- <AppenderRef ref="fileAppender"/> -->
          	<AppenderRef ref="rollingFileAppender"/>
        </Root>
    </Loggers>
</Configuration>
```

**测试日志文件滚动**

```java
 	/**
     * 测试日志文件滚动
     */
    @Test
    public void testRollingFile(){
        Logger logger = LoggerFactory.getLogger(this.getClass());

        for (int i = 0; i < 1000; i++) {
            logger.error("slf4j-log4j2 error>>>>>>>>>>>>>>>>>");
            logger.warn("slf4j-log4j2 warn>>>>>>>>>>>>>>>>>");
            logger.info("slf4j-log4j2 info>>>>>>>>>>>>>>>>>");
            logger.debug("slf4j-log4j2 debug>>>>>>>>>>>>>>>>>");
            logger.trace("slf4j-log4j2 trace>>>>>>>>>>>>>>>>>");
        }

    }
```

### 异步日志

单独分配线程记录日志



异步日志是 log4j2 最大的特色，其性能的提升主要也是从异步日志中受益。

Log4j2提供了两种实现日志的方式，一个是通过AsyncAppender,一个是通过AsyncLogger,分别对应前面我们说的Appender组件和Logger组件。

注意这是两种不同的实现方式，在设计和源码上都是不同的体现。



#### 案例

在没有引入异步依赖时，会发现控制台输出信息是有顺序的：先输出1000次logger打印的日志，再输入了System.out输出的信息

```java
	@Test
   public void testAsyncAppender(){
        Logger logger = LoggerFactory.getLogger(this.getClass());
        for (int i = 0; i < 500; i++) {
            logger.error("slf4j-log4j2 error>>>>>>>>>>>>>>>>>");
            logger.warn("slf4j-log4j2 warn>>>>>>>>>>>>>>>>>");
            logger.info("slf4j-log4j2 info>>>>>>>>>>>>>>>>>");
            logger.debug("slf4j-log4j2 debug>>>>>>>>>>>>>>>>>");
            logger.trace("slf4j-log4j2 trace>>>>>>>>>>>>>>>>>");
        }

        //系统业务逻辑
        for (int i = 0; i < 500; i++) {
            System.out.println("处理业务逻辑");
            System.out.println("处理业务逻辑");
            System.out.println("处理业务逻辑");
            System.out.println("处理业务逻辑");

        }

    }
```

#### 引入依赖

```xml
			<!--异步日志依赖-->
        <!-- https://mvnrepository.com/artifact/com.lmax/disruptor -->
        <dependency>
            <groupId>com.lmax</groupId>
            <artifactId>disruptor</artifactId>
            <version>3.4.4</version>
        </dependency>
```



#### AsyncAppender方式

是通过引用别的Appender来实现的，当有日志事件到达时，会开启另外一个线程来处理它们。需要注意的是，如果在Appender的时候出现异常，对应用来说是无法感知的。AsyncAppender 应该在它引用的 Appender之后配置，默认使用java.util.concurrent.ArrayBlockingQueue实现而不需要其它外部的类库。当使用此Appender的

时候，在多线程的环境下需要注意，阻塞队列容易受到锁争用的影响，这可能会对性能产生影响。这时候，我们应该考虑使用无锁的异步记录器（AsyncLogger）



log4j2.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Configuration xmlns="http://logging.apache.org/log4j/2.0/config"   status="off">

    <Properties>
          <Property name="pattern">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %m%n</Property>
    </Properties>

    <Appenders>
        <!-- 控制台appender-->
        <Console name="consoleAppender" target="SYSTEM_OUT">
            <PatternLayout pattern="${pattern}"/>
        </Console>
       
        <!--异步日志 AsyncAppender方式-->
        <Async name="asyncAppender">
            <AppenderRef ref="consoleAppender"/>
        </Async>


    </Appenders>

  
    <Loggers>
        <Root level="trace">
            <AppenderRef ref="asyncAppender"/>
        </Root>

    </Loggers>
</Configuration>
```

测试以上案例，观察输出。





#### AsyncLogger方式

AsyncLogger才是log4j2实现异步最重要的功能体现，也是**官方推荐的异步方式。**



它可以使得调用Logger.log 返回的更快。你可以有两种选择：全局异步和混合异步。



AsyncLogger方式有两种选择：**全局异步** 和 **混合异步**



**全局异步**：所有的日志都异步的记录，在配置文件上不用做任何改动，只需要在jvm 启动的时候增加一个参数即可实现。

**混合异步**：你可以在应用中同时使用同步日志和异步日志，这使得日志的配置方式更加灵活。虽然 Log4j2 提供以一套异常处理机制，可以覆盖大部分的状态，但是还是会有一小部分的特殊情况是无法完全处理的，比如我们如果是记录审计日志（特殊情况之一），那么官方就推荐使用同步日志的方式，而对于其他的一些仅仅是记录一个程序日志的地方，使用异步日志将大幅提升性能，减少对应用本身的影响。



混合异步的方式需要通过修改配置文件来实现，使用AsyncLogger标记配置。



性能对比：（来源于log4j2[官网](https://logging.apache.org/log4j/2.x/manual/async.html)）

![img](.\pic\1640504178017-c40962c0-abed-4139-b842-ab2f8133eabb.png)

![img](.\pic\1640504189258-0dc0fcf5-7ccb-428d-b6e9-ad8073003100.png)

**全局异步配置**

所有的日志都是异步的日志记录，在配置文件上不用做任何的改动
只需要在类路径resources 下添加一个properties属性文件，做一步配置即可
文件名要求是:log4j2.component.properties


        文件中添加以下内容， 即可开始全局异步。

```xml
Log4jContextSelector=org.apache.logging.log4j.core.async.AsyncLoggerContextSelector
```


 **混合异步配置**

可以在应用中同时使用同步日志和异步日志，这将使得日志的配置及输出更加灵活。



需求：	自定义logger  top.tec.async 异步执行
      		 rootLogger同步执行

测试前，一定要将全局的异步注释掉，否则所有的日志都是异步的



 提示：AsyncAppender、AsyncLogger不要同时出现，效果不会叠加。
     如果同时出现，那么效率会以AsyncAppender为主，效率降低
     AsyncLogger的全局异步和混合异步也不要同时出现。



**测试用例**

```java
	@Test
    public void testAsync(){

        /*
         * 为了方便测试，我们指定日志名称为 cn.giteasy.async，作为自定义日志
         * 实际生产中，不用指定，而是使用this.getClass()或者ClassName.class，使用当前类所有的包路径作为名称
         */
        //Logger logger = LoggerFactory.getLogger("cn.giteasy.async");

        //测试根日志
        Logger logger = LoggerFactory.getLogger(this.getClass());
        for (int i = 0; i < 500; i++) {
            logger.error("slf4j-log4j2 error>>>>>>>>>>>>>>>>>");
            logger.warn("slf4j-log4j2 warn>>>>>>>>>>>>>>>>>");
            logger.info("slf4j-log4j2 info>>>>>>>>>>>>>>>>>");
            logger.debug("slf4j-log4j2 debug>>>>>>>>>>>>>>>>>");
            logger.trace("slf4j-log4j2 trace>>>>>>>>>>>>>>>>>");
        }

        //系统业务逻辑
        for (int i = 0; i < 500; i++) {
            System.out.println("处理业务逻辑");
            System.out.println("处理业务逻辑");
            System.out.println("处理业务逻辑");
            System.out.println("处理业务逻辑");

        }

    }
```


  log4j2.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Configuration xmlns="http://logging.apache.org/log4j/2.0/config"   status="off">

    <Properties>
        <Property name="pattern">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %m%n</Property>
    </Properties>

    <Appenders>
      
        <!-- 控制台appender-->
        <Console name="consoleAppender" target="SYSTEM_OUT">
            <PatternLayout pattern="${pattern}"/>
        </Console>
      
		</Appenders>

    <Loggers>
        <Root level="trace">
            <AppenderRef ref="consoleAppender"/>
         </Root>

        <!--
            异步记录日志
            includeLocation="false" 去除日志记录中的行号信息，这个行号信息非常的影响日志记录的效率（生产中都不加这个行号）
            additivity="false" 表示不继承rootLogger

				本案例中，top.tec.async包下的日志输出为异步日志，在其他包下的日志输出为非异步日志，不影响上面的rootLogger同步输出，此为混合异步配置
        -->
        <AsyncLogger name="top.tec.async" level="trace" includeLocation="false" additivity="false">
            <!--将控制台输出consoleAppender设置为异步-->
            <AppenderRef ref="consoleAppender"/>
        </AsyncLogger>

    </Loggers>
</Configuration>
```