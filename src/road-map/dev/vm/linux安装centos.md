# vm安装linux(centos7)

## 1、**选择nat网络**

## 2、**选择安装软件**

![img](./_pic01/wps1.jpg) 

![img](./_pic01/wps2.jpg) 

会安装gcc，java，mysql等开发软件

##  3、**选择安装位置**

![img](./_pic01/wps3.jpg) 

选择配置分区，点击完成

然后配置分区，分配三大区（共20G） 

1、（/boot（1G）

2、 swap（交换分区 2G）

3、 /根分区（17G））

![img](./_pic01/wps4.jpg) 

![img](./_pic01/wps5.jpg) 

![img](./_pic01/wps6.jpg) 

![img](./_pic01/wps7.jpg) 

## 4、**点击KDUMP**

(是内核崩溃的转存机制，会占用一部分内存)（生产环境建议开启，学习环境关闭就可以）

![img](./_pic01/wps8.jpg) 

 

![img](./_pic01/wps9.jpg) 

 

## 5、**配置网络与主机名**

暂时先打开网络并修改主机名就行，网络后边在配置

![img](./_pic01/wps10.jpg) 

## 6、**下一步配置root账号密码，重启**

 

 