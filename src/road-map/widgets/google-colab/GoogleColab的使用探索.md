 

# GoogleColab



注意事项
----

**本文以VOC数据集为例，因此在训练的时候没有修改classes\_path等，如果是训练自己的数据集，各位一定要注意修改classes\_path等其它参数！**

学习前言
----

Colab是谷歌提供的一个云学习平台，Very Nice，最近卡不够用了决定去白嫖一波。该博客只会说明如何使用Colab对已有的深度学习仓库进行训练，并不会说如何进入外网、如何注册等。

**该博客仅为了演示Colab的使用，主要是为了各位熟悉Colab操作，具体问题具体分析，操作不当与版本更迭会导致步骤出错，如果出错的话建议多百度，多看代码与指令，查一下错误的原因**，同时建议是**有一定的基础同学再使用Colab。**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/165658016801903d8abc5443d5a4233a.png#pic_center)

什么是Google Colab
---------------

Google Colab是谷歌提供的免费Jupyter 笔记本环境，不需要什么设置与环境配置就可以使用，完全在云端运行。不影响本地的使用。

Google Colab为研究者提供一定免费的GPU，可以编写和执行代码，所有这些都可通过浏览器免费使用。同学们可以在上面轻松地跑 Tensorflow、Pytorch 等深度学习框架。

尽管Google Colab提供了一定的免费资源，但资源量是受限制的，所有 Colab 运行时都会在一段时间后重置。Colab Pro 订阅者的使用量仍会受到限制，但相比非订阅者可享有的限额要多出大约一倍。Colab Pro+ 订阅者还可获享更高的稳定性。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/004ce93b64831955408999cfae57ba98.png#pic_center)

相关链接
----

Colab官网：[https://colab.research.google.com/](https://colab.research.google.com/)  
（需要外网才可以进入）  
ipynb Github：[https://github.com/bubbliiiing/Colab](https://github.com/bubbliiiing/Colab)

利用Colab进行训练
-----------

**本文以YoloV4-Tiny-Pytorch版本的训练为例，进行Colab的使用演示。**

### 一、数据集与[预训练权重](https://so.csdn.net/so/search?q=%E9%A2%84%E8%AE%AD%E7%BB%83%E6%9D%83%E9%87%8D&spm=1001.2101.3001.7020)的上传

#### 1、数据集的上传

Colab和Google自带的云盘联动非常好，因此我们需要首先将数据集上传云盘，这个上传的过程其实非常简单，本地先准备好数据集。  
由于我所上传的库，均使用的VOC数据集，我们需要按照VOC数据集摆放好。本文直接以VOC07+12数据集为例进行演示。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b70caafdc8148fcf6b3cd404472f89d4.png#pic_center)  
JPEGImages里面存放的为图片文件，Annotations里面存放的标签文件，ImageSets里面存放的是区分验证集、训练集、测试集的txt文件。  
**然后将VOCdevkit文件整个进行打包。需要注意的是，不是对上面三个文件夹进行打包，而是对VOCdevkit进行打包，这样才满足数据处理的格式。**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bf6fcc6e1465ee8aeacaf2375b5c91b7.png#pic_center)  
**在获得打包后的压缩包后，将压缩包上传到谷歌云盘。我在谷歌云盘上新建了一个VOC\_datasets文件夹存放压缩包。**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d0bb9a1264770c7ccc9747630c3a1226.png#pic_center)  
此时数据集的上传已经完成。

#### 2、预训练权重的上传

在谷歌云盘上进行文件夹的创建，首先创建Models，然后在Models里面创建yolov4-tiny-pytorch，然后在yolov4-tiny-pytorch里面创建logs和model\_data。

**model\_data放置的是预训练文件。  
logs放置的是网络训练过程中产生的权值。**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/eb43e4779eee32d32ec13a6fa6fd34b7.png#pic_center)  
由于我们这次使用的是YoloV4-Tiny-Pytorch的库，我们将它的预训练权重上传到model\_data文件夹。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/758d5ab9198db8fe7e1fae2a0c8ca461.png#pic_center)

### 二、打开Colab并配置环境

#### 1、笔记本的创建

在该步中，我们首先打开Colab的官网。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1a9b1080d6633d0ba7844eb158c9aafd.png#pic_center)  
然后点击文件，创建笔记本，此时会创建一个jupyter笔记本。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c570bf8ed1319399a1145cb6bfa62b11.png#pic_center)  
创建完成后给文件改个名，好看一些。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/262f3980fabf994ef3e9216043b0183f.png#pic_center)  
之后点击代码执行程序，然后点击更改运行时类型，在其中硬件加速器部分选择GPU，Colab便会配置一个带有GPU的机器，此时笔记本就创建完成了。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/de444f5ad61a9850ec8746dc64434691.png#pic_center)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9b4b708e55259dd5e3e6dd74bfbfd6d7.png#pic_center)

#### 2、环境的简单配置

colab已经集成了pytorch环境，无需专门配置pytorch，**不过使用的torch版本较新。**  
由于我们的数据集在谷歌云盘上，所以我们还要挂载云盘。

```python
from google.colab import drive
drive.mount('/content/gdrive')
```

我们将上述代码输入到笔记本中执行。将云盘挂载到服务器上。然后点击运行即可。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a63da2f234edd633e0bac19c2ab0ce46.png#pic_center)  
此时点击左边栏中，类似于文件夹的东西，就可以打开文件夹了，看看文件部署情况。gdrive就是我们配置的谷歌云盘。没有的话就去左侧刷新一下。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/41e80d409b58cd61cb55154eb8f20f0d.png#pic_center)  
打开gdrive，其中有我们的数据集。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/84da8f6edc61f7dda261c85c84a2d18b.png#pic_center)

#### 3、深度学习库的下载

这一步，我们需要完成深度学习仓库的下载，我们使用git clone指令进行下载。**执行如下指令后，左边的文件中多出了yolov4-tiny-pytorch文件夹**。没有的话就去左侧刷新一下。

**然后我们通过了cd指令将根目录转移到了yolov4-tiny-pytorch文件夹。**

```python
!git clone https://github.com/bubbliiiing/yolov4-tiny-pytorch.git
%cd yolov4-tiny-pytorch/
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/09f62e3d49b6938d46aa4419db98ebeb.png#pic_center)

#### 4、数据集的复制与解压

**直接将数据集布置在谷歌云盘会导致大量的云盘数据传输，速度远不及本地文件，因此我们需要将数据集复制到本地里进行处理。**

我们输入下述代码进行文件的复制与解压。首先执行的是删除指令，将原来的空VOCdevkit文件夹进行删除。然后进行解压。

由于这里使用的是zip文件所以使用的是unzip指令，如果是其它形式的压缩包，需要根据压缩包的格式进行指令的修改（**请同学们百度**）。**执行下述指令后，可以发现，左边的文件中已经解压好了VOC数据集**。没有的话就去左侧刷新一下。

```python
!rm -rf ./VOCdevkit
!cp /content/gdrive/MyDrive/VOC_datasets/VOC07+12+test.zip ./
!unzip ./VOC07+12+test.zip -d ./
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9b3ac0aeedf43d8890c18b71179eefac.png#pic_center)

#### 5、保存路径设置

本文提供的代码默认的保存路径为logs文件夹，但Colab存在不稳定的问题，运行一段时间后会发生断线。  
如果将权值保存在原始根目录下的logs文件夹，发生断线网络就白训练了，浪费大量的时间。  
可以将google云盘软连接到根目录下，那么即使断线，权值也保留在云盘中。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e4b64485dff5b7aa5b59e3a285f08f07.png#pic_center)  
本文之前在云盘中创建了logs文件夹。将该文件夹链接过来。

```python
!rm -rf logs
!ln -s /content/gdrive/MyDrive/Models/yolov4-tiny-pytorch/logs logs
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/de9a5e9e3f807321e7db4815b71f8ae9.png#pic_center)

### 三、开始训练

#### 1、标注文件的处理

**打开voc\_annotation.py文件，由于我们现在使用的直接就是VOC数据集，我们已经划分好了训练集验证集和测试集，所以我们将annotation\_mode设置为2。**

然后输入指令完成标签的处理，生成2007\_train.txt和2007\_val.txt。

```python
!python voc_annotation.py
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8a062fbd777eef098dcdd69ed4c90be5.png#pic_center)

#### 2、训练文件的处理

处理训练文件主要包含三个部分：  
1、预训练文件的使用。  
2、保存周期的设置，这个设置是因为云盘的存储空间有限，每代都保存会导致存储空间满出。

##### a、预训练文件的使用

首先修改model\_path，指向我们上传到谷歌云盘的权值文件。**在左侧文件栏中，找到models/yolov4-tiny-pytorch/model\_data，复制权值路径。**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/10461edacf046f9e9bbce9e2e551c2e3.png#pic_center)  
替换右侧的model\_path。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ed048fd754e820c4591ef66ed9a9a768.png#pic_center)

##### b、保存周期的设置

有一些仓库已经完成了更新，**添加了每隔多少世代的保存参数**，直接修改save\_period既可，在本文中，我们将save\_period设置成4，也就是每隔4代保存一次。

**还没有更新的仓库只能每一代都保存了，记得偶尔去google云盘删一下**。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/84e29f2b7d18545a0b3a1aae2794dee2.png#pic_center)

#### 3、开始训练

此时在笔记本里面输入：

```python
!python train.py
```

即可开始训练。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/eb2a102d067f560886805b0b7ceb2428.png#pic_center)

断线怎么办？
------

### 1、防掉线措施

听说可以通过自动点击来减少掉线频率。  
在Google colab的按F12，点击网页的控制台，粘贴如下代码：

```python
function ConnectButton(){
	console.log("Connect pushed");
	document.querySelector("#top-toolbar > colab-connect-button").shadowRoot.querySelector("#connect").click()
}
setInterval(ConnectButton,60000);
```

### 2、完了还是掉线呀？

没什么办法，便宜的东西必然有它的坏处。

**按照步骤重新来一次，然后将预训练权重设置成logs文件夹里面训练好的权值文件即可。**

**除此之外，Init\_epoch等参数也需要调整。**

总结
--

**使用Colab训练比较重要的是处理好路径的关系，找到哪个文件在哪里，文件夹的执行目录在哪里，就可以比较简单的运行起程序了，不过Colab确实存在断线问题，我们需要时刻保存好文件，因此我将权值直接保存在云盘上，这样也不会丢失。**

 

![](https://img-blog.csdnimg.cn/a51b5e4b07ed4ed198ac0c395ca8b269.png)

本文转自 <https://blog.csdn.net/weixin_44791964/article/details/123659637>，如有侵权，请联系删除。