---
title: 利用Hexo配置个人博客
date: 2017-09-05 23:28:46
keywords: hexo
tags: [hexo]
summary: Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。
---
<!-- toc -->

## 一、介绍

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

<div class="tip">官方网站：https://hexo.io</div>

## 二、安装工具

### 1. 安装Nodejs

可以访问Node官方网站下载：[https://nodejs.org](https://nodejs.org)，一般选择最新稳定版本下载安装就可以了。
或者可以先安装NVM[(https://github.com/creationix/nvm)](https://github.com/creationix/nvm)，然后可以通过NVM切换自己想要的node版本。
安装完毕后，可以通过在命令行中执行：`node -v` 来查看是否安装成功。

### 2. 安装git

可以去 [https://git-scm.com/](https://git-scm.com/) 下载相应系统的git版本直接安装就可以，或者如果有其他方案的话也可以选择，比如GUI界面的工具。
安装完成后，可以在命令行或者git bash中，输入`git version`，如果输出类似`git version 2.13.1`这样的文字说明你安装成功。

### 3. 安装hexo

接下来就可以安装hexo了，在命令行中执行`npm install -g hexo-cli`

## 三、建站
Hexo安装完成之后，就可以创建自己的网站了。
在你希望的目录下，依次执行以下命令：
> * hexo init blog
> * cd blog
> * npm install

命令会自动创建一个blog文件夹，并在blog文件夹内创建一些文件和文件夹，blog内的文件结构大致如下：
├── _config.yml      `网站的配置信息（大部分的配置都在这里）`
├── package.json     `应用程序的信息以及安装了的插件`
├── scaffolds        `模版 文件夹。当您新建文章时，Hexo 会根据指定的scaffold 来建立文件。`
├── source           `资源文件夹是存放用户资源的地方。`
|   ├── _drafts
|   └── _posts
└── themes           `主题文件夹。Hexo 会根据主题来生成静态页面。`

具体的设置可以查看 [官方网站](https://hexo.io/zh-cn/docs/)

## 四、hexo指令

当你创建项目的时候，其实你已经用到了一个hexo指令：`hexo init xxx`，这个指令可以帮你初始化一个hexo项目，hexo还有其他的一些常用指令：
> * hexo server  `启动一个端口为4000的本地服务启`，添加 -p 参数可以改变端口设置，如：hexo server -p 8787
> * hexo clean `清除缓存文件 (db.json) 和已生成的静态文件 (public)`
> * hexo new [layout] title `新建一篇文章。如果没有设置 layout 的话，默认使用 _config.yml 中的 default_layout 参数代替。如果标题包含空格的话，请使用引号括起来。` 如果你想添加一篇名为 美好的日子 的文章，可以：`hexo new 美好的日子`，如果你想创建一个名为 beautifulDay 的路由的话，可以：`hexo new page beautifulDay`
> * hexo generate `生成静态文件`，可以简写成 `hexo g`, `hexo generate --watch`这个命令可以监听文件变化并自动生成静态文件
> * hexo deploy `部署之前预先生成静态文件`，可以简写成 `hexo d`
> * hexo g -d 这个命令可以生成静态文件并将静态文件部署到相应位置


## 五、主题

你可以去 [这里](https://hexo.io/themes/) 选择自己喜欢的主题 或者 [这里](https://github.com/hexojs/awesome-hexo) 选择主题。
选择到自己喜欢的主题之后，就可以在blog目录下添加主题，具体操作如下（本站用的是anatole修改样式后的主题）：
> `git clone git@github.com:Ben02/hexo-theme-Anatole.git themes/anatole`

或者直接去github上下载，并把下载后的代码放在 `blog/themes` 下，并将文件夹命名为anatole(文件夹名字需要根据各自的主题名称命名，这里只是举例)。

然后需要修改blog下的`_config.yml`文件中的theme为：`theme:anatole`，
这样你的主题就生效了，如果需要自己修改主题样式的话，可以在themes/anatole下查找你需要修改的内容，并进行修改。
修改完毕后，可以执行`hexo server`，`hexo generate --watch` ，并在浏览器里访问http://localhost:4000/ 就可以看到效果了

## 六、利用github生成自己的网站

[github](github.com) 是一个可以免费托管代码的平台，有很多开源项目都会把代码放在github上，供大家参考学习。

### 1. 注册github
如果已经注册，直接跳过
官网：[github.com](github.com)
![注册](github/login.jpg?imageMogr2/thumbnail/350x)
填写必要的信息，注册完成直接登录。

### 2. 创建代码库
点击右上角头像左侧的加号创建一个仓库
![创建仓库](/images/github/newre.jpg?imageMogr2/thumbnail/350x)

填写仓库名称：比如我的github名字是MichaelGong，那我的仓库名字就是：`michaelgong.github.io`，
如果你的名字是haha的话，就写`haha.github.io`
![仓库](/images/github/createre.jpg?imageMogr2/thumbnail/550x)

### 3. 设置代码库
代码仓库创建完毕后，就会进入到如下页面，你可以点击`We recommend every repository include a README,LICENSE and .gitignore` 中的 `README` 添加一个readme先，如下图：
![仓库](/images/github/setting.jpg?imageMogr2/thumbnail/751x)
然后可以点击`setting`，进入到新页面，向下滑，找到`GitHub Pages`的位置，这时大概是这样的：
![仓库](/images/github/ghpages.jpg?imageMogr2/thumbnail/750x)

### 4. 配置SSH keys
在命令行中输入
<div class="tip">ssh-keygen -t rsa -C "邮箱地址，如：xxx@163.com"</div>后面可以一路enter下去，就可以创建成功了。

创建成功后，需要拿到你的公钥，window用户在`C:\Documents and Settings\Administrator.ssh\id_rsa.pub`，MAC用户在`~/.ssh/id_rsa.pub`，
登陆github系统。点击右上角的 Account Settings—>SSH Public keys —> add another public keys
把你本地生成的密钥复制到里面（key文本框中）， 点击 add key 就ok了

设置git身份信息
```bash
$ git config --global user.name "你的用户名"
$ git config --global user.email "你的邮箱"
```

### 5. 部署到github
首先在blog跟目录下执行 `npm install hexo-deployer-git --save` ，安装部署到git仓库的插件，供以后使用。
修改blog目录下的`_config.yml`中的 `deploy`属性：
{% blockquote %}
deploy: 
&nbsp;&nbsp;type: git
&nbsp;&nbsp;# michaelgong改为你的github用户名
&nbsp;&nbsp;repository: https://github.com/michaelgong/michaelgong.github.io.git
&nbsp;&nbsp;branch: master
{% endblockquote %} 这个时候可以执行命令`hexo g -d` 将代码部署到github上了，然后就可以通过访问http://michaelgong.github.io  来查看自己的文章。

## 七、配置自己的域名到github
首先你要有个域名，我的是[阿里云](https://wanwang.aliyun.com/)上购买的，如果你想在其他网站购买域名都可以的，只要就可以购买就可以的。
进入网站，输入自己想要的域名，一般来讲.com后缀的域名相应的会贵一些，你可以选择.me、.net、.top之类的域名进行购买，如果你不差钱，请直接无视我。
购买完了之后，可以在阿里云的控制台[https://netcn.console.aliyun.com/core/domain/list](https://netcn.console.aliyun.com/core/domain/list) 查看自己的域名，如下图：

![阿里云域名](/images/github/domain.jpg)
点击解析，进入到新页面，点击添加解析，添加如下三条解析设置，
![dns](/images/github/dns.jpg)

然后在blog文件夹下的source文件夹下创建`CNAME`的文件，注意这个文件没有后缀名，并在里面输入自己的域名，例如：`happybug.top`,
将代码部署到github就可以直接域名访问了（有可能DNS解析需要一些时间，一般十分钟）。

七牛的qn.json的配置：
{
    "access_key": "xxx",
    "secret_key": "xxx"
}

## 参考：
[零基础免费搭建个人博客-hexo+github](http://hifor.net/2015/07/01/%E9%9B%B6%E5%9F%BA%E7%A1%80%E5%85%8D%E8%B4%B9%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2-hexo-github/)
