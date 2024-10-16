# Springboot日志实现

SpringBoot 是现今市场上最火爆用来简化 spring 开发的框架，springboot 日志也是开发中常用的日志系统。



SpringBoot 默认就是使用SLF4J作为日志门面，Logback作为日志实现来记录日志。



我们直接创建一个springboot的项目，

## 依赖

```xml
			<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>


        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
```



## 查看依赖关系

![img](.\pic\1640528396316-14c13c63-661d-4bdb-9269-56fd80fd16ec.png)



![img](.\pic\1640528645297-05c1b091-497d-4c7e-93c8-8fa5f5e37440.png)



从SpringBoog的依赖关系可以看到，log4j和jul都桥接到了slf4j，且slf4j的实现是logback，所以springboot的日志默认使用的是slf4j+logback的





## springboot日志具体实现测试

```java
	/**
     * springboot日志具体实现
     */
    @Test
    void testLevel() {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.error("error>>>>>>>>>>>>>>>>>>>>");
        logger.warn("warn>>>>>>>>>>>>>>>>>>>>");
        logger.info("info>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.debug("debug>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.trace("trace>>>>>>>>>>>>>>>>>>>");

        /**
         *
         * 从打印结果看，默认级别是info
         * logback的风格输出 （默认使用的是logback的日志实现）
         *
         * 2021-12-26 22:16:05.959 ERROR 3716 --- [           main] c.g.s.SpringBootLogApplicationTests      : error>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 22:16:05.959  WARN 3716 --- [           main] c.g.s.SpringBootLogApplicationTests      : warn>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 22:16:05.960  INFO 3716 --- [           main] c.g.s.SpringBootLogApplicationTests      : info>>>>>>>>>>>>>>>>>>>>>>>>>
         */



    }
```



## 观察log4j-to-slf4j桥接器是否起作用



使用log4j和jul打印日志，观察日志输出结果，同样还是logback的日志输出风格，所以log4j-to-slf4j  和 jul-to-slf4j 桥接器是起作用的。即使使用log4j和jul打印日志，还会桥接到logback

```java
	@Test
    public void testLog4jToSlf4j(){

        org.apache.logging.log4j.Logger logger = LogManager.getLogger(this.getClass());
        logger.error("error>>>>>>>>>>>>>>>>>>>>");
        logger.warn("warn>>>>>>>>>>>>>>>>>>>>");
        logger.info("info>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.debug("debug>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.trace("trace>>>>>>>>>>>>>>>>>>>");

        //java.util.logging.LogManager logManager = java.util.logging.LogManager.getLogManager();
        java.util.logging.Logger julLogger = java.util.logging.Logger.getLogger(this.getClass().getName());

        //java.util.logging.Logger julLogger = logManager.("cn.giteasy");

        //JUL默认级别是INFO
        julLogger.log(Level.OFF,"OFF==================");
        julLogger.log(Level.SEVERE,"SEVERE==================");
        julLogger.log(Level.WARNING,"WARNING==================");
        julLogger.log(Level.INFO,"INFO==================");
        julLogger.log(Level.CONFIG,"CONFIG==================");
        julLogger.log(Level.FINE,"FINE==================");
        julLogger.log(Level.FINER,"FINER==================");
        julLogger.log(Level.FINEST,"FINEST==================");
        julLogger.log(Level.ALL,"ALL==================");
        julLogger.info("jul info==================");



        /**
         *
         * 2021-12-26 22:29:09.209 ERROR 12368 --- [           main] c.g.s.SpringBootLogApplicationTests      : error>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 22:29:09.209  WARN 12368 --- [           main] c.g.s.SpringBootLogApplicationTests      : warn>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 22:29:09.209  INFO 12368 --- [           main] c.g.s.SpringBootLogApplicationTests      : info>>>>>>>>>>>>>>>>>>>>>>>>>
         */
    }
```



## SpringBoot配置文件	

application.properties（yml）是springboot的核心配置文件（用来简化开发）
我们可以通过该配置文件，修改日志相关的配置



```yaml
logging.level.top.tec=trace
logging.pattern.console=%d{yyyy-MM-dd} %t [%level] - %m%n

#logging.file.path=D://springboot_log//
```

观察结果，可以发现修改配置是可以起作用的

```java
	@Test
    public void testConfig(){

        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.error("error>>>>>>>>>>>>>>>>>>>>");
        logger.warn("warn>>>>>>>>>>>>>>>>>>>>");
        logger.info("info>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.debug("debug>>>>>>>>>>>>>>>>>>>>>>>>>");
        logger.trace("trace>>>>>>>>>>>>>>>>>>>");


        /**
         * 打印结果：
         *
         * 2021-12-26 main [ERROR] - error>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 main [WARN] - warn>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 main [INFO] - info>>>>>>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 main [DEBUG] - debug>>>>>>>>>>>>>>>>>>>>>>>>>
         * 2021-12-26 main [TRACE] - trace>>>>>>>>>>>>>>>>>>>
         */


    }
```

## 使用单独的日志配置文件

如果是需要配置日志拆分等相对高级的功能，那么application.properties就达不到我们的需求了
需要使用日志实现相应的配置文件
例如：我们当前日志默认实现使用的是logback
那么我们就需要在类路径resources下，配置logback.xml



**logback.xml**

```java
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <property name="pattern" value="[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} %c %M %L %thread %m%n"></property>
    <property name="logDir" value="D://springboot_logback_log"></property>

    <!--控制台日志-->
    <appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender">
        <!--红色字体打印-->
        <target>
            System.err
        </target>
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>

    <!--可拆分归档的文件日志-->
    <appender name="rollFileAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--日志输出格式-->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
        <!--文件位置-->
        <file>${logDir}//roll_logback.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--按照时间和压缩格式声明文件名，压缩格式gz-->
            <fileNamePattern>${logDir}//roll_logback.%d{yyyy-MM-dd}.log%i.gz</fileNamePattern>
            <!-- 按照文件大小拆分，当日志文件达到这个大小时，将该文件以压缩格式归档 -->
            <maxFileSize>1KB</maxFileSize>
        </rollingPolicy>
    </appender>

    <!--自定义logger-->
    <logger name="top.tec" level="info" additivity="false">
        <appender-ref ref="consoleAppender"/>
        <appender-ref ref="rollFileAppender"/>
    </logger>

</configuration>
```

## 修改为slf4j+log4j2的方式

由于log4j2性能的强大，以及当今市场上越来越多的项目选择使用slf4j+log4j2的组合,springboot默认使用的是slf4j+logback的组合，但我们可以将默认的logback置换为log4j2.



**修改步骤：**

1. 启动器的依赖，间接的依赖logback,所以需要将之前的环境中,logback的依赖去除

```xml
			<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <!--排除掉原始日志依赖，达到去除logback依赖的目的-->
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-logging</artifactId>
                </exclusion>
            </exclusions>
        </dependency> 		
```

1. 添加log4j2的依赖

```xml
			<!--添加log4j2依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-log4j2</artifactId>
        </dependency>
```

1. 添加log4j2的配置文件 log4j2.xml 到resources目录下

**log4j2.xml**

```java
<?xml version="1.0" encoding="UTF-8" ?>

<Configuration xmlns="http://logging.apache.org/log4j/2.0/config"   status="off">

    <Properties>
        <Property name="logDir">D://log4j2log</Property>
        <Property name="rollLogName">roll_log.log</Property>
        <Property name="rollFilePattern">$${date:yyyy-MM-dd}//roll_log_%d{yyyy-MM-dd-mm}_%i.log</Property>
        <Property name="pattern">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %m%n</Property>
    </Properties>

    <Appenders>
        <!-- 控制台appender-->
        <Console name="consoleAppender" target="SYSTEM_ERR">
            <PatternLayout pattern="${pattern}"/>
        </Console>
       
	        <RollingFile name="rollingFileAppender"
                     fileName="${logDir}//${rollLogName}"
                     filePattern="${logDir}//${rollFilePattern}">
            <PatternLayout pattern="${pattern}"/>
            <Policies>
                <OnStartupTriggeringPolicy/>
                <SizeBasedTriggeringPolicy size="10KB"/>
                <!--<TimeBasedTriggeringPolicy interval="1" modulate="true"/>-->
            </Policies>
            <DefaultRolloverStrategy max="30" />
        </RollingFile>
    </Appenders>

    <Loggers>
        <Root level="trace">
  			<AppenderRef ref="consoleAppender"/>
   			<AppenderRef ref="rollingFileAppender"/>
        </Root>
    </Loggers>
</Configuration>
```

**置换为slf4j+log4j2后的依赖关系**

![img](.\pic\1640532747339-a3925a94-2f45-45b7-a021-0dccd23a4842.png)