# APM(性能监控系统)与Javaagent以及Javassist

## 1 Apm(性能监控系统)

### 1.1 什么是APM

**帮助理解系统行为、用于分析性能问题的工具，以便发生故障的时候，能够快速定位和解决问题，这就是APM系统，全称是（Application Performance Monitor，当然也有叫 Application Performance Management tools**

![image-20240716134636206](.\pic\image-20240716134636206.png)

### 1.2 Apm解决什么问题

![image-20240716134653641](.\pic\image-20240716134653641.png)

### 1.3 商用Apm发展历史

![image-20240716134754158](.\pic\image-20240716134754158.png)

### 1.4 商用APM现状

![image-20240716134857367](.\pic\image-20240716134857367.png)

### 1.5 各大公司性能解决方案

![image-20240716135016727](.\pic\image-20240716135016727.png)

### 1.6 调用链

#### 1.6.1 阿里鹰眼

![image-20240716135222419](.\pic\image-20240716135222419.png)

#### 1.6.2 zipkin

![image-20240716135304071](.\pic\image-20240716135304071.png)

#### 1.6.3 小米open-Falcon

![image-20240716135327066](.\pic\image-20240716135327066.png)

### 1.7 怎么为公司选择合适的性能解决方案

#### 1.7.1 当前企业监控目标与需求

![image-20240716135456763](.\pic\image-20240716135456763.png)

#### 1.7.2 监控系统技术上解决什么问题

![image-20240716135541504](.\pic\image-20240716135541504.png)

#### 1.7.3 可选的解决方案

![image-20240716135559608](.\pic\image-20240716135559608.png)

### 1.8 建议APM解决方案

![image-20240716140639472](.\pic\image-20240716140639472.png)

### 1.9 插桩采集器的优势

![image-20240716140940335](.\pic\image-20240716140940335.png)

### 1.10 侵入式监控系统实施过程

结论:实施协调成本远大于开发成本

![image-20240716141024007](.\pic\image-20240716141024007.png)

### 1.11 非侵入式监控系统实施过程

实施成本最小化,整个过程只需要运维人员配合

![image-20240716141304293](.\pic\image-20240716141304293.png)

### 1.12 APM系统架构

#### 1.12.1 架构

![image-20240716141429463](.\pic\image-20240716141429463.png)

#### 1.12.2 当前架构的优缺点

![image-20240716141812379](.\pic\image-20240716141812379.png)

#### 1.12.3 扩展

![image-20240716141827566](.\pic\image-20240716141827566.png)

## 2 Javaagent与Javassist的使用

### 2.1 javaagent是什么

![image-20240716144124567](.\pic\image-20240716144124567.png)

### 2.2 javaagent使用说明

![image-20240716144145276](.\pic\image-20240716144145276.png)

### 2.3 javassist是什么

![image-20240716151725882](.\pic\image-20240716151725882.png)

### 2.4 javassist的作用

![image-20240716151743408](.\pic\image-20240716151743408.png)

### 2.5 javassist的使用流程

![image-20240716151933114](.\pic\image-20240716151933114.png)

### 2.6 使用javassist

#### 2.6.1 添加依赖

```xml
<dependency>
    <groupId>javassist</groupId>
    <artifactId>javassist</artifactId>
    <version>3.12.1.GA</version>
    <type>jar</type>
</dependency>
```

#### 2.6.2  javassist实现新增一个类，并添加方法

```java
package top.tec;

import javassist.*;


public class JavassitDemo {
    public static void main(String[] args) throws NotFoundException, CannotCompileException, InstantiationException, IllegalAccessException {
        ClassPool pool = new ClassPool(true);

        pool.insertClassPath(new LoaderClassPath(JavassitDemo.class.getClassLoader()));

        //创建一个类
        CtClass targetClass = pool.makeClass("top.tec.hello");

        targetClass.addInterface(pool.get(IHello.class.getName()));

        CtClass returnType = pool.get(void.class.getName());

        String mname = "sayHello";
        CtClass[] parameters = new CtClass[]{pool.get(String.class.getName())};


        CtMethod method = new CtMethod(returnType, mname, parameters, targetClass);

        String src = "{System.out.println(\"hello \" + $1);}";
        method.setBody(src);

        targetClass.addMethod(method);


        Class aClass = targetClass.toClass();
        IHello hello = (IHello) aClass.newInstance();
        hello.sayHello("小朋友");

    }



    public interface IHello{
        void sayHello(String name);
    }
}

```

### 2.7 javassist特殊符号

![image-20240716163236488](.\pic\image-20240716163236488.png)

![image-20240716163832786](.\pic\image-20240716163832786.png)

### 2.8 javassist练手(实现输入方法运行时间)

#### 2.8.1 添加依赖

```xml
<dependency>
    <groupId>javassist</groupId>
    <artifactId>javassist</artifactId>
    <version>3.12.1.GA</version>
    <type>jar</type>
</dependency>
```



#### 2.8.2 工具类

```java
package top.tec;

/**
 * @author hujincheng
 * @description StringUtil
 * @create 2024-07-16 17:20
 */
public class StringUtil {

    /**
     * 添加一百个字符
     */
    public static String addSleep100(int num) {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < num; i++) {
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            str.append(i);
        }
        return str.toString();
    }


    public static String add100(int num) {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < num; i++) {
            str.append(i);
        }
        return str.toString();
    }

    public static void main(String[] args) {
        long begin = System.nanoTime();
        addSleep100(5);
        System.out.println("sleep " +(System.nanoTime()-begin));
        long be = System.nanoTime();
        add100(5);
        System.out.println("nosleep " +(System.nanoTime()-be));
    }
}

```

#### 2.8.3 Javassist实现对方法添加运行时间

```java

    public static void main(String[] args) throws NotFoundException, CannotCompileException {

        ClassPool pool = new ClassPool(true);

        CtClass ctClass = pool.get("top.tec.StringUtil");

        CtMethod add100 = ctClass.getDeclaredMethod("add100");
        CtMethod addSleep100 = ctClass.getDeclaredMethod("addSleep100");


        CtMethod copyMethod = CtNewMethod.copy(add100, add100.getName() + "$agent", ctClass, null);
        CtMethod sleepCopyMethod = CtNewMethod.copy(addSleep100, addSleep100.getName() + "$agent", ctClass, null);
        ctClass.addMethod(copyMethod);
        ctClass.addMethod(sleepCopyMethod);


        //long begin = System.nanoTime();
        //long end = System.nanoTime();
        //long time = end - begin;
        //System.out.println(time);


        String add100Body = "{" +
                " long begin = System.nanoTime();" +
                " Object obj = " + add100.getName() + "$agent($$);" +
                " long end = System.nanoTime();" +
                " long time = end - begin;" +
                " System.out.println(\"nosleep \"+time);" +
                " return ($r)obj;" +
                "}";
        add100.setBody(add100Body);

        String sleepAdd100Body = "{" +
                " long begin = System.nanoTime();" +
                " Object obj = " + addSleep100.getName() + "$agent($$);" +
                " long end = System.nanoTime();" +
                " long time = end - begin;" +
                " System.out.println(\"sleep \"+time);" +
                " return ($r)obj;" +
                "}";
        addSleep100.setBody(sleepAdd100Body);

        ctClass.toClass();

        StringUtil.addSleep100(5);
        StringUtil.add100(5);

    }
```

#### 2.8.4 目录结构

![image-20240716175130008](.\pic\image-20240716175130008.png)

## 3 项目采集

### 3.1 流程

![image-20240717102459809](.\pic\image-20240717102459809.png)


![image-20240717103316581](.\pic\image-20240717103316581.png)



### 3.2 类图

![image-20240717104028944](.\pic\image-20240717104028944.png)

![image-20240717103841684](.\pic\image-20240717103841684.png)

### 3.3 Service采集

![image-20240717104718005](.\pic\image-20240717104718005.png)



#### 3.3.1 新建springboot项目-->添加依赖

```xml
<dependencies>
	<!--字节码插装依赖 javassist-->
    <dependency>
        <groupId>org.javassist</groupId>
        <artifactId>javassist</artifactId>
        <version>3.30.2-GA</version>
    </dependency>
    	<!--web依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```



#### 3.3.1 编写顶层Collect采集接口，用于方便扩展采集什么地方(如Service，Controller，Redis，等)


```java
/**
 * @author hujincheng
 * @description Collect 收集器
 * @create 2024-07-17 10:59
 */
public interface Collect {

    /**
     * 判读是否为采集的目标
     */
    Boolean isTarget(String className , ClassLoader loader, CtClass ctClass);

    /**
     * 转换
     */
    byte[] transform(ClassLoader loader,String className, byte[] classFileBuffer, CtClass ctClass);
}
```



#### 3.3.2 实现service采集的isTarget方法，判断是否采集的是Service层

```java
package top.tec.agent.impl;

import javassist.CtClass;
import top.tec.agent.Collect;

import java.util.Arrays;

/**
 * @author hujincheng
 * @description StringServiceCollect service层收集器
 * @create 2024-07-17 11:02
 */
public class StringServiceCollect implements Collect {
    public static StringServiceCollect INSTANCE = new StringServiceCollect();
    @Override
    public Boolean isTarget(String className, ClassLoader loader, CtClass ctClass) {
        try {
            Object[] annotations = ctClass.getAnnotations();
            return Arrays.stream(annotations)
                    .anyMatch(annotation -> annotation.toString()
                            .startsWith("@org.springframework.stereotype.Service")
                    );

        } catch (ClassNotFoundException e) {
            System.err.println(e.getMessage());
        }


        return false;
    }

    @Override
    public byte[] transform(ClassLoader loader, String className, byte[] classFileBuffer, CtClass ctClass) {
        return new byte[0];
    }
}

```

#### 3.3.4 测试

##### 3.3.4.1 新增测试Service

```java
package top.tec.test;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

/**
 * @author hujincheng
 * @description TestService
 * @create 2024-07-17 11:07
 */
@Service
public class TestService {
    public void test()
    {
        System.out.println("test");
    }
}

```

##### 3.3.4.2 单例测试

```java
@SpringBootTest
class ApmEasyAgentApplicationTests {

    @Test
    void contextLoads() throws NotFoundException {
        String className = TestService.class.getName();
        ClassLoader classLoader = TestService.class.getClassLoader();
        ClassPool pool = new ClassPool(true);
        CtClass ctClass = pool.get(className);
        Boolean target = StringServiceCollect.INSTANCE.isTarget(className, classLoader, ctClass);
        System.out.println(target);
    }
}

//测试结果  -->true

//把采集的TestService的@Service改为@Controller
//测试结果 	-->false

//结果正确,表示采集的目标正确
```



















