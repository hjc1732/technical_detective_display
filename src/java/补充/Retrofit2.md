# Retrofit2
## 资料引用
> **okhttp**
> 
```component VPCard
title: okHttp学习-Bilibili
desc: 哔哩哔哩
logo: https://www.hjcwzx.top/logo.png
link: https://www.bilibili.com/video/BV1C44y1f7vP/?spm_id_from=333.337.search-card.all.click&vd_source=1138c9182cfae312f30e6b30a5429b05
background: rgba(253, 230, 138, 0.15)
```
```component VPCard
title: okHttp学习-CSDN
desc: CSDN
logo: https://www.hjcwzx.top/logo.png
link: https://blog.csdn.net/weixin_45648614/article/details/104381825?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-0-104381825-blog-125157816.235^v43^pc_blog_bottom_relevance_base8&spm=1001.2101.3001.4242.1&utm_relevant_index=3
background: rgba(253, 230, 138, 0.15)
```
```component VPCard
title: Okhttp3基本使用
desc: 简书
logo: https://www.hjcwzx.top/logo.png
link: https://www.jianshu.com/p/da4a806e599b
background: rgba(253, 230, 138, 0.15)
```
```component VPCard
title: Okhttp3源码分析
desc: 简书
logo: https://www.hjcwzx.top/logo.png
link: https://www.jianshu.com/p/b0353ed71151
background: rgba(253, 230, 138, 0.15)
```

```component VPCard
title: OkHttp3架构分析
desc: 简书
logo: https://www.hjcwzx.top/logo.png
link: https://www.jianshu.com/p/9deec36f2759
background: rgba(253, 230, 138, 0.15)
```

[//]: # (> [okHttp学习-Bilibili]&#40;https://www.bilibili.com/video/BV1C44y1f7vP/?spm_id_from=333.337.search-card.all.click&vd_source=1138c9182cfae312f30e6b30a5429b05&#41;)

[//]: # (>)

[//]: # (> [okHttp学习-CSDN]&#40;https://blog.csdn.net/weixin_45648614/article/details/104381825?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-0-104381825-blog-125157816.235^v43^pc_blog_bottom_relevance_base8&spm=1001.2101.3001.4242.1&utm_relevant_index=3&#41;)

[//]: # (>)

[//]: # (> [Okhttp3基本使用]&#40;https://www.jianshu.com/p/da4a806e599b&#41;)

[//]: # (>)

[//]: # (> [Okhttp3源码分析]&#40;https://www.jianshu.com/p/b0353ed71151&#41;)

[//]: # (>)

[//]: # (> [OkHttp3架构分析]&#40;https://www.jianshu.com/p/9deec36f2759&#41;)

> **Retrofit2**
> 
> [Retrofit2官网地址](https://square.github.io/retrofit/)
> 
> [Retrofit2 初探：入门及其使用 完全解析-CSDN](https://blog.csdn.net/shouban1459/article/details/77453299?ops_request_misc=&request_id=&biz_id=102&utm_term=Retrofit2&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-77453299.142^v99^pc_search_result_base1&spm=1018.2226.3001.4187)
>
> [Retrofit2.0使用详解-CSDN](https://blog.csdn.net/my_rabbit/article/details/74331688?ops_request_misc=&request_id=&biz_id=102&utm_term=Retrofit2&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-74331688.142^v99^pc_search_result_base1&spm=1018.2226.3001.4187)
>
> [深度详解Retrofit2使用-CSDN](https://blog.csdn.net/zxw136511485/article/details/78589732?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_utm_term~default-1-78589732-blog-77453299.235^v43^pc_blog_bottom_relevance_base9&spm=1001.2101.3001.4242.2&utm_relevant_index=4)



## okHttp3
### 添加依赖

```xml
    <dependency>
        <groupId>com.squareup.okhttp3</groupId>
        <artifactId>okhttp</artifactId>
        <version>4.9.1</version>
    </dependency>
```



### 客户端代码

```java
package com.hjc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@SpringBootApplication
@RestController
public class Retrofit2SpringbootWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(Retrofit2SpringbootWebApplication.class, args);
    }

    @GetMapping("/okhttp_test_get")
    public String get(){
        return "get请求数据";
    }

    @GetMapping("/okhttp_test_get_header")
    public String getNeedHeader(@RequestHeader(value = "HJC" ,required = true,defaultValue = "moRen") String a){
        return "get请求数据"+a;
    }

    @GetMapping("/okhttp_test_get_param")
    public String getParam(@RequestParam("param0") String param0,@RequestParam("param1") String param1){
        return "get请求数据"+param0+","+param1;
    }

    @PostMapping("/okhttp_test_post")
    public People post(@RequestBody People people){
        people.setName(people.getName()+"处理完成...");
        return people;
    }

    @PutMapping("/okhttp_test_put")
    public String upload(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String str = bufferedReader.readLine();
        return str;
    }

    @DeleteMapping("/okhttp_test_delete/{id}")
    public String delete(@PathVariable Integer id){
        return "编号为: "+id+"的数据即将被删除";
    }

}

class People{
    String name;

    public People() {
    }

    public People(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "People{" +
                "name='" + name + '\'' +
                '}';
    }
}
```


### okHttp发送get请求测试百度

```java
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();
    
        Request request = new Request.Builder()
        .url("https://www.baidu.com")
        .get()  //如果没有指定，默认是get请求
        .build();
    
        Response response = client.newCall(request).execute();
    
        System.out.println("headers=========>"+response.headers());
        System.out.println("status=========>"+response.code());
        System.out.println("body=========>"+ Objects.requireNonNull(response.body()).string());
    
        }
```



### okHttp发送get请求测试本地

```java
    public static final String API = "http://localhost:8080/";
    public static final String OKHTTP_TEST_GET = "okhttp_test_get";
    public static void getPure() throws IOException {
        OkHttpClient client = new OkHttpClient();
    
        Request request = new Request.Builder()
        .url(API+OKHTTP_TEST_GET_HEADER)
        .get()
        .build();
        Response response = client.newCall(request).execute();
        System.out.println("headers=========>"+response.headers());
        System.out.println("status=========>"+response.code());
        System.out.println("body=========>"+ Objects.requireNonNull(response.body()).string());
        }
```



### okHttp发送get请求带有请求头

```java
    public static final String API = "http://localhost:8080/";
    public static final String OKHTTP_TEST_GET = "okhttp_test_get";
    public static final String OKHTTP_TEST_GET_HEADER = "okhttp_test_get_header";
    public static void getPure() throws IOException {
        OkHttpClient client = new OkHttpClient();
    
        Request request = new Request.Builder()
        .url(API+OKHTTP_TEST_GET_HEADER)
        .get()
        .header("HJC", "ILOVEU")
        .build();
    
        Response response = client.newCall(request).execute();
    
        System.out.println("headers=========>"+response.headers());
        System.out.println("status=========>"+response.code());
        System.out.println("body=========>"+ Objects.requireNonNull(response.body()).string());
        }
```



### okHttp发送get请求带有参数(组装url)

```java
    public static final String API = "http://localhost:8080/";
    public static final String OKHTTP_TEST_GET = "okhttp_test_get";
    public static final String OKHTTP_TEST_GET_HEADER = "okhttp_test_get_header";
    public static final String OKHTTP_TEST_GET_PARAM = "okhttp_test_get_param";
    public static void getPure() throws IOException {
        OkHttpClient client = new OkHttpClient();
    
        //构建http请求url
        HttpUrl.Builder queryBuilder = HttpUrl.get(API + OKHTTP_TEST_GET_PARAM).newBuilder();
        queryBuilder.addQueryParameter("param0","test0");
        queryBuilder.addQueryParameter("param1","test1");
    
    
        Request request = new Request.Builder()
        .url(queryBuilder.build())
        .get()
        .build();
    
        Response response = client.newCall(request).execute();
    
        System.out.println("headers=========>"+response.headers());
        System.out.println("status=========>"+response.code());
        System.out.println("body=========>"+ Objects.requireNonNull(response.body()).string());
        }
```



### okHttp发送post请求

```java
    class People {
        String name;
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        @Override
        public String toString() {
            return "People{" +
                    "name='" + name + '\'' +
                    '}';
        }
    }
```

```java
    private static final String BASE_URL = "http://localhost:8080/";
    private static final String OKHTTP_TEST_POST = "okhttp_test_post";
    
    public static void main(String[] args) throws IOException {
    
        OkHttpClient okHttpClient = new OkHttpClient();
        
        
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name", "zs");
        
        RequestBody requestBody = RequestBody.create(jsonObject.toString(),
                MediaType.parse("application/json;charset=utf-8"));
        
        Request request = new Request.Builder()
                .url(BASE_URL + OKHTTP_TEST_POST)
                .post(requestBody)
                .build();
        
        Response response = okHttpClient.newCall(request).execute();
        
        String body = response.body().string();
        People people = JSONObject.parseObject(body,People.class);
        System.out.println(people);
    }
```



### okHttp发送put请求，带有文件

```java
    private static final String BASE_URL = "http://localhost:8080/";
    private static final String OKHTTP_TEST_PUT = "okhttp_test_put";
    public static void main(String[] args) throws IOException {
        OkHttpClient okHttpClient = new OkHttpClient();
    
        RequestBody body = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("file", "test.txt",
                        RequestBody.create(new File("okhttp_study/src/main/resources/test.txt"),
                                MediaType.parse("application/octet-stream")))
                .build();
    
    
        Request request = new Request.Builder()
                .url(BASE_URL + OKHTTP_TEST_PUT)
                .put(body)
                .build();
    
        Response res = okHttpClient.newCall(request).execute();
        System.out.println(res.body().string());
    }
```


### okHttp发送head请求

```java
     public static void getPure() throws IOException {
            OkHttpClient client = new OkHttpClient();
    
            Request request = new Request.Builder()
                    .url("https://www.baidu.com")
                    .head()
                    .build();
    
            Response response = client.newCall(request).execute();
    
            System.out.println("headers=========>"+response.headers());
            System.out.println("status=========>"+response.code());
            System.out.println("body=========>"+ Objects.requireNonNull(response.body()).string());
        }
```



### okHttp发送delete请求

```java
    private static final String BASE_API = "http://localhost:8080/";
    private static final String OKHTTP_TEST_DELETE = "okhttp_test_delete";
    
    public static void main(String[] args) throws IOException {
        OkHttpClient okHttpClient = new OkHttpClient();
    
        HttpUrl url = HttpUrl.get(BASE_API+OKHTTP_TEST_DELETE).newBuilder()
                .addPathSegment("5").build();
    
        Request request = new Request.Builder()
                .url(url)
                .delete()
                .build();
        Response response = okHttpClient.newCall(request).execute();
        System.out.println(response.body().string());
    
    }
```



### okHttp发送同步请求

```java
 Response response = okHttpClient.newCall(request).execute();
```



### okHttp发送异步请求

> 异步发送post为例子

```java
	private static final String BASE_URL = "http://localhost:8080/";
    private static final String OKHTTP_TEST_POST = "okhttp_test_post";

    public static void main(String[] args) throws IOException {

        OkHttpClient okHttpClient = new OkHttpClient();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name", "zs");

        RequestBody requestBody = RequestBody.create(jsonObject.toString(),
                MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url(BASE_URL + OKHTTP_TEST_POST)
                .post(requestBody)
                .build();

        okHttpClient.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                System.err.println("出错了...");
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                String body = response.body().string();
                People people = JSONObject.parseObject(body,People.class);
                System.out.println(people);
            }
        });


    }
```

## Retrofit2
### 引入依赖

``` xml

   <!--这个不包含gsonConverFactory-->
    <dependency>
        <groupId>com.squareup.retrofit2</groupId>
        <artifactId>retrofit</artifactId>
        <version>2.3.0</version>
    </dependency>
    
    <!--直接进入这个，不用引入上边的，这个包含retrofit2与gsonConverFactory-->
    <dependency>
        <groupId>com.squareup.retrofit2</groupId>
        <artifactId>converter-gson</artifactId>
        <version>2.9.0</version>
    </dependency>
```

>  以下基于
> 天气接口: https://api.thinkpage.cn/v3/weather/now.json?key=rot2enzrehaztkdk&location=beijing

### 返回值定义

```java
package com.hjc.weather;

import lombok.Data;

import java.util.List;

@Data
public class WeatherBean {
    public List<Result> results;

    @Data
    public class Result {
        public Location location;
        public Now now;
        public String last_update;
    }

    @Data
    public class Location {
        public String id;
        public String name;
        public String country;
        public String path;
        public String timezone;
        public String timezone_offset;
    }

    @Data
    public class Now {
        public String text;
        public int code;
        public float temperature;
    }
}

```



### get请求之@Query注解添加参数

#### 	接口定义

```java
public interface IWeather {


    @GET("/v3/weather/now.json")
    Call<WeatherBean> getWeather(@Query("key") String key, @Query("location") String location);


}

```

#### 客户端

```java
public class Client {

    private static final String BASE_URL = " https://api.thinkpage.cn";

    public static void weather(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                //添加gson转换工厂
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();
        IWeather iWeather = retrofit.create(IWeather.class);
        Call<WeatherBean> weather = iWeather.getWeather("rot2enzrehaztkdk", "qingdao");
        weather.enqueue(new Callback<WeatherBean>() {
            @Override
            public void onResponse(Call<WeatherBean> call, Response<WeatherBean> response) {
                System.out.println(response.body());
            }

            @Override
            public void onFailure(Call<WeatherBean> call, Throwable throwable) {

            }
        });

    }

    public static void main(String[] args) {
        weather();
    }
}
```

### get请求之@QueryMap注解添加参数

#### 接口定义

```java
public interface IWeather {

    @GET("/v3/weather/now.json")
    Call<WeatherBean> getWeatherMap(@QueryMap Map<String,String> map);
    
}
```

#### 客户端

```java
    public static void weatherMap(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                //添加gson转换工厂
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();
        IWeather iWeather = retrofit.create(IWeather.class);

        Map<String, String> map = new HashMap<>();
        map.put("key", "rot2enzrehaztkdk");
        map.put("location", "qingdao");
        Call<WeatherBean> weather = iWeather.getWeatherMap(map);
        weather.enqueue(new Callback<WeatherBean>() {
            @Override
            public void onResponse(Call<WeatherBean> call, Response<WeatherBean> response) {
                System.out.println(response);
                System.out.println(response.body());
            }

            @Override
            public void onFailure(Call<WeatherBean> call, Throwable throwable) {

            }
        });
    }

    public static void main(String[] args) {
        weatherMap();
    }
```



### get请求之@Path注解添加参数

#### 接口定义

```java
public interface IWeather {

    @GET("/{version}/weather/now.json")
    Call<WeatherBean> getWeatherPath(@Path("version")String version,
                                 @Query("key") String key,
                                 @Query("location") String location);

}
```

#### 客户端

```java
    public static void weatherPath(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                //添加gson转换工厂
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();
        IWeather iWeather = retrofit.create(IWeather.class);

        Call<WeatherBean> weather = iWeather.getWeatherPath("v3","rot2enzrehaztkdk","qingdao");
        weather.enqueue(new Callback<WeatherBean>() {
            @Override
            public void onResponse(Call<WeatherBean> call, Response<WeatherBean> response) {
                System.out.println(response);
                System.out.println(response.body());
            }

            @Override
            public void onFailure(Call<WeatherBean> call, Throwable throwable) {

            }
        });
    }


    public static void main(String[] args) {
        weatherPath();
    }
```

### get请求之@URL注解添加参数

#### 接口定义

```java
public interface IWeather {
	
    //使用@Url时，@Get不能带参数
    @GET
    Call<WeatherBean> getWeatherURL(@Url String url);
}
```

#### 客户端

```java
public static void weatherURL(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                //添加gson转换工厂
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();
        IWeather iWeather = retrofit.create(IWeather.class);

        Call<WeatherBean> weather = iWeather.getWeatherURL("/v3/weather/now.json?key=rot2enzrehaztkdk&location=qingdao");
        weather.enqueue(new Callback<WeatherBean>() {
            @Override
            public void onResponse(Call<WeatherBean> call, Response<WeatherBean> response) {
                System.out.println(response);
                System.out.println(response.body());
            }

            @Override
            public void onFailure(Call<WeatherBean> call, Throwable throwable) {

            }
        });
    }
    public static void main(String[] args) {
        weatherURL();
    }
```

### get请求之@Headers/@Header注解添加请求头参数

#### 服务器端接口定义

```java
@GetMapping("/retrofit2_test_get_header")
public String testHeader(@RequestHeader(value = "abc",required = true) String abc){
    System.out.println(abc);
    return abc;
}
```

#### 接口定义

```java
public interface IWeather {
    
    @GET
    Call<WeatherBean> getWeatherHeaders(@Url String url);

    @GET
    Call<WeatherBean> getWeatherHeader(@Header("abc")String abc,@Url String url);
}
```

#### 客户端

```java
 public static void weatherHeaders(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://localhost:8080/")
                //添加gson转换工厂
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();
        IWeather iWeather = retrofit.create(IWeather.class);

     	//@Headers注解添加请求头
        //Call<WeatherBean> weather = iWeather.getWeatherHeaders("retrofit2_test_get_header");
     
    	//@Header注解添加请求头   
    	Call<WeatherBean> weather = iWeather.getWeatherHeader("test","retrofit2_test_get_header");
        weather.enqueue(new Callback<WeatherBean>() {
            @Override
            public void onResponse(Call<WeatherBean> call, Response<WeatherBean> response) {
                System.out.println(response);
                System.out.println(response.headers());
                System.out.println(response.body());
            }

            @Override
            public void onFailure(Call<WeatherBean> call, Throwable throwable) {

            }
        });
    }
    public static void main(String[] args) {
        weatherHeaders();
    }
```







### post请求之@Body注解post请求体提交

#### 服务器端接口定义

```java
    @PostMapping("/retrofit2_test_post")
    public People postRetrofit2(@RequestBody People people){
        people.setName(people.getName()+"处理完成...");
        return people;
    }

```

#### 接口定义

```java
public interface IPeople {
    @POST("/retrofit2_test_post")
    Call<People> add(@Body People people);
}
```

#### 客户端

```java
public static void main(String[] args) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://localhost:8080")
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();

        IPeople iPeople = retrofit.create(IPeople.class);

        People people = new People();
        people.setName("zs");
        Call<People> add = iPeople.add(people);
        add.enqueue(new Callback<People>() {
            @Override
            public void onResponse(Call<People> call, Response<People> response) {
                People body = response.body();
                System.out.println(response);
                System.out.println(body);
            }

            @Override
            public void onFailure(Call<People> call, Throwable throwable) {
                throwable.printStackTrace();
            }
        });

    }
```





### post请求之@FormUrlEncoded+@Field/@FieldMap表单提交

#### 服务器端接口定义

```java
@PostMapping("/retrofit2_test_post_form")
public People postRetrofit2Form(People people){
    people.setName(people.getName()+"处理完成...");
    return people;
}
```

#### 接口定义

```java
public interface IPeople {

    @POST("/retrofit2_test_post_form")
    @FormUrlEncoded
    Call<People> add(@Field("name") String name);
    
    @POST("/retrofit2_test_post_form")
    @FormUrlEncoded
    Call<People> add(@FieldMap String name);
}
```

#### 客户端

```java
   
    @Field注解测试
	public static void main(String[] args) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://localhost:8080")
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();

        IPeople iPeople = retrofit.create(IPeople.class);
        
        String name = "zs";
        Call<People> add = iPeople.add(name);
        add.enqueue(new Callback<People>() {
            @Override
            public void onResponse(Call<People> call, Response<People> response) {
                People body = response.body();
                System.out.println(response);
                System.out.println(body);
            }

            @Override
            public void onFailure(Call<People> call, Throwable throwable) {
                throwable.printStackTrace();
            }
        });

    }
	
    @FieldMap注解测试
   public static void main(String[] args) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://localhost:8080")
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();

        IPeople iPeople = retrofit.create(IPeople.class);

        HashMap<String, String> map = new HashMap<>();
        map.put("name", "zs");
        Call<People> add = iPeople.addMap(map);
        add.enqueue(new Callback<People>() {
            @Override
            public void onResponse(Call<People> call, Response<People> response) {
                People body = response.body();
                System.out.println(response);
                System.out.println(body);
            }

            @Override
            public void onFailure(Call<People> call, Throwable throwable) {
                throwable.printStackTrace();
            }
        });

    } 

```



### post请求之@Multipart+@Part上传文件

上传文件需要用到的注解是@Multipart，以及@Part，具体如下所示：

```java
@Multipart
@POST("user/photo") 
Call<User> updateUser(@Part("photo") RequestBody photo, @Part("description") RequestBody description);
```

@Multipart表示能使用多个Part，而@Part注解则是对参数进行标记，RequestBody是一种类型，是okHttp3里面的一个类，既然请求参数是RequestBody类型的，那么我们要把请求体封装到RequestBody里面去，通过RequestBody.creat()方法进行创建，该方法的参数支持如下类型：

第一个参数是MediaType，是媒体类型，第二个参数可为String、byte、file等，通过上述方法创建的RequestBody是一个请求体，将与其他的请求体一起发送到服务端，它们的key值是@Part("key")注解的值，当然了，要与服务端的key值相对应才能请求成功。

































