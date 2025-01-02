# SLF4J

## 日志门面概述

### 门面模式（外观模式）



GoF23 种设计模式其中之一。

门面模式（Facade Pattern），也称之为外观模式，其核心为：外部与一个子系统的通信必须通过一个统一的外观对象进行，使得子系统更易于使用。

外观模式主要是体现了Java中的一种好的封装性。更简单的说，就是对外提供的接口要尽可能的简单。

### 日志门面

前面介绍的几种日志框架，每一种日志框架都有自己单独的API，要使用对应的框架就要使用其对应的 API，这就大大的增加应用程序代码对于日志框架的耦合性。



为了解决这个问题，就是在日志框架和应用程序之间架设一个沟通的桥梁，对于应用程序来说，无论底层的日志框架如何变，都不需要有任何感知。只要门面服务做的足够好，随意换另外一个日志框架，应用程序不需要修改任意一行代码，就可以直接运行。



### 常见日志框架及日志门面

常见的日志实现：JUL、log4j、logback、log4j2。

常见的日志门面 ：JCL、slf4j



出现顺序 ：log4j -> JUL -> JCL -> slf4j -> logback -> log4j2





## SLF4J

### SLF4J简介



简单日志门面（Simpl4 Logging Facade For Java）SLF4J主要是为了给Java 日志访问提供套标准、规范的 API框架，其主要意义在于提供接口，具体的实现可以交由其他日志框架，例如 log4j 和 logback等。当然 slf4j 自己也提供了功能较为简单的实现，但是一般很少用到。对于一般的Java项目而言，日志框架会选择slf4j-api作为门面，配上具体的实现框架（log4j、logback等），中间使用桥接器完成桥接。所以我们可以得出SLF4J最重要的两个功能就是对于日志框架的绑定以及日志框架的桥接。



官方网站：https://www.slf4j.org/

### SLF4J桥接技术

通常，我们依赖的某些组件依赖于SLF4JI以外的日志API。我们可能还假设这些组件在不久的将来不会切换到SLF4J。例如log4j、JUL、JCL是在SLF4J出现之间就出现了，为了处理这种情况，SLF4J附带了几个桥接模块，这些模块会将对 log4j，JCL和java.util.logging API的调用重定向为行为，就好像是对SLF4JAPI进行的操作一样。

出现顺序 ：log4j -> JUL -> JCL -> slf4j -> logback -> log4j2





### 案例

#### 源代码

https://github.com/gitaxin/JavaLog/tree/master/SLF4J

#### 引入依赖

```xml
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>

        <!--slf4j日志门面 核心依赖-->
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>


       <!--slf4j自带的简单日志实现-->
        <!--
            在没有任何其他日志实现框架集成的基础之上， slf4j使用的就是自带的框架slf4j-simple
            slf4j-simple也必须以单独依赖的形式导入进来，否则无法打印日志
         -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.32</version>
        </dependency>
```

#### 入门

```java
	@Test
    public void test(){

        Logger logger = LoggerFactory.getLogger(SLF4JTest.class);

        logger.info("========= INFO信息 test slf4j =========");


        /**
         * 使用SLF4J自带的日志实现
         * [main] INFO cn.giteasy.slf4j.test.SLF4JTest - ========= INFO信息 test slf4j =========
         */

    }
```

*在没有任何其他日志实现框架集成的基础之上， slf4j使用的slf4j-simple，slf4j-simple也必须以单独依赖的形式导入进来，如果未引入任何实现，将会打印以下信息*



```shell
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
```

#### 日志级别

```java
	@Test
    public void test(){

        Logger logger = LoggerFactory.getLogger(SLF4JTest.class);

        logger.error("========= ERROR信息 test slf4j =========");
        logger.warn("========= WARN信息 test slf4j =========");
        logger.info("========= INFO信息 test slf4j =========");
        logger.debug("========= DEBUG信息 test slf4j =========");//默认INFO级别，所以debug未打印
        logger.trace("========= TRACE信息 test slf4j =========");//默认INFO级别，所以trace未打印

        /**
         * 使用SLF4J自带的日志实现
         * [main] ERROR cn.giteasy.slf4j.test.SLF4JTest - ========= ERROR信息 test slf4j =========
         * [main] WARN cn.giteasy.slf4j.test.SLF4JTest - ========= WARN信息 test slf4j =========
         * [main] INFO cn.giteasy.slf4j.test.SLF4JTest - ========= INFO信息 test slf4j =========
         */

    }
```

| 级别  | 说明                     |
| ----- | ------------------------ |
| error | 日志错误信息             |
| warn  | 日志警告信息             |
| info  | 日志关键信息（默认级别） |
| debug | 日志祥细信息             |
| trace | 日志跟踪信息             |

#### 打印动态日志信息

如果是通过拼接字符串的形式，不仅麻烦，而且更重要的是可读性差，我们的日志打印是支持以替代符的形式做日志信息拼接的。
一般情况下，几乎所有的日志实现产品，都会提供这种基础功能。

```java
    @Test
    public void test02(){

        Logger logger = LoggerFactory.getLogger(SLF4JTest.class);
        String name = "giteasy";
        int age = 18;
        logger.info("my name is {}, I am {} years old.",new Object[]{name,age});
        logger.info("my name is {}, I am {} years old.",name,age);//常用


    }
```

#### 打印异常信息

```java
 	@Test
    public void test03(){

        Logger logger = LoggerFactory.getLogger(SLF4JTest.class);
        try {
            Class.forName("abc");
        } catch (ClassNotFoundException e) {
            //打印堆栈跟踪信息
            //e.printStackTrace();
            logger.info("错误信息：",e);
        }
    }
```

#### 通过适配器绑定其他日志实现

观察SLF4J官网提供的图

![img](.\pic\1640506136316-08fd366a-831e-4a74-a49f-2f41faa953d7.png)

图片来源：https://www.slf4j.org/manual.html



SLF4J日志门面，共有3种情况对日志实现进行绑定



1. 在没有绑定任何日志实现的基础之上，日志是不能够绑定实现任何功能的;

注意：slf4j-simple是虽然是slf4j官方提供的，使用的时候，也是需要导入依赖，自动绑定到slf4j门面上，如果不导入，slf4j核心依赖是不提供任何实现的。

1. logback和simple（包括nop）(图中蓝色部分)
    都是slf4j门面时间线后面出现的日志实现框架，所以API完全遵循slf4j进行的设计，那么我们**只需要导入想要使用的日志实现依赖**，即可与slf4j无缝衔接

**注意：nop虽然也划分到了实现中，但是他是指不实现日志记录，不记录日志**



1. log4j和JUL
    都是slf4j门面时间线前面出现的日志实现框架，所以API没有遵循slf4j进行设计，通过适配桥接的技术，完成与日志门面的衔接




**添加logback依赖，试着集成logback日志框架**

```xml
        <!--slf4j日志门面 核心依赖-->
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>


       <!--slf4j自带的简单日志实现-->
        <!--
            在没有任何其他日志实现框架集成的基础之上， slf4j使用的就是自带的框架slf4j-simple
            slf4j-simple也必须以单独依赖的形式导入进来
         -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.32</version>
        </dependency>


        <!--集成logback-->
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


在集成了slf4j-simple依赖基础上，添加logback依赖后：

控制台打印：

```powershell
SLF4J: Class path contains multiple SLF4J bindings.//说明当前项目存在多个日志实现
 ...
 ...
SLF4J: Actual binding is of type [org.slf4j.impl.SimpleLoggerFactory]//当出现多个日志实现时，实际绑定的依赖
```

<span style="color:red">说明在当前项目中有多个实现信赖，但实际使用的还是slf4j-simple</span>

<span style="color:red">原因：因为是先导入的slf4j-simple依赖，所以默认还是使用slf4j-simple</span>

<span style="color:red">如果希望使用指定的日志实现，需要在pom文件中修改引入的顺序，将指定的依赖放到前面。在实际应用的情况下，一般只集成一种日志实现</span>



#### 使用slf4j-nop 禁止打印日志



slf4j-nop 是slf4j实现的，可以起到不打印日志的作用，虽然是slf4j实现的，如果要使用它，还是需要引入依赖的。
在项目中如果存在多个日志实现的话，slf4j-simple,logback,jul日志实现，slf4j-nop与前面这几个日志实现是同一类（图中蓝色）。如果让slf4j-nop起作用，根据slf4j是通过引入顺序进行绑定的，我们要将slf4j-nop依赖放到其他日志实现的前面

```xml
        <!--slf4j日志门面 核心依赖-->
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>

        <!--导入slf4j-nop-->
        <!-- no print-->
       <dependency>
      			<groupId>org.slf4j</groupId>
       			<artifactId>slf4j-nop</artifactId>
         		<version>1.7.32</version>
       </dependency>


        <!--集成logback-->
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

#### 多个日志实现

当项目中存在多个日志实现时，会出现警告信息，但不影响使用，按照引入依赖的顺序默认使用的是引入依赖的第1个日志实现



例如项目中引入了logback 和 slf4j-simple

控制台打印：

```powershell
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/C:/Users/Administrator/.m2/repository/org/slf4j/slf4j-simple/1.7.32/slf4j-simple-1.7.32.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/C:/Users/Administrator/.m2/repository/ch/qos/logback/logback-classic/1.2.10/logback-classic-1.2.10.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.slf4j.impl.SimpleLoggerFactory]
```

**源码分析**

通过源码查看其原理（看看slf4j的执行原理）
进入到getLogger()方法,可看到：

```java
    Logger logger = getLogger(clazz.getName());
```

继续进入getLogger。可看到：

```java
  ILoggerFactory iLoggerFactory = getILoggerFactory();//用来取得Logger工厂实现的方法
```

进入getILoggerFactory，看到以双重检查锁的方式去做判断
     执行performInitialization(）；工厂的初始化方法
进入performInitialization(）
     bind()就是用来绑定具体日志实现的方法
进入bind()，看到Set集合

```java
     Set<URL> staticLoggerBinderPathSet = null;
```



因为当前有可能会有N多个日志框架的实现
看到

```java
staticLoggerBinderPathset = findPossibleStaticLoggerBinderPathSet();
```


进入findPossibleStaticLoggerBinderPathSet()
看到创建了一个有序不可重复的集合对象

```java
    LinkedHashset staticLoggerBinderPathSet = new LinkedHashSet();
```



声明了枚举类的路径，经过if else判断，以获取系统中都有哪些日志实现
看到



```java
	Enumeration paths；
     if (loggerFactoryClassLoader == null) {
         paths = classLoader.getSystemResources(STATIC_LOGGER_BINDER_PATH);
     } else {
         paths = loggerFactoryClassLoader.getResources(STATIC_LOGGER_BINDER_PATH);
     }
```


 我们主要观察常量STATIC_LOGGER_BINDER_PATH
     通过常量我们会找到类org/slf4j/impl/StaticLoggerBinder.class
这个类是以静态的方式绑定Logger实现的类



1. StaticLoggerBinder来自slf4j-simple,如果当前项目引入了slf4j-simple的适配器.（slf4j-simple中自带适配器）
   进入StaticLoggerBinder看到：

```java
     private final ILoggerFactory loggerFactory = new SimpleLoggerFactory();
```



 进入SimpleLoggerFactory类，看到：    getLogger()方法

​     
  看到 

```java
 Logger newInstance = new SimpleLogger(name);
```


  使用的就是slf4j-simple的Logger



1. StaticLoggerBinder来自slf4j-jdk14,如果当前项目引入了slf4j-jdk14（JUL的适配器）的适配器.(当前项目如何没有引入任何日志实现，则使用的是JUL)
   进入StaticLoggerBinder看到：



```java
   new JDK14LoggerFactory();
```


进入JDK14LoggerFactory类的无参构造方法,看到:

```java
	java.util.logging.Logger.getLogger("");
```


使用的就是jul的Logger
接着观察findPossiblestaticLoggerBinderPathset
 看到以下代码，表示如果还有其他的日志实现

```java
   		while(paths.hasMoreElements()){
             URL path = (URL)paths.nextElement();
             //将路径添加进入staticLoggerBinderPathset
             staticLoggerBinderPathset.add(path);
          }
```

回到bind方法

```java
	//表示对于绑定多实现的处理
     reportMultipleBindingAmbiguity(staticLoggerBinderPathSet);
```

如果出现多日志实现的情况,则会打印

```java
  Util.report("Class path contains multiple SLF4J bindings.");
```

**总结：**
 在真实生产环境中，slf4j只绑定一个日志实现框架就可以了,绑定多个，默认使用导入依赖的第一个，而且会产生没有必要的警告信息

## SLF4J集成LOG4J

### 源代码

https://github.com/gitaxin/JavaLog/tree/master/SLF4J_LOG4J

### 引入依赖

由于log4j是在slf4j之前出品的日志框架实现,所以并没有遵循slf4j的API规范，如果想要使用log4j，需要绑定一个适配器，叫做slf4j-log4j12

之前集成的logback，是slf4j之后出品的日志框架实现, logback就是按照slf4j的标准制定的API， 所以我们导入依赖就能用

```xml
			<dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>

        <!--slf4j日志门面 核心依赖-->
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>

        <!--
            由于log4j是在slf4j之前出品的日志框架实现,所以并没有遵循slf4j的API规范
            如果想要使用log4j，需要绑定一个适配器，叫做slf4j-log4j12
         -->
        <!--导入log4j适配器依赖-->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.32</version>
        </dependency>

        <!--导入log4j依赖-->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
```

### 测试

```java
	@Test
    public void test01(){
        Logger logger = LoggerFactory.getLogger(SLF4J_LOG4J_TEST.class);
        logger.error("========= ERROR信息 test slf4j =========");
        logger.warn("========= WARN信息 test slf4j =========");
        logger.info("========= INFO信息 test slf4j =========");
        logger.debug("========= DEBUG信息 test slf4j =========");
        logger.trace("========= TRACE信息 test slf4j =========");


        /**
         * 输出结果：
         * log4j:WARN No appenders could be found for logger (cn.giteasy.slf4j.log4j.test.SLF4J_LOG4J_TEST).
         * log4j:WARN Please initialize the log4j system properly.
         * log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
         *
         * 很熟悉的打印结果，这是已经绑定了log4j日志实现，之所以打印这些信息，是因为没有配置Appender
         * 配置了Appender或添加了配置文件后，就可以使用了
         *
         */


    }
```

添加配置文件

```java
log4j.rootLogger = trace,consoleAppender


#*********************************************************************************************
#配置appender输出方式为控制台输出

log4j.appender.consoleAppender = org.apache.log4j.ConsoleAppender
#配置appender控制台输出的格式
#log4j.appender.consoleAppender.layout = org.apache.log4j.SimpleLayout
#以html格式输出
#log4j.appender.consoleAppender.layout = org.apache.log4j.HTMLLayout
log4j.appender.consoleAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.consoleAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
	/**
     * 添加配置文件log4j.properties后测试
     */
    @Test
    public void test02(){
        Logger logger = LoggerFactory.getLogger(SLF4J_LOG4J_TEST.class);
        logger.error("========= ERROR信息 test slf4j =========");
        logger.warn("========= WARN信息 test slf4j =========");
        logger.info("========= INFO信息 test slf4j =========");
        logger.debug("========= DEBUG信息 test slf4j =========");
        logger.trace("========= TRACE信息 test slf4j =========");

        /**
         * 输出结果：
         * 2022-01-22 21:55:27.908 [main] ERROR cn.giteasy.slf4j.log4j.test.SLF4J_LOG4J_TEST.test02(SLF4J_LOG4J_TEST.java:54) ========= ERROR信息 test slf4j =========
         * 2022-01-22 21:55:27.910 [main] WARN  cn.giteasy.slf4j.log4j.test.SLF4J_LOG4J_TEST.test02(SLF4J_LOG4J_TEST.java:55) ========= WARN信息 test slf4j =========
         * 2022-01-22 21:55:27.910 [main] INFO  cn.giteasy.slf4j.log4j.test.SLF4J_LOG4J_TEST.test02(SLF4J_LOG4J_TEST.java:56) ========= INFO信息 test slf4j =========
         * 2022-01-22 21:55:27.910 [main] DEBUG cn.giteasy.slf4j.log4j.test.SLF4J_LOG4J_TEST.test02(SLF4J_LOG4J_TEST.java:57) ========= DEBUG信息 test slf4j =========
         * 2022-01-22 21:55:27.910 [main] TRACE cn.giteasy.slf4j.log4j.test.SLF4J_LOG4J_TEST.test02(SLF4J_LOG4J_TEST.java:58) ========= TRACE信息 test slf4j =========
         *
         * 看到以上日志输出格式，完全是我们在配置文件中定义的格式，说明配置成功。
         *
         *
         *
         */

    }
```

**总结：
	通过这个集成测试，我们会发现虽然底层的日志实现变了，但是源代码没有改变。这就是日志门面给我们带来最大的好处, 在底层真实记录日志的时候，不需要去做任何的了解，只需要去记slf4j的API就可以了
	我们虽然底层使用的是log4j做的打印，但是从当前代码使用来看,我们其实使用的仍然是slf4j日志门面，（导包时只导入了slf4j的API接口
	日志是log4j打印的（或者是logback打印的）都是由slf4j进行操作的，我们无需关心**

## SLF4J集成JUL

### 源代码

https://github.com/gitaxin/JavaLog/tree/master/SLF4J-JUL

### 引入依赖



SLF4J 使用JUL作为日志实现

与log4j一样，JUL是在slf4j之前出品的日志框架实现,所以并没有遵循slf4j的API规范，如果想要使用JUL作为slf4j的实现，需要导入slf4j-jdk14适配器依赖

```xml
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>

        <!--slf4j日志门面 核心依赖-->
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.32</version>
        </dependency>

        <!--
            与log4j一样，JUL也是在slf4j之前出品的日志框架实现,所以并没有遵循slf4j的API规范
            如果想要使用JUL作为slf4j的实现，需要导入slf4j-jdk14适配器
         -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-jdk14</artifactId>
            <version>1.7.32</version>
        </dependency>
```

### 测试

```java
	@Test
    public void test01(){
        Logger logger = LoggerFactory.getLogger(SLF4J_JUL_TEST.class);
        logger.error("========= ERROR信息 test slf4j-JUL =========");
        logger.warn("========= WARN信息 test slf4j-JUL =========");
        logger.info("========= INFO信息 test slf4j-JUL =========");
        logger.debug("========= DEBUG信息 test slf4j-JUL =========");
        logger.trace("========= TRACE信息 test slf4j-JUL =========");

        /**
         * 打印结果：
         *
         *
         * 一月 23, 2022 2:58:36 下午 cn.giteasy.slf4j.jul.test.SLF4J_JUL_TEST test01
         * 严重: ========= ERROR信息 test slf4j-JUL =========
         * 一月 23, 2022 2:58:36 下午 cn.giteasy.slf4j.jul.test.SLF4J_JUL_TEST test01
         * 警告: ========= WARN信息 test slf4j-JUL =========
         * 一月 23, 2022 2:58:36 下午 cn.giteasy.slf4j.jul.test.SLF4J_JUL_TEST test01
         * 信息: ========= INFO信息 test slf4j-JUL =========
         *
         *
         * 从控制台打印的结果，可以看出这就是JUL的日志默认打印风格
         */

    }
```

## SLF4J实战

### 源代码

https://github.com/gitaxin/JavaLog/tree/master/SLF4J_ACTION



### 需求

​    假设我们项目一直以来使用的是log4j日志框架,但是随着技术和需求的更新换代。 log4j已然不能够满足我们系统的需求. 我们现在就需要将系统中的日志实现重构为 slf4j+logback的组合，在不触碰java源代码的情况下，如何解决这个问题？



### 模拟当前我们使用的Log4j打印日志

#### 引入依赖

```xml
			<dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
        </dependency>


       <dependency>
        		<groupId>log4j</groupId>
          	<artifactId>log4j</artifactId>
      			<version>1.2.17</version>
        </dependency>
```

#### 添加log4j配置文件



log4j.properties

```powershell
log4j.rootLogger = trace,consoleAppender

#*********************************************************************************************
#配置consoleAppender输出方式为控制台输出
log4j.appender.consoleAppender = org.apache.log4j.ConsoleAppender
log4j.appender.consoleAppender.layout = org.apache.log4j.PatternLayout
log4j.appender.consoleAppender.layout.conversionPattern = %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5p %l %m%n
```

#### 使用Log4j打印日志

```powershell
    @Test
    public void test01(){


        Logger logger = Logger.getLogger(SLF4J_ACTION.class);
        logger.fatal("FATAL信息 =========testLog4j========= ");
        logger.error("ERROR信息 =========testLog4j========= ");
        logger.warn("WARN信息 =========testLog4j========= ");
        logger.info("INFO信息 =========testLog4j========= ");
        logger.debug("DEBUG信息 =========testLog4j========= ");
        logger.trace("TRACE信息 =========testLog4j========= ");

        /***
         * 输出结果
         *
         * 2022-01-23 16:02:52.881 [main] FATAL cn.giteasy.slf4j.action.test.SLF4J_ACTION.test01(SLF4J_ACTION.java:26) FATAL信息 =========testLog4j=========
         * 2022-01-23 16:02:52.883 [main] ERROR cn.giteasy.slf4j.action.test.SLF4J_ACTION.test01(SLF4J_ACTION.java:27) ERROR信息 =========testLog4j=========
         * 2022-01-23 16:02:52.883 [main] WARN  cn.giteasy.slf4j.action.test.SLF4J_ACTION.test01(SLF4J_ACTION.java:28) WARN信息 =========testLog4j=========
         * 2022-01-23 16:02:52.883 [main] INFO  cn.giteasy.slf4j.action.test.SLF4J_ACTION.test01(SLF4J_ACTION.java:29) INFO信息 =========testLog4j=========
         * 2022-01-23 16:02:52.883 [main] DEBUG cn.giteasy.slf4j.action.test.SLF4J_ACTION.test01(SLF4J_ACTION.java:30) DEBUG信息 =========testLog4j=========
         * 2022-01-23 16:02:52.883 [main] TRACE cn.giteasy.slf4j.action.test.SLF4J_ACTION.test01(SLF4J_ACTION.java:31) TRACE信息 =========testLog4j=========
         */
    }
```





### 使用logback替换log4j

#### SLF4J桥接器

![img](.\pic\1642925786502-154dc466-71dd-4622-bb5e-13da0ed8af04.png)

图片来源：https://www.slf4j.org/legacy.html



桥接器解决的是项目中日志的重构问题，当前系统中存在之前的日志API，可以通过桥接转换到slf4j的实现。



#### 使用桥接器

1. 去除之前旧的日志框架依赖

```xml
  <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
  </dependency>
```

 此时项目编译会报错，不用担心，下一步引入桥接器就可以了。

1. 添加slf4j核心依赖和SLF4J提供的桥接组件

```xml
<!-- 根据官网手册提供的介绍和示图，我们引入LOG4J相关的桥接器 -->
  <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>slf4j-api</artifactId>
       <version>1.7.32</version>
   </dependency>
   <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>log4j-over-slf4j</artifactId>
       <version>1.7.32</version>
   </dependency>
  
```

此时，我们发现项目编译的报错，已恢复正常，此时我们并没有改变一行源代码.



1. 添加我们需求中要使用的日志实现依赖logback

```xml
 <dependency>
     <groupId>ch.qos.logback</groupId>
     <artifactId>logback-classic</artifactId>
     <version>1.2.10</version>
 </dependency>
```

#### 测试打印

```java
	@Test
    public void test01(){


        Logger logger = Logger.getLogger(SLF4J_ACTION.class);
        logger.fatal("FATAL信息 =========testLog4j========= ");
        logger.error("ERROR信息 =========testLog4j========= ");
        logger.warn("WARN信息 =========testLog4j========= ");
        logger.info("INFO信息 =========testLog4j========= ");
        logger.debug("DEBUG信息 =========testLog4j========= ");
        logger.trace("TRACE信息 =========testLog4j========= ");

        /***
         * 输出结果：引入slf4j、SLF4J桥接器，以及logback后，打印结果，已经是logback的默认风格了，此时我们只是替换了几个依赖，并没有改变任何低码
         *
         * 16:49:35.462 [main] ERROR cn.giteasy.slf4j.action.test.SLF4J_ACTION - FATAL信息 =========testLog4j=========
         * 16:49:35.464 [main] ERROR cn.giteasy.slf4j.action.test.SLF4J_ACTION - ERROR信息 =========testLog4j=========
         * 16:49:35.464 [main] WARN cn.giteasy.slf4j.action.test.SLF4J_ACTION - WARN信息 =========testLog4j=========
         * 16:49:35.464 [main] INFO cn.giteasy.slf4j.action.test.SLF4J_ACTION - INFO信息 =========testLog4j=========
         * 16:49:35.464 [main] DEBUG cn.giteasy.slf4j.action.test.SLF4J_ACTION - DEBUG信息 =========testLog4j=========
         *
         */
    }
```

在重构之后，就会为我们造成这样一种假象，使用的是log4j包下的日志组件，但是真正日志的实现，却是slf4j门面+logback实现，这就是桥接器给我们带来的效果。



注意：
在桥接器加入之后，log4j适配器就没有必要加入了,
桥接器和适配器不能同时导入依赖,假如导入了，会存在两种情况：
 \1. 桥接器如果配置在适配器的上方，则运行时会报错（栈溢出异常），不同同时出现。（slf4j->适配器slf4j-log4j12->桥接器log4j-over-slf4j->适配器slf4j-log4j12->...... 出现死循环）
 \2. 桥接器如果配置在适配器的下方，则不会执行桥接器，对于我们来说就没有任何意义。（我们的需求是要将log4j的打印，桥接到slf4j+logback实现上）

#### 源码分析

在配置了桥接器之后，底层就是使用slf4j实现的日志



```java
	@Test
    public void test03(){

        Logger logger = Logger.getLogger(SLF4J_ACTION.class);
        logger.info("INFO信息 =========testLog4j========= ");
    }
```



通过getLogger，进入Log4jLoggerFactory

```java
    Logger newInstance = new Logger(name)；//新建logger对象
```



进入构造方法

```java
   protected Logger(string name) {
         super(name);
     }
```



点击进入父类的构造方法
    

```java
 	Category(String name){
         this name = name;
         this.slf4jLogger = LoggerFactory getLogger(name);
         if (this.slf4jLogger instanceof LocationAwareLogger) {
             this.locationAwareLogger = (LocationAwareLogger)this.slf4jLogger;
         }
     }
```


在这个Category构造方法中:

```java
 this.slf4jLogger = LoggerFactory.getLogger(name);
```

LoggerFactory来自于org.slf4j,这就证明了getLogger是来自slf4j的。