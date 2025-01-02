# 6、Callable接口

## 1、特点

```java
- 为了实现Runable，需要实现不返回任何内容的run()方法，而对于Callable，需要实现在完成时返回结果的call()方法
- call()方法可以引发异常，而run()则不能
- 为实现Callable而必须重写call方法

```


## 2、创建

```java
package com.hjc.day03;

import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class CallableFunctionUse {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        //Callable实现类创建
        FutureTask<String> stringFutureTask = new FutureTask<>(new MyC());
        stringFutureTask.run();
        String s = stringFutureTask.get();
        System.out.println(s);

        //lambda创建
        FutureTask<String> stringFutureTask1 = new FutureTask<>(() -> {
            return UUID.randomUUID().toString();
        });

        stringFutureTask1.run();
        System.out.println("stringFutureTask1.get() = " + stringFutureTask1.get());
        
        //new Thread创建线程
    	FutureTask<String> stringFutureTask3 = new FutureTask<>(() -> {
            return UUID.randomUUID().toString();
        });
        new Thread(stringFutureTask3,"aaa").start();
        
        //isDone(),判断线程是否完成
         while (!stringFutureTask3.isDone()){
            System.out.println("等待中...");
        }
        System.out.println("stringFutureTask3.get() = " + stringFutureTask3.get());

    }
}

class MyC implements Callable<String> {

    @Override
    public String call() throws Exception {
        return UUID.randomUUID().toString();
    }
}

```

