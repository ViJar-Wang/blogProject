---
title: git
toc: true
categories:
  - 学习
tags:
  - 学习
  - Windows
abbrlink: 518e617c
date: 2019-12-02 10:32:23
---
<center>Git教程</center>
<!-- more -->

## Git简介

> Git(读音为/gɪt/。)是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。 [1] Git 是 [Linus Torvalds](https://baike.baidu.com/item/Linus Torvalds/9336769) 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

以上来自于百度百科

看了一个大佬的介绍，总结下来：

当你和同事同时做一个文档的时候，Git不但能自动帮我记录每次文件的改动，还可以让同事协作编辑，这样就不用自己管理一堆类似的文件了，也不需要把文件传来传去。如果想查看某次改动，只需要在软件里瞄一眼就可以。

## 安装Git

在Windows上安装Git，可以从Git[官网下载](https://git-scm.com/downloads)，一路默认下去就好了，安装完成后按键盘的**win+R**,输入**cmd**，弹出命令符见面再输入**git**，出现如下命令则安装成功：

![](cmd.png)

之后在命令行输入：

```cmd
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

这里user.name和user.email可自定义，到这里就安装完成了。

## 创建版本库

什么是版本库？版本库又名仓库，英文repository(/rɪˈpɑːzətɔːri/)。可以简单的理解成一个目录。

开始创建版本库。

1.创建一个空文件夹jar，进入jar文件夹（注意：座位了避免出现问题，文件夹及路径不包含中文）

2.鼠标右键，单击**Git Bash here**，出现如下界面：

![](gitBash.png)

输入命令：

```cmd
git init
```

这个时候jar文件夹就是一个仓库了，并且文件夹下面会多出一个.git文件夹

**把文件加入到版本库**

首先创建一个文本文件readme.txt。内容如下

```txt
This is a text file.
```

一定要在jar这个文件夹目录下，否则会找不到。然后开始放入git仓库

第一步，把文件添加到仓库：

```cmd
git add readme.txt
```

执行完上面命令后没有任何显示就说明添加成功，否则百度去吧。我也不知道。

第二部，提交文件

```cmd
git commit -m 'add text file'
```

-m后面是本次提交的说明，可以输入任何内容，这样就可以从历史记录中查看

执行完命令后会告诉你，`1 file changed` 一个文件被改动；`1 insertions`：插入了一行内容

为什么Git添加文件需要`add`，`commit`一共两步呢？因为`commit`可以一次提交很多文件，所以你可以多次`add`不同的文件，比如：

```cmd
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```

## 版本回退

现在已经会上传文件到仓库了，那么在来一遍。修改readme.txt文件如下：

```
This is a text file.
Git is free software.
```

然后提交：

```cmd
$ git add readme.txt
$ git commit -m "first update readme.txt"
[master 778d2dd] first update readme.txt
 1 file changed, 2 insertions(+), 1 deletion(-)
```

这个时候你发现你更改的内容错了，想回到上个版本或者上上上个版本。那么你怎么还记得内容呢。但是Git就会记得。使用`git log`查看：

![](gitlog.png)

如果你文件更改次数多，输出的信息非常多，那么可以输入`git log --pretty=oneline`：

![](gitlog2.png)

友情提示，这里看到的似`778d2ddf...`的叽里呱啦的是`commit id`（版本号）

好了，现在我们启动时光穿梭机，准备把`readme.txt`回退到上一个版本，也就是`add distributed`的那个版本，怎么做呢？

首先，Git必须知道当前版本是哪个版本，在Git中，用`HEAD`表示当前版本，也就是最新的提交`778d2ddf...`（注意我的提交ID和你的肯定不一样），上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。

现在，我们要把当前版本`first update readme.txt`回退到上一个版本`add text file`，就可以使用`git reset`命令：

```cmd
$ git reset --hard HEAD^
```

先不要关闭命令窗口，在窗口输入`cat readme.txt`看看内容是不是上个版本的。

```cmd
$ cat readme.txt
This is a text file.
```

果然回到了上个版本，不过如果又想回到最新版本，那么问题来了。先输入`git log`查看一下状态:

```cmd
$ git log
commit 7b0fa712b2de80d7978dab94643c2cb59aca7c38 (HEAD -> master)
Author: 1419908068 <1419908068@qq.com>
Date:   Mon Dec 2 16:29:25 2019 +0800

    add text file
```

这里已经没有最新的那个版本的，那么你需要找到之前看的log，找到commit id。输入如下命令可以回到最新版本：

```
$ git reset --hard 778d2ddf
HEAD is now at 778d2dd first update readme.txt
```

版本号可以不用写全，前几位就好了。再查看一下内容

```cmd
$ cat readme.txt
This is a text file.
Git is free software.
```

没有commit id怎么办，git提供了后悔药，`git reflog`命令查看你每次的命令

```cmd
$ git reflog
```

```
778d2dd (HEAD -> master) HEAD@{0}: reset: moving to 778d2ddf
7b0fa71 HEAD@{1}: reset: moving to HEAD^
778d2dd (HEAD -> master) HEAD@{2}: commit: first update readme.txt
7b0fa71 HEAD@{3}: commit (initial): add text file
```

这样又可以找到`first update readme.txt`的commit id是`7b0fa71`，然后就又可以改回去了

## 远程仓库

### 添加远程仓库

现在的情景是，你已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，真是一举多得。

首先，登录[GitHub](https://github.com/login),然后在右上角找到`New reposotpry`，创建一个新的仓库

![](github1.png)

在Repository name填入`jar`，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：

![](github2.png)

目前github上的jar仓库是个空的，那么需要上传本地仓库的话需要吧本地仓库和它关联。根据提示，在命令行中输入命令：

```cmd
$ git remote add origin https://github.com/ViJar-Wang/jar.git
```

上面那段网址是github提供的，一眼就能看到，复制下来用就好了。然后通过命令提交。

```cmd
$ git push -u origin master
```

如果你是第一次push或者clone，那么会得到一个警告：

```
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
```

这里输入**yes**然后回车就好

Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：

```
Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
```

这个警告只会出现一次，后面的操作就不会有任何警告了。

如果你实在担心有人冒充GitHub服务器，输入`yes`前可以对照[GitHub的RSA Key的指纹信息](https://help.github.com/articles/what-are-github-s-ssh-key-fingerprints/)是否与SSH连接给出的一致。

回到正题。这个时候去远程仓库看一下：

![](github3.png)

会发现github上已经有readme.txt这个文件了。

### 从远程仓库克隆

当你需要从远处仓库下载的时候，你可以直接下载压缩包文件，也可以通过命令克隆到本地

```
git clone https://github.com/ViJar-Wang/ViJar-Wang.github.io.git
```

注意把Git仓库地址换成你自己的，克隆也可以指定目录，在末尾加个路径就好了

## 错误收集

**1.报错`fatal: remote origin already exists.`**

```
git remote rm origin
```

**2.报错`The authenticity of host 'github.com ' can't be established`**

这是由于你的git地址采用了ssh方式，切换为https方式即可，也可能是你的仓库地址不对，可以用命令先查看一下：

```undefined
git remote -v
```

如果跟你的github地址不一样，那就去你的github上复制一下仓库地址
 然后在终端中输入：

```cpp
git remote set-url origin https://github.com/yourname/learngit.git (这个是你的复制的仓库地址)
```

最后再push下就可以了！

```undefined
git push origin master 
```

**3.报错`Updates were rejected because the remote contains work that you do`**

在push之前输入：

```
git pull origin master
```

