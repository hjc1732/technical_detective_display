# 2、Lock接口

## 1、synchronized关键字

### 1、卖票小程序

```java
package com.hjc;

public class Main {
    public static void main(String[] args) {
        Ticket ticket = new Ticket();
        new Thread(() -> {
            for (int i = 0; i < 30; i++) {
                ticket.sale();
            }
        }, "张三").start();

        new Thread(() -> {
            for (int i = 0; i < 30; i++) {
                ticket.sale();
            }
        }, "李四").start();

        new Thread(() -> {
            for (int i = 0; i < 30; i++) {
                ticket.sale();
            }
        }, "王五").start();
    }
}

class Ticket {
    private Integer number = 30;

    //卖票接口
    public synchronized void sale() {
        if (number > 0) {
            number--;
            System.out.println(Thread.currentThread().getName() + "卖了第一张票剩余" + number + "张票");
        }

    }
}

```



## 2、lock接口

### 1、lock下的实现类

[//]: # (**![image-20240107215005400]&#40;/_pic\image-20240107215005400.png&#41;**)

#### 1、ReentrantLock(可重入锁)

可重入锁就是当前线程获取到锁，在当前线程中可以再次获取到该线程的锁而不会出现死锁现象

synchronized与ReentrantLock都是可重入锁



ReentrantLock实现买票小程序

```
package com.hjc;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class LockStudy {
    public static void main(String[] args) {
        LTicket ticket = new LTicket();
        new Thread(() -> {
            for (int i = 0; i < 30; i++) {
                ticket.sale();
            }
        }, "张三").start();

        new Thread(() -> {
            for (int i = 0; i < 30; i++) {
                ticket.sale();
            }
        }, "李四").start();

        new Thread(() -> {
            for (int i = 0; i < 30; i++) {
                ticket.sale();
            }
        }, "王五").start();
    }
}
class LTicket {
    private Integer number = 30;

    //使用重入锁
    public final ReentrantLock reentrantLock = new ReentrantLock();

    //卖票接口
    public  void sale() {
        //加可重入锁
        reentrantLock.lock();
        try {
            if (number > 0) {
                number--;
                System.out.println(Thread.currentThread().getName() + "卖了第一张票剩余" + number + "张票");
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            //解锁可重入锁
            reentrantLock.unlock();
        }
    }
}

```

### 2、synchronized与lock区别

1、synchronized会自动获取锁和释放锁，lock不会自动获取或释放，都需要手动

2、synchronized发生异常会自动释放锁，lock如果没有try...catch...finally异常处理，即没有执行unlock方法，则会出现死锁

3、lock可以让等待锁的线程响应中断，而synchronized却不行，使用synchronized时，等待的线程会一直等待下去

4、通过lock可以知道有没有成功获取锁，而synchronized无法办到

5、lock可以提高多个线程进行读操作的效率

**6、如果竞争的资源比较强，lock的性能远高于synchronized**
