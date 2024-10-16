# JCL

## JCL简介

> 全称为Jakarta Commons Logging，是Apache提供的一个<span style='color:red'>通用日志API</span>。

> 用户可以自由选择第三方的日志组件作为具体实现，像 log4j，或者 jdk 自带的 jul，common-logging 会通过动态查找的机制，在程序运行时自动找出真正使用的日志库。

> 当然，common-logging 内部有一个Simple logger 的简单实现，但是功能很弱。所以使用common-logging，通常都是配合着log4j以及其他日志框架来使用。

> 使用它的好处就是，代码依赖是 common-logging而非log4j的API， 避免了和具体的日志API直接耦合，在有必要时，可以更改日志实现的第三方库。



JCL 有两个基本的抽象类：

Log：日志记录器。

LogFactory：日志工厂（负责创建 Log 实例）



![img](.\pic\1642836185992-39010ee1-38ec-4d3a-b317-f4b4fe916f6d.png)

## 案例

### 引入依赖

```xml
  			<dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.2</version>
        </dependency>
```



### 入门案例



在没有导入第三方的日志框架情况下，例如log4j，会使用JUL日志框架做日志的记录操作

*JCL使用的原则：
**如果有log4j，优先使用log4j
**如果项目中没有任何第三方日志框架，使用的就是JUL*

```javascript
 		@Test
    public void testJCL(){

        Log log = LogFactory.getLog(JCLTest.class);
        log.fatal("========= FATAL信息 test jcl =========");
        log.error("========= ERROR信息 test jcl =========");
        log.warn("========= WARN信息 test jcl =========");
        log.info("========= INFO信息 test jcl =========");
        log.debug("========= DEBUG信息 test jcl =========");
        log.trace("========= TRACE信息 test jcl =========");


        /**
         * 输出结果：（JUL日志格式默认风格）
         * 一月 22, 2022 3:35:26 下午 cn.giteasy.jcl.test.JCLTest testJCL
         * 严重: ========= FATAL信息 test jcl =========
         * 一月 22, 2022 3:35:26 下午 cn.giteasy.jcl.test.JCLTest testJCL
         * 严重: ========= ERROR信息 test jcl =========
         * 一月 22, 2022 3:35:26 下午 cn.giteasy.jcl.test.JCLTest testJCL
         * 警告: ========= WARN信息 test jcl =========
         * 一月 22, 2022 3:35:26 下午 cn.giteasy.jcl.test.JCLTest testJCL
         * 信息: ========= INFO信息 test jcl =========
         */
    }
```

#### JCL引入log4j依赖



添加依赖

```xml
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
```

添加配置文件log4j.properties

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

测试类

```javascript
		@Test
    public void testUCL_Log4j(){
        Log log = LogFactory.getLog(JCLTest.class);
        log.fatal("========= FATAL信息 test jcl =========");
        log.error("========= ERROR信息 test jcl =========");
        log.warn("========= WARN信息 test jcl =========");
        log.info("========= INFO信息 test jcl =========");
        log.debug("========= DEBUG信息 test jcl =========");
        log.trace("========= TRACE信息 test jcl =========");

        /**
         * 输出信息：
         *
         * log4j:WARN No appenders could be found for logger (cn.giteasy.jcl.test.JCLTest).
         * log4j:WARN Please initialize the log4j system properly.
         * log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
         *
         *
         * 我们观察控制台打印日志，可以发现已经使用了log4j作为日志输出，
         * 警告信息为没有发现Appender,是因为没有进行log4j的相关配置，需要log4j.properties配置文件进行配置，
         *
         * 进行配置后输出信息：
         * 2022-01-22 15:42:16.053 [main] FATAL cn.giteasy.jcl.test.JCLTest.testUCL_Log4j(JCLTest.java:54) ========= FATAL信息 test jcl =========
         * 2022-01-22 15:42:16.056 [main] ERROR cn.giteasy.jcl.test.JCLTest.testUCL_Log4j(JCLTest.java:55) ========= ERROR信息 test jcl =========
         * 2022-01-22 15:42:16.056 [main] WARN  cn.giteasy.jcl.test.JCLTest.testUCL_Log4j(JCLTest.java:56) ========= WARN信息 test jcl =========
         * 2022-01-22 15:42:16.057 [main] INFO  cn.giteasy.jcl.test.JCLTest.testUCL_Log4j(JCLTest.java:57) ========= INFO信息 test jcl =========
         * 2022-01-22 15:42:16.057 [main] DEBUG cn.giteasy.jcl.test.JCLTest.testUCL_Log4j(JCLTest.java:58) ========= DEBUG信息 test jcl =========
         * 2022-01-22 15:42:16.057 [main] TRACE cn.giteasy.jcl.test.JCLTest.testUCL_Log4j(JCLTest.java:59) ========= TRACE信息 test jcl =========
         *
         *
         *
         *
         */
    }
```

#### 总结：

虽然日志框架进行了改变，但是代码完全没有改变。

日志门面的好处：

  门面技术是面向接口的开发，不再依赖具体的实现类，减少代码的耦合性。

  可以根据实际需求，灵活的切换日志框架。

  统一的API，方便开发者学习和使用，统一的配置管理便于项目日志的维护



### 源码分析



Log接口的4个实现类

- JDk13
- JDK14 正常java.util.logging
- Log4j 我们集成的log4j
- Simple JCL自带实现类

![img](.\pic\1642838971712-85b4179c-2922-4ee6-ba76-2b471766c612.png)


（1）查看Jdk14Logger证明里面使用的是JUL日志框架



![img](.\pic\1643445405579-e2ee6225-f5f7-4241-b937-8505bafcdeb5.png)
（2)查看Log4JLogger证明里面使用的是Log4j日志框架

![img](.\pic\1643445462109-50f4a725-aed5-40c3-9284-a0251354aba5.png)
（3)观察LogFactory，查看如何加载的Logger对象

![img](.\pic\1643445627123-052e8a69-ae53-4f83-850e-588b6e65e5a7.png)![img](https://cdn.nlark.com/yuque/0/2022/png/1038134/1643445612343-04afbcb0-bff2-4d6e-95f5-b04ce350d91e.png)
     这是一个抽象类，无法实例化，需要观察其实现类LogFactoryImpl
（4）观察LogFactoryImpl，真正加载日志实现使用的就是这个实现类LogFactoryImpl
（5）进入getLog方法
    进入getInstance方法
        找到instance = this.newInstance(name);//继续进入

![img](.\pic\1643445911898-e176b80e-473f-478f-b4f8-744e8765b71b.png)
        找到instance = this.discovertogImplementation(name)；//    表示发现一个日志的实现

![img](.\pic\1643445927902-e923df09-5ae4-486a-aa61-0102c03e9974.png)
        

![img](.\pic\1643445974842-4965b872-31c9-41d0-bbbb-41c110a33582.png)
    遍历我们拥有的日志实现框架,遍历的是一个数组，这个数组是按照 log4j、 jdk14、jdk13、SimpleLogger的顺序依次遍历
    表示的是，第一个要遍历的就是log4j，如果有log4j则执行该日志框架,如果没有，则遍历出来第二个，使用jdk14的JUL日志框架,以此类推.

```javascript
result = this createLogFromclass(classesToDiscover[i], logCategory, true);
```


表示帮我们创建Logger对象在这个方法中，我们看到了

```javascript
c = class.forName(logAdapterclassName, true, currentCL);
```


    是取得该类型的反射类型对象,使用反射的形式帮我们创建logger对象

```javascript
constructor = c.getconstructor(this.logConstructorsignature);
```