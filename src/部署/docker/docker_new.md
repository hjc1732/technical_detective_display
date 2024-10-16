# Docker(新)

## docker 安装（空白Linux）

### 1、 查看系统的内核版本

```
uname -r

4.18.0-80.11.2.el8_0.x86_64
```

- `uname -r`
- x86 64位系统，如果是32位是不能安装 docker 的

### 2、yum 更新到最新版本

```
yum update
```

### 3、yum更新失败解决办法

引用:https://www.cnblogs.com/maowenqiang/articles/7728685.html

#### 更换yum源地址

```
CentOS报错：Could not retrieve mirrorlist http://mirrorlist.centos.org/?release=7&arch=x86_64&repo=os&infra=stock32 error was 14: curl#6 - "Could not resolve host: mirrorlist.centos.org; Unknown error" 
```

##### 1、检查网络配置是否正常

```
 在linux下ping一下看看是不是网络链接正常。出现这种原因就是一般网络没链接好。那修改一下dns，找到/etc/sysconfig/network-scripts/ifcfg-ens33
注意一下，ifcfg-ens33后面的数字是随机产生的
```

![image-20240703152419731](.\img\image-20240703152419731.png)

```
将onboot改为yes，重新启动网络，service network restart，然后ping www.baidu.com如果通了的话，就证明链接成功。这样就可以正常yum update了
```

##### 2、检查有没有配置resolv.conf文件

解决方法：

```
vim /etc/resolv.conf
```

![image-20240703152516804](.\img\image-20240703152516804.png)

```
:wq保存退出即可，之后再执行yum操作，成功！
```

##### 3、如果还不行 更新yum源

###### 3.1 阿里

**3.1.1 备份当前的yum源**

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

**3.1.2 下载新的CentOS-Base.repo 到/etc/yum.repos.d/**

```
CentOS 5
 wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
 或者
 curl -o /etc/yum.repos.d/CentOS-Base.repo 


CentOS 6
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
或者
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo


CentOS 7
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
或者
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

**3.1.3 清空并生成缓存**

```
yum clean all

yum makecache
```

**3.1.4 备注**

```
　　　　yum 会把下载的软件包和header存储在cache中(默认路径/var/cache/yum/)，而不自动删除。如果觉得占用磁盘空间，可以使用yum clean指令进行清除，更精确 的用法是yum clean headers清除header，yum clean packages清除下载的rpm包，yum clean all全部清除。


```

###### 3.2.网易

**3.2.1备份当前的yum源**

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

**3.2.2 下载对应版本repo文件, 放入/etc/yum.repos.d/**

```
http://mirrors.163.com/.help/CentOS7-Base-163.repo
http://mirrors.163.com/.help/CentOS6-Base-163.repo
http://mirrors.163.com/.help/CentOS5-Base-163.repo
```

**3.2.3运行以下命令生成缓存**

```
yum clean all

yum makecache
```

### 4、安装Docker以及设置docker环境

官网地址：https://docs.docker.com/engine/install/centos/

#### 1 清除旧版本docker

```
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

#### 2 设置Docker的yum的源

```
sudo yum install -y yum-utils
//国外
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

//鉴于国内网络问题，强烈建议使用国内源。以下是阿里云的软件源
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo


```

#### 3 查看仓库所有docker版本

```
yum list docker-ce --showduplicates | sort -r
```

#### 4 安装docker引擎

```
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### 5 安装docker-compose

```
//国外
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose


//国内
# 默认路径
wget https://gitee.com/fustack/docker-compose/releases/download/v2.24.1/docker-compose-linux-x86_64
# 指定路径【推荐】
sudo curl -L https://gitee.com/fustack/docker-compose/releases/download/v2.24.1/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
# 设置权限
sudo chmod +x /usr/local/bin/docker-compose



安装后就可以使用 compose 命令了；docker-compose -f environment-docker-compose.yml up -d
```

#### 6 docker-compose问题(找不到命令)

引用

```
https://blog.csdn.net/qq_24084605/article/details/104473053?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-104473053-blog-120718773.235^v43^pc_blog_bottom_relevance_base3&spm=1001.2101.3001.4242.2&utm_relevant_index=2
```

```
https://ubuntuqa.com/article/6414.html
```

解决办法:

```
1、查看刚刚安装的docker-compose的位置，一般在/use/local/bin下
2、创建软连接，此处根据名字创建软连接,/usr/local/bin/docker-compos文件路径以及文件名称不要错了
sudo ln -s /usr/local/bin/docker-compos /usr/bin/docker-compose
```

#### 7 启动Docker并添加开机自启动

```
启动docker
sudo systemctl start docker

设置开机启动
systemctl enable docker

重启docker
systemctl restart docker
```

#### 8 查看 Docker 版本

```
docker --version
```

#### 9 设置国内源

阿里云提供了镜像源：[https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors (opens new window)](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)- 登录后你会获得一个专属的地址。

使用以下命令来设置 Docker 国内源：- 或者你可以通过 `vim /etc/docker/daemon.json` 进入修改添加 registry-mirrors 内容后重启 Docker

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://***替换为你的地址***.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

```

这个命令会创建一个 `/etc/docker/daemon.json` 文件，并将国内源的配置写入其中。然后你只需要重启 Docker 服务即可使配置生效，可以通过运行 `sudo systemctl restart docker` 命令来重启 Docker 服务。

**解决目前Docker Hub国内无法访问方法**

自从2023年5月中旬，著名Docker 容器平台：`hub.docker.com` “不知” 何种原因国内均无法正常访问了。

这样对国内服务器拉取Docker仓库影响比较大。不过得亏国内有Docker Hub镜像平台。有付费的，有免费的！

**配置镜像**

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://dc.j8.work",
        "https://docker.m.daocloud.io",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

```

- 参考链接：https://cloud.tencent.com/developer/article/2301228
- 可信镜像中心：https://atomhub.openatom.cn/



### 5、docker启动portainer

#### 1. 拉取最新的 Portainer

```
docker pull portainer/portainer

//拉取我的阿里云镜像源
docker pull registry.cn-qingdao.aliyuncs.com/qd_hjc/portainer:latest

```

#### 2、安装和启动

```
docker run -d --restart=always --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer

//启动我的portainer
docker run -d --restart=always --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock registry.cn-qingdao.aliyuncs.com/qd_hjc/portainer

```

#### 3、访问Portainer

- 地址：

  ```
  http://ip:9000
  ```

  

- 操作：登录后设置你的用户名和密码，并设置本地Docker即可，设置完成后，如下





## docker镜像

### docker pull 

![image-20240606213947678](.\img\image-20240606213947678.png)

```docker
[options]

docker pull -a  //下载整个仓库

docker pull --disable-content-trust  //跳过验证，默认是true(不跳过验证,带上表示跳过验证)

docker pull --platform string //设置和当前架构相匹配的架构的镜像

docker pull -q  //抑制冗长的输出，没有拉取详情

[:tag|@digest]

docker pull -q centos:7.9
docker pull -q centos:latest

// docker tomcat:8.5.32 地址 
// https://hub.docker.com/layers/library/tomcat/8.5.32/images/sha256-c0f20412acb98efb1af63911d38edca97df76fbf3c0f34de10cc2c56a9f57471?context=explore

docker pull -q tomcat:8.5.32
//digest拉取适用于不方便使用版本的时候
docker pull -q tomcat@sha256:c0f20412acb98efb1af63911d38edca97df76fbf3c0f34de10cc2c56a9f57471


```



### docker images

![image-20240606215415299](.\img\image-20240606215415299.png)

```docker
docker images --a  //显示所有的镜像，默认隐藏掉中间的镜像

docker images --digests  //显示digests

docker images --no-trunc   //无删减的，比不带dockers images 显示的全

docker images -q //只显示image-id
用于  docker rmi ${docker images -q}

docker images zookeeper  //查看某个名称为**的镜像
docker images zookeeper:3.7  //查看某个名称为**:tag的镜像

docker images -f  //过滤
// 例如  docker images -f dangling=true 
//查询所有的玄虚镜像，即docker images 下无repository 无tag 只有image id 的镜像 

docker images -f since=nginx:latest //查询从什么版时间之前的
docker images -f before=nginx:latest //查询从什么版本pull之前的

//根据repository与tag查(只查询官方镜像,第三方的不查)
docker images -f reference=nginx:*   //查询nginx所有版本
docker images -f reference=*:latest  //查询所有最新的
docker images -f reference=*a*   //查询repository与tag中包含a的(只查询官方镜像,第三方的不查)


```

![image-20240606221343648](.\img\image-20240606221343648.png)

![image-20240606221632631](.\img\image-20240606221632631.png)



### docker search

![image-20240606234333729](.\img\image-20240606234333729.png)

![image-20240606235056613](.\img\image-20240606235056613.png)

> AUTOMATED表示当前镜像是否是“自动化镜像”。
>
> 什么是自动化镜像？就是使用Docker Hub连接一个包含Dockerfile文件(专门构建镜像用的文件)的GitHub仓库或Bitbucket仓库的源码托管平台，然后Docker Hub就会自动根据Dockerfile内容构建镜像。这种构建出的镜像会被标记为AUTOMATED，这种构建镜像的方式称为Trusted Build（受信构建）。只要Dockerfile 文件内容发生变化，那么Docker Hub就会构建出新的镜像。

```
docker search -f is-official=true  nginx  //过滤
docker search --limit=5 nginx //限制展示条数
docker search --no-trunc nginx  //无删减的
```



### docker rmi

![image-20240607000758277](./img\image-20240607000758277.png)

```
docker rmi -f nginx:latest  //强制删除
docker rmi --no-prune ngxin:latest    //不删除没有标签的镜像层(镜像分层)

docker rmi -f $(docker images -q) //强制删除所有的镜像，根据查询出的image Id删除
```



### 导出/导入镜像

#### docker save(导出镜像)

![image-20240607003109638](.\img\image-20240607003109638.png)

```
//导出镜像
docker save -o my.tar zookeeper:3.7 tomcat:8.5.32   
//将 zookeeper:3.7和 tomcat:8.5.32镜像打包到my.tar文件中(代替标准输出)

//标准输出方式
docker save zookeeper:3.7 tomcat:8.5.32 > zt.tar
```



#### docker load(导入镜像)

![image-20240607003814322](.\img\image-20240607003814322.png)

```
//导入镜像(替换标准输入方式)
docker load -i my.tar  //加载打包的镜像

docker load -q -i my.tar  //加载打包的镜像,-q 简化详情，但是 qi顺序不能变
docker load -qi my.tar  //加载打包的镜像,-q 简化详情，但是 qi顺序不能变

//标准输入方式
docker load < my.tar 

```



### 镜像分层

**什么是分层**

Docker镜像由一些松耦合的只读镜像层组成，Docker Daemon负责堆叠这些镜像层，并将它们关联为一个统一的整体，即对外表现出的是一个独立的对象。通过docker pull命令拉取指定的镜像时，每个Pull complete结尾的行就代表下载完毕了一个镜像层。

例如，下面的redis:latest镜像就包含6个镜像层。

![](.\img\image-20240607004941012.png)

![image-20240607004924526](.\img\image-20240607004924526.png)

**为什么分层**

采用这种分层结构的优势很多，例如，每个分层都是只读的，所有对分层的修改都是以新分层的形式出现，并不会破坏原分层内容；再如，每个分层只记录变更内容，所以有利于节省存储空间等。不过，分层结构的最大的好处是，在不同镜像间实现资源共享，即不同镜像对相同下层镜像的复用。对于docker pull命令，其在拉取之前会先获取到其要拉取镜像的所有ImageID，然后在本地查找是否存在这些分层。如果存在，则不再进行拉取，而是共享本地的该分层。大大节点的存储空间与网络带宽，提升了拉取效率。

**镜像层构成**

每个镜像层由两部分构成：镜像文件系统与镜像json文件。这两部分具有相同的ImageID。镜像文件系统就是对镜像占有的磁盘空间进行管理的文件系统，拥有该镜像所有镜像层的数据内容。而镜像json文件则是用于描述镜像的相关属性的集合，通过docker inspect [镜像]就可以直观看到。

### dockers inspect 

通过 docker inspect 命令可以查看指定镜像的详细信息。其中就包含该镜像的摘要信息。

### 多架构镜像

**什么是多架构镜像**

```
Multi-architecture Image，即多架构镜像，是某<repository>中的某<tag>镜像针对不同操作系统/系统架构的不同镜像实现。即多架构镜像中包含的镜像的<repository>:<tag>都是相同的，但它们针对的操作系统/系统架构是不同的
```

**多架构镜像原理**

无论用户使用的是什么操作系统/系统架构，其通过 docker pull 命令拉取到的一定是针对该操作系统/系统架构的镜像，无需用户自己考虑操作系统/系统架构问题。Docker Hub 能够根据提交 pull 请求的 Docker 系统的架构自动选择其对应的镜像

![image-20240612225048849](.\img\image-20240612225048849.png)

```
在 Docker Hub 中，镜像的多架构信息保存在 Manifest 文件中。
在拉取镜像时，Docker会随着 pull 命令将当前 Docker 系统的 OS 与架构信息一并提交给 Docker Hub。Docker Hub 首先会根据镜像的<repository>:<tag>查找是否存在 Manifest。
如果不存在，则直接查找并返回<repository>:<tag>镜像即可；
如果存在，则会在 Manifest 中查找是否存在指定系统/架构的镜像。
如果存在该系统/架构，则根据 Manifest 中记录的地址找到该镜像的位置。
```



### 总结

####  镜像基础

- 了解镜像就是一个精简的操作系统。
- 了解三类镜像仓库提供的镜像都是有质量保障的。

#### 镜像相关命令

- 掌握镜像相关命令的基本用法。

-  理解什么是自动化镜像：使用 Docker Hub 连接包含 Dockerfile 的 GitHub 或 Bitbucket 仓库，然后 Docker Hub 根据 Dockerfile 自动构建出的镜像会被标记为 Automated Build。

#### 镜像分层

-  理解镜像分层的目的是为了实现在不同镜像间的镜像层共享。

- 了解镜像层由镜像 FS 与镜像描述 json 文件构成。docker 镜像的 FS 由多层只读的镜像层FS 构成。

- 只读的镜像层分为基础镜像层与扩展镜像层，基础镜像层的 FS 称为 rootfs。容器中的最上层为容器层，其是可读写的。

- 现代操作系统都是微内核架构的，采用的 C/S 模式，即由两大部分构成：内核（Server）与服务模块（Client）。

- bootfs 主要由两大部分构成：bootloader 与 kernel。bootloader 主要负责将 kernel 加载到内存，并引导 kernel 启动。当 kernel启动后，内存的使用权就由 bootfss 完全转交给了 kernel，然后 kernel 就会将 bootfs 卸载。

#### 镜像摘要

```
- 理解 digest 的主要作用是为了区分相同<repository>:<tag>的不同镜像。

- 理解分发散列值 Distribution Hash 的作用或意义：为了解决网络传输压缩后，命令所携带的 digest 与重新计算的镜像 digest 不相符的问题。
```

#### 多架构镜像

- 理解为什么需要多架构镜像：由于不同的 OS 采用的不同的类库，不同的 ARCH 采用的不同的指令系统，所以针对不同的 OS/ARCH 所设计的镜像也就是不同的。
- 了解根据提交 pull 请求的 Docker 系统的 OS/ARCH，Docker Hub 会自动选择与其对应的镜像。了解多架构镜像信息是存放在 Docker Hub 的 Manifest 文件中的，理解多架构镜像的实现原理。

## docker容器

### 容器基础

#### 容器启动流程

![image-20240612235912976](.\img\image-20240612235912976.png)

通过 docker run 命令可以启动运行一个容器。该命令在执行时首先会在本地查找指定的镜像，如果找到了，则直接启动，否则会到镜像中心查找。如果镜像中心存在该镜像，则会下载到本地并启动，如果镜像中心也没有，则直接报错。如果再与多架构镜像原理相整合，则就形成了完整的容器启动流程。

![image-20240613000004131](.\img\image-20240613000004131.png)

#### 容器运行本质

Docker 容器存在的意义就是为了运行容器中的应用，对外提供服务，所以启动容器的目的就是启动运行该容器中的应用。容器中的应用运行完毕后，容器就会自动终止。所以，如果不想让容器启动后立即终止运行，则就需要使容器应用不能立即结束。通常采用的方式有两种，**使应用处于与用户交互的状态或等待状态**

#### 容器创建并启动命令

对于容器的运行，有两种运行模式：交互模式与分离模式。下面通过运行 ubuntu 与tomcat 来演示这两种运行模式的不同

##### 以交互模式运行ubuntu

![image-20240613000320316](.\img\image-20240613000320316.png)

- --name 指定当前容器名称为 myubuntu

- -it 指定以交互模式运行容器，且为容器分配一个伪终端

后面的/bin/bash 用于指定容器启动后需要运行的命令为/bin 下的 bash 命令，而该命令会启动一个 bash 终端。

我们在这里运行了一个 ubuntu 系统的容器，并为其取名为 myubuntu。另外我们可以注意到，命令行前面提示部分内容发生了变化：原来显示的是[root@docker ~]，而现在变为了root@de0940ad17dd:/#，这个就是 docker 生成的伪客户端，而数字 de0940ad17dd 表示的是docker 容器的 ID。此时就可以通过 Linux 命令对该 ubuntu 系统进行操作了。不过，由于容器中的该系统是一个精简的系统，有很多常用命令是没有安装的，所以如果要使用这些命令，就需要安装。

![image-20240613000355533](.\img\image-20240613000355533.png)



##### 以交互模式运行tomcat

![image-20240613000522121](.\img\image-20240613000522121.png)

通过 ls –l 命令可查看 tomcat 根目录下的文件。注意，不支持 ll 命令。

![image-20240613000547635](.\img\image-20240613000547635.png)

下面也是以交互模式运行 tomcat 容器，不同的是，该命令后没有/bin/bash，此时会真正启动 tomcat。

![image-20240613000641482](.\img\image-20240613000641482.png)

-p 用于指定端口映射，格式为 暴露给宿主机的端口:容器中应用的端口回车后会发现 tomcat 已启动，且 tomcat 的日志输出占居了命令行。

![image-20240613000701769](./img\image-20240613000701769.png)

此时在 Window 的浏览器中通过 8081 端口可以访问到 tomcat

![image-20240613000739359](.\img\image-20240613000739359.png)