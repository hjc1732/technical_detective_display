# Redisson

**测试项目地址**

gitee:[https://gitee.com/hujincheng1732/redisson_test.git](https://gitee.com/hujincheng1732/redisson_test.git)

**推荐redis客户端工具**

工具：[insight 更推荐(可以使用客户端发布订阅消息)](https://redis.io/docs/ui/insight/)、 [RedisDesktopManager (opens new window)](https://github.com/qishibo/AnotherRedisDesktopManager/releases)

## 1 添加依赖

```xml
<!--工具包--> 
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.9</version>
</dependency>
<!--json转换--> 
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>2.0.28</version>
</dependency>
<!--配置文件--> 
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
<!--redisson与springboot集成的starter--> 
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.23.4</version>
</dependency>
```

## 2 添加配置

### 2.1 redisson 连接参数配置

```java
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author hujincheng
 * @description redis 参数配置
 */
@Data
@ConfigurationProperties(prefix = "redis.sdk.config", ignoreInvalidFields = true)
public class RedisClientConfigProperties {

    /**
     * host:ip
     */
    private String host;
    /**
     * 端口
     */
    private int port;
    /**
     * 账密
     */
    private String password;
    /**
     * 设置连接池的大小，默认为64
     */
    private int poolSize = 64;
    /**
     * 设置连接池的最小空闲连接数，默认为10
     */
    private int minIdleSize = 10;
    /**
     * 设置连接的最大空闲时间（单位：毫秒），超过该时间的空闲连接将被关闭，默认为10000
     */
    private int idleTimeout = 10000;
    /**
     * 设置连接超时时间（单位：毫秒），默认为10000
     */
    private int connectTimeout = 10000;
    /**
     * 设置连接重试次数，默认为3
     */
    private int retryAttempts = 3;
    /**
     * 设置连接重试的间隔时间（单位：毫秒），默认为1000
     */
    private int retryInterval = 1000;
    /**
     * 设置定期检查连接是否可用的时间间隔（单位：毫秒），默认为0，表示不进行定期检查
     */
    private int pingInterval = 0;
    /**
     * 设置是否保持长连接，默认为true
     */
    private boolean keepAlive = true;

}

```



### 2.2 redisson 客户端配置

```java
import org.redisson.Redisson;
import org.redisson.api.RTopic;
import org.redisson.api.RedissonClient;
import org.redisson.api.listener.MessageListener;
import org.redisson.config.Config;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import top.tec.annocation.RedisTopic;

/**
 * @author hujincheng
 * @description redisson 客户端配置
 */
@Configuration
@EnableConfigurationProperties(RedisClientConfigProperties.class)
public class RedisClientConfig {

    @Bean("redissonClient")
    public RedissonClient redissonClient(ConfigurableApplicationContext applicationContext, RedisClientConfigProperties properties) {
        Config config = new Config();
        // 根据需要可以设定编解码器；https://github.com/redisson/redisson/wiki/4.-%E6%95%B0%E6%8D%AE%E5%BA%8F%E5%88%97%E5%8C%96
        config.setCodec(new RedisCodec());

        config.useSingleServer()
                .setAddress("redis://" + properties.getHost() + ":" + properties.getPort())
                .setPassword(properties.getPassword())
                .setConnectionPoolSize(properties.getPoolSize())
                .setConnectionMinimumIdleSize(properties.getMinIdleSize())
                .setIdleConnectionTimeout(properties.getIdleTimeout())
                .setConnectTimeout(properties.getConnectTimeout())
                .setRetryAttempts(properties.getRetryAttempts())
                .setRetryInterval(properties.getRetryInterval())
                .setPingConnectionInterval(properties.getPingInterval())
                .setKeepAlive(properties.isKeepAlive())
        ;

        RedissonClient redissonClient = Redisson.create(config);


        //适用于注解式发布订阅(不用可以注释掉,参考 6.2 spring容器注解式实现)
        String[] beanNamesForType = applicationContext.getBeanNamesForType(MessageListener.class);
        for (String beanName : beanNamesForType) {
            MessageListener bean = applicationContext.getBean(beanName, MessageListener.class);
            Class<? extends MessageListener> beanClass = bean.getClass();
            if (beanClass.isAnnotationPresent(RedisTopic.class)) {
                RedisTopic redisTopic = beanClass.getAnnotation(RedisTopic.class);
                RTopic topic = redissonClient.getTopic(redisTopic.topic());
                topic.addListener(String.class, bean);
                ConfigurableListableBeanFactory beanFactory = applicationContext.getBeanFactory();
                beanFactory.registerSingleton(redisTopic.topic(), topic);
            }
        }

        return redissonClient;
    }
}

```

### 2.3 redisson序列化配置

```java
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.ByteBufAllocator;
import io.netty.buffer.ByteBufInputStream;
import io.netty.buffer.ByteBufOutputStream;
import org.redisson.client.codec.BaseCodec;
import org.redisson.client.protocol.Decoder;
import org.redisson.client.protocol.Encoder;

import java.io.IOException;

/**
 * @author hujincheng
 * @description redis 序列化配置
 */
public class RedisCodec extends BaseCodec {

    private final Encoder encoder = in -> {
        ByteBuf out = ByteBufAllocator.DEFAULT.buffer();
        try {
            ByteBufOutputStream os = new ByteBufOutputStream(out);
            JSON.writeJSONString(os, in, SerializerFeature.WriteClassName);
            return os.buffer();
        } catch (IOException e) {
            out.release();
            throw e;
        } catch (Exception e) {
            out.release();
            throw new IOException(e);
        }
    };

    private final Decoder<Object> decoder = (buf, state) -> JSON.parseObject(new ByteBufInputStream(buf), Object.class);

    @Override
    public Decoder<Object> getValueDecoder() {
        return decoder;
    }

    @Override
    public Encoder getValueEncoder() {
        return encoder;
    }

}
```

## 3 服务

### 3.1 接口服务

```java
import org.redisson.api.*;
import org.redisson.api.listener.MessageListener;

import java.util.concurrent.TimeUnit;

/**
 * @author hujincheng
 * @description redis服务
 */

public interface IRedisService {

    /**
     * 设置指定 key 的值
     *
     * @param key   键
     * @param value 值
     */
    <T> void setValue(String key, T value);

    /**
     * 设置指定 key 的值
     *
     * @param key     键
     * @param value   值
     * @param expired 过期时间
     */
    <T> void setValue(String key, T value, long expired);


    /**
     * 设置指定 key 的值
     *
     * @param key     键
     * @param value   值
     * @param expiredTime 过期时间
     * @param timeUnit 过期时间单位
     */
    <T> void setValue(String key, T value, long expiredTime, TimeUnit timeUnit);

    /**
     * 获取指定 key 的值
     *
     * @param key 键
     * @return 值
     */
    <T> T getValue(String key);

    /**
     * 获取队列
     *
     * @param key 键
     * @param <T> 泛型
     * @return 队列
     */
    <T> RQueue<T> getQueue(String key);

    /**
     * 加锁队列
     *
     * @param key 键
     * @param <T> 泛型
     * @return 队列
     */
    <T> RBlockingQueue<T> getBlockingQueue(String key);

    /**
     * 延迟队列
     *
     * @param rBlockingQueue 加锁队列
     * @param <T>            泛型
     * @return 队列
     */
    <T> RDelayedQueue<T> getDelayedQueue(RBlockingQueue<T> rBlockingQueue);

    /**
     * 自增 Key 的值；1、2、3、4
     *
     * @param key 键
     * @return 自增后的值
     */
    long incr(String key);

    /**
     * 指定值，自增 Key 的值；1、2、3、4
     *
     * @param key 键
     * @return 自增后的值
     */
    long incrBy(String key, long delta);

    /**
     * 自减 Key 的值；1、2、3、4
     *
     * @param key 键
     * @return 自增后的值
     */
    long decr(String key);

    /**
     * 指定值，自增 Key 的值；1、2、3、4
     *
     * @param key 键
     * @return 自增后的值
     */
    long decrBy(String key, long delta);


    /**
     * 移除指定 key 的值
     *
     * @param key 键
     */
    void remove(String key);

    /**
     * 判断指定 key 的值是否存在
     *
     * @param key 键
     * @return true/false
     */
    boolean isExists(String key);

    /**
     * 将指定的值添加到集合中
     *
     * @param key   键
     * @param value 值
     */
    void addToSet(String key, String value);

    /**
     * 判断指定的值是否是集合的成员
     *
     * @param key   键
     * @param value 值
     * @return 如果是集合的成员返回 true，否则返回 false
     */
    boolean isSetMember(String key, String value);

    /**
     * 将指定的值添加到列表中
     *
     * @param key   键
     * @param value 值
     */
    void addToList(String key, String value);

    /**
     * 获取列表中指定索引的值
     *
     * @param key   键
     * @param index 索引
     * @return 值
     */
    String getFromList(String key, int index);

    /**
     * 将指定的键值对添加到哈希表中
     *
     * @param key   键
     * @param field 字段
     * @param value 值
     */
    void addToMap(String key, String field, String value);

    /**
     * 获取哈希表中指定字段的值
     *
     * @param key   键
     * @param field 字段
     * @return 值
     */
    String getFromMap(String key, String field);

    /**
     * 将指定的值添加到有序集合中
     *
     * @param key   键
     * @param value 值
     */
    void addToSortedSet(String key, String value);

    /**
     * 获取 Redis 锁（可重入锁）
     *
     * @param key 键
     * @return Lock
     */
    RLock getLock(String key);

    /**
     * 获取 Redis 锁（公平锁）
     *
     * @param key 键
     * @return Lock
     */
    RLock getFairLock(String key);

    /**
     * 获取 Redis 锁（读写锁）
     *
     * @param key 键
     * @return RReadWriteLock
     */
    RReadWriteLock getReadWriteLock(String key);

    /**
     * 获取 Redis 信号量
     *
     * @param key 键
     * @return RSemaphore
     */
    RSemaphore getSemaphore(String key);

    /**
     * 获取 Redis 过期信号量
     * <p>
     * 基于Redis的Redisson的分布式信号量（Semaphore）Java对象RSemaphore采用了与java.util.concurrent.Semaphore相似的接口和用法。
     * 同时还提供了异步（Async）、反射式（Reactive）和RxJava2标准的接口。
     *
     * @param key 键
     * @return RPermitExpirableSemaphore
     */
    RPermitExpirableSemaphore getPermitExpirableSemaphore(String key);

    /**
     * 闭锁
     *
     * @param key 键
     * @return RCountDownLatch
     */
    RCountDownLatch getCountDownLatch(String key);

    /**
     * 布隆过滤器
     *
     * @param key 键
     * @param <T> 存放对象
     * @return 返回结果
     */
    <T> RBloomFilter<T> getBloomFilter(String key);

    /**
     * 获取主题
     * @param topicName
     * @return RTopic
     */
    RTopic getTopic(String topicName);

    /**
     * 发布消息
     */
    <T> void publish(String topicName, T msg);

    /**
     * 订阅主题
     * @param topicName 主题名
     * @param type      消息类型
     * @param listener  监听器
     */
    <T> void subscribeTopic(String topicName, Class<T> type, MessageListener<T> listener);
}

```

### 3.2 Redisson接口服务实现

```java
import org.redisson.api.*;
import org.redisson.api.listener.MessageListener;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * @author hujincheng
 * @description redisson服务实现
 */
@Service("redissonService")
public class RedissonService implements IRedisService {

    @Resource
    private RedissonClient redissonClient;

    @Override
    public <T> void setValue(String key, T value) {
        redissonClient.<T>getBucket(key).set(value);
    }

    @Override
    public <T> void setValue(String key, T value, long expired) {
        RBucket<T> bucket = redissonClient.getBucket(key);
        //bucket.set(value, Duration.ofMillis(expired));
    }

    @Override
    public <T> void setValue(String key, T value, long expiredTime, TimeUnit timeUnit) {
        Duration duration;
        switch (timeUnit) {
            case MILLISECONDS:
                duration = Duration.ofMillis(expiredTime);
                break;
            case SECONDS:
                duration = Duration.ofSeconds(expiredTime);
                break;
            case NANOSECONDS:
                duration = Duration.ofNanos(expiredTime);
                break;
            case MINUTES:
                duration = Duration.ofMinutes(expiredTime);
                break;
            case HOURS:
                duration = Duration.ofHours(expiredTime);
                break;
            case DAYS:
                duration = Duration.ofDays(expiredTime);
                break;
            // default分支处理未知的时间单位
            default:
                throw new IllegalArgumentException("Unsupported TimeUnit: " + timeUnit);
        }

        RBucket<T> bucket = redissonClient.getBucket(key);
        bucket.set(value, expiredTime, timeUnit);
    }

    @Override
    public <T> T getValue(String key) {
        return redissonClient.<T>getBucket(key).get();
    }

    @Override
    public <T> RQueue<T> getQueue(String key) {
        return redissonClient.getQueue(key);
    }

    @Override
    public <T> RBlockingQueue<T> getBlockingQueue(String key) {
        return redissonClient.getBlockingQueue(key);
    }

    @Override
    public <T> RDelayedQueue<T> getDelayedQueue(RBlockingQueue<T> rBlockingQueue) {
        return redissonClient.getDelayedQueue(rBlockingQueue);
    }

    @Override
    public long incr(String key) {
        return redissonClient.getAtomicLong(key).incrementAndGet();
    }

    @Override
    public long incrBy(String key, long delta) {
        return redissonClient.getAtomicLong(key).addAndGet(delta);
    }

    @Override
    public long decr(String key) {
        return redissonClient.getAtomicLong(key).decrementAndGet();
    }

    @Override
    public long decrBy(String key, long delta) {
        return redissonClient.getAtomicLong(key).addAndGet(-delta);
    }

    @Override
    public void remove(String key) {
        redissonClient.getBucket(key).delete();
    }

    @Override
    public boolean isExists(String key) {
        return redissonClient.getBucket(key).isExists();
    }

    @Override
    public void addToSet(String key, String value) {
        RSet<String> set = redissonClient.getSet(key);
        set.add(value);
    }

    @Override
    public boolean isSetMember(String key, String value) {
        RSet<String> set = redissonClient.getSet(key);
        return set.contains(value);
    }

    @Override
    public void addToList(String key, String value) {
        RList<String> list = redissonClient.getList(key);
        list.add(value);
    }

    @Override
    public String getFromList(String key, int index) {
        RList<String> list = redissonClient.getList(key);
        return list.get(index);
    }

    @Override
    public void addToMap(String key, String field, String value) {
        RMap<String, String> map = redissonClient.getMap(key);
        map.put(field, value);
    }

    @Override
    public String getFromMap(String key, String field) {
        RMap<String, String> map = redissonClient.getMap(key);
        return map.get(field);
    }

    @Override
    public void addToSortedSet(String key, String value) {
        RSortedSet<String> sortedSet = redissonClient.getSortedSet(key);
        sortedSet.add(value);
    }

    @Override
    public RLock getLock(String key) {
        return redissonClient.getLock(key);
    }

    @Override
    public RLock getFairLock(String key) {
        return redissonClient.getFairLock(key);
    }

    @Override
    public RReadWriteLock getReadWriteLock(String key) {
        return redissonClient.getReadWriteLock(key);
    }

    @Override
    public RSemaphore getSemaphore(String key) {
        return redissonClient.getSemaphore(key);
    }

    @Override
    public RPermitExpirableSemaphore getPermitExpirableSemaphore(String key) {
        return redissonClient.getPermitExpirableSemaphore(key);
    }

    @Override
    public RCountDownLatch getCountDownLatch(String key) {
        return redissonClient.getCountDownLatch(key);
    }

    @Override
    public <T> RBloomFilter<T> getBloomFilter(String key) {
        return redissonClient.getBloomFilter(key);
    }

    @Override
    public RTopic getTopic(String topicName) {
        return redissonClient.getTopic(topicName);
    }

    @Override
    public <T> void publish(String topicName, T msg) {
        RTopic topic = redissonClient.getTopic(topicName);
        topic.publish(msg);
    }

    @Override
    public <T> void subscribeTopic(String topicName, Class<T> type, MessageListener<T> listener) {
        RTopic topic = redissonClient.getTopic(topicName);
        topic.addListener(type,listener);
    }
}

```

## 4 yml配置

```yml
redis:
  sdk:
    config:
      host: localhost
      port: 6379
#      password: 123456
      pool-size: 10
      min-idle-size: 5
      idle-timeout: 30000
      connect-timeout: 5000
      retry-attempts: 3
      retry-interval: 1000
      ping-interval: 60000
      keep-alive: true

```

## 5 基础使用(设置值/获取值/锁)

```java
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.redisson.RedissonMultiLock;
import org.redisson.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import top.tec.listener.AnnoTopicListener01;
import top.tec.listener.RedisServiceTopicListener;
import top.tec.service.IRedisService;

import javax.annotation.Resource;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@SpringBootTest
class RedissonApplicationTests {

    Logger log = LoggerFactory.getLogger(RedissonApplicationTests.class);

    @Resource
    private IRedisService redisService;
    public static String KEY = "test";

    @Resource
    private RedisServiceTopicListener redisServiceTopicListener;

    @Resource
    private RTopic annoTopic;

    @Test
    void setValue() {
            redisService.setValue(KEY, 1000);
    }

    @Test
    void setExpireValue() {
        redisService.setValue(KEY, 1000, 30, TimeUnit.SECONDS);
    }

    @Test
    void getValue() {
        if(redisService.isExists(KEY)){
            System.out.println("key存在");
            Integer value = redisService.getValue(KEY);
            System.out.println(value);
        }else {
            System.out.println("key不存在");
        }
    }

    @Test
    void remove(){
        redisService.remove(KEY);
    }


    /**
     * 可重入锁，加锁和解锁。Redisson的分布式可重入锁RLock Java对象实现了java.util.concurrent.locks.Lock接口，同时还支持自动过期解锁。
     * lock.lock();
     * lock.lock(10, TimeUnit.SECONDS);
     * lock.tryLock(3, 10, TimeUnit.SECONDS);
     * lock.lockAsync();
     * lock.lockAsync(10, TimeUnit.SECONDS);
     * Future<Boolean> res = lock.tryLockAsync(3, 10, TimeUnit.SECONDS);
     */
    @Test
    public void test_ReentrantLock() throws Exception {
        RLock lock = redisService.getLock("");
        try {
            // 1. 最常见的使用方法
            lock.lock();

        } finally {
            lock.unlock();
        }
    }



    /**
     * 公平锁；保证了当多个Redisson客户端线程同时请求加锁时，优先分配给先发出请求的线程。
     * fairLock.lock();
     * fairLock.lock(10, TimeUnit.SECONDS); - 自动解锁，无需unlock方法手动解锁
     * fairLock.tryLock(100, 10, TimeUnit.SECONDS); - 尝试加锁，waitTime = 等待时间、leaseTime = 过期自动解锁。根据拿到锁的结果做业务
     * fairLock.lockAsync(); - 异步加锁
     * fairLock.lockAsync(10, TimeUnit.SECONDS); - 异步加锁，自动解锁
     * Future<Boolean> res = fairLock.tryLockAsync(3, 10, TimeUnit.SECONDS); - 异步加锁，尝试加锁，自动解锁
     */
    @Test
    public void test_fairLock() throws InterruptedException {
        RLock fairLock = redisService.getFairLock("");
        try {
            // 1. 普通加锁
            fairLock.lock();

            // 2. 自动解锁，无需unlock方法手动解锁
            fairLock.lock(10, TimeUnit.SECONDS);

            // 3. 尝试加锁，waitTime = 等待时间、leaseTime = 过期自动解锁
            boolean res = fairLock.tryLock(100, 10, TimeUnit.SECONDS);
        } finally {
            fairLock.unlock();
        }
    }


    /**
     * RedissonMultiLock、RedissonRedLock 都可以将不同实例的多个 RLock 对象关联为一个联锁
     */
    @Test
    public void test_multiLock() throws InterruptedException {
        // redissonService，可以是3个不同的客户端实例，如；redissonService01、redissonService02、redissonService03
        RLock lock1 = redisService.getLock("lock1");
        RLock lock2 = redisService.getLock("lock2");
        RLock lock3 = redisService.getLock("lock3");

        RedissonMultiLock multiLock = new RedissonMultiLock(lock1, lock2, lock3);

        // 联锁
        try {
            multiLock.lock();

            boolean res = multiLock.tryLock(100, 10, TimeUnit.SECONDS);
        } finally {
            multiLock.unlock();
        }

        // 红锁
        RedissonMultiLock redLock = new RedissonMultiLock(lock1, lock2, lock3);
        try {
            redLock.lock();

            boolean res = redLock.tryLock(100, 10, TimeUnit.SECONDS);
        } finally {
            redLock.unlock();
        }
    }


    /**
     * 读写锁
     */
    @Test
    public void test_readWriteLock() throws InterruptedException {
        RReadWriteLock lock = redisService.getReadWriteLock("");

        lock.readLock().lock();
        lock.writeLock().lock();

        lock.readLock().lock(10, TimeUnit.SECONDS);
        lock.writeLock().lock(10, TimeUnit.SECONDS);

        lock.readLock().tryLock(100, 10, TimeUnit.SECONDS);
        lock.writeLock().tryLock(100, 10, TimeUnit.SECONDS);

        lock.writeLock().unlock();
        lock.readLock().unlock();
    }

    /**
     * 信号量
     */
    @Test
    public void test_semaphore() throws InterruptedException {
        RSemaphore rSemaphore = redisService.getSemaphore("");

        rSemaphore.acquire();
        rSemaphore.acquire(10);
        rSemaphore.tryAcquire();
        rSemaphore.tryAcquire(10);
        rSemaphore.tryAcquire(100, 10, TimeUnit.SECONDS);

        rSemaphore.tryAcquireAsync();
        rSemaphore.release();
        rSemaphore.release(10);

        rSemaphore.releaseAsync(10);
    }

    @Test
    public void test_getPermitExpirableSemaphore() throws InterruptedException {
        RPermitExpirableSemaphore semaphore = redisService.getPermitExpirableSemaphore("");
        String acquireId = semaphore.acquire();
        semaphore.acquire(10);
        semaphore.tryAcquire();
        semaphore.tryAcquire(10);
        semaphore.tryAcquire(100, 10, TimeUnit.SECONDS);

        semaphore.tryAcquireAsync();

        semaphore.release(acquireId);
    }

    @Test
    public void test_getCountDownLatch() throws InterruptedException {
        RCountDownLatch latch = redisService.getCountDownLatch("");
        latch.trySetCount(1);
        latch.await();
    }

    @Test
    public void test_getBloomFilter() {
        // 创建一个布隆过滤器，使用默认的误判率和预计元素数量
        RBloomFilter<String> bloomFilter = redisService.getBloomFilter("xfg-dev-tech-bloom");
        // 初始化布隆过滤器，设置预计元素数量为10000，误判率为0.03
        bloomFilter.tryInit(10000, 0.03);
        // 添加元素到布隆过滤器
        bloomFilter.add("1");
        bloomFilter.add("2");
        // 验证元素是否存在
        log.info("测试结果 {}", bloomFilter.contains("1"));
        log.info("测试结果 {}", bloomFilter.contains("3"));
    }

    @Test
    public void test_getQueue() throws InterruptedException {
        RQueue<String> queue = redisService.getQueue("hjc-dev-tech-queue");

        new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                queue.add(RandomStringUtils.randomNumeric(4));
            }
        }).start();

        new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                log.info("测试结果 {}", queue.poll());
            }
        }).start();

        // 等待
        new CountDownLatch(1).await();
    }

    /**
     * 延迟队列场景应用；https://mp.weixin.qq.com/s/jJ0vxdeKXHiYZLrwDEBOcQ
     */
    @Test
    public void test_getDelayedQueue() throws InterruptedException {
        RBlockingQueue<Object> blockingQueue = redisService.getBlockingQueue("hjc-dev-tech-task");
        RDelayedQueue<Object> delayedQueue = redisService.getDelayedQueue(blockingQueue);

        new Thread(() -> {
            try {
                while (true){
                    Object take = blockingQueue.take();
                    log.info("测试结果 {}", take);
                    Thread.sleep(10);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();

        int i = 0;
        while (true){
            delayedQueue.offerAsync("测试" + ++i, 100L, TimeUnit.MILLISECONDS);
            Thread.sleep(1000L);
        }

    }

}

```

## 6 发布订阅消息

### 6.1 redisService实现

#### 6.1.1 定义监听器

```java
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.listener.MessageListener;
import org.springframework.stereotype.Service;

/**
 * @author hujincheng
 * @description RedisServe实现的监听器
 * @create 2024-07-09 16:05
 */
@Service
@Slf4j
public class RedisServiceTopicListener implements MessageListener<String> {

    @Override
    public void onMessage(CharSequence channel, String msg) {
        log.info("监听消息(Redis 发布/订阅): {}", msg);
    }
}

```

####  6.2.2  实现订阅发布

```java
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.redisson.RedissonMultiLock;
import org.redisson.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import top.tec.listener.AnnoTopicListener01;
import top.tec.listener.RedisServiceTopicListener;
import top.tec.service.IRedisService;

import javax.annotation.Resource;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@SpringBootTest
class RedissonApplicationTests {

    Logger log = LoggerFactory.getLogger(RedissonApplicationTests.class);

    @Resource
    private IRedisService redisService;
    public static String KEY = "test";

    @Resource
    private RedisServiceTopicListener redisServiceTopicListener;


    /**
     * 第一种发布订阅实现,使用redisService
     *      使用:
     *          只需要调用redisService的publish与subscribeTopic方法即可
     */

    @Test
    void test_listener() throws InterruptedException {
        // 获取RTopic对象
        int i = 0;
        while (true){
            Thread.sleep(1000);
            redisService.publish("myTopic","测试消息"+(++i));
        }
    }

    @Test
    public void test_sub() throws InterruptedException {
        redisService.subscribeTopic("myTopic",String.class, redisServiceTopicListener);

        Thread.sleep(100000L);
    }

}

```

### 6.2 spring容器注解式实现

#### 6.2.1 定义注解@RedisTopic

```java
/**
 * @author hujincheng
 * @description RedisTopic 自动加载主题注解
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
public @interface RedisTopic {

    String topic() default "";

}
```

#### 6.2.2 redisson客户端配置时添加获取注解并获取监听器，将注解中的topicName与监听器以key与value的形式存储在spring容器中

```java
/**
 * @author hujincheng
 * @description redisson 客户端配置
 */
@Configuration
@EnableConfigurationProperties(RedisClientConfigProperties.class)
public class RedisClientConfig {

    @Bean("redissonClient")
    public RedissonClient redissonClient(ConfigurableApplicationContext applicationContext, RedisClientConfigProperties properties) {
        Config config = new Config();
        // 根据需要可以设定编解码器；https://github.com/redisson/redisson/wiki/4.-%E6%95%B0%E6%8D%AE%E5%BA%8F%E5%88%97%E5%8C%96
        config.setCodec(new RedisCodec());

        config.useSingleServer()
                .setAddress("redis://" + properties.getHost() + ":" + properties.getPort())
                .setPassword(properties.getPassword())
                .setConnectionPoolSize(properties.getPoolSize())
                .setConnectionMinimumIdleSize(properties.getMinIdleSize())
                .setIdleConnectionTimeout(properties.getIdleTimeout())
                .setConnectTimeout(properties.getConnectTimeout())
                .setRetryAttempts(properties.getRetryAttempts())
                .setRetryInterval(properties.getRetryInterval())
                .setPingConnectionInterval(properties.getPingInterval())
                .setKeepAlive(properties.isKeepAlive())
        ;

        RedissonClient redissonClient = Redisson.create(config);


        //适用于注解式发布订阅(不用可以注释掉,参考 6.2 spring容器注解式实现)
        String[] beanNamesForType = applicationContext.getBeanNamesForType(MessageListener.class);
        for (String beanName : beanNamesForType) {
            MessageListener bean = applicationContext.getBean(beanName, MessageListener.class);
            Class<? extends MessageListener> beanClass = bean.getClass();
            if (beanClass.isAnnotationPresent(RedisTopic.class)) {
                RedisTopic redisTopic = beanClass.getAnnotation(RedisTopic.class);
                RTopic topic = redissonClient.getTopic(redisTopic.topic());
                topic.addListener(String.class, bean);
                ConfigurableListableBeanFactory beanFactory = applicationContext.getBeanFactory();
                beanFactory.registerSingleton(redisTopic.topic(), topic);
            }
        }

        return redissonClient;
    }
}
```

#### 6.2.3 定义监听器（重要的是添加注解@RedisTopic）

```java
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.listener.MessageListener;
import org.springframework.stereotype.Service;
import top.tec.annocation.RedisTopic;

/**
 * @author hujincheng
 * @description 注解式实现的监听器
 * @create 2024-07-09 16:05
 */
@Service
@Slf4j
@RedisTopic(topic = "annoTopic")
public class AnnoTopicListener01 implements MessageListener<String> {

    @Override
    public void onMessage(CharSequence channel, String msg) {
        log.info("监听消息(Redis 发布/订阅): {}", msg);
    }
}
```

#### 6.2.4 使用

```java
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.redisson.RedissonMultiLock;
import org.redisson.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import top.tec.listener.AnnoTopicListener01;
import top.tec.listener.RedisServiceTopicListener;
import top.tec.service.IRedisService;

import javax.annotation.Resource;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@SpringBootTest
class RedissonApplicationTests {

    Logger log = LoggerFactory.getLogger(RedissonApplicationTests.class);

    @Resource
    private IRedisService redisService;
    public static String KEY = "test";

    //引入主题名称对应的RTopic
    @Resource
    private RTopic annoTopic;


    @Test
    public void test_sub() throws InterruptedException {
        redisService.subscribeTopic("myTopic",String.class, redisServiceTopicListener);

        Thread.sleep(100000L);
    }


    /**
     * 第二种发布订阅方式：
     * 使用spring容器把每一个定义了RedisTopic的主题以主题名字为key,监听器为value重新注册到容器中
     * 使用时直接引入对应的主题名字的RTopic即可实现对Topic的发布与订阅
     *
     * 使用时 (首先在加载redisson时需要定义注解的使用,获取带有注解的监听器并重新注册到容器中)
     *      只考虑定义监听器 + @RedisTopic注解
     *      使用topicName从容器中获取实例，publish 消息
     */

    @Test
    void test_sendAndListener() throws InterruptedException {
        // 获取RTopic对象
        int i = 0;
        while (true){
            Thread.sleep(1000);
            annoTopic.publish("测试消息"+(++i));
        }
    }
}
```

